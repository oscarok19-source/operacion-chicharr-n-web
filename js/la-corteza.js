document.addEventListener('DOMContentLoaded', () => {

  /* ===== NAV TOGGLE (compartido con main.js) ===== */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ===== DATOS DE CIUDADES ===== */
  const CITIES = {
    ginebra: {
      name: 'GINEBRA — SEDE CENTRAL',
      role: 'Base de operaciones. Denominación interna: "El Sótano".',
      blurb: 'Un sótano iluminado por una sola bombilla. Una mesa oval. Doce hombres con traje oscuro. En el centro, un único chicharrón bajo un foco de luz, como si fuera el Diamante Hope. Desde aquí se tejen los hilos de la dominación cárnica mundial.',
      stats: [
        { label: 'Miembros', value: '12 hombres' },
        { label: 'En activo desde', value: '1953' },
        { label: 'Objetivo en la mesa', value: '1 chicharrón' },
        { label: 'Hilos rojos activos', value: '6 conexiones' }
      ]
    },
    madrid: {
      name: 'MADRID — FRENTE DE BATALLA',
      role: 'Activo: Comandante Prats (doble agente). Amenaza: C1º Jiménez.',
      blurb: 'El cuartel del principal problema de La Corteza: el Cabo Primero Alberto Jiménez, Intendente, tiene la muestra desde hace días y la custodia "conforme al protocolo de evidencias en expediente activo". Toda la maquinaria suiza contra un hombre que conoce el reglamento mejor que nadie.',
      stats: [
        { label: 'Producción carne vacuno España 2024', value: '€4.452M (+12%)' },
        { label: 'Exportaciones vacuno español', value: '> €1.700M' },
        { label: 'Europa, cuota pork rinds', value: '~28% del mundo' },
        { label: 'Estado del activo Prats', value: 'Comprometido' }
      ]
    },
    cdmx: {
      name: 'CIUDAD DE MÉXICO — TERRITORIO CONQUISTADO',
      role: 'Epicentro del consumo mundial de chicharrón.',
      blurb: 'México es uno de los países con mayor consumo per cápita de chicharrón del mundo. Comida callejera sagrada, apetito imparable. La Corteza considera la plaza "segura": el apetito trabaja por ellos. El problema es que el chicharrón de la calle no es EL Chicharrón.',
      stats: [
        { label: 'Consumo per cápita chicharrón', value: 'Nº1 del mundo' },
        { label: 'Norteamérica, cuota mercado', value: '~36% del total' },
        { label: 'Formato dominante', value: 'Comida callejera' },
        { label: 'Penetración de La Corteza', value: 'Alta y jugosa' }
      ]
    },
    buenosaires: {
      name: 'BUENOS AIRES — EL BOLÍGRAFO CARNÍVORO',
      role: 'Puerta del mercado cárnico iberoamericano.',
      blurb: 'Latinoamérica concentra más del 25% del comercio mundial de carne. Brasil es el mayor exportador global con más de 2,5 millones de toneladas al año. Quien domine la receta perfecta controlará este mercado. La Corteza lleva décadas comprando contactos. Solo falta la receta.',
      stats: [
        { label: 'LATAM, comercio cárnico mundial', value: '> 25%' },
        { label: 'Brasil, exportaciones anuales', value: '> 2,5M toneladas' },
        { label: 'Exportadores líderes', value: 'Brasil, Argentina, Uruguay' },
        { label: 'Asado en peligro', value: 'Máximo' }
      ]
    },
    manila: {
      name: 'MANILA — FRONTERA DE EXPANSIÓN',
      role: 'Mercado emergente de máxima prioridad.',
      blurb: 'En Filipinas el chicharrón es un aperitivo nacional, consumido en todos los niveles de renta. Asia-Pacífico es la región de crecimiento más rápido del snack. La Corteza sueña con desembarcar en masa... pero la receta sigue guardada en un cajón con cerradura en Madrid.',
      stats: [
        { label: 'Crecimiento Asia-Pacífico', value: 'CAGR 6,1–7,8%' },
        { label: 'Estado del chicharrón en Filipinas', value: 'Snack nacional' },
        { label: 'Cuota APAC del mercado', value: '~22%' },
        { label: 'Desembarco planificado', value: 'Pendiente de receta' }
      ]
    },
    estonia: {
      name: 'TALLINN — ¿POR QUÉ ESTONIA?',
      role: 'Conexión de origen desconocido.',
      blurb: '"Manila y, por alguna razón que aún no queda clara, Estonia." Nadie en el sótano sabe por qué Estonia está en el mapa. Nadie pregunta. Nadie contesta. El expediente interno simplemente dice: "CLASIFICADO. NO TOCAR. NO OLER." La única certeza es que desde Tallinn no sale ningún hilo... a excepción de uno que nadie se atreve a seguir.',
      stats: [
        { label: 'Producción porcina estimada', value: '~40.000 t/año' },
        { label: 'Motivo de la conexión', value: 'DESCONOCIDO' },
        { label: 'Instrucción interna', value: 'NO TOCAR' },
        { label: 'Hilo rojo', value: '1 — sin seguimiento' }
      ]
    }
  };

  /* ===== INTERACTIVIDAD DEL MAPA ===== */
  const nodes = document.querySelectorAll('.city-node[data-city]');
  const panel = document.getElementById('city-panel');

  function renderCity(city, node) {
    if (!CITIES[city]) return;
    const data = CITIES[city];
    panel.querySelector('.panel-city').textContent = data.name;
    panel.querySelector('.panel-role').textContent = data.role;
    panel.querySelector('.panel-blurb').textContent = data.blurb;
    const statsWrap = panel.querySelector('.panel-data');
    statsWrap.innerHTML = data.stats.map(s => `
      <div class="panel-stat">
        <div class="stat-label">${s.label}</div>
        <div class="stat-value">${s.value}</div>
      </div>
    `).join('');
    panel.querySelector('.panel-body').classList.add('active');

    nodes.forEach(n => n.classList.remove('active'));
    if (node) node.classList.add('active');
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      renderCity(node.dataset.city, node);
    });
  });

  const panelClose = document.querySelector('.panel-close');
  if (panelClose) {
    panelClose.addEventListener('click', () => {
      panel.querySelector('.panel-body').classList.remove('active');
      nodes.forEach(n => n.classList.remove('active'));
    });
  }

  /* ===== ANIMACIÓN GAUGE ===== */
  const gauge = document.querySelector('.gauge-fill');
  const gaugeNum = document.querySelector('.gauge-num');
  const GAUGE_FINAL = 237; /* 23,7% */
  const GAUGE_CIRC = 565.5;

  if (gauge && gaugeNum) {
    setTimeout(() => {
      gauge.style.strokeDashoffset = GAUGE_CIRC - (GAUGE_CIRC * GAUGE_FINAL / 1000);
      let current = 0;
      const target = 23.7;
      const step = () => {
        current += 0.4;
        if (current >= target) current = target;
        const [int, dec] = current.toFixed(1).split('.');
        gaugeNum.innerHTML = `${int}<span class="pct">.${dec}%</span>`;
        if (current < target) requestAnimationFrame(step);
      };
      step();
    }, 400);
  }

  /* ===== ANIMACIÓN BARRAS KPI ===== */
  const kpiBars = document.querySelectorAll('.kpi-bar');
  if (kpiBars.length > 0) {
    const barObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.kpi-fill');
          if (fill) fill.style.width = fill.dataset.value + '%';
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    kpiBars.forEach(bar => barObserver.observe(bar));
  }

  /* ===== PANEL INICIAL ===== */
  renderCity('ginebra', null);

  /* ===== ANIMACIÓN REVEAL (main.js no se carga en esta página) ===== */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

});