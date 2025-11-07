import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../layout/Layout"
import { loginApi } from "../services/apiAuth"
import { useAuth } from "../context/AuthContext"
import { Helmet } from "react-helmet";

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const data = await loginApi(email, password) // { token }
      login({ email, token: data.token })          // guardar en contexto
      navigate("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Helmet>
        {/* 🧭 Título y descripción */}
        <title>Iniciar sesión | TaskVoice</title>
        <meta
          name="description"
          content="Accedé a tu cuenta para administrar tus tareas por voz y organizar tu día de forma eficiente."
        />

        {/* 📱 Meta responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* 🧭 Indexación (puedes marcarla como noindex si no quieres que aparezca en Google) */}
        <meta name="robots" content="noindex, nofollow" />

        {/* 🌐 Open Graph para redes sociales */}
        <meta property="og:title" content="Iniciar sesión | TaskVoice" />
        <meta
          property="og:description"
          content="Accedé a tu cuenta para administrar tus tareas por voz y organizar tu día."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tusitio.com/login" />
        <meta property="og:image" content="https://tusitio.com/preview-login.png" />

        {/* 🐦 Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Iniciar sesión | TaskVoice" />
        <meta
          name="twitter:description"
          content="Accedé a tu cuenta para administrar tus tareas por voz y organizar tu día."
        />
        <meta name="twitter:image" content="https://tusitio.com/preview-login.png" />
      </Helmet>
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-sm bg-gray-900 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-gray-200 border border-gray-600"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-gray-200 border border-gray-600"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              {loading ? "Ingresando..." : "Entrar"}
            </button>
          </form>

          {error && (
            <p className="mt-4 text-red-500 font-semibold text-center">{error}</p>
          )}
        </div>
      </div>
    </Layout>
  )
}
