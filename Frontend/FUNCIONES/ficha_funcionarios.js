const ci = localStorage.getItem("ci");
const urlGetFuncionarioByCi = 'http://localhost:3000/API/getFuncionarioByCi/'+ci;
const urlPutFuncionario = 'http://localhost:3000/api/putFuncionario/'+ci;
const urlGetCarnetDeSalud = 'http://localhost:3000/api/getCarnetSaludByCi/'+ci;
const urlPutCarnetDeSalud = 'http://localhost:3000/api/putCarnetSalud/'+ci;
const urlPostCarnetDeSalud = 'http://localhost:3000/api/postCarnetSalud';

function redirect(link){
    window.location.href = link;
}

async function cargarDatos() {
    try {
        const funcionario = await getFuncionarioByCi();
        const carnet = await getCarnetDeSaludByCi();
        if (funcionario && carnet) {
            const fecha = formatearFecha(funcionario[0]?.Fch_Nacimiento);
            document.getElementById("ci").value = funcionario[0]?.Ci;
            document.getElementById("nombre").value = funcionario[0]?.Nombre;
            document.getElementById("apellido").value = funcionario[0]?.Apellido;
            document.getElementById("fch_Nacimiento").value = fecha;
            document.getElementById("dir").value = funcionario[0]?.Direccion;
            document.getElementById("telefono").value = funcionario[0]?.Telefono;
            document.getElementById("email").value = funcionario[0]?.Email;
            document.getElementById("fch_Emision").value = carnet[0]?.Fch_Emision;
            document.getElementById("fch_Vencimiento").value = carnet[0]?.Fch_Vencimiento;
            //document.getElementById("comprbante").value = carnet[0]?.Comprobante;
        } else {
            alert("Hubo un error al cargar los datos");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un error en la solicitud");
    }
}

function botonEditarDatosPersonales() {
    document.getElementById("ci").disabled = false;
    document.getElementById("nombre").disabled = false;
    document.getElementById("apellido").disabled = false;
    document.getElementById("fch_Nacimiento").disabled = false;
    document.getElementById("dir").disabled = false;
    document.getElementById("telefono").disabled = false;
    document.getElementById("email").disabled = false;
    const boton = document.getElementById("botonEditDatosPersonales");
    boton.onclick = botonGuardarDatosPersonales;
    boton.innerHTML = "Guardar";
}

async function botonGuardarDatosPersonales() {
    const ci = document.getElementById("ci");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    let fch_nacimiento = document.getElementById("fch_Nacimiento");
    const dir = document.getElementById("dir");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");
    const funcionarioCi = await getFuncionarioByCi();
    const Fch_nacimiento = reformatearFecha(fch_nacimiento.value.toString());

    const funcionario = {
        "ci": ci.value.toString(),
        "nombre": nombre.value.toString(),
        "apellido": apellido.value.toString(),
        "fecha_nacimiento": Fch_nacimiento,
        "direccion": dir.value.toString(),
        "telefono": telefono.value.toString(),
        "email": email.value.toString(),
        "logid": funcionarioCi[0]?.LogId
    };

    if (ci.value.toString() === "" || nombre.value.toString() === "" || apellido.value.toString() === "" || fch_nacimiento.value.toString() === "" || dir.value.toString() === "" || telefono.value.toString() === "" || email.value.toString() === "") {
        alert("Debe completar todos los campos");
    } else {
        try {
            const result = await putFuncionario(funcionario);
            if (!result?.error) {
                document.getElementById("ci").disabled = true;
                document.getElementById("nombre").disabled = true;
                document.getElementById("apellido").disabled = true;
                document.getElementById("fch_Nacimiento").disabled = true;
                document.getElementById("dir").disabled = true;
                document.getElementById("telefono").disabled = true;
                document.getElementById("email").disabled = true;
                const boton = document.getElementById("botonEditDatosPersonales");
                boton.onclick = botonEditarDatosPersonales;
                boton.innerHTML = "Editar";
                alert("Datos actualizados con éxito");
            } else {
                alert("Hubo un error al actualizar los datos");
                console.log(result);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un error en la solicitud");
        }
    }
}

async function botonEditarCarnetSalud() {
    document.getElementById("fch_Emision").disabled = false;
    document.getElementById("fch_Vencimiento").disabled = false;
    const boton = document.getElementById("botonEditCarnetSalud");
    boton.onclick = botonGuardarCarnetSalud;
    boton.innerHTML = "Guardar";
}

async function botonGuardarCarnetSalud() {
    const carnetSalud = await getCarnetDeSaludByCi();
    const ci = document.getElementById("ci").value.toString();
    const fch_Emision = document.getElementById("fch_Emision");
    const fch_Vencimiento = document.getElementById("fch_Vencimiento");
    console.log(fch_Emision)
    console.log(fch_Vencimiento)
    const carnet = {
        "Ci": ci,
        "Fch_Emision": reformatearFecha(fch_Emision.value.toString()),
        "Fch_Vencimiento": reformatearFecha(fch_Vencimiento.value.toString()),
        "Comprobante": carnetSalud[0]?.Comprobante
    };

    if (fch_Emision.value.toString() === "" || fch_Vencimiento.value.toString() === "") {
        alert("Debe completar todos los campos");
    } else {
        try {
            const result = await putCarnetDeSalud(carnet).then(r => console.log("Datos actualizados"));
            if (!result?.error) {
                document.getElementById("fch_Emision").disabled = true;
                document.getElementById("fch_Vencimiento").disabled = true;
                const boton = document.getElementById("botonEditCarnetSalud");
                boton.onclick = botonEditarCarnetSalud;
                boton.innerHTML = "Editar";
                alert("Datos actualizados con éxito");
            } else {
                alert("Hubo un error al actualizar los datos");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un error en la solicitud");
        }
    }
}

// Quiero hacer una funcion que abra el modal con el id modalAgregarCarnet y que me permita edutar los datos

async function botonAgregarCarnetSalud() {
    const ci = document.getElementById("ci").value.toString();
    const fch_Emision = document.getElementById("fch_Emision");
    const fch_Vencimiento = document.getElementById("fch_Vencimiento");
    const carnet = {
        "Ci": ci,
        "Fch_Emision": reformatearFecha(fch_Emision.value.toString()),
        "Fch_Vencimiento": reformatearFecha(fch_Vencimiento.value.toString()),
        "Comprobante": null
    };

    if (fch_Emision.value.toString() === "" || fch_Vencimiento.value.toString() === "") {
        alert("Debe completar todos los campos");
    } else {
        try {
            const result = await postCarnetDeSalud(carnet).then(r => console.log("Datos actualizados"));
            if (!result?.error) {
                alert("Datos actualizados con éxito");
            } else {
                alert("Hubo un error al actualizar los datos");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un error en la solicitud");
        }
    }
}

function botonLogOut() {
    localStorage.removeItem("ci");
    window.location.href = "./login.html";
}

function getFuncionarioByCi() {
    return fetch(urlGetFuncionarioByCi)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    });
}

function putFuncionario(funcionario) {
    return fetch(urlPutFuncionario, {
        method: "PUT",
        body: JSON.stringify(funcionario),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
    });
}

function getCarnetDeSaludByCi() {
    return fetch(urlGetCarnetDeSalud)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    });
}

function postCarnetDeSalud(carnet) {
    return fetch(urlPostCarnetDeSalud, {
        method: "POST",
        body: JSON.stringify(carnet),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
    });
}

function putCarnetDeSalud(carnet) {
    return fetch(urlPutCarnetDeSalud, {
        method: "PUT",
        body: JSON.stringify(carnet),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
    });
}

function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
}

function reformatearFecha(fechaString) {
    const fecha = fechaString.split("/");
    const dia = fecha[0];
    const mes = fecha[1];
    const año = fecha[2];
    return `${año}-${mes}-${dia}`;
}

cargarDatos().then(r => console.log("Datos cargados"));