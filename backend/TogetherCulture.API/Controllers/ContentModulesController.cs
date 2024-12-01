using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Entities;
using TogetherCulture.Core.Interfaces;

namespace TogetherCulture.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ContentModulesController : ControllerBase
    {
        private readonly IGenericRepository<ContentModule> _moduleRepository;
        private readonly IGenericRepository<ModuleBooking> _bookingRepository;

        public ContentModulesController(
            IGenericRepository<ContentModule> moduleRepository,
            IGenericRepository<ModuleBooking> bookingRepository)
        {
            _moduleRepository = moduleRepository;
            _bookingRepository = bookingRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContentModule>>> GetModules()
        {
            var modules = await _moduleRepository.GetAllAsync();
            return Ok(modules);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContentModule>> GetModule(int id)
        {
            var module = await _moduleRepository.GetByIdAsync(id);
            if (module == null)
                return NotFound();
            return Ok(module);
        }

        [HttpPost("{id}/book")]
        public async Task<ActionResult> BookModule(int id)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var module = await _moduleRepository.GetByIdAsync(id);
            
            if (module == null)
                return NotFound("Module not found");

            var booking = new ModuleBooking
            {
                ContentModuleId = id,
                MemberId = userId,
                BookedAt = DateTime.UtcNow
            };

            await _bookingRepository.AddAsync(booking);
            return Ok();
        }
    }
}