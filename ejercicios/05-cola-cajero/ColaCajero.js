class ColaCajero {
  constructor(personas = []) {
    this.elementos = [];
    this.inicio = 0;
    personas.forEach((persona) => this.enqueue(persona));
  }

  enqueue(persona) {
    if (!persona || typeof persona.nombre !== 'string' || !persona.nombre.trim() ||
      !Number.isFinite(Number(persona.monto)) || Number(persona.monto) <= 0) {
      throw new Error('La persona necesita nombre y monto positivo.');
    }
    const ultimo = this.elementos.at(-1);
    const base = Math.max(Date.now(), ultimo ? new Date(ultimo.llegada).getTime() : 0);
    const llegada = persona.llegada
      ? new Date(persona.llegada)
      : new Date(base + (1 + Math.floor(Math.random() * 5)) * 1000);
    if (Number.isNaN(llegada.getTime())) throw new Error('Fecha de llegada inválida.');
    const nuevo = { nombre: persona.nombre.trim(), monto: Number(persona.monto), llegada: llegada.toISOString() };
    this.elementos.push(nuevo);
    return nuevo;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const persona = this.elementos[this.inicio++];
    if (this.inicio > 32 && this.inicio * 2 >= this.elementos.length) {
      this.elementos = this.elementos.slice(this.inicio);
      this.inicio = 0;
    }
    return persona;
  }

  peek() { return this.elementos[this.inicio] ?? null; }
  size() { return this.elementos.length - this.inicio; }
  isEmpty() { return this.size() === 0; }
  toArray() { return this.elementos.slice(this.inicio); }
  print() { return this.toArray().map((persona) => persona.nombre).join(' -> '); }
}

module.exports = ColaCajero;
