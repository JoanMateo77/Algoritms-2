const ColaCajero = require('./ColaCajero');
const cola = new ColaCajero(require('./personas'));
const hora = (persona) => new Date(persona.llegada).toLocaleTimeString('es-CO');
console.log('Orden de llegada:', cola.toArray().map((p) => `${p.nombre} ${hora(p)}`).join(' -> '));
console.log('Primera persona:', cola.peek());
console.log('Atendida:', cola.dequeue());
console.log('Quedan:', cola.size());
