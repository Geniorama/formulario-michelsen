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



