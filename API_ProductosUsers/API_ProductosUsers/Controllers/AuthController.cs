using API_ProductosUsers.Data;
using API_ProductosUsers.DTOs;
using API_ProductosUsers.Models;
using API_ProductosUsers.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace API_ProductosUsers.Controllers
{
    [Route("api/AuthController")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly TokenServices _tokenService;

        public AuthController(AppDbContext db, TokenServices tokenService)
        {
            _db = db;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (_db.Usuarios.Any(u => u.Email == dto.Email))
                return BadRequest("El email ya está registrado.");

            var usuario = new Usuario
            {
                Email = dto.Email,
                PasswordHash =  BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Rol = dto.Rol
            };

            _db.Usuarios.Add(usuario);
            await _db.SaveChangesAsync();

            return Ok("Usuario registrado correctamente.");
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var usuario = _db.Usuarios.FirstOrDefault(u => u.Email == dto.Email);

            if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Password, usuario.PasswordHash))
                return Unauthorized("Credenciales incorrectas.");

            var token = _tokenService.GenerarToken(usuario);
            return Ok(new { token });
        }
    }
}
