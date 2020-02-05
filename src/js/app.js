import 'bootstrap';
import '../css/style.css';
import {crearOpciones, input_cuotas_func, separarMiles, calcularFechas} from './utils.js';
import {mostrarError} from './validations.js';
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

        const icons = document.querySelectorAll("#form-natural .icon-file");

        input_cuotas_func('tipo-programa', 'plazo-cuotas');

        calcularFechas('fecha-desembolso', 'fecha-primera-cuota', 1, 2)

                /*======= Comprobación campos vacíos ===========*/

                //SECCIÓN 1
                separarMiles('.valor')
                
                step1.addEventListener('change',function(){

                    let valorFinanciar = document.getElementById("valor-financiar").value;
                    let tipoPrograma = document.getElementById("tipo-programa").value;
                    let plazoCuotas = document.getElementById("plazo-cuotas").value;
                    let modoPago = document.getElementById("modo-pago").value;
                    let primerPago = document.getElementById("fecha-primera-cuota").value;
                     
                    botonSig.addEventListener('click', function() {
                        if (valorFinanciar === '' || tipoPrograma === '' || plazoCuotas === '' || modoPago === '' || primerPago === '') {
                            console.log('algun campo está vacío')
                        } else {
                            stepButton('#form-natural')
                        }
                        
                    }) 
                   
                })

                

                
        
                //SECCIÓN 2
        

                let ocupacion_options = document.getElementsByName('ocupacion[]')

                
                for (const itemChecked of ocupacion_options) {
                        valor_id = itemChecked.value
                        valor_id = valor_id.toLowerCase() // Cambiar letras a minusculas
                        itemChecked.setAttribute('id', valor_id)
                           
                }

                step2.addEventListener('change',function(){

                        let nombres = document.getElementById("nombres-rep").value;
                        let apellidos = document.getElementById("apellidos-rep").value;
                        let tipoIdentificacion = document.getElementById("tipo-indetificacion-rep").value;
                        let numeroIdentificacion = document.getElementById("numero-identificacion-rep").value;
                        let genero = document.getElementById("genero-rep").value;
                        let direccion = document.getElementById("direccion-rep").value;
                        let barrio = document.getElementById("barrio-rep").value;
                        let departamento = document.getElementById("departamento").value;
                        let ciudad = document.getElementById("ciudad").value;
                        let celular = document.getElementById("celular-rep").value;
                        let email = document.getElementById("email-rep").value;
                        let ingresosMensuales = document.getElementById("ingresos-mensuales-rep").value;
                        let gastosMensuales = document.getElementById("gastos-mensuales-rep").value;
                        let empleado = document.getElementById("empleado").checked;
                        let independiente = document.getElementById("independiente").checked;
                        let pensionado = document.getElementById("pensionado").checked;
                        let rentista = document.getElementById("rentista").checked;

                
                if(nombres === '' || apellidos === '' || tipoIdentificacion === '' || numeroIdentificacion === '' || genero === ''
                || direccion === '' || barrio === '' || departamento === '' || ciudad === '' || celular === '' || email === ''
                || ingresosMensuales === '' || gastosMensuales === '' || (empleado == '' && independiente == '' && pensionado == '' && rentista == '')){
                        deshabilitarBoton(botonSig2);
                } else {
                        habilitarBoton(botonSig2);
                }
                
                })
        

                //SECCIÓN 3

                step3.addEventListener('change',function(){
                        let nombresFamiliar = document.getElementById("nombres-familiar").value;
                        let apellidosFamiliar = document.getElementById("apellidos-familiar").value;
                        let celularFamiliar = document.getElementById("celular-familiar").value;
                        let telefoFamiliar = document.getElementById("telefono-familiar").value;
                        let nombresPersonal = document.getElementById("nombres-personal").value;
                        let apellidosPersonal = document.getElementById("apellidos-personal").value;
                        let celularPersonal = document.getElementById("celular-personal").value;
                        let telefoPersonal = document.getElementById("telefono-personal").value;
                
                if(nombresFamiliar === '' || apellidosFamiliar === '' || celularFamiliar === ''
                || nombresPersonal === '' || apellidosPersonal === '' || celularPersonal === '' ){
                        deshabilitarBoton(botonSig3);
                        
                } else {
                        habilitarBoton(botonSig3);
                }
                })
        
                
        //SECCIÓN 4
        
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
                
                if(nombres === '' || apellidos === '' || tipoIdentificacion === '' || numeroIdentificacion === ''
                || genero === '' || direccion === '' || barrio === '' || celular === '' || email === '' 
                || universidad === '' || carrera === '' || semestre === '' || relacionDeudor === ''
                || codigo === '' || ingresosMensuales === '' || gastosMensuales === '' || tratamientoDatos == '' || fondoIngresos == ''
                || cedulaDeudor == 0 || documentoEstudiante == 0 || ordenMatricula == 0 || departamento === '' || ciudad === ''){
                        deshabilitarBoton(botonSig4);
                } else {
                        habilitarBoton(botonSig4);
                }
                })
                
                iconValidate(icons);
    } 