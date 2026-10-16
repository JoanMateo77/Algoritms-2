const { Trie } = require('./Trie');
const MinHeap = require('./MinHeap');

const normalizar = (texto) => texto.trim().toLowerCase();

// el peor de los candidatos queda en la raíz: menos popular y, si empatan, el último en orden alfabético
const peorPrimero = (a, b) => a.popularity - b.popularity || b.name.localeCompare(a.name);

class MotorBusqueda {
  constructor(productos = []) {
    this.trie = new Trie();
    productos.forEach(({ name, popularity }) => this.insert(name, popularity));
  }

  insert(name, popularity) {
    if (typeof name !== 'string' || !name.trim()) throw new Error('El producto necesita nombre.');
    if (!Number.isFinite(popularity) || popularity < 0) throw new Error('La popularidad debe ser un número positivo.');
    const producto = { name: normalizar(name), popularity };
    this.trie.insert(producto.name, producto);
    return producto;
  }

  searchTopK(prefijo, k) {
    if (!Number.isInteger(k) || k <= 0) return [];
    const top = new MinHeap(peorPrimero);
    for (const producto of this.trie.startsWith(normalizar(prefijo))) {
      top.push(producto);
      if (top.size() > k) top.pop();
    }
    const resultado = [];
    while (top.size()) resultado.push({ ...top.pop() });
    return resultado.reverse();
  }
}

module.exports = MotorBusqueda;
