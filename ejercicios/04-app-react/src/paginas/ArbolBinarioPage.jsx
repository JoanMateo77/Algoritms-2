import { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';
import modulo from '../../../08-arbol-binario/ArbolBinario.js';

const { ArbolBinario } = modulo;
const VALORES_INICIALES = [8, 3, 10, 1, 6, 14, 4, 7, 13];

export default function ArbolBinarioPage() {
  const arbol = useRef(null);
  if (!arbol.current) arbol.current = new ArbolBinario(VALORES_INICIALES);
  const [version, setVersion] = useState(0);
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState('');

  const datos = arbol.current.paraD3();
  const recorridos = {
    inorden: arbol.current.inorden(),
    postorden: arbol.current.postorden(),
    preorden: arbol.current.preorden(),
  };

  useEffect(() => {
    console.log('Inorden:', recorridos.inorden.join(', '));
    console.log('Postorden:', recorridos.postorden.join(', '));
    console.log('Preorden:', recorridos.preorden.join(', '));
  }, [version]);

  function insertar(evento) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    try {
      const agregado = arbol.current.insertar(Number(new FormData(formulario).get('valor')));
      setResultado(agregado ? 'Valor insertado.' : 'Ese valor ya existe.');
      setVersion((anterior) => anterior + 1);
      formulario.reset();
    } catch (error) {
      setResultado(error.message);
    }
  }

  function buscar(evento) {
    evento.preventDefault();
    const esta = arbol.current.contiene(Number(busqueda));
    setResultado(esta ? `El ${busqueda} está en el árbol.` : `El ${busqueda} no está en el árbol.`);
  }

  return (
    <div className="pagina">
      <header className="pagina-cabecera">
        <h1>Reto 08 · Árbol binario</h1>
        <p className="pagina-subtitulo">
          Cada nodo tiene como máximo dos hijos. Los menores van a la izquierda y los mayores a la derecha.
        </p>
      </header>

      <section className="dos-columnas">
        <form className="formulario" onSubmit={insertar}>
          <h2>Insertar número</h2>
          <input name="valor" type="number" required />
          <button>Insertar</button>
        </form>

        <form className="formulario" onSubmit={buscar}>
          <h2>Buscar número</h2>
          <input
            type="number"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            required
          />
          <button>Buscar</button>
          <p role="status">{resultado}</p>
        </form>
      </section>

      <section>
        <h2>Árbol visual con react-d3-tree</h2>
        <div className="lienzo-arbol">
          {datos && (
            <Tree
              key={version}
              data={datos}
              orientation="vertical"
              translate={{ x: 350, y: 60 }}
              pathFunc="elbow"
            />
          )}
        </div>
      </section>

      <section>
        <h2>Recorridos</h2>
        <p><strong>Inorden (L-N-R):</strong> {recorridos.inorden.join(', ')}</p>
        <p><strong>Postorden (L-R-N):</strong> {recorridos.postorden.join(', ')}</p>
        <p><strong>Preorden (N-L-R):</strong> {recorridos.preorden.join(', ')}</p>
        <p>Abre la consola del navegador para ver los recorridos después de cada cambio.</p>
      </section>
    </div>
  );
}
