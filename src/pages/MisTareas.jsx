
import { useTasks } from "../hooks/useTasks"
import { Layout } from "../layout/Layout"
import { Helmet } from "react-helmet"
import { Recorder } from "../components/Recorder"

export const MisTareas = () => {
  const { tasks, addTask, removeTask, toggleTask } = useTasks()

  const handlePrimary = () => {
    // Para mantener compatibilidad con tu backend actual: creamos una "tarea" vacía tipo nota de voz
    addTask("Nota de voz")
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const value = new FormData(e.currentTarget).get("text")
    if (value?.trim()) addTask(value.trim())
    e.currentTarget.reset()
  }

  return (
    <Layout>
      <Helmet><title>Grabadora</title></Helmet>

      <Recorder onPrimaryAction={handlePrimary} />

      <section className="glass card">
        <h3>Tus registros</h3>
        <form onSubmit={handleAdd} style={{display:"flex", gap:8, marginTop:12}}>
          <input name="text" placeholder="Agregar texto / etiqueta" className="glass" style={{flex:1, padding:10, borderRadius:12, border:"1px solid rgba(255,255,255,.4)"}}/>
          <button className="btn primary" type="submit">Guardar</button>
        </form>

        <ul className="task-list">
          {tasks.map((t)=>(
            <li key={t._id} className="task">
              <label style={{display:"flex", alignItems:"center", gap:10}}>
                <input type="checkbox" checked={!!t.completed} onChange={()=>toggleTask(t._id, !t.completed)} />
                <span style={{opacity: t.completed ? .6 : 1, textDecoration: t.completed ? "line-through": "none"}}>{t.text}</span>
              </label>
              <button className="btn ghost" onClick={()=>removeTask(t._id)}>Eliminar</button>
            </li>
          ))}
          {!tasks.length && <li className="muted" style={{padding:"18px 0"}}>No tenés registros todavía.</li>}
        </ul>
      </section>
    </Layout>
  )
}
