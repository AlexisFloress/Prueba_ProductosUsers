import { useEffect, useState } from 'react'
import api from '../services/api'
import type { Producto } from '../types'
import Navbar from '../components/NavBar'

const productoVacio: Producto = {
  nombre: '', descripcion: '', precio: 0, stock: 0, tipoProducto: ''
}

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [form, setForm] = useState<Producto>(productoVacio)
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    const res = await api.get('/productos')
    setProductos(res.data)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validar = () => {
    if (!form.nombre || !form.descripcion || !form.tipoProducto) {
      setError('Todos los campos son obligatorios.')
      return false
    }
    if (form.precio <= 0) {
      setError('El precio debe ser mayor a 0.')
      return false
    }
    if (form.stock < 0) {
      setError('El stock no puede ser negativo.')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return

    if (editandoId !== null) {
      await api.put(`/productos/${editandoId}`, form)
      setEditandoId(null)
    } else {
      await api.post('/productos', form)
    }

    setForm(productoVacio)
    cargarProductos()
  }

  const handleEditar = (producto: Producto) => {
    setForm(producto)
    setEditandoId(producto.id!)
  }

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Seguro que querés eliminar este producto?')) return
    await api.delete(`/productos/${id}`)
    cargarProductos()
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
        <h2>{editandoId ? 'Editar producto' : 'Nuevo producto'}</h2>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10, marginBottom: '2rem' }}>
          {['nombre', 'descripcion', 'tipoProducto'].map(campo => (
            <input
              key={campo}
              name={campo}
              placeholder={campo}
              value={(form as any)[campo]}
              onChange={handleChange}
              style={{ padding: 8 }}
            />
          ))}
          <input
            name="precio"
            type="number"
            placeholder="Precio"
            value={form.precio}
            onChange={handleChange}
            style={{ padding: 8 }}
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            style={{ padding: 8 }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" style={{ padding: 10 }}>
            {editandoId ? 'Actualizar' : 'Crear'}
          </button>
          {editandoId && (
            <button type="button" onClick={() => { setForm(productoVacio); setEditandoId(null) }}>
              Cancelar
            </button>
          )}
        </form>

        <h2>Lista de productos</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Nombre', 'Descripción', 'Precio', 'Stock', 'Tipo', 'Acciones'].map(h => (
                <th key={h} style={{ borderBottom: '1px solid #ccc', padding: 8, textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td style={{ padding: 8 }}>{p.nombre}</td>
                <td style={{ padding: 8 }}>{p.descripcion}</td>
                <td style={{ padding: 8 }}>${p.precio}</td>
                <td style={{ padding: 8 }}>{p.stock}</td>
                <td style={{ padding: 8 }}>{p.tipoProducto}</td>
                <td style={{ padding: 8, display: 'flex', gap: 8 }}>
                  <button onClick={() => handleEditar(p)}>Editar</button>
                  <button onClick={() => handleEliminar(p.id!)} style={{ color: 'red' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}