using TogetherCulture.Core.DTOs;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace TogetherCulture.Core.Interfaces
{
    public interface IDocumentService
    {
        Task<ServiceResult<IEnumerable<DocumentDto>>> GetAllAsync();
        Task<ServiceResult<DocumentDto>> GetByIdAsync(int id);
        Task<ServiceResult<DocumentDto>> UploadAsync(IFormFile file, string title, int userId);
        Task<ServiceResult<bool>> DeleteAsync(int id);
    }
}