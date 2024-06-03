let cortesEnCompras = localStorage.getItem('cortes-en-compras')
cortesEnCompras = JSON.parse(cortesEnCompras)

const comprasVacio = document.querySelector('#compras-vacio')
const comprasCortes =document.querySelector('#compras-cortes')
const comprasAcciones = document.querySelector('#compras-acciones')
const comprasHechas = document.querySelector('#compras-comprado')
let corteEliminar = document.querySelectorAll('.compras-corte-eliminar')
const corteVaciar = document.querySelector('#compras-acciones-vaciar')
const comprasTotal = document.querySelector('#total')
const corteComprar = document.querySelector('#compras-acciones-comprar')

function cargarCompras() {
    if (cortesEnCompras && cortesEnCompras.length > 0) {

        comprasVacio.classList.add('disabled')
        comprasCortes.classList.remove('disabled')
        comprasAcciones.classList.remove('disabled')
        comprasHechas.classList.add('disabled')
    
        comprasCortes.innerHTML = ''
    
        cortesEnCompras.forEach(corte => {
            const div = document.createElement('div')
            div.classList.add('compras-corte')
            div.innerHTML = `
                <img class="compras-corte-imagen" src="${corte.imagen}" alt="${corte.titulo}">
                <div class="compras-corte-titulo">
                    <h3>${corte.titulo}</h3>
                </div>
                <div class="compras-corte-precio">
                    <small>Duración</small>
                    <p>${corte.tiempo} min.</p>
                </div>
                <div class="compras-corte-precio">
                    <small>Precio</small>
                    <p>$${corte.precio}</p>
                </div>
                <div class="compras-corte-subtotal">
                    <small>Subtotal</small>
                    <p>$${corte.precio * corte.cantidad}</p>
                </div>
                <button class="compras-corte-eliminar" id="${corte.id}"><i class="bi bi-trash-fill"></i></button>
                </div>
            `
            comprasCortes.append(div)
            console.log(cortesEnCompras)
    
        })
    
    } else {
        comprasVacio.classList.remove('disabled')
        comprasCortes.classList.add('disabled')
        comprasAcciones.classList.add('disabled')
        comprasHechas.classList.add('disabled')
    }
    nuevosCortesEliminar()
    nuevoTotal()
}

cargarCompras()


function nuevosCortesEliminar() {
    corteEliminar = document.querySelectorAll('.compras-corte-eliminar')

    corteEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarCompra)
    })
}

function eliminarCompra(e) {
    const idCorte = e.currentTarget.id
    const i = cortesEnCompras.find(corte => corte.id === idCorte)

    cortesEnCompras.splice(i, 1)
    cargarCompras()

    localStorage.setItem('cortes-en-compras', JSON.stringify(cortesEnCompras))

}

corteVaciar.addEventListener('click', vaciarCompras)
function vaciarCompras() {
    cortesEnCompras.length = 0
    localStorage.setItem('cortes-en-compras', JSON.stringify(cortesEnCompras))
    cargarCompras()
}

function nuevoTotal() {
    const totalCalculado = cortesEnCompras.reduce((acc, corte) => acc + (corte.precio * corte.cantidad), 0)
    total.innerText = `$${totalCalculado}`
}

corteComprar.addEventListener('click', comprarCarrito)
function comprarCarrito() {
    cortesEnCompras.length = 0
    localStorage.setItem('cortes-en-compras', JSON.stringify(cortesEnCompras))
    
    comprasVacio.classList.add('disabled')
    comprasCortes.classList.add('disabled')
    comprasAcciones.classList.add('disabled')
    comprasHechas.classList.remove('disabled')
}