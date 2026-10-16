# Reto 05: cola de personas en un cajero

Fuente: `Clase 06 - Pilas y Colas.pptx`, diapositiva 13.

Cada persona tiene nombre y monto de retiro. Al agregarla, el sistema le asigna
una fecha de llegada aleatoria (hoy, entre las 8:00 y las 16:00) y la ubica en la
cola según esa fecha: quien llegó primero es atendido primero (FIFO por hora de
llegada). Si dos personas llegan a la misma hora, se respeta el orden de ingreso.

Las pruebas inyectan el generador de fechas para que el resultado sea fijo.

Ejecuta `npm run demo:cola` desde la raíz o abre la página **Cola** en la app.
