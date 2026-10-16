const test = require('node:test');
const assert = require('node:assert/strict');
const GrafoAmigos = require('./GrafoAmigos');
const crearGrafo = require('./datos');

const nombres = (nodos) => nodos.map((nodo) => nodo.nombre);

test('lista las personas que viven en cada ciudad', () => {
  const grafo = crearGrafo();
  assert.deepEqual(nombres(grafo.personasEn('Cali')), ['Ana', 'Luis', 'Marta']);
  assert.deepEqual(nombres(grafo.personasEn('Medellín')), ['Camilo']);
  assert.equal(grafo.imprimirPersonasEn('Bogotá'), 'Jorge (30), Sofía (27)');
  assert.deepEqual(grafo.personasEn('Pasto'), []);
  assert.equal(grafo.imprimirPersonasEn('Pasto'), 'Nadie vive en Pasto.');
});

test('la amistad es una arista no dirigida y la ciudad no cuenta como amigo', () => {
  const grafo = crearGrafo();
  assert.deepEqual(nombres(grafo.amigosDe('Ana')), ['Luis', 'Jorge']);
  assert.ok(nombres(grafo.amigosDe('Jorge')).includes('Ana'));
  assert.equal(grafo.agregarAmistad('Luis', 'Ana'), false);
  assert.equal(grafo.buscarPersona('Ana').ciudad, 'Cali');
});

test('cada persona necesita nombre, edad y una ciudad que exista', () => {
  const grafo = new GrafoAmigos();
  grafo.agregarCiudad('Cali');
  assert.throws(() => grafo.agregarPersona({ nombre: 'Eva', edad: 20, ciudad: 'Lima' }));
  assert.throws(() => grafo.agregarPersona({ nombre: 'Eva', edad: 'veinte', ciudad: 'Cali' }));
  assert.throws(() => grafo.agregarPersona({ nombre: '  ', edad: 20, ciudad: 'Cali' }));
  assert.throws(() => grafo.agregarCiudad('Cali'));
  const eva = grafo.agregarPersona({ nombre: ' Eva ', edad: '20', ciudad: 'Cali' });
  assert.deepEqual(eva, { id: 'persona:Eva', tipo: 'persona', nombre: 'Eva', edad: 20, ciudad: 'Cali' });
  assert.throws(() => grafo.agregarAmistad('Eva', 'Eva'));
  assert.throws(() => grafo.agregarAmistad('Eva', 'Nadie'));
});

test('una persona y una ciudad pueden llamarse igual', () => {
  const grafo = new GrafoAmigos();
  grafo.agregarCiudad('Victoria');
  grafo.agregarPersona({ nombre: 'Victoria', edad: 33, ciudad: 'Victoria' });
  assert.deepEqual(nombres(grafo.personasEn('Victoria')), ['Victoria']);
});

test('paraD3 entrega nodos y cada arista una sola vez', () => {
  const grafo = crearGrafo();
  const { nodes, links } = grafo.paraD3();
  assert.equal(nodes.length, 9);
  assert.equal(links.length, 6 + 6);
  const claves = links.map(({ source, target }) => [source, target].sort().join('|'));
  assert.equal(new Set(claves).size, links.length);
  assert.deepEqual(links[0], { source: 'ciudad:Cali', target: 'persona:Ana' });
});
