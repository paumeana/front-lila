import { useRef, useState } from "react"
import { z } from "zod"

// 🧩 Esquema de validación
const taskSchema = z.object({
  text: z
    .string()
    .min(20, "El texto debe tener al menos 3 caracteres")
    .max(200, "El texto no puede superar los 200 caracteres"),
})

export const TaskInput = ({ onAdd }) => {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isValid, setIsValid] = useState(false)
  const recognitionRef = useRef(null)

  const initRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Tu navegador no soporta reconocimiento de voz")
      return null
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = "es-ES"
    recognition.continuous = true
    recognition.interimResults = false

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1][0].transcript
      const capitalized = result.charAt(0).toUpperCase() + result.slice(1)
      const newText = transcript
        ? transcript + " " + capitalized
        : capitalized

      // 🔍 Cada vez que se actualiza el texto, lo validamos
      try {
        taskSchema.parse({ text: newText.trim() })
        setIsValid(true)
      } catch {
        setIsValid(false)
        alert("Debes agregar una descripción de tarea mas larga.")
        return
      }

      setTranscript(newText)
    }

    recognition.onend = () => setListening(false)

    return recognition
  }

  // 💡 Agrega una tarea validada
  const handleAdd = async (text) => {
    await onAdd(text)
    setTranscript("")
    setIsValid(false)
  }

  // 🎤 Inicia o detiene el reconocimiento de voz
  const handleToggle = () => {
    if (listening) {
      recognitionRef.current?.stop()
    } else {
      if (transcript.trim()) handleAdd(transcript.trim())
      recognitionRef.current = initRecognition()
      recognitionRef.current?.start()
      setListening(true)
    }
  }

  // 🖱️ Confirma manualmente la tarea
  const handleConfirm = () => {
    if (transcript.trim()) handleAdd(transcript.trim())
  }

  // 🧮 Valida texto cada vez que el usuario escribe manualmente
  const handleChange = (e) => {
    const value = e.target.value
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1)
    setTranscript(capitalized)

    try {
      taskSchema.parse({ text: capitalized.trim() })
      setIsValid(true)
    } catch {
      setIsValid(false)
    }
  }

  return (
    <div className="mt-4">
      {/* 🎙️ Botón principal para iniciar/detener grabación */}
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded text-white ${listening
          ? "bg-red-600 hover:bg-red-700"
          : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {listening ? "Detener" : "Comenzar grabación"}
      </button>

      {/* 🧾 Renderizado condicional:
          Solo se muestra el textarea si hay texto Y pasa la validación */}
      {isValid && !listening && transcript && (
        <div className="mt-4">
          <textarea
            value={transcript}
            onChange={handleChange}
            rows="3"
            cols="40"
            className="w-full p-2 rounded bg-gray-800 text-gray-200 border border-gray-600"
          />
          <br />
          <button
            onClick={handleConfirm}
            className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Confirmar tarea
          </button>
        </div>
      )}
    </div>
  )
}
