const ci = localStorage.getItem("ci");
const urlPostReserva = "http://localhost:3000/api/postAgenda";
const urlGetPeriodos = "http://localhost:3000/api/getPeriodosActualizacion";
const urlGetFuncionarioRol = "http://localhost:3000/api/getFuncionarioRol/" + ci;
const urlputPeriodoActualizacion = "http://localhost:3000/api/putPeriodoActualizacion";

addEventListener("DOMContentLoaded", () => {
    const ci = localStorage.getItem("ci");
    getRolByCi(ci).then((rol) => {
        console.log("rol", rol);
        if (rol.error == true) {
            console.log("error: ", rol);
            document.getElementById("actualizar_fecha").style.display = "none";
        } else {
            console.log("encontrado ", rol.RolId)
            if (rol.RolId == 1) {
                document.getElementById("actualizar_fecha").style.display = "";
                console.log("admin");
            } else {
                document.getElementById("actualizar_fecha").style.display = "none";
            }
            
        }
    });
});


function getRolByCi(ci) {
    return fetch("http://localhost:3000/api/getFuncionarioRol/" + ci, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

getPeriodosActualizacion().then((periodos) => {
    console.log(periodos);
    const fechaInicio = getFechaInicio(periodos);
    const fechaFin = getFechaFin(periodos);
    document.getElementById("calendario_reserva").setAttribute("min", fechaInicio);
    document.getElementById("calendario_reserva").setAttribute("max", fechaFin);
    document.getElementById("calendario_admin").setAttribute("min", fechaFin);
    displayAdminView();

});


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
            postReserva(reserva).then((reservaCreada) => {
                // Resolve getPeriodosActualizacion() promise
                getPeriodosActualizacion().then((periodos) => {
                    console.log(getFechaInicio(periodos));
                    console.log("reserva", reservaCreada);
                    if (reservaCreada && reservaCreada.error === false) {
                        document.getElementById("calendario_reserva").value = "";
                        document.getElementById("horas_disp").value = "";
                        alert("Reserva creada con éxito");
                        window.location.href = "./ficha_funcionarios.html";
                    } else {
                        alert("Hubo un error al crear la reserva");
                    }
                }).catch((error) => {
                    console.error("Error en la solicitud:", error);
                    alert("Hubo un error en la solicitud");
                });
            }).catch((error) => {
                console.error("Error en la solicitud:", error);
                alert("Hubo un error en la solicitud");
            });
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

async function getPeriodosActualizacion() {
    try {
        return fetch(urlGetPeriodos, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());

    } catch (error) {
        console.error("Error in request:", error);
        alert("There was an error in the request");
    }
}

function getFechaInicio(periodos) {
    return periodos[0].Fch_Inicio.toString().split("T")[0];
}

function getFechaFin(periodos) {
    return periodos[0].Fch_Fin.toString().split("T")[0];
}

async function displayAdminView() {
    const adminView = document.getElementById("admin_view");
    console.log("adminView", adminView);
    const funcionarioRol = await getFuncionarioRol().then((funcionarioRol) => funcionarioRol);
    console.log("funcionarioRol", funcionarioRol);
    console.log("funcionarioRol.RolId", funcionarioRol.RolId);
    if (funcionarioRol.RolId === 1) {
        adminView.style.display = "block";
    } else {
        adminView.style.display = "none";
    }
}

function modificarFechaFin() {
    const nuevaFecha = document.getElementById("calendario_admin").value;
    const fechaInicio = document.getElementById("calendario_reserva").getAttribute("min");
    if (nuevaFecha != "" && nuevaFecha != null) {
        document.getElementById("calendario_reserva").setAttribute("max", nuevaFecha);
        try {
            return fetch(urlputPeriodoActualizacion + "/" + fechaInicio, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "fch_fin": nuevaFecha }),
            }).then((response) => response.json());
        } catch (error) {
            console.error("Error in request:", error);
            alert("There was an error in the request");
        }
    }
    return null;
}

function getFuncionarioRol() {
    return fetch(urlGetFuncionarioRol, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
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

function actualizarHoras(date) {
    getHorasByDate(date).then((horas) => {
        console.log(horas);
        const horasDisp = document.getElementById("horas_disp");
        horasDisp.innerHTML = "";
        horas.forEach((hora) => {   
            const option = document.createElement("option");
            option.value = hora.nro;
            option.innerHTML = hora.nro;
            horasDisp.appendChild(option);
        });
    });
}