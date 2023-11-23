let productos = [];

fetch("../js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesMenu = document.querySelectorAll(".boton-menu");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
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
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosCarrito;

let productosCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosCarritoLS) {
    productosCarrito = JSON.parse(productosCarritoLS);
    actualizarNumerito();
} else {
    productosCarrito = [];
}


function agregarAlCarrito(e) {
    Toastify({
        text: "Agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #a3b18a, #3a5a40)",
            color: "#dad7cd",
            borderRadius: "2rem",
        },
        onClick: function () {} // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosCarrito.some(producto => producto.id === idBoton)) {
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


