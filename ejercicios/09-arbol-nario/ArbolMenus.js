class NodoMenu {
  constructor({ titulo, enlace, componente }) {
    if (!titulo || typeof titulo !== 'string' || !enlace || typeof enlace !== 'string' ||
      !componente || typeof componente !== 'string') {
      throw new Error('Cada menú necesita título, enlace y componente.');
    }
    this.titulo = titulo;
    this.enlace = enlace;
    this.componente = componente;
    this.hijos = [];
  }

  agregarHijo(datos) {
    const nodo = datos instanceof NodoMenu ? datos : new NodoMenu(datos);
    this.hijos.push(nodo);
    return nodo;
  }
}

class ArbolMenus {
  constructor(datosRaiz) { this.raiz = new NodoMenu(datosRaiz); }

  buscar(enlace) {
    const pendientes = [this.raiz];
    while (pendientes.length) {
      const actual = pendientes.shift();
      if (actual.enlace === enlace) return actual;
      pendientes.push(...actual.hijos);
    }
    return null;
  }

  dfs(nodo = this.raiz, resultado = []) {
    resultado.push(nodo);
    nodo.hijos.forEach((hijo) => this.dfs(hijo, resultado));
    return resultado;
  }

  bfs() {
    const pendientes = [this.raiz];
    const resultado = [];
    for (let indice = 0; indice < pendientes.length; indice++) {
      const actual = pendientes[indice];
      resultado.push(actual);
      pendientes.push(...actual.hijos);
    }
    return resultado;
  }
}

module.exports = { NodoMenu, ArbolMenus };
