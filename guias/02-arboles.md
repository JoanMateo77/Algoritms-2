# Guía 02. Árboles: de un dibujo a una implementación

Fuente: Clase 09 - Árboles.pptx, diapositivas 18 y 24.

## 1. Vocabulario que debes poder dibujar

Un árbol empieza en la raíz. Cada nodo puede tener hijos; un nodo sin hijos
es una hoja. En el árbol binario hay como máximo dos hijos: izquierdo y derecho.
En el árbol N-ario hay una lista de hijos y su longitud puede variar.

Dibuja el árbol binario que resulta de insertar, en este orden:
8, 3, 10, 1, 6, 14, 4, 7, 13. No lo dibujes ordenado de antemano; cada
nuevo valor baja desde la raíz siguiendo comparaciones.

## 2. Árbol binario de búsqueda: regla central

Si el nuevo número es menor que el nodo actual, camina a la izquierda. Si es
mayor, camina a la derecha. Si es igual, no insertes otro nodo. Para buscar,
sigue la misma regla. No necesitas examinar todas las ramas.

Pseudocódigo de inserción:
    si no hay raíz: el nuevo nodo será la raíz
    empezar en la raíz
    mientras exista un nodo actual:
        si el valor es igual: detenerse, ya existe
        elegir izquierda o derecha según la comparación
        si ese hijo está vacío: conectar ahí el nuevo nodo y terminar
        si no: continuar desde ese hijo

Pseudocódigo de búsqueda:
    empezar en la raíz
    mientras exista un nodo actual:
        si su valor es el buscado: devolver verdadero
        avanzar a izquierda o derecha según la comparación
    devolver falso

Prueba primero con árbol vacío, un valor, un duplicado y uno inexistente.

## 3. Recorridos: calcula antes de ejecutar

Usa este árbol pequeño:

        8
       / \
      3  10
     / \
    1   6

- Preorden N-L-R: visita nodo, izquierda, derecha. Resultado: 8,3,1,6,10.
- Inorden L-N-R: izquierda, nodo, derecha. Resultado: 1,3,6,8,10.
- Postorden L-R-N: izquierda, derecha, nodo. Resultado: 1,6,3,10,8.

La recursión repite la misma regla en cada subárbol. El caso base es un nodo
nulo: no añade nada al resultado. Escribe primero las tres funciones en
pseudocódigo y marca con lápiz el instante en que se agrega cada valor.

El reto 08 pide imprimir los tres recorridos en consola y comprobar si existe
un valor. Ejecuta npm run demo:arbol para verlo. En React se usa react-d3-tree,
que necesita nodos con nombre e hijos. El método paraD3 adapta el árbol a ese
formato. Su uso se basa en la documentación oficial:
https://github.com/bkrem/react-d3-tree

## 4. Árbol N-ario: de datos a menú

Cada menú contiene título, enlace, componente e hijos. El padre puede tener
cualquier cantidad de submenús. En menus.js encontrarás un ejemplo de tres
niveles. Antes de abrirlo, dibuja uno con Inicio, Estudiar, Practicar y
submenús para Pilas, Colas y Recorridos.

Pseudocódigo de DFS:
    visitar nodo actual
    para cada hijo, aplicar DFS al hijo

Pseudocódigo de BFS:
    poner la raíz en una lista de pendientes
    tomar el primer pendiente, visitarlo
    agregar sus hijos al final
    repetir hasta agotar pendientes

DFS entra en una rama antes de pasar a otra. BFS visita primero todos los
nodos de un nivel. Ejemplo: para raíz A con hijos B y C, y B con hijo D,
DFS entrega A-B-D-C; BFS entrega A-B-C-D.

El reto 09 pide un sidebar en React. La función Rama se llama a sí misma
para dibujar los hijos dentro de una lista anidada. Al elegir un enlace, el
árbol busca su nodo y la pantalla muestra el contenido del componente
asociado. Ejecuta npm run demo:menus y después abre la página Menú N-ario.

## 5. Tu práctica sin mirar la solución

1. Implementa NodoBinario con valor, izquierda y derecha.
2. Implementa insertar y contiene; prueba con el dibujo de nueve números.
3. Implementa los tres recorridos y compara con tu cálculo manual.
4. Implementa NodoMenu con un arreglo hijos y agregarHijo.
5. Implementa DFS y BFS sobre tu propio menú.
6. Por último, traduce el árbol de menús a una barra lateral React.

Preguntas de control: ¿qué pasa con un árbol vacío? ¿Por qué inorden de un
árbol de búsqueda queda ordenado? ¿Qué cambia si un nodo N-ario tiene cero,
uno o cinco hijos?
