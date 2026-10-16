const GrafoAmigos = require('./GrafoAmigos');

const ciudades = ['Cali', 'Bogotá', 'Medellín'];

const personas = [
  { nombre: 'Ana', edad: 21, ciudad: 'Cali' },
  { nombre: 'Luis', edad: 24, ciudad: 'Cali' },
  { nombre: 'Marta', edad: 19, ciudad: 'Cali' },
  { nombre: 'Jorge', edad: 30, ciudad: 'Bogotá' },
  { nombre: 'Sofía', edad: 27, ciudad: 'Bogotá' },
  { nombre: 'Camilo', edad: 22, ciudad: 'Medellín' },
];

const amistades = [
  ['Ana', 'Luis'],
  ['Ana', 'Jorge'],
  ['Luis', 'Marta'],
  ['Jorge', 'Sofía'],
  ['Sofía', 'Camilo'],
  ['Marta', 'Camilo'],
];

function crearGrafo() {
  const grafo = new GrafoAmigos();
  ciudades.forEach((ciudad) => grafo.agregarCiudad(ciudad));
  personas.forEach((persona) => grafo.agregarPersona(persona));
  amistades.forEach(([a, b]) => grafo.agregarAmistad(a, b));
  return grafo;
}

module.exports = crearGrafo;
