let cortes = []

fetch('./js/productos.json')
    .then(response => response.json())
    .then(data => {
        cortes = data
        cargarCortes(cortes);
    })

const cortesEleccion = document.querySelector('#cortes-eleccion')
let corteAgregar = document.querySelectorAll('.corte-agregar')

function cargarCortes(corteElegidos) {

    cortesEleccion.innerHTML = ''
    corteElegidos.forEach(corte => {

        const div = document.createElement('div')
        div.classList.add('corte')
        div.innerHTML = `
            <img class="corte-imagen" width="230px" hight="200px" src="${corte.imagen}" alt="${corte.titulo}">
            <div class="corte-detalles">
                <h3 class="corte-titulo">${corte.titulo}</h3>
                <p class="corte-precio">$${corte.precio}</p>
                <p class="corte-precio"><i class="bi bi-clock"></i> ${corte.tiempo} min</p>
                <button id="${corte.id}" class="corte-agregar">Agregar</button>
            </div>
        `
        cortesEleccion.append(div)
    })
    
    nuevosCortesAgregar()
    
}

function nuevosCortesAgregar() {
    corteAgregar = document.querySelectorAll('.corte-agregar')

    corteAgregar.forEach(boton => {
        boton.addEventListener('click', agregarACompras)
    })
}

let cortesEnCompras;

let cortesEnComprasLocalStorage = localStorage.getItem('cortes-en-compras')

if (cortesEnComprasLocalStorage) {
    cortesEnCompras = JSON.parse(cortesEnComprasLocalStorage)
} else {
    cortesEnCompras = []
}

function agregarACompras(e) {

    Toastify({
        text: "Agregaste un corte",
        duration: 1500,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #566573, #283747)",
        },
        onClick: function(){}
      }).showToast();
    
    const idCorte = e.currentTarget.id
    const corteAgregado = cortes.find(corte => corte.id === idCorte)

    if (cortesEnCompras.some(corte => corte.id === idCorte)) {
        const i = cortesEnCompras.findIndex(corte => corte.id === idCorte)
        cortesEnCompras[i].cantidad++
    } else {
        corteAgregado.cantidad = 1
    }
    cortesEnCompras.push(corteAgregado) 
    
    localStorage.setItem('cortes-en-compras', JSON.stringify(cortesEnCompras))
}