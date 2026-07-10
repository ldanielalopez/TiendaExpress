// DATOS DEL TALLER - CASO PROBLEMA

// Inventario de productos
const productos = [
    { id: 1, nombre: "Café", categoria: "bebidas", precio: 12000, stock: 8 },
    { id: 2, nombre: "Arroz", categoria: "granos", precio: 4500, stock: 3 },
    { id: 3, nombre: "Jabón", categoria: "aseo", precio: 3500, stock: 25 },
    { id: 4, nombre: "Leche", categoria: "bebidas", precio: 4000, stock: 2 },
    { id: 5, nombre: "Lentejas", categoria: "granos", precio: 5000, stock: 15 },
    { id: 6, nombre: "Shampoo", categoria: "aseo", precio: 9500, stock: 12 },
    { id: 7, nombre: "Té", categoria: "bebidas", precio: 8000, stock: 1 }
];

// Pedidos del mes
const pedidos = [
    { id: 101, cliente: "Ana", items: [{ productoId: 1, cantidad: 2 }, { productoId: 3, cantidad: 1 }] },
    { id: 102, cliente: "Luis", items: [{ productoId: 2, cantidad: 5 }] },
    { id: 103, cliente: "Ana", items: [{ productoId: 4, cantidad: 3 }, { productoId: 7, cantidad: 1 }] },
    { id: 104, cliente: "Marta", items: [{ productoId: 1, cantidad: 1 }] },
    { id: 105, cliente: "Luis", items: [{ productoId: 5, cantidad: 4 }, { productoId: 6, cantidad: 1 }] }
];

// MISION 1 - catalogo simple

const catalogoSimple = productos.map(({ nombre, precio}) => ({nombre, precio}));
console.log("Misión 1. Lista de productos");
console.log(catalogoSimple);

// MISION 2 - alerta de inventario bajo

const productosStockBajo = productos.filter(producto => producto.stock <= 5).map(producto => producto.nombre);
console.log("Misión 2. Productos con stock bajo");
console.log(productosStockBajo);

// MISION 3 - valor total inventario

const valorTotalInventario = productos.reduce(
    (acc, {precio, stock}) => acc + (precio * stock), 0);
console.log("Misión 3. Valor total del inventario");
console.log(`$${valorTotalInventario}`);

// MISION 4 - cuánto facturó cada pedido - cliente

const pedidosTotal = pedidos.map(pedido => {
    const totalPedido = pedido.items.reduce((acc, item) => {
        const producto = productos.find(p => p.id === item.productoId);
        return acc + (producto ? producto.precio * item.cantidad : 0);
    }, 0);
    return {
        id: pedido.id,
        cliente: pedido.cliente,
        total: totalPedido
    };
});

console.log("Misión 4. Total facturado por pedido");
console.log(pedidosTotal);

// MISION 5 - el mejor cliente y el resumen del mes

const facturaTotalMes = pedidosTotal.reduce((acc, p) => acc + p.total, 0);
const totalNumPedidos = pedidosTotal.length;

const compraPorCliente = pedidosTotal.reduce((acc, {cliente, total}) => {
    acc[cliente] = (acc[cliente] || 0) + total;
    return acc;
}, {});

const mejorCliente = Object.entries(compraPorCliente).reduce((max, [cliente, total]) => {
    return total > max.total ? { cliente, total } : max;
}, { cliente: null, total: 0 });

const resumenMes = {
    facturacionTotal: facturaTotalMes,
    totalPedidos: totalNumPedidos,
    compraPorCliente,
    mejorCliente
};

console.log("Misión 5. Resumen del mes");
console.log(resumenMes);

//MISION 6 - Datos reales desde una API (async/await)

const traerClientes = async () => {
    const url = "";
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const usuarios = await res.json();
        return usuarios.map(({ name, email }) => ({ nombre: name, correo: email }));
    } catch (error) {
        console.error('Error al traer clientes:', error);
    }
}

console.log("Misión 6. Datos de clientes desde API");
traerClientes().then(clientes => {
    console.log(clientes);
});
