# Reto 10: grafo de amigos y ciudades

Fuente: `Clase 10 - Grafos.pptx`, diapositiva 8.

Cada persona (nombre y edad) y cada ciudad (nombre) es un nodo. El grafo guarda
una lista de nodos y un objeto de adyacencia, como en la diapositiva 7. Las
aristas no son dirigidas: una une a cada persona con su ciudad y las demás son
amistades.

`personasEn` recorre los vecinos de una ciudad para saber quién vive ahí.
`paraD3` arma el formato `{ nodes, links }` que usa `react-d3-graph` en la
página React.

Ejecuta `npm run demo:grafo` desde la raíz.
