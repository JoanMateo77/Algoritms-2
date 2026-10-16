import { useRef, useState } from 'react';
import { Graph } from 'react-d3-graph';
import crearGrafo from '../../../10-grafo-amigos/datos.js';

const configuracion = {
  width: 760,
  height: 440,
  nodeHighlightBehavior: true,
  d3: { gravity: -300, linkLength: 110 },
  node: { size: 320, fontSize: 13, highlightFontSize: 13, labelProperty: 'nombre' },
  link: { color: '#c2ced6', highlightColor: '#14293a' },
};

const opcion = (nodo) => <option key={nodo.id}>{nodo.nombre}</option>;

function aspecto(nodo, ciudadSeleccionada) {
  const destacado = nodo.nombre === ciudadSeleccionada || nodo.ciudad === ciudadSeleccionada;
  return {
    ...nodo,
    symbolType: nodo.tipo === 'ciudad' ? 'square' : 'circle',
    color: nodo.tipo === 'ciudad' ? '#b93227' : '#1c5f9e',
    size: destacado ? 600 : 320,
  };
}

export default function GrafoAmigosPage() {
  const grafo = useRef(null);
  if (!grafo.current) grafo.current = crearGrafo();
  const [, setVersion] = useState(0);
  const [ciudad, setCiudad] = useState('Cali');
  const [mensaje, setMensaje] = useState('Las ciudades son cuadrados rojos y las personas círculos azules.');

  const opcionesCiudades = grafo.current.ciudades().map(opcion);
  const opcionesPersonas = grafo.current.personas().map(opcion);
  const residentes = grafo.current.personasEn(ciudad);
  const { nodes, links } = grafo.current.paraD3();
  const datos = { nodes: nodes.map((nodo) => aspecto(nodo, ciudad)), links };

  function enviar(accion) {
    return (evento) => {
      evento.preventDefault();
      const formulario = evento.currentTarget;
      try {
        setMensaje(accion(Object.fromEntries(new FormData(formulario))));
        setVersion((anterior) => anterior + 1);
        formulario.reset();
      } catch (error) {
        setMensaje(error.message);
      }
    };
  }

  const agregarCiudad = enviar(({ nombre }) => {
    const nueva = grafo.current.agregarCiudad(nombre);
    return `Agregaste la ciudad ${nueva.nombre}.`;
  });

  const agregarPersona = enviar((datosPersona) => {
    const persona = grafo.current.agregarPersona(datosPersona);
    return `${persona.nombre} quedó conectada con ${persona.ciudad}.`;
  });

  const agregarAmistad = enviar(({ a, b }) => {
    const nueva = grafo.current.agregarAmistad(a, b);
    return nueva ? `${a} y ${b} ahora son amigos.` : `${a} y ${b} ya eran amigos.`;
  });

  function nombresDeAmigos(persona) {
    return grafo.current.amigosDe(persona.nombre).map((amigo) => amigo.nombre).join(', ');
  }

  function elegirCiudad(nombre) {
    setCiudad(nombre);
    console.log(`Viven en ${nombre}:`, grafo.current.imprimirPersonasEn(nombre));
  }

  return (
    <div className="pagina">
      <header className="pagina-cabecera">
        <h1>Reto 10 · Grafo de amigos y ciudades</h1>
        <p className="pagina-subtitulo">
          Cada persona y cada ciudad es un nodo. Las aristas unen a cada persona
          con su ciudad y con sus amigos.
        </p>
      </header>

      <section className="dos-columnas">
        <div>
          <h2>Personas que viven en</h2>
          <select value={ciudad} onChange={(evento) => elegirCiudad(evento.target.value)}>
            {opcionesCiudades}
          </select>
          <ol className="lista-datos">
            {residentes.map((persona) => (
              <li key={persona.id}>
                <strong>{persona.nombre}</strong>
                <small>{persona.edad} años · amigos: {nombresDeAmigos(persona) || 'ninguno'}</small>
              </li>
            ))}
          </ol>
          {!residentes.length && <p>Nadie vive en {ciudad}.</p>}
          <p role="status">{mensaje}</p>
        </div>

        <div>
          <form className="formulario" onSubmit={agregarPersona}>
            <h2>Nueva persona</h2>
            <label>Nombre<input name="nombre" required /></label>
            <label>Edad<input name="edad" type="number" min="1" step="1" required /></label>
            <label>
              Ciudad
              <select name="ciudad">{opcionesCiudades}</select>
            </label>
            <button>Agregar persona</button>
          </form>

          <form className="formulario" onSubmit={agregarAmistad}>
            <h2>Nueva amistad</h2>
            <label>
              Persona
              <select name="a">{opcionesPersonas}</select>
            </label>
            <label>
              Amigo
              <select name="b">{opcionesPersonas}</select>
            </label>
            <button>Conectar</button>
          </form>

          <form className="formulario" onSubmit={agregarCiudad}>
            <h2>Nueva ciudad</h2>
            <label>Nombre<input name="nombre" required /></label>
            <button>Agregar ciudad</button>
          </form>
        </div>
      </section>

      <section>
        <h2>Grafo con react-d3-graph</h2>
        <div className="lienzo-grafo">
          <Graph id="grafo-amigos" data={datos} config={configuracion} />
        </div>
      </section>
    </div>
  );
}
