const LinkedList = require('./LinkedList');
const Reproductor = require('./Reproductor');
const CANCIONES = require('./canciones');

console.log('--- Lista enlazada ---\n');

const lista = new LinkedList();
lista.append('A');
lista.append('B');
lista.append('C');

lista.print();
console.log('tamaño:', lista.size());
console.log('head:', lista.head.value);
console.log('tail:', lista.tail.value);

console.log('\nbuscamos la B:');
const nodoB = lista.peek('B');
console.log('encontrado:', nodoB.value, '| su siguiente:', nodoB.next.value);

console.log('\nquitamos la B:');
lista.remove('B');
lista.print();

console.log('\n--- Reproductor ---\n');

const reproductor = new Reproductor();
reproductor.cargar(CANCIONES);

console.log(`playlist con ${reproductor.cuantas()} canciones:`);
console.log(reproductor.listar());

reproductor.reproducir();
console.log('\nsonando:', reproductor.cancionActual().titulo);

console.log('\npasamos tres canciones:');
for (let i = 0; i < 3; i++) {
  console.log('  ', reproductor.siguiente().titulo);
}

console.log('\nquitamos Billie Jean');
reproductor.quitar('Billie Jean');
console.log('quedan', reproductor.cuantas(), 'canciones');

console.log('\navanzamos hasta el final:');
let cancion = reproductor.cancionActual();
while (cancion !== null) {
  cancion = reproductor.siguiente();
}
console.log('cancionActual():', reproductor.cancionActual());
