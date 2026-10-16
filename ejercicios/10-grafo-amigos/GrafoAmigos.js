function esTextoConContenido(valor) {
  return typeof valor === 'string' && valor.trim() !== '';
}

// personas y ciudades comparten el grafo; el prefijo evita que "Cali" persona choque con "Cali" ciudad
const idCiudad = (nombre) => `ciudad:${nombre.trim()}`;
const idPersona = (nombre) => `persona:${nombre.trim()}`;

class GrafoAmigos {
  constructor() {
    this.nodos = [];
    this.adyacencia = {};
  }

  agregarNodo(nodo) {
    if (this.adyacencia[nodo.id]) throw new Error(`Ya existe ${nodo.nombre}.`);
    this.nodos.push(nodo);
    this.adyacencia[nodo.id] = [];
    return nodo;
  }

  agregarArista(idA, idB) {
    if (idA === idB) throw new Error('Un nodo no puede conectarse consigo mismo.');
    if (this.adyacencia[idA].includes(idB)) return false;
    this.adyacencia[idA].push(idB);
    this.adyacencia[idB].push(idA);
    return true;
  }

  agregarCiudad(nombre) {
    if (!esTextoConContenido(nombre)) throw new Error('La ciudad necesita nombre.');
    return this.agregarNodo({ id: idCiudad(nombre), tipo: 'ciudad', nombre: nombre.trim() });
  }

  agregarPersona({ nombre, edad, ciudad }) {
    const años = Number(edad);
    if (!esTextoConContenido(nombre) || !Number.isInteger(años) || años <= 0) {
      throw new Error('La persona necesita nombre y edad entera positiva.');
    }
    const nodoCiudad = esTextoConContenido(ciudad) && this.buscarCiudad(ciudad);
    if (!nodoCiudad) throw new Error(`La ciudad ${ciudad} no existe.`);
    const persona = this.agregarNodo({
      id: idPersona(nombre), tipo: 'persona', nombre: nombre.trim(), edad: años, ciudad: nodoCiudad.nombre,
    });
    this.agregarArista(persona.id, nodoCiudad.id);
    return persona;
  }

  agregarAmistad(nombreA, nombreB) {
    const a = this.buscarPersona(nombreA);
    const b = this.buscarPersona(nombreB);
    if (!a || !b) throw new Error('Las dos personas deben existir.');
    return this.agregarArista(a.id, b.id);
  }

  buscarNodo(id) {
    return this.nodos.find((nodo) => nodo.id === id) ?? null;
  }

  buscarCiudad(nombre) { return this.buscarNodo(idCiudad(nombre)); }
  buscarPersona(nombre) { return this.buscarNodo(idPersona(nombre)); }

  vecinos(id) {
    return (this.adyacencia[id] ?? []).map((idVecino) => this.buscarNodo(idVecino));
  }

  ciudades() { return this.nodos.filter((nodo) => nodo.tipo === 'ciudad'); }
  personas() { return this.nodos.filter((nodo) => nodo.tipo === 'persona'); }

  personasEn(nombreCiudad) {
    const ciudad = this.buscarCiudad(nombreCiudad);
    if (!ciudad) return [];
    return this.vecinos(ciudad.id).filter((nodo) => nodo.tipo === 'persona');
  }

  amigosDe(nombre) {
    const persona = this.buscarPersona(nombre);
    if (!persona) return [];
    return this.vecinos(persona.id).filter((nodo) => nodo.tipo === 'persona');
  }

  imprimirPersonasEn(nombreCiudad) {
    const personas = this.personasEn(nombreCiudad);
    if (!personas.length) return `Nadie vive en ${nombreCiudad}.`;
    return personas.map((persona) => `${persona.nombre} (${persona.edad})`).join(', ');
  }

  imprimir() {
    return this.nodos
      .map((nodo) => `${nodo.nombre} -> ${this.vecinos(nodo.id).map((vecino) => vecino.nombre).join(', ')}`)
      .join('\n');
  }

  // react-d3-graph pide { nodes, links }; cada arista no dirigida se envía una sola vez
  paraD3() {
    const posicion = new Map(this.nodos.map((nodo, indice) => [nodo.id, indice]));
    const links = [];
    this.nodos.forEach((nodo, indice) => {
      this.adyacencia[nodo.id].forEach((idVecino) => {
        if (posicion.get(idVecino) > indice) {
          links.push({ source: nodo.id, target: idVecino });
        }
      });
    });
    return { nodes: this.nodos.map((nodo) => ({ ...nodo })), links };
  }
}

module.exports = GrafoAmigos;
