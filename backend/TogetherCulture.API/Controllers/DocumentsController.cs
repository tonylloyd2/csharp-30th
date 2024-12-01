using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Interfaces;

namespace TogetherCulture.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentService _documentService;

        public DocumentsController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DocumentDto>>> GetAll()
        {
            var documents = await _documentService.GetAllAsync();
            return Ok(documents);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentDto>> GetById(int id)
        {
            var document = await _documentService.GetByIdAsync(id);
            if (document == null)
                return NotFound();
            return Ok(document);
        }

        [HttpPost]
        public async Task<ActionResult> Upload([FromForm] IFormFile file, [FromForm] string title)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var result = await _documentService.UploadAsync(file, title, userId);
            if (!result.Success)
                return BadRequest(result.Message);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _documentService.DeleteAsync(id);
            if (!result.Success)
                return BadRequest(result.Message);
            return Ok();
        }
    }
}