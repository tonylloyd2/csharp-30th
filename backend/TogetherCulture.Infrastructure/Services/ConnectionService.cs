using Microsoft.EntityFrameworkCore;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Entities;
using TogetherCulture.Core.Interfaces;
using TogetherCulture.Infrastructure.Data;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace TogetherCulture.Infrastructure.Services
{
    public class ConnectionService : IConnectionService
    {
        private readonly ApplicationDbContext _context;

        public ConnectionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceResult<IEnumerable<ConnectionDto>>> GetAllAsync()
        {
            try
            {
                var connections = await _context.Connections
                    .Include(c => c.CreatedBy)
                    .OrderByDescending(c => c.CreatedAt)
                    .Select(c => new ConnectionDto
                    {
                        Id = c.Id,
                        Title = c.Title,
                        Description = c.Description,
                        IsNeed = c.IsNeed,
                        CreatedAt = c.CreatedAt,
                        CreatedById = c.CreatedById
                    })
                    .ToListAsync();

                return new ServiceResult<IEnumerable<ConnectionDto>> { Data = connections, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<IEnumerable<ConnectionDto>> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<IEnumerable<ConnectionDto>>> GetNeedsAsync()
        {
            try
            {
                var needs = await _context.Connections
                    .Where(c => c.IsNeed)
                    .Include(c => c.CreatedBy)
                    .OrderByDescending(c => c.CreatedAt)
                    .Select(c => new ConnectionDto
                    {
                        Id = c.Id,
                        Title = c.Title,
                        Description = c.Description,
                        IsNeed = c.IsNeed,
                        CreatedAt = c.CreatedAt,
                        CreatedById = c.CreatedById
                    })
                    .ToListAsync();

                return new ServiceResult<IEnumerable<ConnectionDto>> { Data = needs, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<IEnumerable<ConnectionDto>> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<IEnumerable<ConnectionDto>>> GetOffersAsync()
        {
            try
            {
                var offers = await _context.Connections
                    .Where(c => !c.IsNeed)
                    .Include(c => c.CreatedBy)
                    .OrderByDescending(c => c.CreatedAt)
                    .Select(c => new ConnectionDto
                    {
                        Id = c.Id,
                        Title = c.Title,
                        Description = c.Description,
                        IsNeed = c.IsNeed,
                        CreatedAt = c.CreatedAt,
                        CreatedById = c.CreatedById
                    })
                    .ToListAsync();

                return new ServiceResult<IEnumerable<ConnectionDto>> { Data = offers, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<IEnumerable<ConnectionDto>> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<ConnectionDto>> GetByIdAsync(int id)
        {
            try
            {
                var connection = await _context.Connections
                    .Include(c => c.CreatedBy)
                    .FirstOrDefaultAsync(c => c.Id == id);

                if (connection == null)
                    return new ServiceResult<ConnectionDto> { Success = false, Message = "Connection not found" };

                var dto = new ConnectionDto
                {
                    Id = connection.Id,
                    Title = connection.Title,
                    Description = connection.Description,
                    IsNeed = connection.IsNeed,
                    CreatedAt = connection.CreatedAt,
                    CreatedById = connection.CreatedById
                };

                return new ServiceResult<ConnectionDto> { Data = dto, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<ConnectionDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<ConnectionDto>> CreateAsync(ConnectionDto dto)
        {
            try
            {
                var connection = new Connection
                {
                    Title = dto.Title,
                    Description = dto.Description,
                    IsNeed = dto.IsNeed,
                    CreatedAt = DateTime.UtcNow,
                    CreatedById = dto.CreatedById
                };

                _context.Connections.Add(connection);
                await _context.SaveChangesAsync();

                dto.Id = connection.Id;
                return new ServiceResult<ConnectionDto> { Data = dto, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<ConnectionDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<bool>> UpdateAsync(int id, ConnectionDto dto)
        {
            try
            {
                var connection = await _context.Connections.FindAsync(id);
                if (connection == null)
                    return new ServiceResult<bool> { Success = false, Message = "Connection not found" };

                connection.Title = dto.Title;
                connection.Description = dto.Description;
                connection.IsNeed = dto.IsNeed;

                await _context.SaveChangesAsync();

                return new ServiceResult<bool> { Data = true, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<bool> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<bool>> DeleteAsync(int id)
        {
            try
            {
                var connection = await _context.Connections.FindAsync(id);
                if (connection == null)
                    return new ServiceResult<bool> { Success = false, Message = "Connection not found" };

                _context.Connections.Remove(connection);
                await _context.SaveChangesAsync();

                return new ServiceResult<bool> { Data = true, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<bool> { Success = false, Message = ex.Message };
            }
        }
    }
}