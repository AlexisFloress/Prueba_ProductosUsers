import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

interface RegisterForm {
  email: string
  password: string
  confirmarPassword: string
  rol: string
}

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterForm>({
    email: '',
    password: '',
    confirmarPassword: '',
    rol: 'user'
  })
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validar = () => {
    if (!form.email || !form.password || !form.confirmarPassword) {
      setError('Todos los campos son obligatorios.')
      return false
    }
    if (form.password !== form.confirmarPassword) {
      setError('Las contraseñas no coinciden.')
      return false
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return

    try {
      await api.post('/auth/register', {
        email: form.email,
        password: form.password,
        rol: form.rol
      })
      setExito('Usuario registrado correctamente. Redirigiendo...')
      setTimeout(() => navigate('/login'), 1500)
    } catch {
      setError('El email ya está registrado.')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8, background: 'white' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Confirmar contraseña</label>
          <input
            type="password"
            name="confirmarPassword"
            value={form.confirmarPassword}
            onChange={handleChange}
            required
            style={{ marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Rol</label>
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            style={{ marginTop: 4, width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 14 }}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}
        {exito && <p style={{ color: 'green', marginBottom: 12 }}>{exito}</p>}
        <button type="submit" style={{ width: '100%', marginBottom: 12 }}>
          Registrarse
        </button>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#666' }}>
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" style={{ color: '#4f46e5' }}>Iniciá sesión</Link>
        </p>
      </form>
    </div>
  )
}