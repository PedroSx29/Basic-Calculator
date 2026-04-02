const resultado = document.getElementById("result")

let operacionActual = undefined
let operandoActual = ''
let operandoAnterior = ''

function actualizarPantalla() {
    resultado.value = operandoActual;
}

function actualizarNumeros(numero) {
    if (numero === '.' && operandoActual.includes('.')) return;

    operandoActual = operandoActual.toString() + numero.toString();
    actualizarPantalla();
}

function actualizarOperador(operador) {
    if (operandoActual === '') return;

    if (operandoAnterior !== '') {
        calcular();
    }

    operacionActual = operador;
    operandoAnterior = operandoActual;
    operandoActual = '';
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
    operandoActual = respuesta;
    operacionActual = undefined;
    operandoAnterior = '';
    actualizarPantalla();
}

function limpiar() {
    operacionActual = undefined
    operandoActual = ''
    operandoAnterior = ''
    resultado.value = '0'
}

function actualizarParentesis() {
    let parentesis = '';

    if (parentesis === '') {
        resultado.value += '(';
    }

    if (parentesis === '(' && isNaN(operandoActual)) return;

    if (parentesis === '(' && !isNaN(operandoActual)) {
        resultado.value += ')';
    }
}