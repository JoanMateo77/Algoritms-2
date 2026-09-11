import { useRef, useState } from 'react';
import DoublyLinkedList from '../estructuras/DoublyLinkedList';
import { PAGINAS } from '../datos/paginas';
import DiagramaNodos from '../componentes/DiagramaNodos';
import Explicacion from '../componentes/Explicacion';

export default function ListaDoblePage() {
  const historialRef = useRef(null);
  if (historialRef.current === null) {
    historialRef.current = new DoublyLinkedList();
  }

  const nodoActualRef = useRef(null);

  const [vista, setVista] = useState({
    paginas: [],
    indiceActual: -1,
    puedeAtras: false,
    puedeAdelante: false,
  });

  const [ultimaAccion, setUltimaAccion] = useState({
    texto: 'El historial está vacío. Visita una página para empezar.',
    codigo: null,
  });

  function actualizarVista() {
    const paginas = historialRef.current.toArray();
    const nodo = nodoActualRef.current;
    const actual = nodo ? nodo.value : null;

    setVista({
      paginas,
      indiceActual: actual ? paginas.indexOf(actual) : -1,
      puedeAtras: Boolean(nodo && nodo.prev),
      puedeAdelante: Boolean(nodo && nodo.next),
    });
  }

  function visitar(pagina) {
    const historial = historialRef.current;
    const nodo = nodoActualRef.current;
    let seBorroElFuturo = 0;

    if (nodo && nodo !== historial.tail) {
      seBorroElFuturo = historial.removeAfter(nodo);
    }

    nodoActualRef.current = historial.append(pagina);
    actualizarVista();

    setUltimaAccion({
      texto: seBorroElFuturo
        ? `Visitaste una página nueva estando en el pasado, así que el historial ` +
          `borró ${seBorroElFuturo} página(s) que tenías hacia adelante. ` +
          `Por eso el botón → se apagó. Tu navegador hace exactamente esto.`
        : 'La página nueva se agregó al final del historial y quedaste parado en ella.',
      codigo: seBorroElFuturo
        ? 'historial.removeAfter(nodoActual);\nnodoActual = historial.append(pagina);'
        : 'nodoActual = historial.append(pagina);',
    });
  }

  function atras() {
    if (!nodoActualRef.current || !nodoActualRef.current.prev) return;

    nodoActualRef.current = nodoActualRef.current.prev;
    actualizarVista();

    setUltimaAccion({
      texto:
        'Retrocedimos siguiendo el puntero prev. Costó una sola operación, ' +
        'sin recorrer nada. Esto es lo que la lista simple no puede hacer.',
      codigo: 'nodoActual = nodoActual.prev;',
    });
  }

  function adelante() {
    if (!nodoActualRef.current || !nodoActualRef.current.next) return;

    nodoActualRef.current = nodoActualRef.current.next;
    actualizarVista();

    setUltimaAccion({
      texto: 'Avanzamos siguiendo el puntero next, igual que en la lista simple.',
      codigo: 'nodoActual = nodoActual.next;',
    });
  }

  function limpiar() {
    historialRef.current = new DoublyLinkedList();
    nodoActualRef.current = null;
    actualizarVista();
    setUltimaAccion({ texto: 'Historial borrado.', codigo: null });
  }

  const paginaActual =
    vista.indiceActual >= 0 ? vista.paginas[vista.indiceActual] : null;

  return (
    <div className="pagina">
      <header className="pagina-cabecera">
        <h1>Lista doblemente enlazada</h1>
        <p className="pagina-subtitulo">
          El historial de un navegador. Los botones atrás y adelante son
          literalmente los punteros <code>prev</code> y <code>next</code> del nodo.
        </p>
      </header>

      <section className="navegador">
        <div className="barra-navegador">
          <button onClick={atras} disabled={!vista.puedeAtras} title="Atrás">
            ←
          </button>
          <button onClick={adelante} disabled={!vista.puedeAdelante} title="Adelante">
            →
          </button>
          <div className="barra-url">
            {paginaActual ? paginaActual.url : 'about:blank'}
          </div>
          <button onClick={limpiar} className="boton-secundario">
            Limpiar
          </button>
        </div>

        <div className="ventana-navegador">
          {paginaActual ? (
            <>
              <strong className="ventana-titulo">{paginaActual.titulo}</strong>
              <span className="ventana-url">{paginaActual.url}</span>
            </>
          ) : (
            <span className="pantalla-vacia">
              Ninguna página abierta. Haz clic en un enlace de abajo.
            </span>
          )}
        </div>
      </section>

      <section>
        <h2>Enlaces para visitar</h2>
        <div className="enlaces">
          {PAGINAS.map((pagina) => (
            <button key={pagina.url} onClick={() => visitar(pagina)} className="enlace">
              {pagina.titulo}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2>Así se ve el historial por dentro</h2>
        <DiagramaNodos
          items={vista.paginas.map((p) => p.titulo)}
          indiceActual={vista.indiceActual}
          tipo="doble"
        />
        <p className="pie-diagrama">
          Las flechas van en los dos sentidos. Por eso se puede caminar hacia
          adelante y hacia atrás con el mismo costo.
        </p>
      </section>

      <div className="dos-columnas">
        <section>
          <h2>Historial ({vista.paginas.length} páginas)</h2>
          {vista.paginas.length === 0 ? (
            <p className="vacio">Todavía no has visitado nada.</p>
          ) : (
            <ol className="lista-canciones">
              {vista.paginas.map((pagina, indice) => (
                <li
                  key={`${pagina.url}-${indice}`}
                  className={indice === vista.indiceActual ? 'fila-actual' : ''}
                >
                  <span className="fila-titulo">{pagina.titulo}</span>
                  <span className="fila-artista">{pagina.url}</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        <Explicacion titulo="Qué acaba de pasar" codigo={ultimaAccion.codigo}>
          <p>{ultimaAccion.texto}</p>
        </Explicacion>
      </div>

      <section className="nota">
        <h2>Prueba esto</h2>
        <ol>
          <li>Visita cuatro páginas seguidas.</li>
          <li>Presiona atrás dos veces.</li>
          <li>Visita una página nueva desde ahí.</li>
          <li>El historial se acorta y el botón de adelante se apaga.</li>
        </ol>
      </section>
    </div>
  );
}
