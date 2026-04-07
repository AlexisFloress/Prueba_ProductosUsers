using API_ProductosUsers.Data;
using API_ProductosUsers.DTOs;
using API_ProductosUsers.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ProductosUsers.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/ProductosController")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ProductosController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_db.Productos.ToList());

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var producto = _db.Productos.Find(id);
            return producto == null ? NotFound() : Ok(producto);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProductoDto dto)
        {
            var producto = new Producto
            {
                Nombre = dto.Nombre,
                Descripcion = dto.Descripcion,
                Precio = dto.Precio,
                Stock = dto.Stock,
                TipoProducto = dto.TipoProducto
            };

            _db.Productos.Add(producto);
            await _db.SaveChangesAsync();
            return Ok(producto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ProductoDto dto)
        {
            var producto = _db.Productos.Find(id);
            if (producto == null) return NotFound();

            producto.Nombre = dto.Nombre;
            producto.Descripcion = dto.Descripcion;
            producto.Precio = dto.Precio;
            producto.Stock = dto.Stock;
            producto.TipoProducto = dto.TipoProducto;

            await _db.SaveChangesAsync();
            return Ok(producto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var producto = _db.Productos.Find(id);
            if (producto == null) return NotFound();

            _db.Productos.Remove(producto);
            await _db.SaveChangesAsync();
            return Ok("Producto eliminado.");
        }
    }
}
