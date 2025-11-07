
import { useEffect, useRef, useState } from "react"

/**
 * Recorder UX con botón central (no guarda audio en backend por compatibilidad).
 * Si el navegador soporta MediaRecorder, muestra duración; si no, simula el estado.
 */
export const Recorder = ({ onPrimaryAction }) => {
  const [isRecording, setRecording] = useState(false)
  const [time, setTime] = useState(0)
  const timer = useRef(null)
  const mediaRecorder = useRef(null)

  useEffect(() => {
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [])

  const startTicker = () => {
    timer.current = setInterval(() => setTime((t) => t + 1), 1000)
  }
  const stopTicker = () => {
    if (timer.current) clearInterval(timer.current)
    timer.current = null
  }

  const format = (s) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`

  const start = async () => {
    setTime(0)
    startTicker()
    setRecording(true)
    // Intento de captura real (opcional)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.current = new MediaRecorder(stream)
      mediaRecorder.current.start()
    } catch (e) {
      // Silencio: seguimos solo con la animación/cronómetro
    }
  }

  const stop = () => {
    stopTicker()
    setRecording(false)
    try { mediaRecorder.current?.stop() } catch {}
    if (onPrimaryAction) onPrimaryAction()
  }

  return (
    <section className="recorder">
      <div className="recorder-header">
        <h2>Grabadora</h2>
        <p className="muted">{isRecording ? "Grabando..." : "Listo para grabar"}</p>
      </div>

      <div className="recorder-timer">{format(time)}</div>

      <div className="recorder-cta">
        <button
          className={`mic-btn ${isRecording ? "active" : ""}`}
          aria-label={isRecording ? "Detener grabación" : "Iniciar grabación"}
          onClick={isRecording ? stop : start}
        >
          <span className="mic-icon">🎤</span>
        </button>
      </div>

      <p className="muted center">Tocá el botón para {isRecording ? "detener" : "grabar"}</p>
    </section>
  )
}
