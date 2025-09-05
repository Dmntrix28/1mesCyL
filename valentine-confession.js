$("#messageState").on("change", (x) => {
	$(".message").removeClass("openNor").removeClass("closeNor");
	if ($("#messageState").is(":checked")) {
		$(".message").removeClass("closed").removeClass("no-anim").addClass("openNor");
		$(".heart").removeClass("closeHer").removeClass("openedHer").addClass("openHer");
		$(".container").stop().animate({"backgroundColor": "#f48fb1"}, 2000);
		console.log("Abrindo");
	} else {
		$(".message").removeClass("no-anim").addClass("closeNor");
		$(".heart").removeClass("openHer").removeClass("openedHer").addClass("closeHer");
		$(".container").stop().animate({"backgroundColor": "#fce4ec"}, 2000);
		console.log("fechando");
	}
});

$(".message").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	console.log("Animation End");
	if ($(".message").hasClass("closeNor"))
		$(".message").addClass("closed");
	$(".message").removeClass("openNor").removeClass("closeNor").addClass("no-anim");
});

$(".heart").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	console.log("Animation End");
	if (!$(".heart").hasClass("closeHer"))
		$(".heart").addClass("openedHer").addClass("beating");
	else
		$(".heart").addClass("no-anim").removeClass("beating");
	$(".heart").removeClass("openHer").removeClass("closeHer");

});

// ======== Música de fondo ========
const bgm = document.getElementById('bgm');
const audioToggle = document.getElementById('audioToggle');

// Estado inicial: muteado (por autoplay policy)
if (bgm) {
  bgm.volume = 0.9; // ajusta si quieres
}

// Cambiar icono del botón según estado
function syncAudioIcon() {
  if (!bgm) return;
  // Si está muteado o pausado, mostramos 🔇; si suena, 🔊
  const isOff = bgm.muted || bgm.paused;
  audioToggle.textContent = isOff ? '🔇' : '🔊';
  audioToggle.setAttribute('aria-pressed', String(!isOff));
}

audioToggle?.addEventListener('click', async () => {
  if (!bgm) return;
  // Si está pausado por política, intenta reproducir
  try {
    if (bgm.paused) await bgm.play();
  } catch (e) {
    // algunos navegadores requieren interacción adicional; el click ya cuenta
  }
  // Toggle mute
  bgm.muted = !bgm.muted;
  syncAudioIcon();
});

// Cuando el corazón se abra por primera vez, activamos el sonido
let firstOpenDone = false;
$("#messageState").on("change", async () => {
  if (!bgm) return;
  if ($("#messageState").is(":checked")) {
    // Intentar reproducir con sonido cuando hay interacción del usuario
    try {
      if (bgm.paused) await bgm.play();
      if (!firstOpenDone) {
        bgm.muted = false;   // des-silenciar al abrir
        firstOpenDone = true;
      }
    } catch (e) {
      // si falla, el botón manual permitirá activarlo
    }
  } else {
    // Al cerrar, si quieres que siga sonando, comenta la línea siguiente:
    // bgm.pause();
  }
  syncAudioIcon();
});

// Asegurar ícono correcto al cargar
document.addEventListener('visibilitychange', syncAudioIcon);
window.addEventListener('load', syncAudioIcon);
