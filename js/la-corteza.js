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
    if (node) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
  const GAUGE_CIRC = 565.5;
  let gaugeShown = 0;

  function renderGauge(share) {
    if (!gauge || !gaugeNum) return;
    const target = share * 100;
    gauge.style.strokeDashoffset = GAUGE_CIRC - (GAUGE_CIRC * target / 100);
    const step = () => {
      gaugeShown += Math.max(0.25, Math.abs(target - gaugeShown) / 8);
      if (gaugeShown >= target) gaugeShown = target;
      const parts = gaugeShown.toFixed(1).split('.');
      gaugeNum.innerHTML = parts[0] + '<span class="pct">.' + parts[1] + '%</span>';
      if (gaugeShown < target) requestAnimationFrame(step);
    };
    step();
  }

  /* ===== SIMULADOR: SALA DE CONTROL ===== */
  const MARKET_2024 = 5.7;
  const CERDO_2025 = 302;
  const CERDO_CAGR = 0.0386;
  const NODE_WEIGHTS = { madrid: 28, cdmx: 36, manila: 22, buenosaires: 14, estonia: 0 };
  const GINEBRA_FACTOR = 0.96;
  const ESTONIA_BONUS = 0.025;
  const DEFAULTS = {
    horizon: 9, growth: 5.0, target: 25, vel: 1.0, elast: 1.0, jimenez: 0,
    nodes: { madrid: true, cdmx: true, buenosaires: true, manila: true, estonia: false }
  };

  function readSim() {
    return {
      horizon: +document.getElementById('sim-horizon').value,
      growth: +document.getElementById('sim-growth').value / 100,
      target: +document.getElementById('sim-target').value / 100,
      vel: +document.getElementById('sim-vel').value,
      elast: +document.getElementById('sim-elast').value,
      jimenez: +document.getElementById('sim-jimenez').value / 100,
      nodes: {
        madrid: document.getElementById('nodo-madrid').checked,
        cdmx: document.getElementById('nodo-cdmx').checked,
        buenosaires: document.getElementById('nodo-buenosaires').checked,
        manila: document.getElementById('nodo-manila').checked,
        estonia: document.getElementById('nodo-estonia').checked
      }
    };
  }

  function computeSim(s) {
    const t = s.horizon;
    const marketFinal = MARKET_2024 * Math.pow(1 + s.growth, t);
    const cerdoFinal = CERDO_2025 * Math.pow(1 + CERDO_CAGR, Math.min(t, 10));
    const cap = (s.nodes.madrid ? 28 : 0) + (s.nodes.cdmx ? 36 : 0) + (s.nodes.manila ? 22 : 0) + (s.nodes.buenosaires ? 14 : 0);
    const factorCrecimiento = 1 + (s.growth - 0.05) * 2;
    let techo = Math.min(s.target * GINEBRA_FACTOR * (1 - s.jimenez) * factorCrecimiento, cap / 100);
    techo = Math.pow(techo, 1 / Math.max(s.elast, 0.5));
    if (s.nodes.estonia) techo *= 1 + ESTONIA_BONUS;
    techo = Math.min(techo, 0.95);
    const adop = 1 / (1 + Math.exp(-s.vel * (t - 5)));
    const share = techo * adop;
    const sPct = share * 100;
    const hhi = Math.round(sPct * sPct + Math.max(0, 100 - sPct) * (100 - sPct) / 200);
    const nivel = hhi < 1500 ? 'BAJA CONCENTRACION — MERCADO COMPETIDO' : hhi < 2500 ? 'CONCENTRACION MODERADA' : 'ALTA CONCENTRACION — DOMINIO ABSOLUTO';
    return { t, marketFinal, cerdoFinal, share, hhi, nivel, techo, adop };
  }

  function renderHHI(r) {
    const el = document.getElementById('sim-hhi');
    if (el) el.textContent = 'HHI RESULTANTE: ' + r.hhi + ' — ' + r.nivel + ' · PENETRACION EN HORIZONTE: ' + Math.round(r.adop * 100) + '%';
  }

  function renderMap(r, s) {
    const nodeEls = document.querySelectorAll('.city-node[data-city]');
    nodeEls.forEach(n => {
      const city = n.dataset.city;
      const on = city === 'ginebra' ? true : !!s.nodes[city];
      n.classList.toggle('inactive', !on);
      const th = document.getElementById('thread-' + city);
      if (th) {
        if (on) {
          const shareN = r.share * (NODE_WEIGHTS[city] || 0) / 100;
          th.style.stroke = '#B22222';
          th.style.strokeWidth = (2.5 + shareN * 35).toFixed(1);
          th.style.opacity = '0.95';
        } else {
          th.style.stroke = '#3A4058';
          th.style.strokeWidth = '1.5';
          th.style.opacity = '0.3';
        }
      }
      const label = n.querySelector('.node-share');
      if (label) {
        if (city === 'ginebra') {
          label.textContent = 'COORDINACIÓN ' + GINEBRA_FACTOR.toFixed(2).replace('.', ',') + 'x';
        } else if (city === 'estonia') {
          label.textContent = on ? '¿? — MISTERIO' : 'INACTIVO';
        } else if (!on) {
          label.textContent = 'INACTIVO';
        } else {
          const shareN = r.share * (NODE_WEIGHTS[city] || 0) / 100;
          label.textContent = (shareN * 100).toFixed(1).replace('.', ',') + '%';
        }
      }
    });
  }

  function renderChart(r, s) {
    const svgEl = document.getElementById('sim-chart');
    if (!svgEl) return;
    const W = 560, H = 250, PL = 52, PR = 34, PT = 18, PB = 30;
    const iw = W - PL - PR, ih = H - PT - PB;
    const t = Math.max(1, r.t);
    const mf = Math.max(6, r.marketFinal * 1.15);
    const x = v => PL + iw * v / t;
    const yM = v => PT + ih - (v / mf) * ih;
    const yS = v => PT + ih - (v / 0.8) * ih;

    let out = '';
    out += '<defs><linearGradient id="simAreaGrad" x1="0" y1="0" x2="0" y2="1">'
      + '<stop offset="0%" stop-color="rgba(232,200,64,0.28)"/>'
      + '<stop offset="100%" stop-color="rgba(232,200,64,0.02)"/>'
      + '</linearGradient></defs>';

    for (let g = 0; g <= 4; g++) {
      const yy = PT + ih * g / 4;
      out += '<line x1="' + PL + '" x2="' + (W - PR) + '" y1="' + yy.toFixed(1) + '" y2="' + yy.toFixed(1) + '" stroke="#222B4E" stroke-width="1"/>';
    }
    for (let y = 1; y < r.t; y++) {
      const xx = x(y);
      out += '<line x1="' + xx.toFixed(1) + '" x2="' + xx.toFixed(1) + '" y1="' + PT + '" y2="' + (PT + ih) + '" stroke="#1B2240" stroke-width="1"/>';
    }

    let area = '', line = '', dots = '';
    let lastSh = 0;
    for (let y = 0; y <= r.t; y++) {
      const m = MARKET_2024 * Math.pow(1 + s.growth, y);
      const sh = Math.min(r.techo, 0.95) / (1 + Math.exp(-s.vel * (y - 5)));
      lastSh = sh;
      const xx = x(y);
      area += (y === 0 ? 'M ' : ' L ') + xx.toFixed(1) + ' ' + yM(m).toFixed(1);
      line += (y === 0 ? 'M ' : ' L ') + xx.toFixed(1) + ' ' + yS(sh * 100).toFixed(1);
      dots += '<circle cx="' + xx.toFixed(1) + '" cy="' + yS(sh * 100).toFixed(1) + '" r="3" fill="#B22222"/>';
    }
    out += '<path class="sim-area" d="' + area + ' L ' + x(r.t).toFixed(1) + ' ' + (PT + ih) + ' L ' + x(0).toFixed(1) + ' ' + (PT + ih) + ' Z" fill="url(#simAreaGrad)" stroke="#C4A020" stroke-width="1.5" stroke-dasharray="5 4"/>';
    out += '<path class="sim-line" d="' + line + '" fill="none" stroke="#B22222" stroke-width="3" stroke-linecap="round"/>';
    out += dots;

    out += '<text x="' + x(0).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" class="sim-axis">1995</text>';
    if (r.t >= 2) {
      out += '<text x="' + x(Math.ceil(r.t / 2)).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" class="sim-axis">' + (1995 + Math.ceil(r.t / 2)) + '</text>';
    }
    out += '<text x="' + x(r.t).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" class="sim-axis">' + (1995 + r.t) + '</text>';

    out += '<text x="' + (PL - 8) + '" y="' + (PT + ih + 4) + '" text-anchor="end" class="sim-axis">$0</text>';
    out += '<text x="' + (PL - 8) + '" y="' + (PT + ih / 2 + 4) + '" text-anchor="end" class="sim-axis">$' + (mf / 2).toFixed(1) + 'B</text>';
    out += '<text x="' + (PL - 8) + '" y="' + (PT + 4) + '" text-anchor="end" class="sim-axis">$' + mf.toFixed(1) + 'B</text>';

    for (let g = 0; g <= 4; g++) {
      const pct = g * 20;
      const yy = yS(pct);
      out += '<text x="' + (W - PR + 6) + '" y="' + (yy + 4) + '" text-anchor="start" class="sim-axis">' + pct + '%</text>';
    }

    out += '<text x="' + PL + '" y="' + (PT - 6) + '" class="sim-axis sim-chart-title">PROYECCION DEL PLAN — ' + (1995 + r.t) + '</text>';
    out += '<text x="' + (x(r.t) - 8) + '" y="' + (yS(lastSh * 100) + 4) + '" text-anchor="end" class="sim-axis sim-end-label">CUOTA: ' + (lastSh * 100).toFixed(1).replace('.', ',') + '%</text>';
    svgEl.innerHTML = out;
  }

  function renderKPIs(r, s) {
    const val = document.getElementById('kpi-market-val');
    if (val) val.innerHTML = '$5,7B → $' + r.marketFinal.toFixed(1).replace('.', ',') + 'B';
    const sub = document.getElementById('kpi-market-sub');
    if (sub) sub.textContent = 'Proyeccion del modelo: 1995 → ' + (1995 + r.t) + ' · CAGR ' + (s.growth * 100).toFixed(1).replace('.', ',') + '% de crecimiento';
    const bar = document.getElementById('kpi-market-bar');
    if (bar) bar.style.width = Math.min(100, Math.round(r.marketFinal * 65 / 8.8)) + '%';

    const pesoIber = (s.nodes.cdmx ? 36 : 0) + (s.nodes.buenosaires ? 14 : 0);
    const cuotaIber = 25 * (1 - s.jimenez) * Math.min(1, pesoIber / 50);
    const ibVal = document.getElementById('kpi-ib-val');
    if (ibVal) ibVal.textContent = '>' + cuotaIber.toFixed(0) + '%';
    const ibBar = document.getElementById('kpi-ib-bar');
    if (ibBar) ibBar.style.width = Math.min(100, Math.round(cuotaIber)) + '%';

    const cerdoVal = document.getElementById('kpi-cerdo-val');
    if (cerdoVal) cerdoVal.innerHTML = '$302B → $' + r.cerdoFinal.toFixed(1).replace('.', ',') + 'B';
    const cerdoSub = document.getElementById('kpi-cerdo-sub');
    if (cerdoSub) cerdoSub.textContent = 'Proyeccion del modelo: 1995 → ' + (1995 + r.t) + ' · CAGR 3,86%';
    const cerdoBar = document.getElementById('kpi-cerdo-bar');
    if (cerdoBar) cerdoBar.style.width = Math.min(100, Math.round(r.cerdoFinal * 68 / 441)) + '%';

    const snackFinal = 11.8 * Math.pow(1 + 0.063, r.t);
    const snackVal = document.getElementById('kpi-snack-val');
    if (snackVal) snackVal.innerHTML = '$11,8B → $' + snackFinal.toFixed(1).replace('.', ',') + 'B';
    const snackSub = document.getElementById('kpi-snack-sub');
    if (snackSub) snackSub.textContent = 'Proyeccion del modelo: 1995 → ' + (1995 + r.t) + ' · CAGR 6,3%';
    const snackBar = document.getElementById('kpi-snack-bar');
    if (snackBar) snackBar.style.width = Math.min(100, Math.round(snackFinal * 58 / 20.5)) + '%';
  }

  function renderSim() {
    const s = readSim();
    const r = computeSim(s);
    document.getElementById('out-horizon').textContent = s.horizon;
    document.getElementById('out-growth').textContent = (s.growth * 100).toFixed(1);
    document.getElementById('out-target').textContent = Math.round(s.target * 100);
    document.getElementById('out-vel').textContent = s.vel.toFixed(2);
    document.getElementById('out-elast').textContent = s.elast.toFixed(2);
    document.getElementById('out-jimenez').textContent = Math.round(s.jimenez * 100);
    renderKPIs(r, s);
    renderGauge(r.share);
    renderHHI(r);
    renderMap(r, s);
    renderChart(r, s);
  }

  const simInputs = document.querySelectorAll('#sim-controls input');
  simInputs.forEach(inp => {
    inp.addEventListener('input', renderSim);
    inp.addEventListener('change', renderSim);
  });
  const simReset = document.getElementById('sim-reset');
  if (simReset) {
    simReset.addEventListener('click', () => {
      document.getElementById('sim-horizon').value = DEFAULTS.horizon;
      document.getElementById('sim-growth').value = DEFAULTS.growth;
      document.getElementById('sim-target').value = DEFAULTS.target;
      document.getElementById('sim-vel').value = DEFAULTS.vel;
      document.getElementById('sim-elast').value = DEFAULTS.elast;
      document.getElementById('sim-jimenez').value = DEFAULTS.jimenez;
      Object.keys(DEFAULTS.nodes).forEach(k => {
        document.getElementById('nodo-' + k).checked = DEFAULTS.nodes[k];
      });
      renderSim();
    });
  }

  /* ===== PANEL INICIAL ===== */
  renderCity('ginebra', null);

  /* ===== SIMULACIÓN INICIAL (informe oficial) ===== */
  renderSim();

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