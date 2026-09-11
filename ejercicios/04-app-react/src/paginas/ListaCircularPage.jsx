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
    texto: 'Sin operaciones todavía. El tail apunta al head, así que no hay final.',
    codigo: null,
  });

  function posicionDelCursor() {
    const buscado = nodoActualRef.current;
    const head = listaRef.current.head;
    if (!buscado || !head) return -1;

    let indice = 0;
    let nodo = head;

    do {
      if (nodo === buscado) return indice;
      nodo = nodo.next;
      indice++;
    } while (nodo !== head);

    return -1;
  }

  function actualizarVista() {
    setVista({
      canciones: listaRef.current.toArray(),
      indiceActual: posicionDelCursor(),
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
        ? 'El cursor estaba en el tail y pasó al head. No interviene ningún condicional: ' +
          'el puntero next del tail ya apunta al primer nodo.'
        : 'Cursor movido al siguiente nodo a través del puntero next. Coste O(1).',
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
        `Nodo "${cancion.titulo}" eliminado y círculo cerrado de nuevo. ` +
        'Si el nodo eliminado era el head, el tail debe pasar a apuntar al head nuevo, ' +
        'o el círculo queda roto.',
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
    setUltimaAccion({
      texto: 'Lista reconstruida con los nodos iniciales.',
      codigo: null,
    });
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
        <h2>Estado de la lista</h2>
        <DiagramaNodos
          items={vista.canciones.map((c) => c.titulo)}
          indiceActual={vista.indiceActual}
          tipo="circular"
        />
        <p className="pie-diagrama">
          Ningún puntero vale <code>null</code>. El del tail apunta al head, y ese
          es el único cambio respecto a la lista simple.
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

        <Explicacion titulo="Última operación" codigo={ultimaAccion.codigo}>
          <p>{ultimaAccion.texto}</p>
        </Explicacion>
      </div>

      <section className="nota">
        <p>
          El código que avanza es idéntico al de la lista simple:{' '}
          <code>nodoActual = nodoActual.next</code>. La diferencia está en cómo
          se conectaron los nodos, no en el reproductor. La estructura de datos
          aporta el comportamiento y evita escribir el condicional que detecta el
          final.
        </p>
      </section>
    </div>
  );
}
