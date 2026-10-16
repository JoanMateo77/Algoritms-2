import { useRef, useState } from 'react';
import MotorBusqueda from '../../../11-busqueda-productos/MotorBusqueda.js';
import productos from '../../../11-busqueda-productos/productos.js';

export default function BusquedaProductosPage() {
  const motor = useRef(null);
  if (!motor.current) motor.current = new MotorBusqueda(productos);
  const [prefijo, setPrefijo] = useState('air');
  const [k, setK] = useState(2);
  const [, setVersion] = useState(0);
  const [mensaje, setMensaje] = useState('');

  const coincidencias = motor.current.trie.startsWith(prefijo.trim().toLowerCase()).length;
  const top = motor.current.searchTopK(prefijo, k);

  function agregar(evento) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    const datos = new FormData(formulario);
    try {
      const producto = motor.current.insert(datos.get('nombre'), Number(datos.get('popularidad')));
      setMensaje(`Guardaste "${producto.name}" con popularidad ${producto.popularity}.`);
      setVersion((anterior) => anterior + 1);
      formulario.reset();
    } catch (error) {
      setMensaje(error.message);
    }
  }

  return (
    <div className="pagina">
      <header className="pagina-cabecera">
        <h1>Reto 11 · Buscador con Trie y Heap</h1>
        <p className="pagina-subtitulo">
          El Trie encuentra los productos que empiezan por el prefijo y un heap de
          tamaño K se queda con los más populares.
        </p>
      </header>

      <section className="dos-columnas">
        <div>
          <h2>Buscar</h2>
          <form className="formulario" onSubmit={(evento) => evento.preventDefault()}>
            <label>
              Prefijo
              <input
                value={prefijo}
                onChange={(evento) => setPrefijo(evento.target.value)}
                placeholder="air"
              />
            </label>
            <label>
              Top K
              <select value={k} onChange={(evento) => setK(Number(evento.target.value))}>
                {[1, 2, 3, 5, 10].map((opcion) => <option key={opcion}>{opcion}</option>)}
              </select>
            </label>
          </form>

          <h2>searchTopK("{prefijo}", {k})</h2>
          <p>{coincidencias} productos empiezan por "{prefijo}".</p>
          <ol className="lista-datos">
            {top.map((producto) => (
              <li key={producto.name}>
                <strong>{producto.name}</strong>
                <small>popularidad {producto.popularity}</small>
              </li>
            ))}
          </ol>
          {!top.length && <p>Ningún producto empieza por "{prefijo}".</p>}
        </div>

        <div>
          <h2>Nuevo producto</h2>
          <form className="formulario" onSubmit={agregar}>
            <label>Nombre<input name="nombre" required /></label>
            <label>Popularidad<input name="popularidad" type="number" min="0" step="1" required /></label>
            <button>Guardar en el trie</button>
          </form>
          <p role="status">{mensaje}</p>
        </div>
      </section>
    </div>
  );
}
