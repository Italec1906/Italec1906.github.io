const botonMenu = document.querySelector('#boton-menu');
const navegacion = document.querySelector('#navegacion');
const textoMenu = document.querySelector('#texto-menu');
const submenu = document.querySelector('#resolver');

const pantallaMovil = window.matchMedia('(max-width: 600px)');

function cambiarMenu(abrir) {
  if (!navegacion || !botonMenu || !textoMenu) return;
  navegacion.hidden = pantallaMovil.matches && !abrir;
  botonMenu.setAttribute('aria-expanded', String(abrir));
  botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
  textoMenu.textContent = abrir ? 'Cerrar' : 'Menú';

  if (!abrir && submenu) {
    submenu.open = false;
  }
}

if (botonMenu && navegacion) {
  botonMenu.addEventListener('click', function () {
    const estaAbierto = botonMenu.getAttribute('aria-expanded') === 'true';
    cambiarMenu(!estaAbierto);
  });

  navegacion.addEventListener('click', function (evento) {
    const enlace = evento.target.closest('a');
    if (!enlace) return;

    cambiarMenu(false);

    const ruta = enlace.getAttribute('href');
    const destino = ruta && ruta.startsWith('#') ? document.querySelector(ruta) : null;
    if (destino) {
      destino.focus({ preventScroll: true });
    }
  });

  const marca = document.querySelector('.marca');
  if (marca) {
    marca.addEventListener('click', function () {
      cambiarMenu(false);
      const inicio = document.querySelector('#inicio');
      if (inicio) inicio.focus({ preventScroll: true });
    });
  }

  document.addEventListener('keydown', function (evento) {
    if (evento.key !== 'Escape') return;

    if (pantallaMovil.matches && !navegacion.hidden) {
      cambiarMenu(false);
      botonMenu.focus();
    } else if (submenu && submenu.open) {
      submenu.open = false;
      submenu.querySelector('summary').focus();
    }
  });

  function ajustarPantalla() {
    const focoEstabaEnNavegacion = navegacion.contains(document.activeElement);
    const focoEstabaEnBoton = document.activeElement === botonMenu;
    cambiarMenu(false);

    if (pantallaMovil.matches && focoEstabaEnNavegacion) {
      botonMenu.focus();
    } else if (!pantallaMovil.matches && focoEstabaEnBoton) {
      const primerEnlace = navegacion.querySelector('a');
      if (primerEnlace) primerEnlace.focus();
    }
  }

  pantallaMovil.addEventListener('change', ajustarPantalla);
  ajustarPantalla();
}
