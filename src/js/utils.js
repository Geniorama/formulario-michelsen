import moment from 'moment';

export const getParameterByName = name => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export const crearOpciones = (numOpciones, contenedor_cuotas) => {
    let element = '<option selected>Selecciona una opción</option>';
      
          for (let index = 0; index < numOpciones; index++) {
              let num_opcion = index + 1;
              element += `<option value=${num_opcion}>${num_opcion}</option>`;
          }
        
          let contenedorCuotas = document.getElementById(contenedor_cuotas);
          contenedorCuotas.innerHTML = element;
      
          contenedorCuotas.options['1'].disabled = true;
          contenedorCuotas.options['2'].disabled = true;
}

export const input_cuotas_func = (inputPrograma, inputCuotas) =>{
    const valor_programa = document.getElementById(inputPrograma)
            const cuotas_input = document.getElementById(inputCuotas);
            valor_programa.addEventListener('change', function(e){
                  let valor = e.target.value;
                  if(valor == "Pregrado"){     
                      crearOpciones('6', inputCuotas)
                      cuotas_input.focus()
                  } else {
                      crearOpciones('12', inputCuotas)
                      cuotas_input.focus()
                  }
            })
}


export const separarMiles = (formulario, claseValor) => {
    let form = document.querySelector(formulario)

    let inputsValor = form.querySelectorAll(claseValor)

    for (const input_monto of inputsValor) {
        
        input_monto.addEventListener('keyup', (e) => {
            let entrada = e.target.value.split('.').join('');
            entrada = entrada.split('').reverse();

            let salida = [];
            let aux = '';
            
            let paginador = Math.ceil(entrada.length / 3);

            for (let i = 0; i < paginador; i++) {
                for (let j = 0; j < 3; j++) {
                if(entrada[j + (i*3)] != undefined){
                        aux += entrada[j + (i*3)];
                }    
                }
                salida.push(aux);
                aux = '';

                e.target.value = salida.join('.').split("").reverse().join("");
                
            }
            
        })
        
    }

    
}


export const calcularFechas = (inputSolicitud, inputPrimeraCuota, mesDiff, mesesPlazo) => {
        let input_solicitud = document.getElementById(inputSolicitud);
        let input_cuota_uno = document.getElementById(inputPrimeraCuota);

        let fecha_actual = moment();
        let date_obj = new Date(fecha_actual);
        let moment_obj = moment(date_obj);
        let fecha_min_limit = moment_obj.format('YYYY-MM-DD');
    
        input_solicitud.setAttribute('min', fecha_min_limit);
        input_cuota_uno.readOnly = true;
    
        input_solicitud.addEventListener('change', function() {
            if (this.value === '') {
                input_cuota_uno.readOnly = true;
            } else {
                input_cuota_uno.readOnly = false;
                let fecha_min_pago_uno = this.value;
                fecha_min_pago_uno = moment( fecha_min_pago_uno).add(mesDiff, 'M');
                input_cuota_uno.setAttribute('min', fecha_min_pago_uno.format('YYYY-MM-DD'));
                let fecha_solicitud = this.value.split('-');
                let mes_fecha_solicitud = parseInt(fecha_solicitud[1]) - 1;
                fecha_solicitud[1] = String(mes_fecha_solicitud);
                fecha_solicitud = moment(fecha_solicitud);
                
                let fecha_max_limit = fecha_solicitud.add(mesesPlazo, 'M');
                fecha_max_limit = new Date(fecha_max_limit);
                fecha_max_limit = moment(fecha_max_limit);
                fecha_max_limit = fecha_max_limit.format('YYYY-MM-DD');
                input_cuota_uno.setAttribute('max', fecha_max_limit);
            }
        })
}