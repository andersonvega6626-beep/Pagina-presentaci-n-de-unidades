/* script.js
   Lógica para: starfield, cursor, panel de unidades, scroll suave, perfil y efectos.
*/
(function(){
  'use strict';

  // Helper: seleccionar
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  // Smooth scroll for nav links
  const navLinks = $$('.nav-links a');
  function openUnitPanel(unitId){
    const id = String(unitId).replace('#','');
    renderUnitContent(id);
    unitPanel.style.display = 'block';
    requestAnimationFrame(()=> unitPanel.classList.add('visible'));
    if(panelBot){
      panelBot.classList.remove('close-gesture');
      panelBot.classList.add('visible','open-gesture');
      const bubble = panelBot.querySelector('.panel-bubble');
      if(bubble) bubble.textContent = '¡Abriendo datos!';
    }
    const unitsSection = document.querySelector('.units');
    if(unitsSection) unitsSection.scrollIntoView({behavior:'smooth', block:'start'});
  }

  navLinks.forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href === '#unidad1' || href === '#unidad2' || href === '#unidad3'){
        e.preventDefault();
        openUnitPanel(href.replace('#',''));
        return;
      }
      if(href === '#contacto'){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth',block:'start'});
        }
      }
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
    if(cursor){
      cursor.style.left = e.clientX+'px';
      cursor.style.top = e.clientY+'px';
    }
    if(light){
      light.style.left = e.clientX+'px';
      light.style.top = e.clientY+'px';
    }
  });

  const photoInput = document.getElementById('photoInput');
  const photoPreview = document.getElementById('photoPreview');
  const photoLabel = document.querySelector('.photo-label');

  function updatePhotoPreview(file){
    if(!file || !photoPreview) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      photoPreview.style.backgroundImage = `url('${reader.result}')`;
      photoPreview.classList.add('has-photo','has-profile');
      const txt = photoPreview.querySelector('.photo-text');
      if(txt) txt.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }

  if(photoInput && photoLabel){
    photoInput.addEventListener('change', e=>{
      const file = e.target.files && e.target.files[0];
      if(file) updatePhotoPreview(file);
    });

    ['dragenter','dragover'].forEach(eventName => {
      photoLabel.addEventListener(eventName, e=>{
        e.preventDefault();
        e.stopPropagation();
        photoLabel.classList.add('dragover');
      });
    });

    ['dragleave','drop'].forEach(eventName => {
      photoLabel.addEventListener(eventName, e=>{
        e.preventDefault();
        e.stopPropagation();
        photoLabel.classList.remove('dragover');
      });
    });

    photoLabel.addEventListener('drop', e=>{
      const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if(file){
        updatePhotoPreview(file);
        photoInput.files = e.dataTransfer.files;
      }
    });
  }

  const interactiveElements = Array.from(document.querySelectorAll('a, button, .unit-card, .topic-btn, .btn, .photo-label'));
  interactiveElements.forEach(el=>{
    el.addEventListener('mouseenter', ()=> cursor && cursor.classList.add('active'));
    el.addEventListener('mouseleave', ()=> cursor && cursor.classList.remove('active'));
    el.addEventListener('mousedown', ()=> cursor && cursor.classList.add('press'));
    el.addEventListener('mouseup', ()=> cursor && cursor.classList.remove('press'));
  });

  document.addEventListener('mousedown', ()=> cursor && cursor.classList.add('press'));
  document.addEventListener('mouseup', ()=> cursor && cursor.classList.remove('press'));

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
  const panelBot = $('#panelBot');

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
          details: 'El sistema binario se basa en 0 y 1 porque los circuitos electrónicos pueden representarlos como estados de apagado y encendido. El octal y el hexadecimal constituyen formas más compactas de expresar números binarios largos, resultando especialmente útiles en computación y programación. Por ejemplo, un byte puede escribirse como 10101010₂ o como AA₁₆, lo que facilita la lectura de direcciones y valores técnicos.',
          steps: ['1011₂ = 8 + 2 + 1 = 11₁₀.', '37₈ = 3×8 + 7 = 31₁₀.', '2F₁₆ = 2×16 + 15 = 47₁₀.', 'Las bases permiten expresar números de forma más compacta.'],
          examples: ['Ejemplo 1: Enunciado: Convierte 1010₂ a decimal. Respuesta: 10₁₀.', 'Ejemplo 2: Enunciado: Convierte 27₈ a decimal. Respuesta: 23₁₀.', 'Ejemplo 3: Enunciado: Convierte 3F₁₆ a decimal. Respuesta: 63₁₀.', 'Ejemplo 4: Enunciado: Convierte 1001₂ a decimal. Respuesta: 9₁₀.'],
          analogy: 'Es como hablar el mismo mensaje en diferentes idiomas: binario, octal y hexadecimal son formas distintas de decir lo mismo.',
          curiosity: 'El hexadecimal se usa mucho en programación porque es más corto que el binario y se lee con mayor facilidad.'
        },
        {
          id: 'aritmetica',
          title: 'Aritmética binaria',
          description: 'La suma y la resta binarias siguen reglas lógicas claras; cuando una columna supera su valor límite, se genera un acarreo o un préstamo.',
          highlights: ['Suma con acarreo', 'Resta con préstamo', 'Base 2'],
          whyItMatters: 'Es la base para realizar operaciones internas en la CPU y comprender el procesamiento de datos a nivel elemental.',
          details: 'En binario, solo existen dos dígitos: 0 y 1. Cuando se suma 1 + 1, se produce un acarreo que se transfiere a la siguiente columna. En la resta, cuando una columna no puede realizar el préstamo necesario, se toma una unidad de la columna anterior. Estas operaciones son las base de todas las funciones aritméticas internas que realiza la CPU.',
          steps: ['1011₂ + 0101₂ = 10000₂.', 'Primero se suma 1 + 1, que genera acarreo.', 'Luego se continúa con las columnas siguientes hasta completar la operación.', 'La lógica es la misma que en decimal, pero con solo dos símbolos.'],
          examples: ['Ejemplo 1: Enunciado: 1011₂ + 0001₂. Respuesta: 1100₂.', 'Ejemplo 2: Enunciado: 1100₂ + 0011₂. Respuesta: 10011₂.', 'Ejemplo 3: Enunciado: 1001₂ + 0101₂. Respuesta: 1110₂.', 'Ejemplo 4: Enunciado: 1010₂ - 0001₂. Respuesta: 1001₂.'],
          analogy: 'Es como sumar monedas de un solo tipo: cada columna solo puede llevar un valor limitado antes de pasar al siguiente nivel.',
          curiosity: 'La CPU realiza miles de estas operaciones por segundo, aunque no lo percibamos.'
        },
        {
          id: 'bool',
          title: 'Álgebra de Boole',
          description: 'La lógica booleana emplea valores de verdad para tomar decisiones dentro del hardware y del software, constituyendo la base de la computación digital.',
          highlights: ['AND', 'OR', 'NOT'],
          whyItMatters: 'Permite diseñar circuitos, filtros lógicos y condiciones de decisión en software y electrónica digital.',
          details: 'La lógica booleana opera con dos estados: verdadero y falso, representados como 1 y 0. Estas operaciones fundamentan las compuertas lógicas, las cuales forman los circuitos digitales y permiten tomar decisiones dentro de los sistemas electrónicos. Gracias a ellas, una computadora puede comparar datos, validar información y activar funciones específicas.',
          steps: ['Si A = 1 y B = 0, entonces A AND B = 0.', 'A OR B = 1.', 'NOT A = 0 y A XOR B = 1.', 'Estas reglas permiten construir decisiones complejas con pocas operaciones.'],
          examples: ['Ejemplo 1: Enunciado: ¿Cuál es el resultado de 1 AND 1? Respuesta: 1.', 'Ejemplo 2: Enunciado: ¿Cuál es el resultado de 1 OR 0? Respuesta: 1.', 'Ejemplo 3: Enunciado: ¿Cuál es el resultado de NOT 0? Respuesta: 1.', 'Ejemplo 4: Enunciado: Si un sensor y una alarma deben activarse juntos, ¿qué operación es? Respuesta: AND.'],
          analogy: 'Es como un sistema de reglas simples que decide si algo se activa o no.',
          curiosity: 'La lógica booleana es la base de los circuitos digitales modernos y de muchas decisiones dentro del software.'
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
          details: 'Los algoritmos deben ser precisos, ordenados y tener un número finito de pasos. Además, deben resolver el problema sin ambigüedades para que cualquier persona o sistema pueda ejecutarlos de la misma manera. Un algoritmo bueno no solo da una solución, sino que lo hace de la forma más clara y eficiente posible.',
          steps: ['Inicio del problema.', 'Definición de pasos claros.', 'Ejecución hasta llegar a una solución.', 'Finalización del proceso.', 'Verificar que el resultado sea correcto.'],
          examples: ['Ejemplo 1: Enunciado: Define un algoritmo para preparar un café. Respuesta: Calentar agua, agregar café, mezclar y servir.', 'Ejemplo 2: Enunciado: Define un algoritmo para encender una computadora. Respuesta: Conectar cable, pulsar botón y esperar el arranque.', 'Ejemplo 3: Enunciado: Define un algoritmo para sumar dos números. Respuesta: Leer dos valores, sumarlos y mostrar el resultado.'],
          analogy: 'Es como una receta de cocina: si sigues cada paso en orden, obtienes el resultado esperado.',
          curiosity: 'Los algoritmos están presentes en aplicaciones, juegos, redes y sistemas de recomendación.'
        },
        {
          id: 'diagramas',
          title: 'Los diagramas de flujo como herramienta de modelación',
          description: 'Los diagramas de flujo representan visualmente los pasos de un algoritmo mediante símbolos estandarizados.',
          highlights: ['Inicio/fin', 'Procesos', 'Decisiones'],
          whyItMatters: 'Ayudan a entender mejor la lógica de un problema antes de programar, porque muestran el proceso de forma visual.',
          details: 'Un diagrama de flujo usa formas como óvalos para inicio y fin, rectángulos para procesos, rombos para decisiones y flechas para indicar el recorrido. Esto facilita la comprensión del algoritmo porque visualiza el camino que seguirán los datos desde el comienzo hasta la solución.',
          steps: ['Inicio.', 'Leer datos.', 'Tomar una decisión.', 'Ejecutar proceso.', 'Fin.', 'Revisar si el resultado cumple con lo esperado.'],
          examples: ['Ejemplo 1: Enunciado: Diagrama para saber si una persona puede votar. Respuesta: Comprobar si edad >= 18 y mostrar "Puede votar" o "No puede votar".', 'Ejemplo 2: Enunciado: Diagrama para verificar si un número es par o impar. Respuesta: Si número % 2 == 0 entonces par, si no impar.', 'Ejemplo 3: Enunciado: Diagrama para calcular la suma de dos valores. Respuesta: Leer valor1 y valor2, sumar y mostrar resultado.'],
          analogy: 'Es como un mapa de ruta que muestra cada paso antes de iniciar el viaje.',
          curiosity: 'Los diagramas de flujo son útiles para documentar procesos en empresas y sistemas.'
        },
        {
          id: 'pseudocodigo',
          title: 'Pseudocódigo: una herramienta de palabras útil',
          description: 'El pseudocódigo expresa un algoritmo con palabras, frases y estructuras simples, parecidas a un lenguaje de programación.',
          highlights: ['Lenguaje simple', 'Estructura lógica', 'Facilita la programación'],
          whyItMatters: 'Permite traducir la solución de un problema a una forma más clara antes de escribir código real.',
          details: 'El pseudocódigo utiliza instrucciones como Inicio, Leer, Si, Entonces, Mientras y Fin. Es una herramienta intermedia entre el lenguaje natural y un lenguaje de programación porque permite expresar una solución sin preocuparnos todavía por la sintaxis exacta.',
          steps: ['Inicio.', 'Leer datos.', 'Comparar información.', 'Mostrar resultado.', 'Fin.', 'Revisar si la lógica es clara.'],
          examples: ['Ejemplo 1: Enunciado: Pseudocódigo para sumar dos números. Respuesta: Leer valor1 y valor2, sumar y mostrar resultado.', 'Ejemplo 2: Enunciado: Pseudocódigo para determinar si un número es positivo o negativo. Respuesta: Si número >= 0 entonces positivo, si no negativo.', 'Ejemplo 3: Enunciado: Pseudocódigo para imprimir los números del 1 al 5. Respuesta: Inicializar i=1, mientras i<=5 imprimir i y sumar 1.'],
          analogy: 'Es como escribir una guía paso a paso antes de construir algo complejo.',
          curiosity: 'Muchos programadores comienzan con pseudocódigo antes de escribir código en Java, Python o C.'
        },
        {
          id: 'problemas',
          title: 'Modelo de problemas',
          description: 'El modelo de problemas consiste en identificar la situación, analizarla y transformarla en una solución algorítmica clara.',
          highlights: ['Análisis', 'Definición', 'Solución'],
          whyItMatters: 'Ayuda a comprender mejor el problema y a diseñar una solución correcta y eficiente.',
          details: 'Primero se reconoce el problema, luego se definen variables y condiciones, después se construye el algoritmo y por último se comprueba si resuelve la situación planteada. Este enfoque ayuda a pensar con orden y a evitar errores al momento de programar.',
          steps: ['Identificar el problema.', 'Separar los datos importantes.', 'Diseñar pasos.', 'Probar la solución.', 'Corregir errores si aparecen.'],
          examples: ['Ejemplo 1: Enunciado: Calcular el promedio de notas. Respuesta: Sumar todas las notas y dividir por el número de notas.', 'Ejemplo 2: Enunciado: Saber si una persona cumple requisitos de edad. Respuesta: Comparar edad con el mínimo requerido.', 'Ejemplo 3: Enunciado: Determinar el costo total de varios productos. Respuesta: Sumar el precio de cada producto.'],
          analogy: 'Es como desmontar un problema grande en piezas pequeñas para entenderlo mejor.',
          curiosity: 'El pensamiento algorítmico es una habilidad esencial en ciencias, ingeniería y tecnología.'
        }
      ]
    },
    3: {
      title: 'UNIDAD 3',
      headline: 'Programación',
      intro: 'Descubre cómo pensar como programador con lenguajes, operadores y estructuras de control que te ayudan a resolver problemas paso a paso.',
      topics: [
        {
          id: 'lenguajes',
          title: 'Lenguajes y paradigmas de programación',
          description: 'Los lenguajes de programación permiten traducir ideas humanas en instrucciones que la computadora puede ejecutar.',
          highlights: ['Python', 'Java', 'C++'],
          whyItMatters: 'Cada lenguaje tiene un estilo distinto y se adapta mejor a ciertos problemas, por eso conocer varios facilita elegir el correcto.',
          details: 'Un paradigma es la forma de pensar para resolver problemas; por ejemplo, la programación orientada a objetos organiza el código en objetos y clases, mientras que la programación estructurada sigue pasos lógicos y claros. Cada enfoque sirve para resolver problemas de forma distinta, y el programador elige el que mejor se adapta al proyecto.',
          steps: ['Elegir un lenguaje según la tarea.', 'Organizar el problema en partes.', 'Escribir instrucciones precisas.', 'Probar y corregir errores.', 'Elegir el paradigma que mejor organiza la solución.'],
          examples: ['Ejemplo 1: Enunciado: ¿Qué lenguaje es muy usado para aprender a programar? Respuesta: Python.', 'Ejemplo 2: Enunciado: ¿Qué paradigma usa clases y objetos? Respuesta: Programación orientada a objetos.', 'Ejemplo 3: Enunciado: ¿Qué paradigma sigue pasos secuenciales y estructuras? Respuesta: Programación estructurada.', 'Ejemplo 4: Enunciado: ¿Qué lenguaje es conocido por su sintaxis simple? Respuesta: Python.'],
          analogy: 'Es como elegir la herramienta correcta para construir una casa: no todas sirven para lo mismo.',
          curiosity: 'Python es uno de los lenguajes más usados en inteligencia artificial y automatización.'
        },
        {
          id: 'python',
          title: 'Introducción a la programación en Python',
          description: 'Python es un lenguaje sencillo y muy popular porque su sintaxis se parece al lenguaje natural.',
          highlights: ['Sintaxis clara', 'Fácil de aprender', 'Muy usado'],
          whyItMatters: 'Permite crear programas rápidos, desde pequeños ejercicios hasta aplicaciones reales.',
          details: 'En Python se escriben instrucciones como print("Hola") para mostrar mensajes y variables para guardar datos. Esto lo hace ideal para aprender fundamentos de programación porque permite concentrarse en la lógica sin perder tiempo con una sintaxis muy complicada.',
          steps: ['Definir una variable.', 'Asignar un valor.', 'Mostrar el resultado con print.', 'Modificar el valor si es necesario.', 'Combinar varias instrucciones para resolver un problema.'],
          examples: ['Ejemplo 1: Enunciado: Escribe un programa que muestre "Hola". Respuesta: print("Hola").', 'Ejemplo 2: Enunciado: Guarda tu edad en una variable. Respuesta: edad = 19.', 'Ejemplo 3: Enunciado: Muestra el resultado de sumar 2 y 3. Respuesta: print(2 + 3).', 'Ejemplo 4: Enunciado: ¿Qué hace print? Respuesta: Mostrar información en pantalla.'],
          analogy: 'Es como empezar a escribir con un cuaderno limpio y letras muy claras.',
          curiosity: 'Muchos cursos de programación comienzan con Python porque reduce la complejidad inicial.'
        },
        {
          id: 'algebraicos',
          title: 'Operadores algebraicos',
          description: 'Los operadores algebraicos permiten realizar operaciones matemáticas básicas sobre números.',
          highlights: ['Suma', 'Resta', 'Multiplicación', 'División'],
          whyItMatters: 'Son esenciales para calcular resultados, controlar valores y resolver problemas numéricos.',
          details: 'Con operadores como +, -, *, / y % puedes realizar desde simples cálculos hasta tareas más complejas como verificar si un número es divisible entre otro. Estos operadores son la base para trabajar con números dentro de un programa y para crear fórmulas y cálculos útiles.',
          steps: ['Leer o definir los valores.', 'Aplicar el operador correcto.', 'Obtener el resultado.', 'Comprobar si el resultado tiene sentido.'],
          examples: ['Ejemplo 1: Enunciado: ¿Cuánto es 5 + 3? Respuesta: 8.', 'Ejemplo 2: Enunciado: ¿Cuánto es 10 - 4? Respuesta: 6.', 'Ejemplo 3: Enunciado: ¿Cuánto es 6 * 2? Respuesta: 12.', 'Ejemplo 4: Enunciado: ¿Cuál es el resultado de 9 / 3? Respuesta: 3.'],
          analogy: 'Son como las herramientas de una calculadora que ayudan a transformar datos numéricos.',
          curiosity: 'El operador % devuelve el residuo de una división, útil para saber si un número es par o impar.'
        },
        {
          id: 'logicos',
          title: 'Operadores lógicos',
          description: 'Los operadores lógicos ayudan a comparar condiciones y decidir si una instrucción debe ejecutarse.',
          highlights: ['and', 'or', 'not'],
          whyItMatters: 'Permiten construir decisiones más complejas en un programa, como validar datos o controlar accesos.',
          details: 'Con and se requieren dos condiciones verdaderas, con or basta con que una sea verdadera y con not invierte una condición. Estos operadores son muy útiles para validar datos, controlar accesos y decidir si una acción debe ejecutarse o no.',
          steps: ['Definir una condición.', 'Comparar valores.', 'Elegir la acción según el resultado.', 'Combinar varias condiciones si es necesario.'],
          examples: ['Ejemplo 1: Enunciado: ¿Qué devuelve 5 > 3 and 2 < 4? Respuesta: True.', 'Ejemplo 2: Enunciado: ¿Qué devuelve 1 == 2 or 3 == 3? Respuesta: True.', 'Ejemplo 3: Enunciado: ¿Qué hace not True? Respuesta: False.', 'Ejemplo 4: Enunciado: ¿Qué condición se necesita para entrar a un evento? Respuesta: edad >= 18 and tiene_entrada.'],
          analogy: 'Son como un semáforo que decide si continuar o detenerse según ciertas reglas.',
          curiosity: 'Los operadores lógicos son la base de las decisiones dentro de la programación.'
        },
        {
          id: 'condicionales',
          title: 'Estructura de control de condicionales',
          description: 'Las estructuras condicionales permiten ejecutar una acción solo si se cumple una condición.',
          highlights: ['if', 'else', 'elif'],
          whyItMatters: 'Permiten que un programa responda de forma distinta según los datos que reciba.',
          details: 'Con if puedes preguntar algo y, si es verdadero, hacer una acción; con else puedes definir qué hacer cuando no se cumple. En algunos casos, elif permite agregar más opciones. Estas estructuras ayudan a que un programa tome decisiones similares a las que tomaría una persona.',
          steps: ['Plantear una condición.', 'Definir qué hacer si es verdadera.', 'Definir la alternativa si es falsa.', 'Agregar más opciones si hace falta.'],
          examples: ['Ejemplo 1: Enunciado: Si una persona tiene 18 años o más, ¿qué mensaje mostrar? Respuesta: "Eres mayor de edad".', 'Ejemplo 2: Enunciado: Si un número es mayor que 0, mostrar "Positivo"; si no, mostrar "Negativo".', 'Ejemplo 3: Enunciado: Si un estudiante aprueba con 7 o más, mostrar "Aprobado"; si no, "Reprobado".'],
          analogy: 'Es como elegir entre dos caminos según la señal de tráfico.',
          curiosity: 'Las decisiones del programa se parecen mucho a las decisiones humanas en la vida diaria.'
        },
        {
          id: 'repetitivas',
          title: 'Estructuras de control repetitivas',
          description: 'Las estructuras repetitivas permiten ejecutar varias veces un bloque de instrucciones sin escribirlo una y otra vez.',
          highlights: ['for', 'while'],
          whyItMatters: 'Ahorran tiempo y hacen que el código sea más claro cuando se repite una misma tarea.',
          details: 'Con for puedes repetir algo un número fijo de veces, mientras que with while repite mientras una condición siga siendo verdadera. Son muy útiles cuando necesitas procesar listas, repetir tareas y evitar escribir muchas líneas innecesarias.',
          steps: ['Definir cuántas veces repetir.', 'Escribir la instrucción que se repetirá.', 'Detener la repetición cuando se cumpla la condición.', 'Comprobar que el ciclo termine correctamente.'],
          examples: ['Ejemplo 1: Enunciado: Repetir la palabra "Hola" 3 veces. Respuesta: for i in range(3): print("Hola").', 'Ejemplo 2: Enunciado: Mostrar los números del 1 al 5. Respuesta: for i in range(1, 6): print(i).', 'Ejemplo 3: Enunciado: Seguir repitiendo hasta que el contador llegue a 5. Respuesta: while contador < 5.'],
          analogy: 'Es como repetir una canción en bucle hasta terminar la playlist.',
          curiosity: 'Las repeticiones son muy útiles para procesar listas, tablas y tareas automáticas.'
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

    if(id === '3'){
      const data = unitData[3];
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
      openUnitPanel(card.dataset.unit);
    });
  });
  closePanel.addEventListener('click', ()=>{
    if(panelBot){
      panelBot.classList.remove('open-gesture');
      panelBot.classList.add('close-gesture');
      const bubble = panelBot.querySelector('.panel-bubble');
      if(bubble) bubble.textContent = '¡Hasta pronto!';
      setTimeout(()=> panelBot.classList.remove('visible'), 420);
    }
    unitPanel.classList.remove('visible');
    unitPanel.classList.add('closing');
    setTimeout(()=>{
      unitPanel.classList.remove('closing');
      unitPanel.style.display='none';
    },360);
  });

  // Reveal elements on scroll
  const reveals = $$('.reveal');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('visible'); obs.unobserve(en.target); } });
  },{threshold:.12});
  $$('.hero, .units, .contact, .info-card, .photo-card').forEach(el=>{ el.classList.add('reveal'); obs.observe(el); });

  // Mobile menu toggle
  const menuToggle = $('#menuToggle');
  const navLinksContainer = $('.nav-links');
  if(menuToggle && navLinksContainer){
    menuToggle.addEventListener('click', ()=>{
      navLinksContainer.style.display = navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
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

  // Ratings: static values only
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
    const ratings = Array.from(document.querySelectorAll('.rating'));
    ratings.forEach(ratingEl => {
      const card = ratingEl.closest('.unit-card');
      const rating = card && card.id === 'unidad3' ? 3.5 : 5;
      renderRatingElement(ratingEl, rating);
    });
  }

  initRatings();

})();
