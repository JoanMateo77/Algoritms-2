# Guía 03. Llevar una estructura a React

## 1. Separa responsabilidades

La estructura de datos decide el orden y las operaciones. React decide qué
mostrar y cuándo actualizar la pantalla. No implementes pop, dequeue o DFS
dentro del JSX. Las clases están en las carpetas de cada ejercicio; las páginas
React las importan y usan.

Una página necesita tres piezas:
- Un objeto de estructura que conserva su estado entre renders.
- Una vista en estado React para pintar el arreglo o árbol actual.
- Acciones de usuario que modifican la estructura y actualizan la vista.

## 2. Flujo de un formulario

El formulario pide los datos que el usuario conoce. Valida campos obligatorios.
Al enviarlo:
    prevenir el envío normal del navegador
    leer los campos
    llamar al método de la estructura
    obtener una vista nueva
    actualizar el estado React
    limpiar el formulario

En el cajero no pidas la fecha: la asigna el programa. En el árbol binario
convierte el texto a número antes de insertarlo. En una pila el botón de retirar
debe desactivarse cuando está vacía.

## 3. Flujo de los botones de consulta

Peek, búsqueda y recorridos no modifican la estructura. Una búsqueda puede
mostrar un mensaje de resultado. Los recorridos se pueden mostrar como listas
de números y también en la consola del navegador.

En el árbol N-ario, el sidebar se construye con una función recursiva:
dibujar nodo, y si tiene hijos, dibujar una lista que repite la misma función
para cada hijo. Cada botón usa el enlace del nodo para seleccionar su contenido.

## 4. Práctica incremental

No empieces por toda la pantalla. En este orden:
1. Muestra solo un dato fijo de ejemplo.
2. Agrega el estado de la estructura y muestra su tamaño.
3. Agrega el formulario y verifica que cambie el tamaño.
4. Muestra todos los elementos.
5. Agrega el botón de retirada o búsqueda.
6. Comprueba casos vacíos y mensajes de error.
7. Aplica estilos al final.

Abre ejercicios/04-app-react/src/paginas y compara las cuatro páginas.
Modifica un dato de ejemplo, recarga y observa qué parte de la pantalla cambia.
Luego crea una quinta página de práctica sin copiar los componentes existentes.
