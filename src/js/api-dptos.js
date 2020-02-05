//API DEPARTAMENTOS Y CIUDADES

const dptos_ciudades = (contDpto, contMun) => {

    const boxDpto = document.querySelector(contDpto);
    const boxMun = document.querySelector(contMun); 

    fetch('https://univercity.com.co/api_colombia/departamentos.php')
            .then(res => res.json())
            .then(data => {
                for (let dpto of data) {
                    boxDpto.innerHTML += `
                        <option data-number="${dpto.id_departamento}" value="${dpto.departamento}">${dpto.departamento}</option>
                    `
                }
            })

            
            boxDpto.addEventListener('change', function() {
                let valor_dpto = this.options[this.selectedIndex].getAttribute('data-number')
                
                boxMun.innerHTML = '<option value="" selected>Selecciona un municipio</option>'
                fetch(`https://univercity.com.co/api_colombia/municipios.php?id_departamento=${valor_dpto}`)
        
                .then(res => res.json())
                .then(data => {
                    for (let mun of data) {
                            boxMun.innerHTML += `
                            <option value="${mun.municipio}">${mun.municipio}</option>
                        `
                    }
                })
            })   
}

export default dptos_ciudades;