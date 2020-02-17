export const mostrarError = (modal, texto) => {
    let modalWindow = document.getElementById(modal);
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

export const validarDatos = step =>{
    
    let inputs = step.querySelectorAll("input.obligatorio[type='text'], input.obligatorio[type='file'], input.obligatorio[type='tel'], input.obligatorio[type='number'], input.obligatorio[type='date'], input.obligatorio[type='email'], select.obligatorio")
    
    for (const input of inputs) {
        
        let inputVal = input.value 
        
        if (inputVal.length == 0) {
            return false;
        } 
    }

    return true
}

export const validarCheck = step => {
    
    let inputs = step.querySelectorAll("input.obligatorio[type='checkbox']")
    
    if (inputs.length == 0) {
        return true
    } else {
        for (const input of inputs) {
            let inputVal = input.checked 
            
            if (inputVal) {
                return true;
            } 
        }
    
        return false
    }
    
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



