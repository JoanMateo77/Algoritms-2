import { useRef, useState } from 'react';
import PilaLibros from '../../../04-pila-libros/PilaLibros.js';
import libros from '../../../04-pila-libros/libros.js';

export default function PilaLibrosPage() {
  const pila = useRef(null);
  if (!pila.current) pila.current = new PilaLibros(libros);
  const [vista, setVista] = useState(() => pila.current.toArray());
  const [mensaje, setMensaje] = useState('El libro del extremo derecho es el primero que sale.');

  function agregar(evento) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    try {
      const libro = pila.current.push(Object.fromEntries(new FormData(formulario)));
      setVista(pila.current.toArray());
      setMensaje(`Agregaste ${libro.nombre} sobre la pila.`);
      formulario.reset();
    } catch (error) {
      setMensaje(error.message);
    }
  }

  function retirar() {
    const libro = pila.current.pop();
    setVista(pila.current.toArray());
    setMensaje(libro ? `Retiraste ${libro.nombre}: era el último que había entrado.` : 'La pila está vacía.');
  }

  return <div className="pagina">
    <header className="pagina-cabecera"><h1>Reto 04 · Pila de libros</h1>
      <p className="pagina-subtitulo">Último en entrar, primero en salir (LIFO).</p></header>
    <section className="dos-columnas">
      <div><h2>Agregar libro</h2><form className="formulario" onSubmit={agregar}>
        <label>Nombre<input name="nombre" required /></label>
        <label>ISBN<input name="isbn" required /></label>
        <label>Autor<input name="autor" required /></label>
        <label>Editorial<input name="editorial" required /></label>
        <button>Apilar libro</button>
      </form></div>
      <div><h2>Pila ({vista.length})</h2><p>{mensaje}</p>
        <button onClick={retirar} disabled={!vista.length}>Retirar superior</button>
        <ol className="lista-datos">{[...vista].reverse().map((libro, indice) => <li key={`${libro.isbn}-${indice}`}>
          <strong>{libro.nombre}</strong><span>{libro.autor} · {libro.editorial}</span><small>ISBN {libro.isbn}{indice === 0 ? ' · Superior' : ''}</small>
        </li>)}</ol></div>
    </section>
  </div>;
}
