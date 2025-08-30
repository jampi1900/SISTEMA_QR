const url = "https://65fb995014650eb2100a2bd2.mockapi.io/users";

https://mockapi.io/clone/68b1b5d2a860fe41fd5f58cf

// Funcionalidad para agregar persona
const form = document.querySelector("#todo-form");
const cardTitle = document.querySelector(".card-header");
const btnAdd = document.querySelector("#btn-add");
const inputNombre = document.querySelector("#nombre");
const inputEdad = document.querySelector("#edad");



// El contenido que quieres en el QR
    var id = "54321";  // Puede ser un ID, un texto o incluso una URL
    var qrText = id;

    // Crear el QR en el div "qrcode"
    var qrcode = new QRCode(document.getElementById("qrcode"), {
      text: qrText,
      width: 200,   // ancho del QR
      height: 200,  // alto del QR
    });

const addPersona = () => {
    const persona = {
        nombre: inputNombre.value,
        edad: Number(inputEdad.value)
    };
    
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(persona)
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Error al enviar los datos");
        }
        return res.json();
    }).then((res) => {
        console.log(res);
        alert("Persona registrada correctamente");
        clear();
        listPersonas();
    })
    .catch((err) => console.error(err));
}

const updatePersona = (id) => {
    const persona = {
        nombre: inputNombre.value,
        edad: Number(inputEdad.value),
    };

    fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(persona)
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Error al actualizar los datos");
        }
        return res.json();
    }).then((res) => {
        console.log(res);
        alert("Persona actualizada correctamente");
        clear();
        form.removeEventListener("submit", updatePersona);
        form.addEventListener("submit", addPersona);
        listPersonas();
    }).catch((err) => console.error(err));
}

// Forma 1 para registrar un formuario
/*btnAdd.addEventListener("click", () => {
});*/

// Forma 2 para registrar un formulario
form.addEventListener("submit", addPersona);

const clear = () => {
    inputNombre.value = "";
    inputEdad.value = "";

    cardTitle.innerHTML = "Registrar persona";
    btnAdd.classList.replace("btn-primary", "btn-success");
    btnAdd.innerHTML = "Registrar";
}

const listPersonas = async () => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Error al obtener los datos");
        }

        const personas = await res.json();
        const table = document.querySelector("#table-list tbody");
        table.innerHTML = "";

        personas.forEach((persona, index) => {
            table.innerHTML += `
                <td>${index + 1}</td>
                <td>${persona.nombre}</td>
                <td>${persona.edad}</td>
                <td>
                    <div class="d-flex">
                        <button class="btn btn-primary" onclick="editPersona(${persona.id})">Editar</button>
                        <button class="btn btn-danger ms-1" onclick="deletePersona(${persona.id})">Eliminar</button>
                    </div>
                </td>
            `;
        });
    } catch (err) {
        console.error(err);
    }
}

const editPersona = async (id) => {
    try {
        const res = await fetch(`${url}/${id}`);
        if (!res.ok) {
            throw new Error("Error al obtener los datos");
        }

        const persona = await res.json();
        inputNombre.value = persona.nombre;
        inputEdad.value = persona.edad;

        cardTitle.innerHTML = "Actualizar persona";
        btnAdd.classList.replace("btn-success", "btn-primary");
        btnAdd.innerHTML = "Actualizar";

        form.removeEventListener("submit", addPersona);
        form.addEventListener("submit", () => updatePersona(id));
    } catch (err) {
        console.error(err);
    }
}

const deletePersona = (id) => {
    fetch(`${url}/${id}`, {
        method: "DELETE"
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Error al eliminar los datos");
        }
        return res.json();
    }).then((res) => {
        console.log(res);
        alert("Persona eliminada correctamente");
        listPersonas();
    }).catch((err) => console.error(err));
}

listPersonas();