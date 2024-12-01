using TogetherCulture.Core.DTOs;
using Microsoft.AspNetCore.Http;  // For IFormFile
namespace TogetherCulture.Core.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResult> RegisterAsync(RegisterDto registerDto);
        Task<AuthResult> LoginAsync(LoginDto loginDto);
        Task<AuthResult> RefreshTokenAsync(RefreshTokenDto refreshTokenDto);
    }
}