
const productosCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const carritoVacio = document.querySelector("#carrito-vacio")
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const carritoVaciar = document.querySelector("#carrito-acciones-vaciar");
const carritoTotal = document.querySelector("#total");

function cargarProductosCarrito() {
    if (productosCarrito && productosCarrito.length > 0) {
        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
    
        carritoProductos.innerHTML = "";

        productosCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class= "carrito-producto-cantidad">
                    <small>
                        Cantidad
                    </small>
                    <p>
                        ${producto.cantidad}
                    </p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button id="${producto.id}" class="carrito-producto-eliminar"><i class="bi bi-x-lg"></i></button>`;


        carritoProductos.append(div);


    })

    actualizarBotonesEliminar();

} else {
    carritoVacio.classList.remove("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.remove("disabled");

}
}

cargarProductosCarrito();


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {

    Toastify({
        text: "Eliminaste un producto del carrito",
        duration: 2000,
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
    const index = productosCarrito.findIndex(producto => producto.id === idBoton);

    productosCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
}
