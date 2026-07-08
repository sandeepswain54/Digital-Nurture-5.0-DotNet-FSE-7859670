using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JwtMicroservice.Models;

namespace JwtMicroservice.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        // Hardcoded users for demo
        private static List<User> _users = new List<User>
        {
            new User { Id = 1, Username = "admin", Password = "admin123", Role = "Admin" },
            new User { Id = 2, Username = "user",  Password = "user123",  Role = "User"  }
        };

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // POST: api/auth/login
        [HttpPost("login")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult Login([FromBody] LoginModel model)
        {
            // Validate user credentials
            if (IsValidUser(model))
            {
                var token = GenerateJwtToken(model.Username);
                return Ok(new
                {
                    Token = token,
                    Username = model.Username,
                    Message = "Login successful!"
                });
            }
            return Unauthorized("Invalid username or password!");
        }

        // Check if user is valid
        private bool IsValidUser(LoginModel model)
        {
            var user = _users.Find(u =>
                u.Username == model.Username &&
                u.Password == model.Password);
            return user != null;
        }

        // Generate JWT Token
        private string GenerateJwtToken(string username)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration["Jwt:Key"] ?? "ThisIsASecretKeyForJwtToken"));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(
                    double.Parse(_configuration["Jwt:DurationInMinutes"] ?? "60")),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}