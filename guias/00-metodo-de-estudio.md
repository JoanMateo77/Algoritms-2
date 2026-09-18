# Guía 00. Cómo pasar de leer a escribir código

## Primera lectura: entender el contrato

Antes de escribir, subraya los sustantivos del enunciado: libro, persona, nodo,
menú. Se convierten en datos. Subraya los verbos: agregar, retirar, buscar,
imprimir. Se convierten en métodos o interacciones de la pantalla.

Para cada método escribe cuatro cosas en una hoja:

- Entrada: qué recibe.
- Estado antes: qué elementos y punteros existen.
- Estado después: qué cambió.
- Salida: qué devuelve o muestra.

Ejemplo para retirar un libro: no recibe datos, la pila contiene A-B-C, después
contiene A-B y devuelve C. Al estar vacía devuelve null y no cambia nada.

## Segunda lectura: dibujar y simular

Traza tres elementos con papel. Aplica operaciones una por una. Anota tamaño,
primero y último después de cada paso. Repite con cero y un elemento. Esos
casos muestran casi todos los errores de referencia y de límites.

No memorices el cuerpo del método. Memoriza la regla que debe seguir siendo
verdadera. Para una cola: quien entró primero y aún espera siempre está al
frente. Para un árbol de búsqueda: todos los menores de un nodo están a su
izquierda y todos los mayores a su derecha.

## Tercera lectura: pseudocódigo propio

Escribe frases que indiquen decisiones y repeticiones. Ejemplo:

    si la pila está vacía, devolver null
    guardar el último elemento
    retirarlo
    devolver el elemento guardado

Luego traduce cada frase a JavaScript. Si una línea no se puede explicar con
una frase, detente y vuelve al dibujo.

## Cuarta lectura: comparación con la solución

Ejecuta las pruebas antes de mirar la solución. Si fallan, lee solo el nombre
del caso que falló, dibuja ese caso y depura. Después compara tu implementación
con la del repositorio. Anota diferencias de comportamiento, no solo de estilo.

Preguntas para cerrar cada reto:

1. ¿Qué pasa si la estructura está vacía?
2. ¿Qué pasa si solo tiene un elemento?
3. ¿Qué devuelve cada método?
4. ¿Qué operación cambia el orden?
5. ¿Cuál es el coste aproximado cuando hay muchos elementos?
6. ¿Puedes explicarlo sin mirar el archivo?

## Plan de práctica de cuatro sesiones

- Sesión 1: pila y cola; dibujar 5 operaciones y escribir métodos básicos.
- Sesión 2: árbol binario; insertar 9 números y calcular recorridos a mano.
- Sesión 3: árbol N-ario; dibujar menú de tres niveles y escribir DFS/BFS.
- Sesión 4: React; conectar un formulario a cada estructura y verificar UI.

Usa un archivo de intento separado. Mantén la solución original como referencia
y no la copies antes de completar un intento propio.
