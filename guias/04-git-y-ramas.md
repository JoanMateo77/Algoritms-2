# Guía 04. Un ejercicio por rama, todos en main

El repositorio previo tiene una rama por ejercicio de listas y una rama de
React. Para los nuevos retos usa la misma idea: 04-pila-libros,
05-cola-cajero, 08-arbol-binario y 09-arbol-nario. Main integra los cuatro.

## Lee el estado antes de modificar

    git status
    git branch
    git log --oneline -5

Comprueba que no haya cambios tuyos pendientes. Si los hay, decide si
pertenecen al ejercicio actual antes de cambiar de rama.

## Ciclo de trabajo de una rama

    git switch main
    git switch -c 04-pila-libros
    # escribir y probar el ejercicio 04
    git add ejercicios/04-pila-libros
    git commit -m "implementa pila de libros"
    git switch main
    git merge 04-pila-libros

Repite con cada reto y su nombre de rama. Cambia los archivos y el mensaje
según corresponda. Ejecuta npm test después de cada merge. Cuando haya
conflictos, lee ambos lados, conserva las funciones necesarias y vuelve a
probar antes de completar el merge.

## Qué es commit, merge y push

Un commit guarda una versión local. Merge incorpora otra rama a la actual.
Push envía commits al remoto. Por eso primero se comprueba que el ejercicio
funciona localmente; después se suben la rama y main si corresponde.

    git push -u origin 04-pila-libros
    git push origin main

El PDF material-clase/git-cheat-sheet-education.pdf sirve como referencia
rápida de comandos. No reemplaza la práctica: ejecuta los comandos en un
repositorio de ensayo y explica qué cambió tras cada uno.

## Ejercicio de lectura a código

Dibuja cuatro líneas, una por rama. Marca el commit de cada reto y cómo main
los incorpora. Luego usa git log --graph --oneline --all para comparar tu
dibujo con el historial real.
