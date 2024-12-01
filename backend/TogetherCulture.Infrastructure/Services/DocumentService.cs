using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Entities;
using TogetherCulture.Core.Interfaces;
using TogetherCulture.Infrastructure.Data;
using System.IO;

namespace TogetherCulture.Infrastructure.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly string _uploadDirectory;

        public DocumentService(
            ApplicationDbContext context,
            IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
            _uploadDirectory = Path.Combine(_environment.ContentRootPath, "Uploads", "Documents");
            
            // Ensure upload directory exists
            if (!Directory.Exists(_uploadDirectory))
            {
                Directory.CreateDirectory(_uploadDirectory);
            }
        }

        public async Task<ServiceResult<IEnumerable<DocumentDto>>> GetAllAsync()
        {
            try
            {
                var documents = await _context.Documents
                    .OrderByDescending(d => d.UploadedAt)
                    .Select(d => new DocumentDto
                    {
                        Id = d.Id,
                        Title = d.Title,
                        FileName = d.FileName,
                        ContentType = d.ContentType,
                        Size = d.Size,
                        UploadedAt = d.UploadedAt,
                        UploadedById = d.UploadedById
                    })
                    .ToListAsync();

                return new ServiceResult<IEnumerable<DocumentDto>> { Data = documents, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<IEnumerable<DocumentDto>> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<DocumentDto>> GetByIdAsync(int id)
        {
            try
            {
                var document = await _context.Documents
                    .FirstOrDefaultAsync(d => d.Id == id);

                if (document == null)
                    return new ServiceResult<DocumentDto> { Success = false, Message = "Document not found" };

                var dto = new DocumentDto
                {
                    Id = document.Id,
                    Title = document.Title,
                    FileName = document.FileName,
                    ContentType = document.ContentType,
                    Size = document.Size,
                    UploadedAt = document.UploadedAt,
                    UploadedById = document.UploadedById
                };

                return new ServiceResult<DocumentDto> { Data = dto, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<DocumentDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<DocumentDto>> UploadAsync(IFormFile file, string title, int userId)
        {
            if (file == null || file.Length == 0)
                return new ServiceResult<DocumentDto> { Success = false, Message = "No file was uploaded" };

            // Generate a unique filename
            var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
            var filePath = Path.Combine(_uploadDirectory, fileName);

            try
            {
                // Save the file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Create document record
                var document = new Document
                {
                    Title = title,
                    FileName = fileName,
                    ContentType = file.ContentType,
                    StoragePath = filePath,
                    Size = file.Length,
                    UploadedAt = DateTime.UtcNow,
                    UploadedById = userId
                };

                _context.Documents.Add(document);
                await _context.SaveChangesAsync();

                var dto = new DocumentDto
                {
                    Id = document.Id,
                    Title = document.Title,
                    FileName = document.FileName,
                    ContentType = document.ContentType,
                    Size = document.Size,
                    UploadedAt = document.UploadedAt,
                    UploadedById = document.UploadedById
                };

                return new ServiceResult<DocumentDto> { Data = dto, Success = true };
            }
            catch (Exception ex)
            {
                // Clean up file if database operation fails
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }

                return new ServiceResult<DocumentDto>
                { 
                    Success = false, 
                    Message = $"Error uploading file: {ex.Message}" 
                };
            }
        }

        public async Task<ServiceResult<bool>> DeleteAsync(int id)
        {
            var document = await _context.Documents.FindAsync(id);
            if (document == null)
                return new ServiceResult<bool> { Success = false, Message = "Document not found" };

            try
            {
                // Delete physical file
                if (File.Exists(document.StoragePath))
                {
                    File.Delete(document.StoragePath);
                }

                // Remove database record
                _context.Documents.Remove(document);
                await _context.SaveChangesAsync();

                return new ServiceResult<bool> { Data = true, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<bool>
                { 
                    Success = false, 
                    Message = $"Error deleting document: {ex.Message}" 
                };
            }
        }
    }
}