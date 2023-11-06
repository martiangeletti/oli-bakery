// PRODUCTOS
const productos = [
    //tortas
    {
        id:"cheescake",
        titulo:"Cheescake",
        imagen: "../img/Cheescake.png",
        categoria: {
            nombre: "Tortas",
            id: "tortas"
        },
        descripcion: "Base de galletita, crema de queso alimonada y reducción de frutos rojos",
        precio: 6000
    },
    {
        id:"chocotorta",
        titulo:"Chocotorta",
        imagen: "../img/Chocotorta.png",
        categoria: {
            nombre: "Tortas",
            id: "tortas"
        },
        descripcion: "Postre clásico, con galletitas caseras",
        precio: 1000
    },
    {
        id:"tarta-toffe",
        titulo:"Tarta toffe",
        imagen: "../img/TartaToffe.png",
        categoria: {
            nombre: "Tortas",
            id: "tortas"
        },
        descripcion: "Base de brownie de chocolate semiamargo, dulce de leche, crema chantillí e hilos de chocolate",
        precio: 1000
    },

    //alfajores
    {
        id:"alfajor-chocolate",
        titulo:"Alfajor de chocolate",
        imagen: "../img/AlfajorChocolate.png",
        categoria: {
            nombre: "Alfajores",
            id: "alfajores"
        },
        descripcion: "Masa de cookie con chips rellenos de mucho dulce de leche",
        precio: 6000
    },
    {
        id:"alfajor-maicena",
        titulo:"Alfajor de maicena",
        imagen: "../img/AlfajorMaicena.png",
        categoria: {
            nombre: "Alfajores",
            id: "alfajores"
        },
        descripcion: "Clásicos con mucho dulce de leche",
        precio: 1000
    },
    {
        id:"alfajor-nuez",
        titulo: "Alfajor de nuez",
        imagen: "../img/AlfajorNuez.png",
        categoria: {
            nombre: "Alfajores",
            id: "alfajores"
        },
        descripcion: "De harina de nuez, dulce de leche y nueces trituradas. Nuestro preferido",
        precio: 1500
    },
    //salado
    {
        id:"chipa",
        titulo:"Chipa",
        imagen: "../img/Chipa.png",
        categoria: {
            nombre: "Salados",
            id: "salados"
        },
        descripcion: "1/4 hechos o congelados",
        precio: 1500
    },
    {
        id:"chipa-sandwich",
        titulo:"Chipa sandwich",
        imagen: "../img/ChipaSandwich.png",
        categoria: {
            nombre: "Salados",
            id: "salados"
        },
        descripcion: "De jamón y queso",
        precio: 1500
    },
    {
        id:"scon",
        titulo:"Scon de queso",
        imagen: "../img/SconDeQueso.png",
        categoria: {
            nombre: "Salados",
            id: "salados"
        },
        descripcion: "Para comer calentito",
        precio: 1500
    },
    //pan de molde
    {
        id:"pan-blanco",
        titulo:"Pan de molde blanco",
        imagen: "../img/PanBlanco.png",
        categoria: {
            nombre: "Panes",
            id: "panes"
        },
        descripcion: "Clásico, super esponjoso",
        precio: 1500
    },
    {
        id:"pan-proteico",
        titulo:"Pan de molde proteico",
        imagen: "../img/PanProteico.png",
        categoria: {
            nombre: "Panes",
            id: "panes"
        },
        descripcion: "Harina de sorgo, chía, sarraceno,quinoa y arroz integral",
        precio: 1500
    },
    {
        id:"pan-semillas",
        titulo:"Pan de molde con semillas",
        imagen: "../img/PanSemillas.png",
        categoria: {
            nombre: "Panes",
            id: "panes"
        },
        descripcion: "Con trigo sarraceno y mix de semillas",
        precio: 1500
    },
]


// se cargan todos los productos de los arrays 


const contenedorProductos = document.querySelector ("#contenedor-productos");
const botonesMenu = document.querySelectorAll (".boton-menu");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll (".producto-agregar");
const numerito = document.querySelector("#numerito");



function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="">
            <div class="producto-detalles">
                <h3 class="producto-titulo">
                    ${producto.titulo}
                </h3>
                <p class="producto-descripcion">
                    ${producto.descripcion}
                </p>
                <p class="producto-precio">
                    $${producto.precio}
                </p>
                <button class="producto-agregar" id="${producto.id}">Agregar al carrito</button>
            </div>
            `;

            contenedorProductos.append(div);
    })

    actualizarAgregar();
}


cargarProductos(productos);

botonesMenu.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesMenu.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarAgregar() {
    botonesAgregar = document.querySelectorAll (".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

const productosCarrito = [];

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosCarrito.some(producto => producto.id === idBoton)) {
        const index = productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));

}

function actualizarNumerito() {
    let nuevoNumerito = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}