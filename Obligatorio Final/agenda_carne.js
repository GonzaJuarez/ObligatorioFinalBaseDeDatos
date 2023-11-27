const urlPostReserva = "http://localhost:3000/api/postAgenda";

async function botonReservar() {
    const fecha = document.getElementById("calendario_reserva").value;
    const hora = document.getElementById("horas_disp").value;
    console.log(fecha + " " + hora);
    if (fecha != "" && hora != "") {
        const reserva = {
            "nro": hora,
            "ci": 1234567, // CEDULA DE PRUEBA. CAMBIAR POR LA DEL USUARIO LOGUEADO
            "fch_agenda": fecha,
        }
        try {
            const reservaCreada = await postReserva(reserva);
            console.log(reservaCreada);
            if (reservaCreada && reservaCreada.error === false) {
                document.getElementById("calendario_reserva").value = "";
                document.getElementById("horas_disp").value = "";
                alert("Reserva creada con éxito");
            } else {
                alert("Hubo un error al crear la reserva");
            }
        }
        catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un error en la solicitud");
        }
    } else {
        alert("Debe seleccionar una fecha y una hora");
    }
}

function postReserva(reserva) {
    return fetch(urlPostReserva, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reserva),
    }).then((response) => response.json());
}

function getHorasByDate(fecha) {
    console.log(fecha);
    return fetch("http://localhost:3000/api/getAgendas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fecha }),
    }).then((response) => response.json());
}