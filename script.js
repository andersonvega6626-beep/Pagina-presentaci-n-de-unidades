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
      intro: 'Descubre cómo un computador organiza sus partes y procesa la información paso a paso.',
      topics: [
        {
          id: 'von',
          title: 'Modelo de von Neumann y Harvard',
          description: 'El modelo de von Neumann usa una misma memoria para instrucciones y datos, mientras que el modelo Harvard separa ambos para trabajar más rápido.',
          highlights: ['Memoria compartida', 'Procesamiento secuencial', 'Rutas separadas'],
          example: 'En un sistema von Neumann, la CPU lee la instrucción y los datos desde la misma memoria. En Harvard, puede leer instrucción y datos al mismo tiempo.'
        },
        {
          id: 'so',
          title: 'Sistemas operativos',
          description: 'Los sistemas operativos son el “jefe” del computador: organizan programas, archivos y dispositivos.',
          highlights: ['Gestionan recursos', 'Permiten interactuar', 'Controlan aplicaciones'],
          example: 'Windows, Linux y Android son sistemas operativos que permiten abrir aplicaciones, guardar archivos y usar la impresora.'
        },
        {
          id: 'numeracion',
          title: 'Sistemas de numeración y conversiones',
          description: 'Los computadores trabajan con bases como 2, 8 y 16 para representar información de forma compacta.',
          highlights: ['Binario: base 2', 'Octal: base 8', 'Hexadecimal: base 16'],
          example: '1011₂ = 11₁₀, 37₈ = 31₁₀ y 2F₁₆ = 47₁₀.'
        },
        {
          id: 'aritmetica',
          title: 'Aritmética binaria',
          description: 'La suma y resta binarias siguen reglas simples, pero con acarreos cuando el resultado supera el valor de la columna.',
          highlights: ['Suma con acarreo', 'Resta con préstamo', 'Base 2'],
          example: '1011₂ + 0101₂ = 10000₂.'
        },
        {
          id: 'bool',
          title: 'Álgebra de Boole',
          description: 'La lógica booleana usa valores verdaderos o falsos para tomar decisiones dentro del hardware.',
          highlights: ['AND', 'OR', 'NOT'],
          example: 'Si A = 1 y B = 0, entonces A AND B = 0, A OR B = 1 y NOT A = 0.'
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
            <div class="example-box">
              <h5>Ejemplo sencillo</h5>
              <p>${topic.example}</p>
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
