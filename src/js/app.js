import 'bootstrap';
import '../css/style.css';
import './../sass/style.scss';
import {crearOpciones, input_cuotas_func, separarMiles, calcularFechas, onOffButton} from './utils.js';
import {mostrarError, validar, iconValidate, validarDatos, validateStep} from './validations.js';
import {stepButton} from './steps.js';
import dptos_ciudades from './api-dptos.js';




const formulario1 = document.querySelector('#form-natural');
    if (formulario1) {
        //Variables secciones
        const step1 = formulario1.querySelector('#step-1')
        const botonSig = step1.querySelector('.step-button-next');

        const step2 = formulario1.querySelector('#step-2')
        const botonSig2 = step2.querySelector('.step-button-next');

        const step3 = formulario1.querySelector('#step-3')
        const botonSig3 = step3.querySelector('.step-button-next');

        const step4 = formulario1.querySelector('#step-4')
        const botonSig4 = step4.querySelector('.button-submit');

        dptos_ciudades('#departamento', '#ciudad');

        dptos_ciudades('#departamento_est', '#ciudad_est');

        const icons = document.querySelectorAll("#form-natural .icon-file");

        input_cuotas_func('tipo-programa', 'plazo-cuotas');

        calcularFechas('fecha-desembolso', 'fecha-primera-cuota', 1, 2)

                /*======= Comprobación campos vacíos ===========*/

                //SECCIÓN 1
                separarMiles('.valor')
                
                validateStep(step1)
                //SECCIÓN 2
        

                let ocupacion_options = document.getElementsByName('ocupacion[]')

                
                for (const itemChecked of ocupacion_options) {
                        let valor_id = itemChecked.value
                        valor_id = valor_id.toLowerCase() // Cambiar letras a minusculas
                        itemChecked.setAttribute('id', valor_id)
                           
                }

                validateStep(step2)

                //SECCIÓN 3

                let estate3 = false; 

                step3.addEventListener('change',function(){
                        let nombresFamiliar = document.getElementById("nombres-familiar").value;
                        let apellidosFamiliar = document.getElementById("apellidos-familiar").value;
                        let celularFamiliar = document.getElementById("celular-familiar").value;
                        let nombresPersonal = document.getElementById("nombres-personal").value;
                        let apellidosPersonal = document.getElementById("apellidos-personal").value;
                        let celularPersonal = document.getElementById("celular-personal").value;
                
                
                let datos3 = [nombresFamiliar, apellidosFamiliar, celularFamiliar, nombresPersonal, apellidosPersonal, celularPersonal]

                estate3 = validar(datos3)

                        if(estate3){
                           step3.classList.replace('form-disabled', 'form-enabled')
                           botonSig3.classList.remove('disabled-button') 
                                
                        } else {
                           step3.classList.replace('form-enabled', 'form-disabled')
                           botonSig3.classList.add('disabled-button')
                        }

                        return estate3;
                })

                botonSig3.addEventListener('click', function() {
                        if(estate3){
                             stepButton('#form-natural') 
                        } else {
                             mostrarError('.modal-errors', 'Falta diligenciar alguno de los campos')
                        }
                })
        
                
        //SECCIÓN 4
        
        let estate4 = false;

        step4.addEventListener('change',function(){

                        let nombres = document.getElementById("nombres-est").value;
                        let apellidos = document.getElementById("apellidos-est").value;
                        let tipoIdentificacion = document.getElementById("tipo-identificacion-est").value;
                        let numeroIdentificacion = document.getElementById("numero-identificacion-est").value;
                        let genero = document.getElementById("genero-est").value;
                        let departamento = document.getElementById("departamento_est").value;
                        let ciudad = document.getElementById("ciudad_est").value;
                        let direccion = document.getElementById("direccion-est").value;
                        let barrio = document.getElementById("barrio-est").value;
                        let celular = document.getElementById("celular-est").value;
                        let email = document.getElementById("email-est").value;
                        let universidad = document.getElementById("univercidad-est").value;
                        //let tipoPrograma = document.getElementById("programa-est").value;
                        let carrera = document.getElementById("carrera-est").value;
                        let semestre = document.getElementById("semestre-est").value;
                        let relacionDeudor = document.getElementById("relacion-deudor-est").value;
                        let codigo = document.getElementById("codigo-est").value;
                        let ingresosMensuales = document.getElementById("ingresos-mensuales-est").value;
                        let gastosMensuales = document.getElementById("gastos-mensuales-est").value;
                        let tratamientoDatos = document.getElementById("tratamiento-datos").checked;
                        let fondoIngresos = document.getElementById("fondo-ingresos").checked;
                        let cedulaDeudor = document.getElementById("cedula-deudor").files.length;
                        let documentoEstudiante = document.getElementById("documento-est").files.length;
                        let ordenMatricula = document.getElementById("orden-matricula-est").files.length;
                
                let datos4 = [nombres, apellidos, tipoIdentificacion, numeroIdentificacion, genero, direccion, barrio, celular, email, universidad, carrera, semestre, relacionDeudor, codigo, ingresosMensuales, gastosMensuales, tratamientoDatos, fondoIngresos, cedulaDeudor, documentoEstudiante, ordenMatricula, departamento, ciudad]
                
                estate4 = validar(datos4)

                        if(estate4){
                                step4.classList.replace('form-disabled', 'form-enabled')
                                botonSig4.classList.remove('disabled-button') 
                                
                        } else {
                                step4.classList.replace('form-enabled', 'form-disabled')
                                botonSig4.classList.add('disabled-button')
                        }

                        return estate4;
                })

                botonSig4.addEventListener('click', function() {
                        if(estate4){
                             stepButton('#form-natural') 
                        } else {
                             mostrarError('.modal-errors', 'Falta diligenciar alguno de los campos')
                        }
                })
                
                iconValidate(icons);
    } 