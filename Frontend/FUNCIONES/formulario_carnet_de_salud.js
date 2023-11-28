const urlGetPeriodosActualizacion = 'http://localhost:3000/api/getPeriodosActualizacion';

function displayElement(elemento, display) {
    document.getElementById(elemento).style.display = display;
}

function redirect(link) {
    window.location.href = link;
}
document.addEventListener("DOMContentLoaded", getFechaFin);

function getFechaFin() {
    fetch(urlGetPeriodosActualizacion, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            cambiarVista(data);
        })
        .catch(error => {
            console.error(error);
        });
}

function cambiarVista(data) {
    let fechaFin = data[0].fechaFin;
    let fechaFinDate = new Date(fechaFin);
    let fechaActual = new Date();
    if (fechaFinDate < fechaActual) {
        displayElement('container', '');
        displayElement('container2', 'none');
    } else {
        displayElement('container2', '');
        displayElement('container', 'none');
    }
}