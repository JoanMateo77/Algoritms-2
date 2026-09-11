const CircularLinkedList = require('./CircularLinkedList');
const PlaylistRepetir = require('./PlaylistRepetir');
const CANCIONES = require('./canciones');

console.log('--- Lista circular ---\n');

const lista = new CircularLinkedList();
lista.append('A');
lista.append('B');
lista.append('C');

lista.print();

console.log('\ntail:', lista.tail.value);
console.log('tail.next:', lista.tail.next.value);
console.log('¿tail.next === head?', lista.tail.next === lista.head);

console.log('\nsiete pasos en una lista de tres:');
let nodo = lista.head;
let camino = '';
for (let i = 0; i < 7; i++) {
  camino += nodo.value + ' ';
  nodo = nodo.next;
}
console.log(camino);

console.log('\nquitamos la A (que era el head):');
lista.remove('A');
lista.print();
console.log('¿el círculo sigue cerrado?', lista.tail.next === lista.head);

console.log('\n--- Playlist en modo repetir ---\n');

const playlist = new PlaylistRepetir();
playlist.cargar(CANCIONES);
playlist.reproducir();

console.log(playlist.listar());

console.log('\ndoce canciones seguidas:');
for (let i = 1; i <= 12; i++) {
  console.log(' ', String(i).padStart(2), playlist.cancionActual().titulo);
  playlist.siguiente();
}

console.log('\ncanciones en la playlist:', playlist.cuantas());
console.log('vueltas completas:', playlist.vueltas());
