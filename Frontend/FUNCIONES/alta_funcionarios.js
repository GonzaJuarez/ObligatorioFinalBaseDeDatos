const urlPostFuncionarios = "http://localhost:3000/api/postFuncionario";
const urlPostLogin = "http://localhost:3000/api/postLogin";

async function botonCrearFuncionario() {
    const ci = document.getElementById("ci").value;
    const nombre = document.getElementById("nombre").value.toString();
    const apellido = document.getElementById("apellido").value.toString();
    const fch_nacimiento = document.getElementById("fch_Nacimiento").value.toString();
    const dir = document.getElementById("dir").value.toString();
    const telefono = document.getElementById("telefono").value.toString();
    const email = document.getElementById("email").value.toString();
    const password = document.getElementById("password").value.toString();
    const password1 = document.getElementById("password1").value.toString();

    const login = {
        "logid": ci.toString(),
        "password": password
    };

    const funcionario = {
        "ci": ci,
        "nombre": nombre,
        "apellido": apellido,
        "fecha_nacimiento": fch_nacimiento,
        "direccion": dir,
        "telefono": telefono,
        "email": email,
        "logid": ci.toString()
    };
    if (ci === "" || nombre === "" || apellido === "" || fch_nacimiento === "" || dir === "" || telefono === "" || email === "" || password === "" || password1 === "") {
        alert("Debe completar todos los campos");
    } else if (password !== password1) {
        alert("Las contraseñas no coinciden");
    } else {
        try {
            const loginCreado = await postLogin(login);
            const funcionarioCreado = await postFuncionario(funcionario);
            console.log(funcionarioCreado);
            console.log(loginCreado);
            if (funcionarioCreado && loginCreado && funcionarioCreado.error === false && loginCreado.error === false) {
                document.getElementById("ci").value = "";
                document.getElementById("nombre").value = "";
                document.getElementById("apellido").value = "";
                document.getElementById("fch_Nacimiento").value = "";
                document.getElementById("dir").value = "";
                document.getElementById("telefono").value = "";
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                document.getElementById("password1").value = "";
                alert("Funcionario creado con éxito");
                window.location.href = "./login.html";
            } else {
                alert("Hubo un error al crear el funcionario");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un error en la solicitud");
        }
    }
}
function postFuncionario(funcionario) {
    return fetch(urlPostFuncionarios, {
        method: "POST",
        body: JSON.stringify(funcionario),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    });
}

function postLogin(login) {
    return fetch(urlPostLogin, {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    });
}