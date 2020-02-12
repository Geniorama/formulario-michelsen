import 'bootstrap';
import '../css/style.css';
import './../sass/style.scss';
import moment from 'moment';
import {input_cuotas_func, separarMiles, calcularFechas} from './utils.js';
import {stepButton} from './steps.js';
import {iconValidate, validarDatos, validarCheck, mostrarError} from './validations.js';
import dptos_ciudades from './api-dptos.js';



const validateForm = formulario => {
    let formularioItem = document.querySelector(formulario)
    
    
    //Inputs valores
    separarMiles(formulario, '.valor')
    dptos_ciudades(formulario, '.departamento')
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

const form_natural = document.getElementById('form-natural')
const form_legal = document.getElementById('form-legal')

if (form_natural) {
    validateForm('#form-natural')
}


if (form_legal) {
    validateForm('#form-legal')
}




