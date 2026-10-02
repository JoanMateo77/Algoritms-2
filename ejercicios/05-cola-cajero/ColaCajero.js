const COMPACTAR_DESDE = 32;

function datosValidos(persona) {
  return Boolean(persona) &&
    typeof persona.nombre === 'string' && persona.nombre.trim() !== '' &&
    Number.isFinite(Number(persona.monto)) && Number(persona.monto) > 0;
}

class ColaCajero {
  constructor(personas = [], reloj = () => new Date()) {
    this.elementos = [];
    this.inicio = 0;
    this.reloj = reloj;
    personas.forEach((persona) => this.enqueue(persona));
  }

  enqueue(persona) {
    if (!datosValidos(persona)) {
      throw new Error('La persona necesita nombre y monto positivo.');
    }
    const llegada = persona.llegada ? new Date(persona.llegada) : this.reloj();
    if (Number.isNaN(llegada.getTime())) throw new Error('Fecha de llegada inválida.');
    const nuevo = { nombre: persona.nombre.trim(), monto: Number(persona.monto), llegada: llegada.toISOString() };
    this.elementos.push(nuevo);
    return nuevo;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const persona = this.elementos[this.inicio++];
    // los atendidos quedan al inicio del arreglo; se descartan cuando ya son la mitad
    if (this.inicio > COMPACTAR_DESDE && this.inicio * 2 >= this.elementos.length) {
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
