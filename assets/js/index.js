const propiedadesJSON = [
    {
        name: "Casa de campo",
        description: "Un lugar ideal para descansar de la ciudad",
        src: "https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg",
        rooms: 2,
        m: 170,
    },
    {
        name: "Casa de playa",
        description: "Despierta tus días oyendo el oceano",
        src: "https://media.chvnoticias.cl/2018/12/casas-en-la-playa-en-yucatan-2712.jpg",
        rooms: 2,
        m: 130,
    },
    {
        name: "Casa en el centro",
        description: "Ten cerca de ti todo lo que necesitas",
        src: "https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg",
        rooms: 1,
        m: 80,
    },
    {
        name: "Casa rodante",
        description: "Conviertete en un nómada del mundo sin salir de tu casa",
        src: "https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg",
        rooms: 1,
        m: 6,
    },
    {
        name: "Departamento",
        description: "Desde las alturas todo se ve mejor",
        src: "https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg",
        rooms: 3,
        m: 200,
    },
    {
        name: "Mansión",
        description: "Vive una vida lujosa en la mansión de tus sueños ",
        src: "https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg",
        rooms: 5,
        m: 500,
    },
];

// -------------------------------------------

window.onload = () => {
    cargarPropiedades();
};

// Creación de plantilla literal reutilizable
function plantillaLiteral(prop) {
    let plantilla = `
        <div class="propiedad">
            <div
                class="img"
                style="
                    background-image: url('${prop.src}');
                "
            ></div>
            <section class=" seccion-card d-flex flex-column justify-content-between">
                <h5>${prop.name}</h5>
                <div class="d-flex justify-content-between">
                    <p>Cuartos: ${prop.rooms}</p>
                    <p>Metros: ${prop.m}</p>
                </div>
                <p class="my-3">${prop.description}</p>
                <button class="btn btn-info">Ver más</button>
            </section>
        </div>
    `;
    return plantilla;
}

function cargarPropiedades() {
    let html = "";
    let contenedorPropiedades = document.querySelector(".propiedades");

    for (let propiedad of propiedadesJSON) {
        html += plantillaLiteral(propiedad);
    }
    contenedorPropiedades.innerHTML = html;

    // Para visualizar la cantidad total de propiedades
    document.querySelector("#total-propiedades").innerHTML =
        propiedadesJSON.length;
}

// Validación del formulario de búsqueda
function validarCampos() {
    let numeroCuartos = document.querySelector("#numero-cuartos");
    let limiteInferiorMt2 = document.querySelector("#limite-inferior-mt2");
    let limiteSuperiorMt2 = document.querySelector("#limite-superior-mt2");

    if (numeroCuartos.value === "") {
        alert("Debes ingresar el número de cuartos");
        numeroCuartos.focus();
        return false;
    } else if (limiteInferiorMt2.value === "") {
        alert("Debes ingresar la cantidad mínima de metros cuadrados");
        limiteInferiorMt2.focus();
        return false;
    } else if (limiteSuperiorMt2.value === "") {
        alert("Debes ingresar la cantidad máxima de metros cuadrados");
        limiteSuperiorMt2.focus();
        return false;

    // Una vez validados todos los campos, se llama a la función que filtra y muestra las propiedades según datos ingresados por usuario
    } else {
        filtrarPropiedades(
            Number.parseInt(numeroCuartos.value, 10),
            Number.parseInt(limiteInferiorMt2.value, 10),
            Number.parseInt(limiteSuperiorMt2.value, 10)
        );
    }
}

// Selección del botón para poder asociar evento 'click' y así llamar a la función creada anteriormente
document.querySelector("#buscar").addEventListener("click", () => {
    validarCampos();
});

// Función para mostrar propiedades filtradas según datos ingresados por usuario
function filtrarPropiedades(
    numeroCuartos,
    limiteInferiorMt2,
    limiteSuperiorMt2
) {
    let html = "";
    let contenedorPropiedades = document.querySelector(".propiedades");
    let contador = 0;

    for (let propiedad of propiedadesJSON) {
        if (
            numeroCuartos <= propiedad.rooms &&
            limiteInferiorMt2 <= propiedad.m &&
            limiteSuperiorMt2 >= propiedad.m
        ) {
            html += plantillaLiteral(propiedad);
            contador++;
        }
    }
    contenedorPropiedades.innerHTML = html;

    // Se actualiza la cantidad total de propiedades según filtrado
    document.querySelector("#total-propiedades").innerHTML = contador;
}
