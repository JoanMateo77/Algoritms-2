class PilaLibros {
  constructor(libros = []) {
    this.elementos = [];
    libros.forEach((libro) => this.push(libro));
  }

  push(libro) {
    if (!libro || !['nombre', 'isbn', 'autor', 'editorial'].every(
      (campo) => typeof libro[campo] === 'string' && libro[campo].trim()
    )) {
      throw new Error('El libro necesita nombre, ISBN, autor y editorial.');
    }
    const nuevo = { ...libro };
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
