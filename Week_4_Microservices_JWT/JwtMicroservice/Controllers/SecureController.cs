using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JwtMicroservice.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SecureController : ControllerBase
    {
        // GET: api/secure/data
        // This endpoint requires JWT token
        [HttpGet("data")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult GetSecureData()
        {
            var username = User.Identity?.Name;
            return Ok(new
            {
                Message = "This is protected data.",
                Username = username,
                AccessTime = DateTime.Now
            });
        }

        // GET: api/secure/public
        // This endpoint is public - no token needed
        [HttpGet("public")]
        [AllowAnonymous]
        public IActionResult GetPublicData()
        {
            return Ok(new
            {
                Message = "This is public data - no token needed!",
                AccessTime = DateTime.Now
            });
        }
    }
}