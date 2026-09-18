const ColaCajero = require('./ColaCajero');
const cola = new ColaCajero(require('./personas'));
console.log('Orden de llegada:', cola.print());
console.log('Primera persona:', cola.peek());
console.log('Atendida:', cola.dequeue());
console.log('Quedan:', cola.size());
