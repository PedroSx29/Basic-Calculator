const resultado = document.getElementById("result")
const proceso = document.getElementById("proceso")

let operacionActual = undefined
let operandoActual = ''
let operandoAnterior = ''
let procesoMostrado = ''
let estadoCalculo = false

function actualizarPantalla() {
    resultado.value = operandoActual;
}

function actualizarProceso() {
    proceso.value = procesoMostrado;
}

function actualizarNumeros(numero) {
    if (numero === '.' && operandoActual.includes('.')) return;

    if (estadoCalculo === true) {
        procesoMostrado = '';
        estadoCalculo = false;
    }

    operandoActual = operandoActual.toString() + numero.toString();
    procesoMostrado += numero.toString();
    actualizarPantalla();
    actualizarProceso();
}

function actualizarOperador(operador) {
    if (operandoActual === '') return;

    if (estadoCalculo === true) {
        procesoMostrado = operandoActual.toString() + ' ' + operador + ' ';
        estadoCalculo = false;
        operandoAnterior = operandoActual;
        operandoActual = '';
    } else {
        operacionActual = operador;
        operandoAnterior = operandoActual;
        operandoActual = '';
        procesoMostrado += ' ' + operador + ' ';
    }

    actualizarProceso();
}

function borrarCaracter() {
    if (operandoActual !== '') {
        operandoActual = operandoActual.toString().slice(0, -1);
    }
    
    if (procesoMostrado !== '') {
        procesoMostrado = procesoMostrado.slice(0, -1);
    }
    
    if (procesoMostrado === '' && operandoActual === ''){
        limpiar();
        return;
    }

    try {
        if (estadoCalculo === true) {
            limpiar();
            return;
        }
    } catch (error) {
        alert('Se ha producido un error en el sistema')
    }

    actualizarPantalla();
    actualizarProceso();
}

function calcular() {
    let expresion = procesoMostrado.trim();
    
    if (expresion === '' || expresion === '0') return;
    
    try {
        let respuesta = eval(expresion);
        
        if (isNaN(respuesta)) {
            alert("Operación inválida");
            return;
        }
        
        procesoMostrado += ' = ' + respuesta;
        actualizarProceso();
        
        estadoCalculo = true;
        operandoActual = respuesta;
        operacionActual = undefined;
        operandoAnterior = '';
        actualizarPantalla();
    } catch (error) {
        alert("Operación inválida");
    }
}

function limpiar() {
    operacionActual = undefined
    operandoActual = ''
    operandoAnterior = ''
    procesoMostrado = ''
    estadoCalculo = false
    resultado.value = '0'
    proceso.value = '0'
}

function actualizarParentesis() {
    const parenAbiertos = (procesoMostrado.match(/\(/g) || []).length;
    const parenCerrados = (procesoMostrado.match(/\)/g) || []).length;
    
    if (parenCerrados >= parenAbiertos) {
        operandoActual = operandoActual.toString() + '(';
        procesoMostrado += '(';
    } else {
        operandoActual = operandoActual.toString() + ')';
        procesoMostrado += ')';
    }
    
    actualizarPantalla();
    actualizarProceso();
}