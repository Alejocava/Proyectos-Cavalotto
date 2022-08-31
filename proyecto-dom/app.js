const carrito = document.querySelector("#carrito")
const liTemplate = document.querySelector("#liTemplate")
const footer = document.querySelector('#footer')
const templateFooter = document.querySelector('#templateFooter')
const fragment = document.createDocumentFragment()

document.addEventListener('click', e => {

    if(e.target.matches(".card .btn-outline-primary")){
        // console.log('ejecutar agregar al carro')
        agregarCarrito(e)
    }

    if (e.target.matches(".list-group-item .btn-success")) {
        btnAumentar(e);
    }
    if (e.target.matches(".list-group-item .btn-danger")) {
        btnDisminuir(e);
    }
})

let carritoObjeto = []
const agregarCarrito = (e) => {
    console.log(e.target.dataset.fruta)

    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio),
    }
    const indice = carritoObjeto.findIndex((item) => item.id === producto.id)
    if (indice === -1){
        carritoObjeto.push(producto)
    } else {
     carritoObjeto[indice].cantidad++
        // carritoObjeto[indice].precio = carritoObjeto[indice].cantidad * producto.precio
    }
    // console.log(carritoObjeto)
    pintarCarrito()
}
const pintarCarrito = () => {
    carrito.textContent = ""
    
    carritoObjeto.forEach((item) => {
        const clone = liTemplate.content.cloneNode(true)
        clone.querySelector(".lead").textContent = item.titulo
        clone.querySelector(".badge").textContent = item.cantidad
        clone.querySelector('div .lead span').textContent = item.precio * item.cantidad

        clone.querySelector('.btn-danger').dataset.id = item.id
        clone.querySelector('.btn-success').dataset.id = item.id
        fragment.appendChild(clone)
    })

    carrito.appendChild(fragment)
    pintarFooter();

}
const pintarFooter = () => {
    footer.textContent = "";

    const total = carritoArray.reduce(
        (acc, current) => acc + current.precio * current.cantidad,
        0
    );

    // console.log(total);

    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("p span").textContent = total;

    // fragment.appendChild(clone);
    footer.appendChild(clone);
};

const btnAumentar = (e) => {
    carritoObjeto = carritoObjeto.map(item =>{
        if(item.id === e.target.dataset.id){
            item.cantidad++
        }
        return item
    })
    pintarCarrito()
}
const btnDisminuir = (e) => {
    // console.log(e.target.dataset.id);
    carritoObjeto = carritoObjeto.filter((item) => {
        // console.log(item);
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--;
                // console.log(item);
                if (item.cantidad === 0) return;
                return item;
            }
        } else {
            return item;
        }
    });
    pintarCarrito();
};
