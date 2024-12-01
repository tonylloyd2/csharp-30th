using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Entities;
using TogetherCulture.Core.Interfaces;
using TogetherCulture.Core.Entities.Enums;

namespace TogetherCulture.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IGenericRepository<Member> _memberRepository;

        public AuthService(
            IGenericRepository<User> userRepository,
            IGenericRepository<Member> memberRepository,
            IConfiguration configuration)
        {
            _userRepository = userRepository;
            _memberRepository = memberRepository;
            _configuration = configuration;
        }

        public async Task<AuthResult> RegisterAsync(RegisterDto registerDto)
        {
            try 
            {
                // Check if user already exists
                var existingUser = await _userRepository.FindAsync(u => u.Email == registerDto.Email);
                if (existingUser != null)
                {
                    return new AuthResult 
                    { 
                        Success = false,
                        Message = "User with this email already exists"
                    };
                }

                // Create new user
                var user = new User
                {
                    Email = registerDto.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    IsActive = true
                };

                await _userRepository.AddAsync(user);

                // Create associated member record
                var member = new Member
                {
                    UserId = user.Id,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    MembershipType = MembershipType.Basic,
                    Status = MembershipStatus.Active,
                    Interests = new List<InterestType>()
                };

                await _memberRepository.AddAsync(member);

                // Generate JWT token
                var token = GenerateJwtToken(user);

                return new AuthResult
                {
                    Success = true,
                    Token = token,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                };
            }
            catch (Exception ex)
            {
                return new AuthResult
                {
                    Success = false,
                    Message = "Registration failed: " + ex.Message
                };
            }
        }

        public async Task<AuthResult> LoginAsync(LoginDto loginDto)
        {
            try
            {
                // Find user by email
                var user = await _userRepository.FindAsync(u => u.Email == loginDto.Email);
                if (user == null)
                {
                    return new AuthResult 
                    { 
                        Success = false,
                        Message = "Invalid email or password"
                    };
                }

                // Verify password
                if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                {
                    return new AuthResult 
                    { 
                        Success = false,
                        Message = "Invalid email or password"
                    };
                }

                // Check if user is active
                if (!user.IsActive)
                {
                    return new AuthResult
                    {
                        Success = false,
                        Message = "Account is not active"
                    };
                }

                // Generate JWT token
                var token = GenerateJwtToken(user);

                return new AuthResult
                {
                    Success = true,
                    Token = token,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                };
            }
            catch (Exception ex)
            {
                return new AuthResult
                {
                    Success = false,
                    Message = "Login failed: " + ex.Message
                };
            }
        }

        public async Task<AuthResult> RefreshTokenAsync(RefreshTokenDto refreshTokenDto)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidAudience = _configuration["Jwt:Audience"],
                    ValidateLifetime = false
                };

                // Validate the token
                var principal = tokenHandler.ValidateToken(refreshTokenDto.RefreshToken, tokenValidationParameters, out SecurityToken securityToken);
                
                if (securityToken is not JwtSecurityToken jwtSecurityToken || 
                    !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    return new AuthResult { Success = false, Message = "Invalid token" };
                }

                var userId = int.Parse(principal.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var user = await _userRepository.GetByIdAsync(userId);

                if (user == null)
                {
                    return new AuthResult { Success = false, Message = "User not found" };
                }

                // Generate new tokens
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
                };

                var newToken = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(1),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                );

                return new AuthResult
                {
                    Success = true,
                    Token = new JwtSecurityTokenHandler().WriteToken(newToken),
                    RefreshToken = refreshTokenDto.RefreshToken // Return the same refresh token
                };
            }
            catch (Exception ex)
            {
                return new AuthResult
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.FirstName),
                new Claim(ClaimTypes.Surname, user.LastName)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}