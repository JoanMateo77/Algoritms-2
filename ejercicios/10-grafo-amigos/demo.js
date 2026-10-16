const grafo = require('./datos')();
console.log('Lista de adyacencia:');
console.log(grafo.imprimir());
for (const ciudad of grafo.ciudades()) {
  console.log(`Viven en ${ciudad.nombre}:`, grafo.imprimirPersonasEn(ciudad.nombre));
}
console.log('Amigos de Ana:', grafo.amigosDe('Ana').map((p) => p.nombre).join(', '));
