/* script.js
   Lógica para: loader, starfield, cursor, panel de unidades, scroll suave y efectos.
*/
(function(){
  'use strict';

  // Helper: seleccionar
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  // Loader
  const loader = $('#loader');
  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      loader.style.opacity = '0';
      setTimeout(()=> loader.style.display='none',600);
    },600);
  });

  // Smooth scroll for nav links
  $$('.nav-links a').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      // mobile menu close if needed
    });
  });

  // To top
  const toTop = $('#toTop');
  toTop.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
  window.addEventListener('scroll', ()=>{
    if(window.scrollY>400) toTop.style.display='block'; else toTop.style.display='none';
  });

  // Custom cursor and light follow
  const cursor = $('#cursor');
  const light = $('#light');
  document.addEventListener('mousemove', e=>{
    cursor.style.left = e.clientX+'px';
    cursor.style.top = e.clientY+'px';
    light.style.left = e.clientX+'px';
    light.style.top = e.clientY+'px';
  });

  // Whatsapp button bounce effect
  const wa = $('#whatsappBtn');
  if(wa){
    wa.addEventListener('click', ()=>{
      wa.animate([{transform:'translateY(0)'},{transform:'translateY(-8px)'},{transform:'translateY(0)'}],{duration:360,easing:'cubic-bezier(.2,.9,.2,1)'});
    });
  }

  // Unit panels
  const unitCards = $$('.unit-card');
  const unitPanel = $('#unitPanel');
  const unitTitle = $('#unitTitle');
  const unitBody = $('#unitBody');
  const closePanel = $('#closePanel');

  const unitData = {
    1: {
      title: 'UNIDAD 1',
      headline: 'Estructura y funcionamiento del computador',
      intro: 'Comprende cómo un computador organiza sus componentes y procesa la información mediante estructuras y operaciones lógicas.',
      topics: [
        {
          id: 'von',
          title: 'Modelo de von Neumann y Harvard',
          description: 'Este modelo establece la forma en que la CPU accede a instrucciones y datos, y evidencia la diferencia entre arquitecturas más simples y aquellas diseñadas para mayor rendimiento.',
          highlights: ['Memoria compartida', 'Procesamiento secuencial', 'Rutas separadas'],
          whyItMatters: 'Comprenderlo permite analizar por qué ciertos diseños son más eficientes y cómo la arquitectura incide directamente sobre el rendimiento del sistema.',
          details: 'En el modelo de von Neumann, la CPU utiliza una misma ruta para acceder a instrucciones y datos desde la memoria principal. En el modelo Harvard, dichas rutas se separan, lo que permite una lectura y procesamiento más eficientes. Por esta razón, los sistemas embebidos y ciertos procesadores modernos adoptan esta arquitectura para lograr mayor rendimiento con menor latencia.',
          steps: ['Von Neumann: la CPU lee instrucción y datos desde la misma memoria.', 'Harvard: separa caminos para trabajar con más velocidad.', 'En muchos dispositivos pequeños, Harvard es ideal por su eficiencia.'],
          examples: ['Ejemplo 1: Enunciado: ¿Qué arquitectura usa una sola memoria para instrucciones y datos? Respuesta: von Neumann.', 'Ejemplo 2: Enunciado: ¿Qué arquitectura separa memoria de instrucciones y datos? Respuesta: Harvard.', 'Ejemplo 3: Enunciado: ¿Qué modelo puede causar un cuello de botella en memoria? Respuesta: von Neumann.', 'Ejemplo 4: Enunciado: ¿Qué diseño es preferido en microcontroladores por su rapidez? Respuesta: Harvard.', 'Ejemplo 5: Enunciado: ¿Qué arquitectura es más simple y flexible para PCs tradicionales? Respuesta: von Neumann.', 'Ejemplo 6: Enunciado: ¿Qué modelo permite leer instrucciones y datos al mismo tiempo? Respuesta: Harvard.', 'Ejemplo 7: Enunciado: ¿Qué diseño usa una ruta de memoria compartida para todo? Respuesta: von Neumann.', 'Ejemplo 8: Enunciado: ¿Qué modelo separa instrucciones y datos para mayor rendimiento? Respuesta: Harvard.', 'Ejemplo 9: Enunciado: ¿Cuál es la característica principal de von Neumann? Respuesta: memoria compartida para datos e instrucciones.', 'Ejemplo 10: Enunciado: ¿Cuál es la ventaja de Harvard en sistemas embebidos? Respuesta: menor latencia al separar rutas.'],
          analogy: 'Es como una escuela donde un profesor recibe todo en un solo escritorio o donde cada materia tiene su propio espacio de trabajo.',
          curiosity: 'El diseño de von Neumann fue clave en los primeros computadores modernos.'
        },
        {
          id: 'so',
          title: 'Sistemas operativos',
          description: 'Los sistemas operativos constituyen la capa intermedia que permite la interacción entre el usuario, los programas y el hardware, garantizando el funcionamiento coordinado del sistema.',
          highlights: ['Gestionan recursos', 'Permiten interactuar', 'Controlan aplicaciones'],
          whyItMatters: 'Sin ellos, el usuario no podría ejecutar programas, gestionar archivos ni interactuar con periféricos como el teclado, el mouse o la impresora.',
          details: 'El sistema operativo administra la memoria RAM, organiza los procesos dentro de la CPU, controla los archivos almacenados en disco y gestiona los dispositivos externos. Además, proporciona una interfaz que facilita la interacción del usuario con el equipo sin requerir la programación directa del hardware.',
          steps: ['Abres un navegador o una app.', 'El sistema asigna memoria y tiempo de CPU.', 'El programa se muestra en pantalla y puedes trabajar con él.'],
          examples: ['Ejemplo 1: Enunciado: ¿Qué componente detecta un USB conectado? Respuesta: El sistema operativo.', 'Ejemplo 2: Enunciado: ¿Qué administra la memoria entre varias aplicaciones? Respuesta: El sistema operativo.', 'Ejemplo 3: Enunciado: ¿Qué controla la cola de impresión? Respuesta: El sistema operativo.', 'Ejemplo 4: Enunciado: ¿Qué permite cambiar de ventana sin cerrar programas? Respuesta: El sistema operativo.', 'Ejemplo 5: Enunciado: ¿Qué asigna tiempo de CPU a los procesos activos? Respuesta: El sistema operativo.', 'Ejemplo 6: Enunciado: ¿Qué componente organiza los archivos en disco? Respuesta: El sistema operativo.', 'Ejemplo 7: Enunciado: ¿Qué detecta y presenta un dispositivo de entrada nuevo? Respuesta: El sistema operativo.', 'Ejemplo 8: Enunciado: ¿Qué gestiona la ejecución de aplicaciones en segundo plano? Respuesta: El sistema operativo.', 'Ejemplo 9: Enunciado: ¿Qué puede cerrar un programa que no responde para mantener estabilidad? Respuesta: El sistema operativo.', 'Ejemplo 10: Enunciado: ¿Qué coordina recursos en una red de computadoras? Respuesta: El sistema operativo.'],
          analogy: 'Es como un director de orquesta que organiza a todos los músicos para que la canción salga bien.',
          curiosity: 'Linux, Windows y Android comparten la misma idea: administrar recursos y facilitar la interacción.'
        },
        {
          id: 'numeracion',
          title: 'Sistemas de numeración y conversiones',
          description: 'Los computadores emplean sistemas de numeración como base 2, base 8 y base 16 para representar información de forma compacta y eficiente.',
          highlights: ['Binario: base 2', 'Octal: base 8', 'Hexadecimal: base 16'],
          whyItMatters: 'Estas bases permiten representar datos digitales, direcciones de memoria y valores cromáticos en pantallas de forma organizada y precisa.',
          details: 'El sistema binario se basa en 0 y 1 porque los circuitos electrónicos pueden representarlos como estados de apagado y encendido. El octal y el hexadecimal constituyen formas más compactas de expresar números binarios largos, resultando especialmente útiles en computación y programación.',
          steps: ['1011₂ = 8 + 2 + 1 = 11₁₀.', '37₈ = 3×8 + 7 = 31₁₀.', '2F₁₆ = 2×16 + 15 = 47₁₀.'],
          examples: ['Ejemplo 1: Enunciado: Convierte 1010₂ a decimal. Respuesta: 10₁₀.', 'Ejemplo 2: Enunciado: Convierte 27₈ a decimal. Respuesta: 23₁₀.', 'Ejemplo 3: Enunciado: Convierte 3F₁₆ a decimal. Respuesta: 63₁₀.', 'Ejemplo 4: Enunciado: Convierte 1001₂ a decimal. Respuesta: 9₁₀.', 'Ejemplo 5: Enunciado: Convierte 56₈ a decimal. Respuesta: 46₁₀.', 'Ejemplo 6: Enunciado: Convierte 2A₁₆ a decimal. Respuesta: 42₁₀.', 'Ejemplo 7: Enunciado: Convierte 1111₂ a decimal. Respuesta: 15₁₀.', 'Ejemplo 8: Enunciado: Convierte 34₈ a decimal. Respuesta: 28₁₀.', 'Ejemplo 9: Enunciado: Convierte 7B₁₆ a decimal. Respuesta: 123₁₀.', 'Ejemplo 10: Enunciado: Convierte 1100₂ a decimal. Respuesta: 12₁₀.'],
          analogy: 'Es como hablar el mismo mensaje en diferentes idiomas: binario, octal y hexadecimal son formas distintas de decir lo mismo.',
          curiosity: 'El hexadecimal se usa mucho en programación porque es más corto que el binario.'
        },
        {
          id: 'aritmetica',
          title: 'Aritmética binaria',
          description: 'La suma y la resta binarias siguen reglas lógicas claras; cuando una columna supera su valor límite, se genera un acarreo o un préstamo.',
          highlights: ['Suma con acarreo', 'Resta con préstamo', 'Base 2'],
          whyItMatters: 'Es la base para realizar operaciones internas en la CPU y comprender el procesamiento de datos a nivel elemental.',
          details: 'En binario, solo existen dos dígitos: 0 y 1. Cuando se suma 1 + 1, se produce un acarreo que se transfiere a la siguiente columna. En la resta, cuando una columna no puede realizar el préstamo necesario, se toma una unidad de la columna anterior.',
          steps: ['1011₂ + 0101₂ = 10000₂.', 'Primero se suma 1 + 1, que genera acarreo.', 'Luego se continúa con las columnas siguientes hasta completar la operación.'],
          examples: ['Ejemplo 1: Enunciado: 1011₂ + 0001₂. Respuesta: 1100₂.', 'Ejemplo 2: Enunciado: 1100₂ + 0011₂. Respuesta: 10011₂.', 'Ejemplo 3: Enunciado: 1001₂ + 0101₂. Respuesta: 1110₂.', 'Ejemplo 4: Enunciado: 0111₂ + 0001₂. Respuesta: 1000₂.', 'Ejemplo 5: Enunciado: 1010₂ - 0001₂. Respuesta: 1001₂.', 'Ejemplo 6: Enunciado: 1101₂ - 0010₂. Respuesta: 1011₂.', 'Ejemplo 7: Enunciado: 1000₂ - 0001₂. Respuesta: 0111₂.', 'Ejemplo 8: Enunciado: 1111₂ + 0001₂. Respuesta: 10000₂.', 'Ejemplo 9: Enunciado: 1011₂ - 0011₂. Respuesta: 1000₂.', 'Ejemplo 10: Enunciado: 0101₂ + 0101₂. Respuesta: 1010₂.'],
          analogy: 'Es como sumar monedas de un solo tipo: cada columna solo puede llevar un valor limitado antes de pasar al siguiente nivel.',
          curiosity: 'La CPU realiza miles de estas operaciones por segundo.'
        },
        {
          id: 'bool',
          title: 'Álgebra de Boole',
          description: 'La lógica booleana emplea valores de verdad para tomar decisiones dentro del hardware y del software, constituyendo la base de la computación digital.',
          highlights: ['AND', 'OR', 'NOT'],
          whyItMatters: 'Permite diseñar circuitos, filtros lógicos y condiciones de decisión en software y electrónica digital.',
          details: 'La lógica booleana opera con dos estados: verdadero y falso, representados como 1 y 0. Estas operaciones fundamentan las compuertas lógicas, las cuales forman los circuitos digitales y permiten tomar decisiones dentro de los sistemas electrónicos.',
          steps: ['Si A = 1 y B = 0, entonces A AND B = 0.', 'A OR B = 1.', 'NOT A = 0 y A XOR B = 1.'],
          examples: ['Ejemplo 1: Enunciado: ¿Cuál es el resultado de 1 AND 1? Respuesta: 1.', 'Ejemplo 2: Enunciado: ¿Cuál es el resultado de 1 OR 0? Respuesta: 1.', 'Ejemplo 3: Enunciado: ¿Cuál es el resultado de NOT 0? Respuesta: 1.', 'Ejemplo 4: Enunciado: ¿Cuál es el resultado de 1 XOR 1? Respuesta: 0.', 'Ejemplo 5: Enunciado: Si un sensor y una alarma deben activarse juntos, ¿qué operación es? Respuesta: AND.', 'Ejemplo 6: Enunciado: Si basta una condición para activar la luz, ¿qué operación es? Respuesta: OR.', 'Ejemplo 7: Enunciado: ¿Cómo se invierte una señal lógica? Respuesta: Con NOT.', 'Ejemplo 8: Enunciado: Si se requiere que dos condiciones sean verdaderas, ¿qué operación se usa? Respuesta: AND.', 'Ejemplo 9: Enunciado: Si se activa una señal solo cuando una de dos condiciones es verdadera, ¿qué operación es? Respuesta: XOR.', 'Ejemplo 10: Enunciado: ¿Cuál es el valor de 0 OR 0? Respuesta: 0.'],
          analogy: 'Es como un sistema de reglas simples que decide si algo se activa o no.',
          curiosity: 'La lógica booleana es la base de los circuitos digitales modernos.'
        }
      ]
    },
    2: {
      title: 'UNIDAD 2',
      headline: 'Algoritmos, diagramas de flujo y pseudocódigo',
      intro: 'Explora cómo se plantean las soluciones paso a paso para resolver problemas mediante algoritmos claros y comprensibles.',
      topics: [
        {
          id: 'algoritmos',
          title: 'Algoritmos y sus características',
          description: 'Un algoritmo es una secuencia ordenada de pasos que permite resolver un problema de manera lógica y efectiva.',
          highlights: ['Secuencia', 'Precisión', 'Finito'],
          whyItMatters: 'Permite resolver problemas de forma organizada y reproducible, tanto en programación como en la vida diaria.',
          details: 'Los algoritmos deben ser precisos, ordenados y tener un número finito de pasos. Además, deben resolver el problema sin ambigüedades para que cualquier persona o sistema pueda ejecutarlos de la misma manera.',
          steps: ['Inicio del problema.', 'Definición de pasos claros.', 'Ejecución hasta llegar a una solución.', 'Finalización del proceso.'],
          examples: ['Ejemplo 1: Enunciado: Define un algoritmo para preparar un café. Respuesta: Calentar agua, agregar café, mezclar y servir.', 'Ejemplo 2: Enunciado: Define un algoritmo para encender una computadora. Respuesta: Conectar cable, pulsar botón y esperar el arranque.', 'Ejemplo 3: Enunciado: Define un algoritmo para sacar un permiso. Respuesta: Llenar formulario, presentar documentos y esperar la aprobación.', 'Ejemplo 4: Enunciado: Define un algoritmo para sumar dos números. Respuesta: Leer dos valores, sumarlos y mostrar el resultado.', 'Ejemplo 5: Enunciado: Define un algoritmo para encontrar un libro en una biblioteca. Respuesta: Buscar categoría, revisar estante y tomar el libro.', 'Ejemplo 6: Enunciado: Define un algoritmo para lavar ropa. Respuesta: Separar prendas, agregar jabón y lavar.', 'Ejemplo 7: Enunciado: Define un algoritmo para llegar a la escuela. Respuesta: Salir de casa, tomar transporte y llegar.', 'Ejemplo 8: Enunciado: Define un algoritmo para abrir una puerta. Respuesta: Insertar llave, girar y empujar.', 'Ejemplo 9: Enunciado: Define un algoritmo para preparar una receta. Respuesta: Medir ingredientes, mezclar y cocinar.', 'Ejemplo 10: Enunciado: Define un algoritmo para revisar una tarea. Respuesta: Leer instrucciones, resolver y entregar.'],
          analogy: 'Es como una receta de cocina: si sigues cada paso en orden, obtienes el resultado esperado.',
          curiosity: 'Los algoritmos están presentes en aplicaciones, juegos, redes y sistemas de recomendación.'
        },
        {
          id: 'diagramas',
          title: 'Los diagramas de flujo como herramienta de modelación',
          description: 'Los diagramas de flujo representan visualmente los pasos de un algoritmo mediante símbolos estandarizados.',
          highlights: ['Inicio/fin', 'Procesos', 'Decisiones'],
          whyItMatters: 'Ayudan a entender mejor la lógica de un problema antes de programar, porque muestran el proceso de forma visual.',
          details: 'Un diagrama de flujo usa formas como óvalos para inicio y fin, rectángulos para procesos, rombos para decisiones y flechas para indicar el recorrido. Esto facilita la comprensión del algoritmo.',
          steps: ['Inicio.', 'Leer datos.', 'Tomar una decisión.', 'Ejecutar proceso.', 'Fin.'],
          examples: ['Ejemplo 1: Enunciado: Diagrama para saber si una persona puede votar. Respuesta: Comprobar si edad >= 18 y mostrar "Puede votar" o "No puede votar".', 'Ejemplo 2: Enunciado: Diagrama para verificar si un número es par o impar. Respuesta: Si número % 2 == 0 entonces par, si no impar.', 'Ejemplo 3: Enunciado: Diagrama para calcular la suma de dos valores. Respuesta: Leer valor1 y valor2, sumar y mostrar resultado.', 'Ejemplo 4: Enunciado: Diagrama para revisar si una contraseña es correcta. Respuesta: Comparar contraseña ingresada con la guardada y mostrar acceso o error.', 'Ejemplo 5: Enunciado: Diagrama para elegir entre dos rutas de transporte. Respuesta: Evaluar tiempo y costo y seleccionar la mejor ruta.', 'Ejemplo 6: Enunciado: Diagrama para determinar si un estudiante aprobó o no. Respuesta: Si nota >= 7 entonces aprobado, si no reprobado.', 'Ejemplo 7: Enunciado: Diagrama para decidir si se compra o no un producto. Respuesta: Evaluar presupuesto y necesidad y luego decidir.', 'Ejemplo 8: Enunciado: Diagrama para controlar el ingreso a una sala. Respuesta: Si credencial válida entonces permitir acceso, si no denegar.', 'Ejemplo 9: Enunciado: Diagrama para evaluar si se debe prender la luz. Respuesta: Si está oscuro o hay personas presentes, prender la luz.', 'Ejemplo 10: Enunciado: Diagrama para verificar si hay stock de un producto. Respuesta: Si stock > 0 entonces vender, si no mostrar agotado.'],
          analogy: 'Es como un mapa de ruta que muestra cada paso antes de iniciar el viaje.',
          curiosity: 'Los diagramas de flujo son útiles para documentar procesos en empresas y sistemas.'
        },
        {
          id: 'pseudocodigo',
          title: 'Pseudocódigo: una herramienta de palabras útil',
          description: 'El pseudocódigo expresa un algoritmo con palabras, frases y estructuras simples, parecidas a un lenguaje de programación.',
          highlights: ['Lenguaje simple', 'Estructura lógica', 'Facilita la programación'],
          whyItMatters: 'Permite traducir la solución de un problema a una forma más clara antes de escribir código real.',
          details: 'El pseudocódigo utiliza instrucciones como Inicio, Leer, Si, Entonces, Mientras y Fin. Es una herramienta intermedia entre el lenguaje natural y un lenguaje de programación.',
          steps: ['Inicio.', 'Leer datos.', 'Comparar información.', 'Mostrar resultado.', 'Fin.'],
          examples: ['Ejemplo 1: Enunciado: Pseudocódigo para sumar dos números. Respuesta: Leer valor1 y valor2, sumar y mostrar resultado.', 'Ejemplo 2: Enunciado: Pseudocódigo para determinar si un número es positivo o negativo. Respuesta: Si número >= 0 entonces positivo, si no negativo.', 'Ejemplo 3: Enunciado: Pseudocódigo para imprimir los números del 1 al 5. Respuesta: Inicializar i=1, mientras i<=5 imprimir i y sumar 1.', 'Ejemplo 4: Enunciado: Pseudocódigo para verificar si una contraseña es válida. Respuesta: Leer contraseña, compararla con la guardada y mostrar resultado.', 'Ejemplo 5: Enunciado: Pseudocódigo para calcular el promedio de tres notas. Respuesta: Sumar notas, dividir entre 3 y mostrar promedio.', 'Ejemplo 6: Enunciado: Pseudocódigo para hallar el mayor de dos números. Respuesta: Si valor1 > valor2 mostrar valor1, si no mostrar valor2.', 'Ejemplo 7: Enunciado: Pseudocódigo para repetir una acción cinco veces. Respuesta: Repetir acción de i=1 a 5.', 'Ejemplo 8: Enunciado: Pseudocódigo para decidir si una persona puede entrar a un evento. Respuesta: Si edad >= 18 y entrada válida entonces permitir, si no negar.', 'Ejemplo 9: Enunciado: Pseudocódigo para convertir grados Celsius a Fahrenheit. Respuesta: fahrenheit = celsius*9/5 + 32.', 'Ejemplo 10: Enunciado: Pseudocódigo para determinar si un año es bisiesto. Respuesta: Si año % 4 == 0 y (año % 100 != 0 o año % 400 == 0) entonces sí, si no no.'],
          analogy: 'Es como escribir una guía paso a paso antes de construir algo complejo.',
          curiosity: 'Muchos programadores comienzan con pseudocódigo antes de escribir código en Java, Python o C.'
        },
        {
          id: 'problemas',
          title: 'Modelo de problemas',
          description: 'El modelo de problemas consiste en identificar la situación, analizarla y transformarla en una solución algorítmica clara.',
          highlights: ['Análisis', 'Definición', 'Solución'],
          whyItMatters: 'Ayuda a comprender mejor el problema y a diseñar una solución correcta y eficiente.',
          details: 'Primero se reconoce el problema, luego se definen variables y condiciones, después se construye el algoritmo y por último se comprueba si resuelve la situación planteada.',
          steps: ['Identificar el problema.', 'Separar los datos importantes.', 'Diseñar pasos.', 'Probar la solución.'],
          examples: ['Ejemplo 1: Enunciado: Calcular el promedio de notas. Respuesta: Sumar todas las notas y dividir por el número de notas.', 'Ejemplo 2: Enunciado: Saber si una persona cumple requisitos de edad. Respuesta: Comparar edad con el mínimo requerido.', 'Ejemplo 3: Enunciado: Determinar el costo total de varios productos. Respuesta: Sumar el precio de cada producto.', 'Ejemplo 4: Enunciado: Organizar una lista de tareas por prioridad. Respuesta: Ordenar las tareas según su importancia.', 'Ejemplo 5: Enunciado: Revisar si un número es divisible entre 2. Respuesta: Verificar si el resto es 0.', 'Ejemplo 6: Enunciado: Encontrar el mayor de tres números. Respuesta: Comparar los tres valores y elegir el mayor.', 'Ejemplo 7: Enunciado: Calcular el área de un rectángulo. Respuesta: base × altura.', 'Ejemplo 8: Enunciado: Calcular el precio con descuento. Respuesta: Restar el porcentaje de descuento al precio original.', 'Ejemplo 9: Enunciado: Registrar ingreso de empleados. Respuesta: Leer datos y almacenarlos en una lista.', 'Ejemplo 10: Enunciado: Clasificar personas por edad. Respuesta: Asignar rango según grupo etario.'],
          analogy: 'Es como desmontar un problema grande en piezas pequeñas para entenderlo mejor.',
          curiosity: 'El pensamiento algorítmico es una habilidad esencial en ciencias, ingeniería y tecnología.'
        }
      ]
    }
  };

  function renderUnitContent(id){
    if(id === '1'){
      const data = unitData[1];
      unitTitle.innerHTML = `<span class="unit-label">${data.title}</span><span class="unit-headline">${data.headline}</span>`;
      unitBody.innerHTML = `
        <div class="unit-intro">
          <p>${data.intro}</p>
          <div class="topic-switcher">
            ${data.topics.map((topic, index) => `<button class="topic-btn ${index === 0 ? 'active' : ''}" data-topic="${topic.id}">${topic.title}</button>`).join('')}
          </div>
        </div>
        <div id="topicCard" class="topic-card"></div>
      `;

      const topicCard = $('#topicCard');
      const buttons = Array.from(unitBody.querySelectorAll('.topic-btn'));

      function showTopic(topicId){
        const topic = data.topics.find(item => item.id === topicId) || data.topics[0];
        buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.topic === topicId));
        if(topicCard){
          topicCard.innerHTML = `
            <div class="topic-header">
              <h4>${topic.title}</h4>
              <p>${topic.description}</p>
            </div>
            <div class="topic-badges">
              ${topic.highlights.map(item => `<span>${item}</span>`).join('')}
            </div>
            <div class="topic-grid">
              <div class="topic-block">
                <h5>Por qué importa</h5>
                <p>${topic.whyItMatters}</p>
              </div>
              <div class="topic-block">
                <h5>Conceptos clave</h5>
                <ul>
                  ${topic.steps.map(step => `<li>${step}</li>`).join('')}
                </ul>
              </div>
              <div class="topic-block wide">
                <h5>Explicación detallada</h5>
                <p>${topic.details}</p>
              </div>
            </div>
            <div class="example-box">
              <h5>Ejemplos adicionales</h5>
              <ul>
                ${topic.examples.map(example => `<li>${example}</li>`).join('')}
              </ul>
            </div>
            <div class="topic-foot">
              <div class="topic-note"><strong>Analogía:</strong> ${topic.analogy}</div>
              <div class="topic-note"><strong>Dato curioso:</strong> ${topic.curiosity}</div>
            </div>
          `;
        }
      }

      buttons.forEach(btn => btn.addEventListener('click', () => showTopic(btn.dataset.topic)));
      showTopic(data.topics[0].id);
      return;
    }

    if(id === '2'){
      const data = unitData[2];
      unitTitle.innerHTML = `<span class="unit-label">${data.title}</span><span class="unit-headline">${data.headline}</span>`;
      unitBody.innerHTML = `
        <div class="unit-intro">
          <p>${data.intro}</p>
          <div class="topic-switcher">
            ${data.topics.map((topic, index) => `<button class="topic-btn ${index === 0 ? 'active' : ''}" data-topic="${topic.id}">${topic.title}</button>`).join('')}
          </div>
        </div>
        <div id="topicCard" class="topic-card"></div>
      `;

      const topicCard = $('#topicCard');
      const buttons = Array.from(unitBody.querySelectorAll('.topic-btn'));

      function showTopic(topicId){
        const topic = data.topics.find(item => item.id === topicId) || data.topics[0];
        buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.topic === topicId));
        if(topicCard){
          topicCard.innerHTML = `
            <div class="topic-header">
              <h4>${topic.title}</h4>
              <p>${topic.description}</p>
            </div>
            <div class="topic-badges">
              ${topic.highlights.map(item => `<span>${item}</span>`).join('')}
            </div>
            <div class="topic-grid">
              <div class="topic-block">
                <h5>Por qué importa</h5>
                <p>${topic.whyItMatters}</p>
              </div>
              <div class="topic-block">
                <h5>Conceptos clave</h5>
                <ul>
                  ${topic.steps.map(step => `<li>${step}</li>`).join('')}
                </ul>
              </div>
              <div class="topic-block wide">
                <h5>Explicación detallada</h5>
                <p>${topic.details}</p>
              </div>
            </div>
            <div class="example-box">
              <h5>Ejemplos adicionales</h5>
              <ul>
                ${topic.examples.map(example => `<li>${example}</li>`).join('')}
              </ul>
            </div>
            <div class="topic-foot">
              <div class="topic-note"><strong>Analogía:</strong> ${topic.analogy}</div>
              <div class="topic-note"><strong>Dato curioso:</strong> ${topic.curiosity}</div>
            </div>
          `;
        }
      }

      buttons.forEach(btn => btn.addEventListener('click', () => showTopic(btn.dataset.topic)));
      showTopic(data.topics[0].id);
      return;
    }

    unitTitle.textContent = `UNIDAD ${id}`;
    unitBody.innerHTML = '<div class="unit-placeholder">Aquí podrás agregar información más adelante.</div>';
  }

  unitCards.forEach(card=>{
    card.addEventListener('click', ()=>{
      const id = card.dataset.unit;
      renderUnitContent(id);
      unitPanel.style.display = 'block';
      setTimeout(()=> unitPanel.classList.add('visible'),20);
    });
  });
  closePanel.addEventListener('click', ()=>{
    unitPanel.classList.remove('visible');
    setTimeout(()=> unitPanel.style.display='none',300);
  });

  // Reveal elements on scroll
  const reveals = $$('.reveal');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('visible'); obs.unobserve(en.target); } });
  },{threshold:.12});
  $$('.hero, .units, .contact, .info-card, .photo-card').forEach(el=>{ el.classList.add('reveal'); obs.observe(el); });

  // Mobile menu toggle
  const menuToggle = $('#menuToggle');
  const navLinks = $('.nav-links');
  if(menuToggle){
    menuToggle.addEventListener('click', ()=>{
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Simple starfield canvas
  const canvas = document.getElementById('starfield');
  const ctx = canvas && canvas.getContext && canvas.getContext('2d');
  let stars = [];
  function resize(){
    if(!canvas) return;
    canvas.width = innerWidth; canvas.height = innerHeight;
  }
  function initStars(){
    stars = [];
    const count = Math.round((innerWidth*innerHeight)/50000);
    for(let i=0;i<count;i++) stars.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.6,alpha:Math.random()});
  }
  function drawStars(){
    if(!ctx) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    stars.forEach(s=>{
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${0.25 + Math.sin(Date.now()/1000 + s.x)*0.25 * s.alpha})`;
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fill();
    });
  }
  function animate(){ drawStars(); requestAnimationFrame(animate); }
  window.addEventListener('resize', ()=>{ resize(); initStars(); });
  resize(); initStars(); animate();

  // Photo upload & preview (drag & drop + file input)
  const photoInput = document.getElementById('photoInput');
  const photoPreview = document.getElementById('photoPreview');
  const photoArea = document.getElementById('photoArea');
  let currentObjectURL = null;

  function showPreview(file){
    if(!file || !file.type.startsWith('image/')) return;
    if(currentObjectURL) URL.revokeObjectURL(currentObjectURL);
    currentObjectURL = URL.createObjectURL(file);
    photoPreview.style.backgroundImage = `url(${currentObjectURL})`;
    photoPreview.classList.add('has-photo');
    const txt = photoPreview.querySelector('.photo-text'); if(txt) txt.style.display='none';
  }

  if(photoInput && photoPreview && photoArea){
    photoInput.addEventListener('change', e=>{
      const f = e.target.files && e.target.files[0];
      if(f) showPreview(f);
    });

    // Drag & drop
    photoArea.addEventListener('dragover', e=>{ e.preventDefault(); photoArea.classList.add('dragover'); });
    photoArea.addEventListener('dragleave', e=>{ photoArea.classList.remove('dragover'); });
    photoArea.addEventListener('drop', e=>{
      e.preventDefault(); photoArea.classList.remove('dragover');
      const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if(f) showPreview(f);
    });
  }

  // Ratings: interactividad y persistencia
  function storageKey(unitId){ return `rating_unit_${unitId}`; }
  function getStoredRating(unitId){ const v = localStorage.getItem(storageKey(unitId)); return v ? parseFloat(v) : null; }
  function saveRating(unitId, rating){ localStorage.setItem(storageKey(unitId), String(rating)); }

  function renderRatingElement(ratingEl, rating){
    if(!ratingEl) return;
    const stars = Array.from(ratingEl.querySelectorAll('.star'));
    stars.forEach((star, idx)=>{
      const i = idx+1;
      star.classList.remove('full','half','empty');
      if(rating >= i) star.classList.add('full');
      else if(rating >= i-0.5) star.classList.add('half');
      else star.classList.add('empty');
    });
    ratingEl.setAttribute('aria-label', `Valoración: ${rating} de 5`);
  }

  function initRatings(){
    const unitCards = Array.from(document.querySelectorAll('.unit-card'));
    unitCards.forEach(card=>{
      const unitId = card.dataset.unit || card.id || '0';
      const ratingEl = card.querySelector('.rating');
      if(!ratingEl) return;

      // initial rating: stored or defaults
      const stored = getStoredRating(unitId);
      let initial = stored !== null ? stored : (unitId === '1' || unitId === '2' ? 5 : 3.5);
      renderRatingElement(ratingEl, initial);

      // events
      const stars = Array.from(ratingEl.querySelectorAll('.star'));
      stars.forEach(star=>{
        const val = parseInt(star.dataset.value,10) || 0;
        star.addEventListener('mouseover', ()=> renderRatingElement(ratingEl, val));
        star.addEventListener('focus', ()=> renderRatingElement(ratingEl, val));
        star.addEventListener('click', ()=>{
          saveRating(unitId, val);
          renderRatingElement(ratingEl, val);
        });
      });

      ratingEl.addEventListener('mouseleave', ()=>{
        const v = getStoredRating(unitId);
        const toRender = v !== null ? v : initial;
        renderRatingElement(ratingEl, toRender);
      });
    });
  }

  // Inicializar ratings al final
  initRatings();

})();
