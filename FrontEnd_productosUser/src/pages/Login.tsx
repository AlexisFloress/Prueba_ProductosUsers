import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import type { LoginDto } from '../types'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState<LoginDto>({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      navigate('/productos')
    } catch {
      setError('Credenciales incorrectas.')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8, background: 'white' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>email</label>
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
        {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}
        <button type="submit" style={{ width: '100%', marginBottom: 12 }}>
          Entrar
        </button>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#666' }}>
          ¿No tenés cuenta?{' '}
          <Link to="/register" style={{ color: '#4f46e5' }}>Registrate</Link>
        </p>
      </form>
    </div>
  )
}