namespace API_ProductosUsers.DTOs
{
    public class ProductoDto
    {
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public int Stock { get; set; }
        public string TipoProducto { get; set; } = string.Empty;
    }
}
