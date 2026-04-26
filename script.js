const resultado = document.getElementById("result")
const proceso = document.getElementById("proceso")

let operacionActual = undefined
let operandoActual = ''
let operandoAnterior = ''
let procesoMostrado = ''

function actualizarPantalla() {
    resultado.value = operandoActual;
}

function actualizarProceso() {
    proceso.value = procesoMostrado;
}

function actualizarNumeros(numero) {
    if (numero === '.' && operandoActual.includes('.')) return;

    operandoActual = operandoActual.toString() + numero.toString();
    procesoMostrado += numero.toString();
    actualizarPantalla();
    actualizarProceso();
}

function actualizarOperador(operador) {
    if (operandoActual === '') return;

    if (operandoAnterior !== '') {
        calcular();
    }

    operacionActual = operador;
    operandoAnterior = operandoActual;
    operandoActual = '';
    procesoMostrado += ' ' + operador + ' ';
    actualizarProceso();
}

function calcular() {
    let respuesta;
    const anterior = parseFloat(operandoAnterior);
    const actual = parseFloat(operandoActual);

    if (isNaN(anterior) || isNaN(actual)) return;

    switch (operacionActual) {
        case "+":
            respuesta = anterior + actual;
            break;
        case "-":
            respuesta = anterior - actual;
            break;
        case "/":
            if (actual === 0){
                alert("No se puede dividir entre cero.");
                limpiar();
                return;
            };
            respuesta = anterior / actual;
            break;
        case "*":
            respuesta = anterior * actual;
            break;
        case "%":
            respuesta = anterior % actual;
            break;
        default:
            return;
    }
    procesoMostrado += operandoActual + ' = ' + respuesta;
    actualizarProceso();
    operandoActual = respuesta;
    operacionActual = undefined;
    operandoAnterior = '';
    actualizarPantalla();
}

function limpiar() {
    operacionActual = undefined
    operandoActual = ''
    operandoAnterior = ''
    procesoMostrado = ''
    resultado.value = '0'
    proceso.value = '0'
}

function actualizarParentesis() {
    // Contar paréntesis abiertos y cerrados en procesoMostrado
    const parenAbiertos = (procesoMostrado.match(/\(/g) || []).length;
    const parenCerrados = (procesoMostrado.match(/\)/g) || []).length;
    
    // Si hay más paréntesis cerrados que abiertos, o están balanceados, agregar apertura
    if (parenCerrados >= parenAbiertos) {
        operandoActual = operandoActual.toString() + '(';
        procesoMostrado += '(';
    } else {
        // Si hay paréntesis abiertos sin cerrar, agregar cierre
        operandoActual = operandoActual.toString() + ')';
        procesoMostrado += ')';
    }
    
    actualizarPantalla();
    actualizarProceso();
}