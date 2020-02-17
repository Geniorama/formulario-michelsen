import 'bootstrap';
import '../css/style.css';
import './../sass/style.scss';
import moment from 'moment';
import {input_cuotas_func, separarMiles, calcularFechas, getParameterByName, crearOpciones} from './utils.js';
import {stepButton} from './steps.js';
import {iconValidate, validarDatos, validarCheck, mostrarError} from './validations.js';
import dptos_ciudades from './api-dptos.js';



const validateForm = formulario => {
    let formularioItem = document.querySelector(formulario)
    
    //let parValor = getParameterByName('valor')

    let valoresParametros = {
        valor_financiar: getParameterByName('valor'),
        tipo_programa: getParameterByName('tipo-programa'),
        modo_pago: getParameterByName('modo-pago'),
        cuotas : getParameterByName('cuotas'),
        fecha_solicitud : getParameterByName('fecha-solicitud'),
        fecha_cuota_uno : getParameterByName('fecha-cuota-uno')
    }

    if(valoresParametros.tipo_programa == "1"){     
        crearOpciones('6', 'plazo-cuotas')
    } else {
        crearOpciones('12', 'plazo-cuotas')
    }


    document.getElementById('valor-financiar').value = valoresParametros.valor_financiar;
    document.getElementById('tipo-programa').selectedIndex = valoresParametros.tipo_programa;
    document.getElementById('modo-pago').selectedIndex = valoresParametros.modo_pago;
    document.getElementById('plazo-cuotas').selectedIndex = valoresParametros.cuotas;
    document.getElementById('fecha-desembolso').value = valoresParametros.fecha_solicitud;
    document.getElementById('fecha-primera-cuota').value = valoresParametros.fecha_cuota_uno;


    //Inputs valores
    separarMiles(formulario, '.valor')
    dptos_ciudades(formulario, '.departamento-select')
    const icons = formularioItem.querySelectorAll(".icon-file");

    input_cuotas_func('tipo-programa', 'plazo-cuotas');
    calcularFechas('fecha-desembolso', 'fecha-primera-cuota', 1, 2)

    if (icons) {
       iconValidate(icons);
    }
    

        let steps = formularioItem.querySelectorAll('.step')

        for (const step of steps) {
    
            let botonSig = step.querySelector('.button-next');
            let estate = false;
            let estateCheck = false;
            let valorFinanciar = document.getElementById('valor-financiar')
            let fechaSolicitud = document.getElementById('fecha-desembolso')
            let fechaCuotaUno = document.getElementById('fecha-primera-cuota')
            let fechaActual = moment();
           
            step.addEventListener('change',function(){

                estate = validarDatos(step)
                estateCheck = validarCheck(step)
                

                if (estate && estateCheck) {
                    //step.classList.replace('form-disabled', 'form-enabled')
                    botonSig.classList.remove('disabled-button')   
                } else {
                    //step.classList.replace('form-enabled', 'form-disabled')
                    botonSig.classList.add('disabled-button')
                }

                return estate;

            })
            
            botonSig.addEventListener('click', function(e) {
                let button = e.target
                let num = valorFinanciar.value
                num = num.split('.')
                num = num.join('')
                num = parseInt(num)

                let fechaVal = fechaSolicitud.value
                fechaVal = moment(fechaVal)

                let fechaCuotaVal = fechaCuotaUno.value
                fechaCuotaVal = moment(fechaCuotaVal)
               
                let difSolicitud = fechaVal.diff(fechaActual, 'days')
                let difCuota = fechaCuotaVal.diff(fechaVal, 'months', true)

                if (num < 500000) {
                    mostrarError('modal-errors', 'Debes ingresar un valor mayor a $500.000')
                    return false
                } else if (difSolicitud < 0){
                    mostrarError('modal-errors', 'En <strong>"Fecha Solicitud"</strong> Debes ingresar una fecha superior a la actual')
                    return false
                } else if (difCuota < 1){
                    mostrarError('modal-errors', 'En <strong>"Fecha 1ra cuota"</strong> Debes ingresar una fecha superior a 30 días desde la "Fecha solicitud"')
                    return false
                } else if(difCuota > 2) {
                    mostrarError('modal-errors', 'En <strong>"Fecha 1ra cuota"</strong> Debes ingresar una fecha inferior a 60 días desde la "Fecha solicitud"')
                    return false
                } else {
                    if(estate){
                        if (button.classList.contains('button-submit')) {
                            console.log('El botón es submit')
                        } else {
                            button.classList.add('step-button-next')
                        }    
                    } else {
                        mostrarError('modal-errors', 'Falta diligenciar alguno de los campos')
                    }
                }
                
                
            })
            
            stepButton(formulario)
        } 
        
    
}

//const form_natural = document.getElementById('form-natural')
const form_natural = document.getElementById('wpcf7-f3789-p3527-o1')
//const form_legal = document.getElementById('form-legal')
const form_legal = document.getElementById('wpcf7-f3868-p3571-o1')

/*
if (form_natural) {
    validateForm('#form-natural')
}
*/


if (form_natural) {
    validateForm('#wpcf7-f3789-p3527-o1')
} else {
    console.log('El formulario Natural no existe')
}


/*
if (form_legal) {
    validateForm('#form-legal')
}
*/

if (form_legal) {
    validateForm('#wpcf7-f3868-p3571-o1')
} else {
    console.log('El formulario Jurídica no existe')
}




