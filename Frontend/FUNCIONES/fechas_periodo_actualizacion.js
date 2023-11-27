let urlPutFechas = "http://localhost:3000/api/putFechas";
let urlGetFechas = "http://localhost:3000/api/getFechas";

document.addEventListener("DOMContentLoaded", asignarFechas);

function limitarFechas() {
    let fecha_inicio = document.getElementById("fec_inicio").value;
    let fecha_fin = document.getElementById("fec_fin").value;
    document.getElementById("fec_inicio").setAttribute("max", fecha_fin);
    document.getElementById("fec_fin").setAttribute("min", fecha_inicio);
}

async function botonGuardar() {
    let fec_inicio = document.getElementById("fec_inicio").value;
    let fec_fin = document.getElementById("fec_fin").value;
    if (fec_inicio != "" && fec_fin != "") {
        const fechas = {
            "fec_inicio": fec_inicio,
            "fec_fin": fec_fin
        }
        try {
            const cambioFechas = await putFechas(fechas);
            console.log(cambioFechas);
            if (cambioFechas && cambioFechas.error === false) {
                alert("Reserva creada con éxito");
                window.location.href = "./ficha_funcionarios.html";
            } else {
                alert("Hubo un error al cambiar las fechas del periodo de actualización");
            }
        }
        catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un error en la solicitud");
        }
    } else {
        alert("Debe seleccionar una fecha de inicio y de fin");
    }
}

function putFechas(fechas) {
    return fetch(urlPutFechas, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fechas),
    }).then((response) => response.json());
}

async function getFechas() {
    let response = await fetch(urlGetFechas, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    let data = await response.json();
    return data;
}

async function asignarFechas() {
    console.log("asignar fechas");
    let fechas = await getFechas();
    document.getElementById("fec_inicio").value = fechas.fecha_inicio;
    document.getElementById("fec_fin").value = fechas.fecha_fin;
}