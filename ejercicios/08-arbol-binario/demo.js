const { ArbolBinario } = require('./ArbolBinario');
const valores = [8, 3, 10, 1, 6, 14, 4, 7, 13];
const arbol = new ArbolBinario(valores);
console.log('Inorden:', arbol.inorden().join(', '));
console.log('Postorden:', arbol.postorden().join(', '));
console.log('Preorden:', arbol.preorden().join(', '));
console.log('¿Está el 7?', arbol.contiene(7));
console.log('¿Está el 9?', arbol.contiene(9));
