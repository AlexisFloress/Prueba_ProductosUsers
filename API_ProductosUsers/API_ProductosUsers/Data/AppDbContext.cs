using API_ProductosUsers.Models;
using Microsoft.EntityFrameworkCore;

namespace API_ProductosUsers.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
        public DbSet<Usuario> Usuarios { get; set; }   
        public DbSet<Producto> Productos { get; set; }
    }
}
