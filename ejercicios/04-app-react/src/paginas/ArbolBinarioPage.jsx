import { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';
import modulo from '../../../08-arbol-binario/ArbolBinario.js';

const { ArbolBinario } = modulo;

export default function ArbolBinarioPage() {
  const arbol = useRef(null);
  if (!arbol.current) arbol.current = new ArbolBinario([8, 3, 10, 1, 6, 14, 4, 7, 13]);
  const [version, setVersion] = useState(0);
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState('');
  const datos = arbol.current.paraD3();
  useEffect(() => {
    console.log('Inorden:', arbol.current.inorden());
    console.log('Postorden:', arbol.current.postorden());
    console.log('Preorden:', arbol.current.preorden());
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
    setResultado(arbol.current.contiene(Number(busqueda)) ? 'El valor está en el árbol.' : 'El valor no está en el árbol.');
  }

  return <div className="pagina">
    <header className="pagina-cabecera"><h1>Reto 08 · Árbol binario</h1>
      <p className="pagina-subtitulo">Cada nodo tiene como máximo dos hijos. Los menores van a la izquierda y los mayores a la derecha.</p></header>
    <section className="dos-columnas">
      <form className="formulario" onSubmit={insertar}><h2>Insertar número</h2>
        <input name="valor" type="number" required /><button>Insertar</button></form>
      <form className="formulario" onSubmit={buscar}><h2>Buscar número</h2>
        <input type="number" value={busqueda} onChange={(evento) => setBusqueda(evento.target.value)} required />
        <button>Buscar</button><p role="status">{resultado}</p></form>
    </section>
    <section><h2>Árbol visual con react-d3-tree</h2>
      <div className="lienzo-arbol">{datos && <Tree key={version} data={datos} orientation="vertical" translate={{ x: 350, y: 60 }} pathFunc="elbow" />}</div>
    </section>
    <section><h2>Recorridos</h2>
      <p><strong>Inorden (L-N-R):</strong> {arbol.current.inorden().join(', ')}</p>
      <p><strong>Postorden (L-R-N):</strong> {arbol.current.postorden().join(', ')}</p>
      <p><strong>Preorden (N-L-R):</strong> {arbol.current.preorden().join(', ')}</p>
      <p>Abre la consola del navegador para observar los recorridos después de cada cambio.</p>
    </section>
  </div>;
}
