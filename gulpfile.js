
function tarea(cb) {
    console.log('mi primer tarea');

    cb();  // Pasamos una callback para que no nos tire algun error
};

exports.tarea = tarea;  // Cuando mande a llamar primerTarea, se va a ejecutar tarea()