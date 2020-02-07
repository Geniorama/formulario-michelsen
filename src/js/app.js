import 'bootstrap';
import '../css/style.css';
import './../sass/style.scss';
import {input_cuotas_func, separarMiles, calcularFechas} from './utils.js';
import {stepButton} from './steps.js';
import {iconValidate, validarDatos, validarCheck, mostrarError} from './validations.js';
import dptos_ciudades from './api-dptos.js';



const validateForm = formulario => {
    let formularioItem = document.querySelector(formulario)
    let steps = formularioItem.querySelectorAll('.step')


    //Inputs valores
    separarMiles(formulario, '.valor')
    dptos_ciudades(formulario, '.departamento')
    const icons = formularioItem.querySelectorAll(".icon-file");

    input_cuotas_func('tipo-programa', 'plazo-cuotas');
    calcularFechas('fecha-desembolso', 'fecha-primera-cuota', 1, 2)

    iconValidate(icons);

        for (const step of steps) {
            let botonSig = step.querySelector('.step-button-next');
            let estate = false;
            let estateCheck = false;

            step.addEventListener('change',function(){

                estate = validarDatos(step)
                estateCheck = validarCheck(step)

                if (estate && estateCheck) {
                    step.classList.replace('form-disabled', 'form-enabled')
                    botonSig.classList.remove('disabled-button')   
                } else {
                    step.classList.replace('form-enabled', 'form-disabled')
                    botonSig.classList.add('disabled-button')
                }

                return estate;

            })

            if (botonSig.classList.contains('button-submit')) {
                return true
            } else {
                botonSig.addEventListener('click', function() {
                    if(estate){
                        stepButton('#form-natural') 
                    } else {
                        mostrarError('.modal-errors', 'Falta diligenciar alguno de los campos')
                    }
                })
            }
            
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



