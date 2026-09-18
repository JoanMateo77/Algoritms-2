import { useMemo, useState } from 'react';
import crearMenus from '../../../09-arbol-nario/menus.js';

const contenidos = {
  Inicio: 'Bienvenido al menú de estudio.',
  Estudiar: 'Elige un tema para leer primero.',
  PilasColas: 'Las pilas siguen LIFO y las colas siguen FIFO.',
  Arboles: 'Los árboles conectan nodos desde una raíz.',
  Practicar: 'Escribe los algoritmos sin mirar la solución.',
  Recorridos: 'Compara DFS con BFS en el ejemplo.',
};

function Rama({ nodo, seleccionar, activo }) {
  return <li><button className={activo === nodo.enlace ? 'seleccionado' : 'boton-secundario'}
      onClick={() => seleccionar(nodo.enlace)}>{nodo.titulo}</button>
    {nodo.hijos.length > 0 && <ul>{nodo.hijos.map((hijo) =>
      <Rama key={hijo.enlace} nodo={hijo} seleccionar={seleccionar} activo={activo} />)}</ul>}
  </li>;
}

export default function ArbolMenusPage() {
  const arbol = useMemo(() => crearMenus(), []);
  const [activo, setActivo] = useState('/');
  const nodo = arbol.buscar(activo);
  const Componente = () => <p>{contenidos[nodo.componente]}</p>;
  return <div className="pagina">
    <header className="pagina-cabecera"><h1>Reto 09 · Menú N-ario</h1>
      <p className="pagina-subtitulo">Un nodo puede tener varios hijos. La barra lateral se construye recorriendo el árbol.</p></header>
    <section className="dos-columnas">
      <nav aria-label="Menú de ejemplo" className="menu-arbol"><h2>Menús y submenús</h2>
        <ul><Rama nodo={arbol.raiz} seleccionar={setActivo} activo={activo} /></ul></nav>
      <article><h2>{nodo.titulo}</h2><p>Enlace: <code>{nodo.enlace}</code></p>
        <p>Componente: <code>{nodo.componente}</code></p><Componente /></article>
    </section>
    <section><h2>Recorridos del árbol</h2>
      <p><strong>DFS:</strong> {arbol.dfs().map((item) => item.titulo).join(' → ')}</p>
      <p><strong>BFS:</strong> {arbol.bfs().map((item) => item.titulo).join(' → ')}</p>
    </section>
  </div>;
}
