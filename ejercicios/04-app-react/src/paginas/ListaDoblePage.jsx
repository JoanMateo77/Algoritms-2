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
    texto: 'Lista vacía: head y tail valen null.',
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
        ? `Nodo añadido al final. Como el cursor no estaba en el tail, se eliminaron ` +
          `${seBorroElFuturo} nodo(s) posteriores y el botón de adelante quedó ` +
          `deshabilitado. Un navegador real hace exactamente esto.`
        : 'Nodo añadido al final y cursor movido a él. Coste O(1).',
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
        'Cursor movido al nodo anterior a través del puntero prev. Coste O(1), ' +
        'sin recorrido. Una lista simple necesitaría O(n) para lo mismo.',
      codigo: 'nodoActual = nodoActual.prev;',
    });
  }

  function adelante() {
    if (!nodoActualRef.current || !nodoActualRef.current.next) return;

    nodoActualRef.current = nodoActualRef.current.next;
    actualizarVista();

    setUltimaAccion({
      texto: 'Cursor movido al siguiente nodo a través del puntero next. Coste O(1).',
      codigo: 'nodoActual = nodoActual.next;',
    });
  }

  function limpiar() {
    historialRef.current = new DoublyLinkedList();
    nodoActualRef.current = null;
    actualizarVista();
    setUltimaAccion({
      texto: 'Lista vaciada: head y tail vuelven a null.',
      codigo: null,
    });
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
        <h2>Estado de la lista</h2>
        <DiagramaNodos
          items={vista.paginas.map((p) => p.titulo)}
          indiceActual={vista.indiceActual}
          tipo="doble"
        />
        <p className="pie-diagrama">
          Cada par de nodos vecinos está unido por dos punteros, uno en cada
          sentido. Por eso avanzar y retroceder cuestan lo mismo: O(1).
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

        <Explicacion titulo="Última operación" codigo={ultimaAccion.codigo}>
          <p>{ultimaAccion.texto}</p>
        </Explicacion>
      </div>

      <section className="nota">
        <h2>Secuencia que conviene probar</h2>
        <ol>
          <li>Visitar cuatro páginas seguidas.</li>
          <li>Retroceder dos veces.</li>
          <li>Visitar una página nueva desde esa posición.</li>
          <li>
            La lista se acorta y el botón de adelante queda deshabilitado: los
            nodos posteriores al actual se eliminaron.
          </li>
        </ol>
      </section>
    </div>
  );
}
