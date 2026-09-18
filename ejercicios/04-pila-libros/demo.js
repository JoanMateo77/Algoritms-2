const PilaLibros = require('./PilaLibros');
const libros = require('./libros');
const pila = new PilaLibros(libros);
console.log('De abajo hacia arriba:', pila.print());
console.log('Libro superior:', pila.peek());
console.log('Retirado:', pila.pop());
console.log('Tamaño restante:', pila.size());
