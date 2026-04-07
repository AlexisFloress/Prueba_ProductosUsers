export interface LoginDto {
  email: string
  password: string
}

export interface Producto {
  id?: number
  nombre: string
  descripcion: string
  precio: number
  stock: number
  tipoProducto: string
}