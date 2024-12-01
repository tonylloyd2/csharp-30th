using TogetherCulture.Core.DTOs;
using Microsoft.AspNetCore.Http;  // For IFormFile
namespace TogetherCulture.Core.Interfaces
{
    public interface IConnectionService
    {
        Task<ServiceResult<IEnumerable<ConnectionDto>>> GetAllAsync();
        Task<ServiceResult<IEnumerable<ConnectionDto>>> GetNeedsAsync();
        Task<ServiceResult<IEnumerable<ConnectionDto>>> GetOffersAsync();
        Task<ServiceResult<ConnectionDto>> GetByIdAsync(int id);
        Task<ServiceResult<ConnectionDto>> CreateAsync(ConnectionDto dto);
        Task<ServiceResult<bool>> UpdateAsync(int id, ConnectionDto dto);
        Task<ServiceResult<bool>> DeleteAsync(int id);
    }
}