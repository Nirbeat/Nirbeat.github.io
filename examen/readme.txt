Esta app es una evaluación que se genera de manera aleatoria y que tiene una función de autocorrección.

La diseñé para mi escuela de música con el fin que los estudiantes puedan hacer un seguimiento propio de sus avances.

En su primer versión apenas empecé con la programación, estaba 100% funcional. Sin embargo luego hice modificaciones para hacer a la app escalable independientemente del numero de consignas del examen: si un examen tiene 7 preguntas, se creará de la misma manera que en este ejemplo que tiene 4.

Cuando hice las modificaciones no terminé de programar el algoritmo que recoge los resultados, por lo que esa función de momento no está disponible.
Lo último hecho es el almacenamiento de las respuestas correctas en un objeto, que es transformado y almacenado en localstorage como un array de indices
(un array por consigna) que serán luego cotejados para comparar las respuestas correctas. Todo eso hecho para que el estudiante no pueda acceder a la respuesta 
correcta literal y haga trampa. Posteriormente, los resultados se extraerán de una base de datos una vez completado el examen.
