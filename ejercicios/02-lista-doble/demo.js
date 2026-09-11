const DoublyLinkedList = require('./DoublyLinkedList');
const Historial = require('./Historial');
const PAGINAS = require('./paginas');

console.log('--- Lista doble ---\n');

const lista = new DoublyLinkedList();
lista.append('A');
lista.append('B');
lista.append('C');

console.log('de principio a fin:');
lista.print();
console.log('del final al principio:');
lista.printReverse();

const nodoB = lista.peek('B');
console.log('\nnodo B -> prev:', nodoB.prev.value, '| next:', nodoB.next.value);

console.log('\nquitamos la B:');
lista.remove('B');
lista.print();

console.log('\n--- Historial del navegador ---\n');

const historial = new Historial();

PAGINAS.slice(0, 4).forEach((pagina) => {
  historial.visitar(pagina);
  console.log('visita:', pagina.titulo);
});

console.log('\n' + historial.listar());

console.log('\n¿puede ir atrás?', historial.puedeIrAtras());
console.log('¿puede ir adelante?', historial.puedeIrAdelante());

console.log('\natrás x2:');
console.log('  ', historial.atras().titulo);
console.log('  ', historial.atras().titulo);

console.log('\nadelante x1:');
console.log('  ', historial.adelante().titulo);

console.log('\nnos devolvemos al principio y visitamos una página nueva:');
while (historial.puedeIrAtras()) {
  historial.atras();
}
historial.visitar(PAGINAS[4]);

console.log(historial.listar());
console.log('\npáginas guardadas:', historial.cuantas());
console.log('¿puede ir adelante?', historial.puedeIrAdelante());
