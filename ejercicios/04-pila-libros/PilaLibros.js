const CAMPOS = ['nombre', 'isbn', 'autor', 'editorial'];

function esTextoConContenido(valor) {
  return typeof valor === 'string' && valor.trim() !== '';
}

class PilaLibros {
  constructor(libros = []) {
    this.elementos = [];
    libros.forEach((libro) => this.push(libro));
  }

  push(libro) {
    if (!libro || !CAMPOS.every((campo) => esTextoConContenido(libro[campo]))) {
      throw new Error('El libro necesita nombre, ISBN, autor y editorial.');
    }
    const nuevo = Object.fromEntries(CAMPOS.map((campo) => [campo, libro[campo].trim()]));
    this.elementos.push(nuevo);
    return nuevo;
  }

  pop() { return this.elementos.pop() ?? null; }
  peek() { return this.elementos.at(-1) ?? null; }
  size() { return this.elementos.length; }
  isEmpty() { return this.size() === 0; }
  toArray() { return [...this.elementos]; }
  print() { return this.elementos.map((libro) => libro.nombre).join(' <- '); }
}

module.exports = PilaLibros;
