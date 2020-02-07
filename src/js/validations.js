import {stepButton} from './steps.js';

export const mostrarError = (modal, texto) => {
    let modalWindow = document.querySelector(modal);
    modalWindow.innerHTML = `
        <div class="card alert alert-danger p-5">
            <div class="card-body">
                <i class="fa fa-times float-right" aria-hidden="true"></i>
                <h3 class="text-center">¡ERROR!</h3>
                <hr>
                <p>${texto}</p>
            </div>
        </div>
    `;

    modalWindow.classList.add('show-modal')

    let buttonClose = modalWindow.querySelector('.fa-times');
    buttonClose.addEventListener('click', function() {
        modalWindow.classList.remove('show-modal');
    })
}


export const validar = (arrayInputs) => {
    let inputs = arrayInputs

    for (const input of inputs) {
        if (input.length == 0) {
           return false;
        }

    }

    return true

}

export const validarDatos = step =>{
    
  let inputs = step.querySelectorAll("input[type='text'], select, input[type='date']")

    for (const input of inputs) {
        let inputVal = input.value 
        if (inputVal.length == 0) {
        return false;
        }
    }

    return true
}

// VALIDACION INPUT FILE
export const iconValidate = array => {

    for (let inputArray of array) {

            inputArray.addEventListener('change', function(){
                    let inputValue = this.value
                    let inputData = this.getAttribute('data-icon')
                    let inputSize = this.files[0];

                    if(inputValue == ""){                               
                    } else if(inputSize.size > 2000000){
                            alert("El tamaño máximo de cada archivo debe ser de 2MB");
                            return;
                    } else {
                            document.getElementById(inputData).classList.add('correct-file')
                    }

            })
            
    }

    
} 


export const validateStep = step => {
    let botonSig = step.querySelector('.step-button-next');
    let estate = false;

    step.addEventListener('change',function(){

        estate = validarDatos(step)

        if (estate) {
            step.classList.replace('form-disabled', 'form-enabled')
            botonSig.classList.remove('disabled-button')   
        } else {
            step.classList.replace('form-enabled', 'form-disabled')
            botonSig.classList.add('disabled-button')
        }

        return estate;

    })

    botonSig.addEventListener('click', function() {
            if(estate){
                 stepButton('#form-natural') 
            } else {
                 mostrarError('.modal-errors', 'Falta diligenciar alguno de los campos')
            }
    })
}



