import { useRef, useState } from 'react';
import ColaCajero from '../../../05-cola-cajero/ColaCajero.js';
import personas from '../../../05-cola-cajero/personas.js';

export default function ColaCajeroPage() {
  const cola = useRef(null);
  if (!cola.current) cola.current = new ColaCajero(personas);
  const [vista, setVista] = useState(() => cola.current.toArray());
  const [mensaje, setMensaje] = useState('La primera persona de la lista será atendida primero.');

  function agregar(evento) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    try {
      const persona = cola.current.enqueue(Object.fromEntries(new FormData(formulario)));
      setVista(cola.current.toArray());
      setMensaje(`${persona.nombre} se agregó al final de la cola.`);
      formulario.reset();
    } catch (error) {
      setMensaje(error.message);
    }
  }

  function atender() {
    const persona = cola.current.dequeue();
    setVista(cola.current.toArray());
    setMensaje(persona ? `Se atendió a ${persona.nombre}, la primera persona en llegar.` : 'La cola está vacía.');
  }

  return <div className="pagina">
    <header className="pagina-cabecera"><h1>Reto 05 · Cola del cajero</h1>
      <p className="pagina-subtitulo">Primero en entrar, primero en salir (FIFO). La fecha se asigna al agregar.</p></header>
    <section className="dos-columnas">
      <div><h2>Nueva persona</h2><form className="formulario" onSubmit={agregar}>
        <label>Nombre<input name="nombre" required /></label>
        <label>Monto de retiro<input name="monto" type="number" min="1" step="1" required /></label>
        <button>Agregar a la cola</button>
      </form></div>
      <div><h2>En espera ({vista.length})</h2><p>{mensaje}</p>
        <button onClick={atender} disabled={!vista.length}>Atender primera persona</button>
        <ol className="lista-datos">{vista.map((persona, indice) => <li key={`${persona.llegada}-${indice}`}>
          <strong>{persona.nombre}</strong><span>Retiro: {persona.monto.toLocaleString('es-CO')}</span>
          <small>Llegada: {new Date(persona.llegada).toLocaleString('es-CO')}{indice === 0 ? ' · Siguiente' : ''}</small>
        </li>)}</ol></div>
    </section>
  </div>;
}
