const { ArbolMenus } = require('./ArbolMenus');

function crearMenus() {
  const arbol = new ArbolMenus({ titulo: 'Inicio', enlace: '/', componente: 'Inicio' });
  const estudiar = arbol.raiz.agregarHijo({ titulo: 'Estudiar', enlace: '/estudiar', componente: 'Estudiar' });
  estudiar.agregarHijo({ titulo: 'Pilas y colas', enlace: '/estudiar/pilas-colas', componente: 'PilasColas' });
  estudiar.agregarHijo({ titulo: 'Árboles', enlace: '/estudiar/arboles', componente: 'Arboles' });
  const practicar = arbol.raiz.agregarHijo({ titulo: 'Practicar', enlace: '/practicar', componente: 'Practicar' });
  practicar.agregarHijo({ titulo: 'Recorridos', enlace: '/practicar/recorridos', componente: 'Recorridos' });
  return arbol;
}

module.exports = crearMenus;
