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
    texto: 'Todavía no has hecho nada. Dale a Play.',
    codigo: null,
  });

  function actualizarVista() {
    const canciones = listaRef.current.toArray();
    const actual = nodoActualRef.current ? nodoActualRef.current.value : null;

    setVista({
      canciones,
      indiceActual: actual ? canciones.indexOf(actual) : -1,
      tamano: listaRef.current.size(),
    });
  }

  function play() {
    nodoActualRef.current = listaRef.current.head;
    actualizarVista();
    setUltimaAccion({
      texto: 'El reproductor se paró en el primer nodo de la lista.',
      codigo: 'nodoActual = lista.head;',
    });
  }

  function siguiente() {
    if (!nodoActualRef.current) {
      setUltimaAccion({
        texto: 'No hay ninguna canción sonando. Primero dale a Play.',
        codigo: null,
      });
      return;
    }

    nodoActualRef.current = nodoActualRef.current.next;
    actualizarVista();

    if (!nodoActualRef.current) {
      setUltimaAccion({
        texto:
          'Se acabó la playlist. El último nodo apuntaba a null, y en una lista simple ' +
          'eso significa el final. No hay forma de devolverse: ningún nodo sabe quién viene antes que él.',
        codigo: 'nodoActual = nodoActual.next;',
      });
    } else {
      setUltimaAccion({
        texto: 'Avanzamos un nodo siguiendo el puntero next. Una sola línea.',
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
        `Quitamos "${cancion.titulo}". El nodo anterior ahora apunta directo al siguiente. ` +
        'Eliminar en una lista enlazada es solo redirigir una flecha.',
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
        'Agregamos al final. Como guardamos tail, no hubo que recorrer nada: ' +
        'cuesta lo mismo con 8 canciones que con un millón.',
      codigo: 'tail.next = nuevoNodo;\ntail = nuevoNodo;',
    });
  }

  function reiniciar() {
    const lista = new LinkedList();
    CANCIONES.forEach((cancion) => lista.append(cancion));
    listaRef.current = lista;
    nodoActualRef.current = null;
    actualizarVista();
    setUltimaAccion({ texto: 'Playlist recargada desde cero.', codigo: null });
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
            <span className="pantalla-vacia">Nada sonando</span>
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
        <h2>Así se ve la lista por dentro</h2>
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

        <Explicacion titulo="Qué acaba de pasar" codigo={ultimaAccion.codigo}>
          <p>{ultimaAccion.texto}</p>
        </Explicacion>
      </div>

      <section className="nota">
        <p>
          No hay botón de canción anterior: en una lista simple cada nodo solo
          guarda la flecha hacia adelante. Para retroceder habría que empezar otra
          vez desde <code>head</code>. Eso lo resuelve la lista doble.
        </p>
      </section>
    </div>
  );
}
