import { useMemo, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import crearMenus from '../../../09-arbol-nario/menus.js';

const BASE = '/arbol-menus';
const rutaDe = (enlace) => (enlace === '/' ? BASE : BASE + enlace);

function Inicio() {
  return (
    <article data-componente="Inicio">
      <h2>Inicio</h2>
      <p>Bienvenido al menú de estudio. Cada opción de la barra lateral es un nodo del árbol.</p>
    </article>
  );
}

function Estudiar() {
  return (
    <article data-componente="Estudiar">
      <h2>Estudiar</h2>
      <p>Este nodo tiene dos hijos: elige un tema para leer primero.</p>
    </article>
  );
}

function PilasColas() {
  return (
    <article data-componente="PilasColas">
      <h2>Pilas y colas</h2>
      <p>La pila saca primero lo último que entró (LIFO); la cola, lo primero (FIFO).</p>
    </article>
  );
}

function Arboles() {
  return (
    <article data-componente="Arboles">
      <h2>Árboles</h2>
      <p>Un árbol N-ario parte de una raíz y cada nodo puede tener cualquier número de hijos.</p>
    </article>
  );
}

function Practicar() {
  return (
    <article data-componente="Practicar">
      <h2>Practicar</h2>
      <p>Escribe los algoritmos sin mirar la solución y compáralos después.</p>
    </article>
  );
}

function Recorridos() {
  return (
    <article data-componente="Recorridos">
      <h2>Recorridos</h2>
      <p>DFS baja por una rama hasta el fondo antes de pasar a la siguiente; BFS va nivel por nivel.</p>
    </article>
  );
}

const componentes = { Inicio, Estudiar, PilasColas, Arboles, Practicar, Recorridos };

function Rama({ nodo }) {
  const [abierto, setAbierto] = useState(true);
  const tieneHijos = nodo.hijos.length > 0;

  return (
    <li>
      <div className="menu-arbol-fila">
        <NavLink to={rutaDe(nodo.enlace)} end>{nodo.titulo}</NavLink>
        {tieneHijos && (
          <button
            type="button"
            className="boton-secundario"
            aria-expanded={abierto}
            aria-label={`${abierto ? 'Cerrar' : 'Abrir'} ${nodo.titulo}`}
            onClick={() => setAbierto(!abierto)}
          >
            {abierto ? '▴' : '▾'}
          </button>
        )}
      </div>
      {tieneHijos && abierto && (
        <ul>
          {nodo.hijos.map((hijo) => <Rama key={hijo.enlace} nodo={hijo} />)}
        </ul>
      )}
    </li>
  );
}

export default function ArbolMenusPage() {
  const arbol = useMemo(() => crearMenus(), []);

  return (
    <div className="pagina">
      <header className="pagina-cabecera">
        <h1>Reto 09 · Menú N-ario</h1>
        <p className="pagina-subtitulo">
          La barra lateral se dibuja recorriendo el árbol. Cada menú tiene título, enlace y componente.
        </p>
      </header>

      <section className="dos-columnas">
        <nav aria-label="Menú de ejemplo" className="menu-arbol">
          <ul>
            <Rama nodo={arbol.raiz} />
          </ul>
        </nav>

        <Routes>
          {arbol.dfs().map((nodo) => {
            const Componente = componentes[nodo.componente];
            return nodo.enlace === '/'
              ? <Route key={nodo.enlace} index element={<Componente />} />
              : <Route key={nodo.enlace} path={nodo.enlace.slice(1)} element={<Componente />} />;
          })}
          <Route path="*" element={<p>Ese menú no existe.</p>} />
        </Routes>
      </section>

      <section>
        <h2>Recorridos del árbol</h2>
        <p><strong>DFS:</strong> {arbol.dfs().map((nodo) => nodo.titulo).join(' → ')}</p>
        <p><strong>BFS:</strong> {arbol.bfs().map((nodo) => nodo.titulo).join(' → ')}</p>
      </section>
    </div>
  );
}
