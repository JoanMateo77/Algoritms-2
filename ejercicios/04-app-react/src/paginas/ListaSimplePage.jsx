import { useRef, useState } from 'react';
import LinkedList from '../estructuras/LinkedList';
import { CANCIONES } from '../datos/canciones';
import DiagramaNodos from '../componentes/DiagramaNodos';
import Explicacion from '../componentes/Explicacion';

export default function ListaSimplePage() {
  const listaRef = useRef(null);
  if (listaRef.current === null) {
    const lista = new LinkedList();
    CANCIONES.forEach((cancion) => lista.append(cancion));
    listaRef.current = lista;
  }

  const nodoActualRef = useRef(null);

  const [vista, setVista] = useState(() => ({
    canciones: listaRef.current.toArray(),
    indiceActual: -1,
    tamano: listaRef.current.size(),
  }));

  const [ultimaAccion, setUltimaAccion] = useState({
    texto: 'Sin operaciones todavía. El cursor no está colocado en ningún nodo.',
    codigo: null,
  });

  function posicionDelCursor() {
    const buscado = nodoActualRef.current;
    if (!buscado) return -1;

    let indice = 0;
    let nodo = listaRef.current.head;

    while (nodo) {
      if (nodo === buscado) return indice;
      nodo = nodo.next;
      indice++;
    }

    return -1;
  }

  function actualizarVista() {
    setVista({
      canciones: listaRef.current.toArray(),
      indiceActual: posicionDelCursor(),
      tamano: listaRef.current.size(),
    });
  }

  function play() {
    nodoActualRef.current = listaRef.current.head;
    actualizarVista();
    setUltimaAccion({
      texto: 'Cursor colocado en el head, el primer nodo de la lista. Coste O(1).',
      codigo: 'nodoActual = lista.head;',
    });
  }

  function siguiente() {
    if (!nodoActualRef.current) {
      setUltimaAccion({
        texto: 'No hay nodo actual: el cursor está en null y no hay desde dónde avanzar.',
        codigo: null,
      });
      return;
    }

    nodoActualRef.current = nodoActualRef.current.next;
    actualizarVista();

    if (!nodoActualRef.current) {
      setUltimaAccion({
        texto:
          'Fin de la lista: el último nodo tiene next en null y el cursor quedó en null. ' +
          'En una lista simple no existe forma de retroceder, porque ningún nodo guarda quién lo apunta.',
        codigo: 'nodoActual = nodoActual.next;',
      });
    } else {
      setUltimaAccion({
        texto: 'Cursor movido al siguiente nodo a través del puntero next. Coste O(1).',
        codigo: 'nodoActual = nodoActual.next;',
      });
    }
  }

  function quitarActual() {
    if (!nodoActualRef.current) return;

    const cancion = nodoActualRef.current.value;
    nodoActualRef.current = nodoActualRef.current.next;
    listaRef.current.remove(cancion);
    actualizarVista();

    setUltimaAccion({
      texto:
        `Nodo "${cancion.titulo}" eliminado. El nodo anterior pasa a apuntar directamente ` +
        'al siguiente. Localizarlo cuesta O(n); reconectar la flecha, O(1).',
      codigo: 'anterior.next = anterior.next.next;',
    });
  }

  function agregarCancion() {
    const nueva = {
      titulo: `Canción ${vista.tamano + 1}`,
      artista: 'Artista nuevo',
      duracion: '3:30',
    };

    listaRef.current.append(nueva);
    actualizarVista();

    setUltimaAccion({
      texto:
        'Nodo añadido al final. Como la lista guarda tail, no hubo recorrido: ' +
        'el coste es O(1) con 8 nodos o con un millón.',
      codigo: 'tail.next = nuevoNodo;\ntail = nuevoNodo;',
    });
  }

  function reiniciar() {
    const lista = new LinkedList();
    CANCIONES.forEach((cancion) => lista.append(cancion));
    listaRef.current = lista;
    nodoActualRef.current = null;
    actualizarVista();
    setUltimaAccion({
      texto: 'Lista reconstruida con los nodos iniciales. El cursor vuelve a null.',
      codigo: null,
    });
  }

  const cancionActual =
    vista.indiceActual >= 0 ? vista.canciones[vista.indiceActual] : null;

  return (
    <div className="pagina">
      <header className="pagina-cabecera">
        <h1>Lista enlazada simple</h1>
        <p className="pagina-subtitulo">
          Un reproductor que pasa canciones en orden. Cada canción es un nodo, y el
          puntero <code>next</code> es lo único que dice cuál sigue.
        </p>
      </header>

      <section className="reproductor">
        <div className="pantalla">
          {cancionActual ? (
            <>
              <span className="pantalla-etiqueta">Sonando ahora</span>
              <strong className="pantalla-titulo">{cancionActual.titulo}</strong>
              <span className="pantalla-artista">{cancionActual.artista}</span>
            </>
          ) : (
            <span className="pantalla-vacia">Sin reproducción</span>
          )}
        </div>

        <div className="botones">
          <button onClick={play}>▶ Play</button>
          <button onClick={siguiente}>⏭ Siguiente</button>
          <button onClick={quitarActual} disabled={!cancionActual}>
            ✕ Quitar esta
          </button>
          <button onClick={agregarCancion}>+ Agregar al final</button>
          <button onClick={reiniciar} className="boton-secundario">
            ↺ Reiniciar
          </button>
        </div>
      </section>

      <section>
        <h2>Estado de la lista</h2>
        <DiagramaNodos
          items={vista.canciones.map((c) => c.titulo)}
          indiceActual={vista.indiceActual}
          tipo="simple"
        />
      </section>

      <div className="dos-columnas">
        <section>
          <h2>La playlist ({vista.tamano} canciones)</h2>
          <ol className="lista-canciones">
            {vista.canciones.map((cancion, indice) => (
              <li
                key={`${cancion.titulo}-${indice}`}
                className={indice === vista.indiceActual ? 'fila-actual' : ''}
              >
                <span className="fila-titulo">{cancion.titulo}</span>
                <span className="fila-artista">{cancion.artista}</span>
                <span className="fila-duracion">{cancion.duracion}</span>
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
          Esta página no tiene botón de canción anterior. En una lista simple cada
          nodo guarda un único puntero, el que va hacia adelante, así que
          retroceder obliga a recorrer de nuevo desde <code>head</code>: O(n) por
          cada paso atrás. La lista doblemente enlazada resuelve esa limitación.
        </p>
      </section>
    </div>
  );
}
