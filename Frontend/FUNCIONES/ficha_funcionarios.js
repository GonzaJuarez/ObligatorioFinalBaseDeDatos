const ci = localStorage.getItem("ci");
const urlGetFuncionarioByCi = 'http://localhost:3000/API/getFuncionarioByCi/'+ci;
const urlPutFuncionario = 'http://localhost:3000/api/putFuncionario/'+ci;

async function cargarDatos() {
    try {
        const funcionario = await getFuncionarioByCi();
        console.log(funcionario);
        if (funcionario) {
            const fecha = formatearFecha(funcionario[0]?.Fch_Nacimiento);
            document.getElementById("ci").value = funcionario[0]?.Ci;
            document.getElementById("nombre").value = funcionario[0]?.Nombre;
            document.getElementById("apellido").value = funcionario[0]?.Apellido;
            document.getElementById("fch_Nacimiento").value = fecha;
            document.getElementById("dir").value = funcionario[0]?.Direccion;
            document.getElementById("telefono").value = funcionario[0]?.Telefono;
            document.getElementById("email").value = funcionario[0]?.Email;
            localStorage.removeItem("ci")
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
    const boton = document.getElementById("botonEdit");
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

    const funcionarioCi = await getFuncionarioByCi()
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
            await putFuncionario(funcionario).then(r => console.log("Datos actualizados"));
            document.getElementById("ci").disabled = true;
            document.getElementById("nombre").disabled = true;
            document.getElementById("apellido").disabled = true;
            document.getElementById("fch_Nacimiento").disabled = true;
            document.getElementById("dir").disabled = true;
            document.getElementById("telefono").disabled = true;
            document.getElementById("email").disabled = true;
            const boton = document.getElementById("botonEdit");
            boton.onclick = botonEditarDatosPersonales;
            boton.innerHTML = "Editar";
            alert("Datos actualizados con éxito");
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un error en la solicitud");
        }
    }
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

function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
}

function reformatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const anio = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
}

cargarDatos().then(r => console.log("Datos cargados"));