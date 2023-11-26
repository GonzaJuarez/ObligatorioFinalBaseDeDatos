const urlConfirmLogin = "http://localhost:3000/api/confirmLogin";

async function botonLogin() {
    const usuario = document.getElementById("usuario").value.toString();
    const password = document.getElementById("password").value;

    const log = {
        "ci": usuario,
        "password": password
    };

    if (usuario === "" || password === "") {
        alert("Debe completar todos los campos");
    } else {
        try {
            const login = await confirmLogin(log);

            console.log(login);

            if (login && login.error === false) {
                document.getElementById("usuario").value = ""
                window.location.href = "./ficha_funcionarios.html";
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un error en la solicitud");
        }
    }
}

function confirmLogin(log) {
    return fetch(urlConfirmLogin, {
        method: "POST",
        body: JSON.stringify(log),
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