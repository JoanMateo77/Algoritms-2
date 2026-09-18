const arbol = require('./menus')();
console.log('DFS:', arbol.dfs().map((n) => n.titulo).join(' -> '));
console.log('BFS:', arbol.bfs().map((n) => n.titulo).join(' -> '));
console.log('Menú encontrado:', arbol.buscar('/estudiar/arboles'));
