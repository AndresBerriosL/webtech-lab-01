const cursos = [
    {
        nombre: "Sistemas Operativos",
        categoria: "Computación",
        descripcion: "Curso sobre procesos, memoria, concurrencia y funcionamiento de sistemas operativos."
    },
    {
        nombre: "Programación de Bajo Nivel",
        categoria: "Programación",
        descripcion: "Curso enfocado en programación cercana al funcionamiento del computador."
    },
    {
        nombre: "Estructuras de Datos y Algoritmos",
        categoria: "Computación",
        descripcion: "Curso sobre estructuras de datos y algoritmos para resolver problemas."
    },
    {
        nombre: "Bases de Datos",
        categoria: "Computación",
        descripcion: "Curso sobre diseño, organización y uso de bases de datos."
    },
    {
        nombre: "Inteligencia Artificial",
        categoria: "Inteligencia Artificial",
        descripcion: "Curso sobre técnicas y aplicaciones de inteligencia artificial."
    },
    {
        nombre: "Algoritmos y Programación Competitiva",
        categoria: "Programación",
        descripcion: "Curso enfocado en algoritmos y resolución eficiente de problemas."
    }
];
const listaCursos = document.querySelector("#lista-cursos");
const filtroCursos = document.querySelector("#filtro-cursos");

const formCurso = document.querySelector("#form-curso");
const nombreCurso = document.querySelector("#nombre-curso");
const categoriaCurso = document.querySelector("#categoria-curso");
const descripcionCurso = document.querySelector("#descripcion-curso");


let siguienteId = 1;

for (const curso of cursos) {
    curso.id = siguienteId;
    siguienteId++;
}


function crearCurso(curso) {
    const articulo = document.createElement("article");
    articulo.dataset.id = curso.id;

    const titulo = document.createElement("h3");
    titulo.textContent = curso.nombre;

    const categoria = document.createElement("p");
    categoria.textContent = "Categoría: " + curso.categoria;

    const descripcion = document.createElement("p");
    descripcion.textContent = curso.descripcion;

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("eliminar-curso");

    articulo.appendChild(titulo);
    articulo.appendChild(categoria);
    articulo.appendChild(descripcion);
    articulo.appendChild(botonEliminar);

    return articulo;
}


function mostrarCursos(lista) {
    listaCursos.textContent = "";

    if (lista.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No se encontraron cursos.";
        listaCursos.appendChild(mensaje);
        return;
    }

    for (const curso of lista) {
        const articulo = crearCurso(curso);
        listaCursos.appendChild(articulo);
    }
}


function actualizarCursos() {
    const texto = filtroCursos.value.toLowerCase();

    const cursosFiltrados = cursos.filter(function (curso) {
        return curso.nombre.toLowerCase().includes(texto);
    });

    mostrarCursos(cursosFiltrados);
}


filtroCursos.addEventListener("input", actualizarCursos);


formCurso.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = nombreCurso.value.trim();
    const categoria = categoriaCurso.value.trim();
    const descripcion = descripcionCurso.value.trim();

    if (nombre === "" || categoria === "" || descripcion === "") {
        return;
    }

    const nuevoCurso = {
        id: siguienteId,
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion
    };

    siguienteId++;

    cursos.push(nuevoCurso);

    formCurso.reset();

    actualizarCursos();
});


listaCursos.addEventListener("click", function (event) {
    if (!event.target.classList.contains("eliminar-curso")) {
        return;
    }

    const articulo = event.target.closest("article");
    const id = Number(articulo.dataset.id);

    const indice = cursos.findIndex(function (curso) {
        return curso.id === id;
    });

    if (indice !== -1) {
        cursos.splice(indice, 1);
    }

    actualizarCursos();
});


mostrarCursos(cursos);

const formContacto = document.querySelector("#form-contacto");

const nombreContacto = document.querySelector("#nombre");
const emailContacto = document.querySelector("#email");
const mensajeContacto = document.querySelector("#mensaje");

const errorNombre = document.querySelector("#error-nombre");
const errorEmail = document.querySelector("#error-email");
const errorMensaje = document.querySelector("#error-mensaje");

const confirmacionContacto = document.querySelector("#confirmacion-contacto");


function emailValido(email) {
    return email.includes("@") && email.includes(".");
}


formContacto.addEventListener("submit", function (event) {
    event.preventDefault();

    let formularioValido = true;

    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorMensaje.textContent = "";
    confirmacionContacto.textContent = "";

    nombreContacto.removeAttribute("aria-invalid");
    emailContacto.removeAttribute("aria-invalid");
    mensajeContacto.removeAttribute("aria-invalid");


    if (nombreContacto.value.trim() === "") {
        errorNombre.textContent = "Ingresa tu nombre.";
        nombreContacto.setAttribute("aria-invalid", "true");
        formularioValido = false;
    }

    if (!emailValido(emailContacto.value.trim())) {
        errorEmail.textContent = "Ingresa un correo válido.";
        emailContacto.setAttribute("aria-invalid", "true");
        formularioValido = false;
    }

    if (mensajeContacto.value.trim() === "") {
        errorMensaje.textContent = "Escribe un mensaje.";
        mensajeContacto.setAttribute("aria-invalid", "true");
        formularioValido = false;
    }


    if (formularioValido) {
        confirmacionContacto.textContent = "Mensaje enviado correctamente.";
        formContacto.reset();
    }
});

const botonTema = document.querySelector("#boton-tema");

botonTema.addEventListener("click", function () {
    document.body.classList.toggle("tema-oscuro");

    const oscuro = document.body.classList.contains("tema-oscuro");

    botonTema.setAttribute("aria-pressed", oscuro);
});

nombreContacto.addEventListener("input", function () {
    if (nombreContacto.value.trim() !== "") {
        errorNombre.textContent = "";
        nombreContacto.removeAttribute("aria-invalid");
    }
});

emailContacto.addEventListener("input", function () {
    if (emailValido(emailContacto.value.trim())) {
        errorEmail.textContent = "";
        emailContacto.removeAttribute("aria-invalid");
    }
});

mensajeContacto.addEventListener("input", function () {
    if (mensajeContacto.value.trim() !== "") {
        errorMensaje.textContent = "";
        mensajeContacto.removeAttribute("aria-invalid");
    }
});