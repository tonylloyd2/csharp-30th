using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Interfaces;

namespace TogetherCulture.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ConnectionsController : ControllerBase
    {
        private readonly IConnectionService _connectionService;

        public ConnectionsController(IConnectionService connectionService)
        {
            _connectionService = connectionService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConnectionDto>>> GetAll()
        {
            var connections = await _connectionService.GetAllAsync();
            return Ok(connections);
        }

        [HttpGet("needs")]
        public async Task<ActionResult<IEnumerable<ConnectionDto>>> GetNeeds()
        {
            var needs = await _connectionService.GetNeedsAsync();
            return Ok(needs);
        }

        [HttpGet("offers")]
        public async Task<ActionResult<IEnumerable<ConnectionDto>>> GetOffers()
        {
            var offers = await _connectionService.GetOffersAsync();
            return Ok(offers);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] ConnectionDto dto)
        {
            var result = await _connectionService.CreateAsync(dto);
            if (!result.Success)
                return BadRequest(result.Message);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] ConnectionDto dto)
        {
            var result = await _connectionService.UpdateAsync(id, dto);
            if (!result.Success)
                return BadRequest(result.Message);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _connectionService.DeleteAsync(id);
            if (!result.Success)
                return BadRequest(result.Message);
            return Ok();
        }
    }
}