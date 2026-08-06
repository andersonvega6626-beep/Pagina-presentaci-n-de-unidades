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
          examples: ['Ejemplo 1: Un microcontrolador que ejecuta un programa de encendido de LEDs puede usar Harvard para responder con mayor rapidez.', 'Ejemplo 2: Un ordenador personal tradicional suele usar von Neumann porque es más flexible y sencillo de implementar.', 'Ejemplo 3: En un sistema de navegación de un coche, la separación de rutas ayuda a reaccionar más rápido a los sensores.'],
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
          examples: ['Ejemplo 1: Cuando abres WhatsApp en tu celular, el sistema operativo asigna memoria y recursos para que funcione.', 'Ejemplo 2: Al imprimir un documento, el sistema envía la orden a la impresora y controla el proceso.', 'Ejemplo 3: Cuando tienes varias ventanas abiertas, el sistema reparte el tiempo de procesamiento entre ellas.'],
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
          examples: ['Ejemplo 1: El número 1101₂ representa 13 en decimal.', 'Ejemplo 2: 17₈ equivale a 15₁₀.', 'Ejemplo 3: El color #FF0000 en hexadecimal indica rojo puro.'],
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
          examples: ['Ejemplo 1: 1100₂ + 0011₂ = 10011₂.', 'Ejemplo 2: 1010₂ - 0011₂ = 0111₂.', 'Ejemplo 3: 1001₂ + 0001₂ = 1010₂.'],
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
          examples: ['Ejemplo 1: Si una puerta está abierta y el sensor detecta movimiento, la alarma se activa.', 'Ejemplo 2: En un sistema de seguridad, AND exige que se cumplan dos condiciones al mismo tiempo.', 'Ejemplo 3: Con NOT, si una condición era verdadera, ahora se invierte a falsa.'],
          analogy: 'Es como un sistema de reglas simples que decide si algo se activa o no.',
          curiosity: 'La lógica booleana es la base de los circuitos digitales modernos.'
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
