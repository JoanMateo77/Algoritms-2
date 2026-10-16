const COMPACTAR_DESDE = 32;
const HORA_APERTURA = 8;
const SEGUNDOS_DE_ATENCION = 8 * 60 * 60;

function datosValidos(persona) {
  return Boolean(persona) &&
    typeof persona.nombre === 'string' && persona.nombre.trim() !== '' &&
    Number.isFinite(Number(persona.monto)) && Number(persona.monto) > 0;
}

// un momento al azar de hoy, entre las 8:00 y las 16:00
function llegadaAleatoria() {
  const apertura = new Date();
  apertura.setHours(HORA_APERTURA, 0, 0, 0);
  const segundos = Math.floor(Math.random() * SEGUNDOS_DE_ATENCION);
  return new Date(apertura.getTime() + segundos * 1000);
}

class ColaCajero {
  constructor(personas = [], generarLlegada = llegadaAleatoria) {
    this.elementos = [];
    this.inicio = 0;
    this.generarLlegada = generarLlegada;
    personas.forEach((persona) => this.enqueue(persona));
  }

  enqueue(persona) {
    if (!datosValidos(persona)) {
      throw new Error('La persona necesita nombre y monto positivo.');
    }
    const llegada = this.generarLlegada();
    const nuevo = { nombre: persona.nombre.trim(), monto: Number(persona.monto), llegada: llegada.toISOString() };
    // la fecha es aleatoria, así que se ubica detrás de quienes llegaron antes o a la misma hora
    let posicion = this.elementos.length;
    while (posicion > this.inicio && this.elementos[posicion - 1].llegada > nuevo.llegada) posicion--;
    this.elementos.splice(posicion, 0, nuevo);
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
