import { Link } from 'react-router-dom';

const retos = [
  {
    ruta: '/lista-simple',
    numero: '03',
    titulo: 'Lista enlazada simple',
    texto: 'Un reproductor que pasa canciones en orden. Cada nodo solo sabe cuál viene después.',
  },
  {
    ruta: '/lista-doble',
    numero: '03',
    titulo: 'Lista doblemente enlazada',
    texto: 'El historial de un navegador. Los botones atrás y adelante son los punteros del nodo.',
  },
  {
    ruta: '/lista-circular',
    numero: '03',
    titulo: 'Lista circular',
    texto: 'Una playlist en modo repetir. El último nodo apunta al primero y la música no se acaba.',
  },
  {
    ruta: '/pila-libros',
    numero: '04',
    titulo: 'Pila de libros',
    texto: 'Apilar y retirar libros con LIFO.',
  },
  {
    ruta: '/cola-cajero',
    numero: '05',
    titulo: 'Cola del cajero',
    texto: 'Atender personas según su hora de llegada (FIFO).',
  },
  {
    ruta: '/arbol-binario',
    numero: '08',
    titulo: 'Árbol binario',
    texto: 'Insertar, buscar y comparar recorridos.',
  },
  {
    ruta: '/arbol-menus',
    numero: '09',
    titulo: 'Menú N-ario',
    texto: 'Una barra lateral con menús y submenús.',
  },
  {
    ruta: '/grafo-amigos',
    numero: '10',
    titulo: 'Grafo de amigos',
    texto: 'Personas, ciudades y quién vive dónde.',
  },
  {
    ruta: '/busqueda-productos',
    numero: '11',
    titulo: 'Buscador de productos',
    texto: 'Búsqueda por prefijo con un Trie y los más populares con un Heap.',
  },
];

export default function InicioPage() {
  return (
    <div className="pagina">
      <header className="pagina-cabecera">
        <h1>Estructuras de datos, en vivo</h1>
        <p className="pagina-subtitulo">
          Estructuras de Datos II, Universidad Autónoma de Occidente
        </p>
      </header>

      <section className="nota">
        <p>
          Cada página usa una estructura de datos implementada a mano en la carpeta de su
          reto. Los botones y formularios operan sobre esa estructura y la pantalla muestra
          su estado después de cada operación.
        </p>
      </section>

      <section>
        <h2>Retos</h2>
        <div className="tarjetas">
          {retos.map((reto) => (
            <Link key={reto.ruta} to={reto.ruta} className="tarjeta">
              <span className="tarjeta-numero">{reto.numero}</span>
              <h3>{reto.titulo}</h3>
              <p>{reto.texto}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
