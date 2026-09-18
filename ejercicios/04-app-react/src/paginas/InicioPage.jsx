import { Link } from 'react-router-dom';

export default function InicioPage() {
  return (
    <div className="pagina">
      <header className="pagina-cabecera">
        <h1>Listas enlazadas, en vivo</h1>
        <p className="pagina-subtitulo">
          Estructuras de Datos II, Universidad Autónoma de Occidente
        </p>
      </header>

      <section className="nota">
        <p>
          Cada página usa una estructura de datos distinta, implementada a mano y
          sin librerías. Los botones operan sobre los punteros reales, y el
          diagrama refleja el estado de la lista después de cada operación.
        </p>
      </section>

      <section>
        <h2>Retos de estructuras de datos</h2>
        <div className="tarjetas">
          <Link to="/lista-simple" className="tarjeta">
            <span className="tarjeta-numero">01</span>
            <h3>Lista enlazada simple</h3>
            <p>
              Un reproductor que pasa canciones en orden. Cada nodo solo sabe
              cuál viene después.
            </p>          </Link>

          <Link to="/lista-doble" className="tarjeta">
            <span className="tarjeta-numero">02</span>
            <h3>Lista doblemente enlazada</h3>
            <p>
              El historial de un navegador. Los botones atrás y adelante son los
              punteros del nodo.
            </p>          </Link>

          <Link to="/lista-circular" className="tarjeta">
            <span className="tarjeta-numero">03</span>
            <h3>Lista circular</h3>
            <p>
              Una playlist en modo repetir. El último nodo apunta al primero y la
              música no se acaba.
            </p>          </Link>
          <Link to="/pila-libros" className="tarjeta"><span className="tarjeta-numero">04</span><h3>Pila de libros</h3><p>Apilar y retirar libros con LIFO.</p></Link>
          <Link to="/cola-cajero" className="tarjeta"><span className="tarjeta-numero">05</span><h3>Cola del cajero</h3><p>Atender personas con FIFO.</p></Link>
          <Link to="/arbol-binario" className="tarjeta"><span className="tarjeta-numero">08</span><h3>Árbol binario</h3><p>Insertar, buscar y comparar recorridos.</p></Link>
          <Link to="/arbol-menus" className="tarjeta"><span className="tarjeta-numero">09</span><h3>Menú N-ario</h3><p>Renderizar menús y submenús.</p></Link>
        </div>
      </section>

      <section className="nota">
        <p>
          Universidad Autónoma de Occidente · Estructuras de Datos II · Reto 03
        </p>
      </section>
    </div>
  );
}
