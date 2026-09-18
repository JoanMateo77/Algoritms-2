# Guía 01. Pilas y colas: leer, dibujar, programar

Fuente: Clase 06 - Pilas y Colas (1).pptx, diapositivas 7 y 13.

## 1. Lee la idea

Una pila funciona como platos: el último que pones es el primero que retiras.
Esto se llama LIFO. Una cola funciona como una fila de personas: quien llega
primero sale primero. Esto se llama FIFO.

Dibuja la pila como una columna y la cola como una fila. Escribe A, B y C en
ese orden. Pregúntate qué sale con pop y qué sale con dequeue. La respuesta
correcta es C para la pila y A para la cola.

## 2. Transforma el enunciado en datos

Reto 04: cada libro necesita nombre, ISBN, autor y editorial. Los datos de
ejemplo están en ejercicios/04-pila-libros/libros.js.

Reto 05: cada persona necesita nombre, monto de retiro y fecha de llegada
asignada por el sistema. Los ejemplos están en
ejercicios/05-cola-cajero/personas.js. En la pantalla la fecha no se pide al
usuario; la asigna el programa al entrar en la cola.

Antes de seguir, crea en papel un libro y una persona con todos sus campos.

## 3. Escribe los contratos de los métodos

Pila:
- push(libro): valida y pone el libro arriba; devuelve el libro agregado.
- pop(): retira y devuelve el superior; null si está vacía.
- peek(): mira el superior sin cambiar la pila.
- size(), isEmpty() y print(): observan el estado.

Cola:
- enqueue(persona): valida y agrega al final con fecha de llegada.
- dequeue(): retira y devuelve quien está al frente; null si está vacía.
- peek(): mira el frente sin retirar.
- size(), isEmpty() y print(): observan el estado.

Escribe primero pruebas mentales: push(A), push(B), pop() debe devolver B;
enqueue(A), enqueue(B), dequeue() debe devolver A.

## 4. Pseudocódigo antes de JavaScript

Pila:
    push: agregar al final del arreglo
    pop: retirar del final del arreglo
    peek: leer el último sin retirarlo

Cola:
    enqueue: agregar al final del arreglo
    dequeue: leer el elemento en la posición inicio; aumentar inicio
    peek: leer el elemento en la posición inicio

¿Por qué la cola usa un índice de inicio? Quitar el primer elemento de un
arreglo con shift mueve los demás. Un índice evita ese trabajo en cada retiro.
La implementación compacta el arreglo ocasionalmente para no conservar un
prefijo consumido sin límite.

## 5. Ahora escribe tu versión

1. Crea la clase y un arreglo vacío en el constructor.
2. Implementa size e isEmpty.
3. Implementa push/peek/pop o enqueue/peek/dequeue.
4. Prueba estructura vacía, uno y tres elementos.
5. Agrega validación de campos. Un monto debe ser positivo.
6. Agrega datos de ejemplo y un demo con console.log.

No abras PilaLibros.js ni ColaCajero.js hasta tener un primer intento. Luego
compara sus decisiones para vacíos, orden y validación.

## 6. Del código a la pantalla

En React, el formulario obtiene los campos. Al enviarlo llama push o enqueue.
Luego se toma una nueva vista del arreglo para que React vuelva a dibujar.
Un botón pop o dequeue cambia la estructura y actualiza la vista. El formulario
del cajero solo pide nombre y monto; la fecha la asigna el sistema.

## 7. Comprueba lo aprendido

- Con A, B, C: ¿qué devuelve cada operación de retirada?
- ¿Por qué peek no cambia size?
- ¿Qué ocurre al retirar de una estructura vacía?
- Si agregas dos personas en segundos distintos, ¿cuál debe verse primero?
- Cambia el demo para retirar todos los elementos y vuelve a llenarlo.

Ejecuta npm run demo:pila, npm run demo:cola y npm test desde la raíz.
