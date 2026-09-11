import { useRef, useState } from 'react';
import CircularLinkedList from '../estructuras/CircularLinkedList';
import { CANCIONES } from '../datos/canciones';
import DiagramaNodos from '../componentes/DiagramaNodos';
import Explicacion from '../componentes/Explicacion';

export default function ListaCircularPage() {
  const listaRef = useRef(null);
  if (listaRef.current === null) {
    const lista = new CircularLinkedList();
    CANCIONES.slice(0, 5).forEach((cancion) => lista.append(cancion));
    listaRef.current = lista;
  }

  const nodoActualRef = useRef(listaRef.current.head);

  const [vista, setVista] = useState(() => ({
    canciones: listaRef.current.toArray(),
    indiceActual: 0,
  }));

  const [reproducidas, setReproducidas] = useState(0);
  const [ultimaAccion, setUltimaAccion] = useState({
    texto: 'Dale a siguiente varias veces y mira qué pasa al llegar al final.',
    codigo: null,
  });

  function actualizarVista() {
    const canciones = listaRef.current.toArray();
    const actual = nodoActualRef.current ? nodoActualRef.current.value : null;

    setVista({
      canciones,
      indiceActual: actual ? canciones.indexOf(actual) : -1,
    });
  }

  function siguiente() {
    if (!nodoActualRef.current) return;

    const eraElUltimo = nodoActualRef.current === listaRef.current.tail;
    nodoActualRef.current = nodoActualRef.current.next;
    setReproducidas((n) => n + 1);
    actualizarVista();

    setUltimaAccion({
      texto: eraElUltimo
        ? 'Estabas en la última canción y volvió la primera. No hubo ningún if. ' +
          'El nodo final apunta al primero, así que next simplemente cerró el círculo.'
        : 'Avanzamos un nodo. Exactamente la misma línea que en la lista simple.',
      codigo: 'nodoActual = nodoActual.next;',
    });
  }

  function quitarActual() {
    if (!nodoActualRef.current || listaRef.current.size() <= 1) return;

    const cancion = nodoActualRef.current.value;
    nodoActualRef.current = nodoActualRef.current.next;
    listaRef.current.remove(cancion);
    actualizarVista();

    setUltimaAccion({
      texto:
        `Quitamos "${cancion.titulo}" y el círculo se volvió a cerrar. ` +
        'Ese es el paso que más se olvida al programar listas circulares: ' +
        'si el eliminado era el head, el tail tiene que apuntar al head nuevo.',
      codigo: 'tail.next = head;',
    });
  }

  function reiniciar() {
    const lista = new CircularLinkedList();
    CANCIONES.slice(0, 5).forEach((cancion) => lista.append(cancion));
    listaRef.current = lista;
    nodoActualRef.current = lista.head;
    setReproducidas(0);
    actualizarVista();
    setUltimaAccion({ texto: 'Playlist recargada.', codigo: null });
  }

  const cancionActual =
    vista.indiceActual >= 0 ? vista.canciones[vista.indiceActual] : null;
  const vueltas =
    vista.canciones.length > 0 ? Math.floor(reproducidas / vista.canciones.length) : 0;

  return (
    <div className="pagina">
      <header className="pagina-cabecera">
        <h1>Lista circular</h1>
        <p className="pagina-subtitulo">
          Una playlist en modo repetir. El último nodo apunta al primero, así que
          la música nunca se acaba.
        </p>
      </header>

      <section className="reproductor">
        <div className="pantalla">
          {cancionActual && (
            <>
              <span className="pantalla-etiqueta">Sonando en bucle</span>
              <strong className="pantalla-titulo">{cancionActual.titulo}</strong>
              <span className="pantalla-artista">{cancionActual.artista}</span>
            </>
          )}
        </div>

        <div className="botones">
          <button onClick={siguiente}>⏭ Siguiente</button>
          <button onClick={quitarActual} disabled={vista.canciones.length <= 1}>
            ✕ Quitar esta
          </button>
          <button onClick={reiniciar} className="boton-secundario">
            ↺ Reiniciar
          </button>
        </div>

        <div className="contadores">
          <span>
            Canciones reproducidas: <strong>{reproducidas}</strong>
          </span>
          <span>
            En la playlist: <strong>{vista.canciones.length}</strong>
          </span>
          <span>
            Vueltas completas: <strong>{vueltas}</strong>
          </span>
        </div>
      </section>

      <section>
        <h2>Así se ve la lista por dentro</h2>
        <DiagramaNodos
          items={vista.canciones.map((c) => c.titulo)}
          indiceActual={vista.indiceActual}
          tipo="circular"
        />
        <p className="pie-diagrama">
          No hay <code>null</code> en ninguna parte. Ese es el detalle que lo
          cambia todo.
        </p>
      </section>

      <div className="dos-columnas">
        <section>
          <h2>La playlist</h2>
          <ol className="lista-canciones">
            {vista.canciones.map((cancion, indice) => (
              <li
                key={`${cancion.titulo}-${indice}`}
                className={indice === vista.indiceActual ? 'fila-actual' : ''}
              >
                <span className="fila-titulo">{cancion.titulo}</span>
                <span className="fila-artista">{cancion.artista}</span>
              </li>
            ))}
          </ol>
        </section>

        <Explicacion titulo="Qué acaba de pasar" codigo={ultimaAccion.codigo}>
          <p>{ultimaAccion.texto}</p>
        </Explicacion>
      </div>

      <section className="nota">
        <p>
          El código que avanza es idéntico al de la lista simple:{' '}
          <code>nodoActual = nodoActual.next</code>. Lo que cambia es cómo están
          conectados los nodos, no el reproductor.
        </p>
      </section>
    </div>
  );
}
