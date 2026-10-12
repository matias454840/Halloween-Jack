
const boton = document.getElementById("btn");
const carta = document.getElementById("carta");

const emojis = [
    "🎃", "👻", "🦇", "🍬", "🍭", "🧡", "💜", "🕸️", "✨"
];

let cartaAbierta = false;
let lluviaActiva = false;

boton.setAttribute("aria-expanded", "false");

boton.addEventListener("click", () => {
    if (!cartaAbierta) {
        carta.hidden = false;
        carta.classList.remove("visible");

        // Reinicia la animacion de entrada
        void carta.offsetWidth;
        carta.classList.add("visible");

        boton.innerHTML = '<span aria-hidden="true">🖤</span> Carta abierta';
        boton.setAttribute("aria-expanded", "true");
        cartaAbierta = true;

        // Crea los destellos al mostrar la carta
        requestAnimationFrame(() => crearDestellos());

        carta.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            block: "center"
        });
    }

    if (!lluviaActiva) {
        lluvia();
    }
});

function lluvia() {
    lluviaActiva = true;

    const cantidad = 45;
    const duracionMaxima = 7000;
    let eliminados = 0;

    for (let i = 0; i < cantidad; i++) {
        const item = document.createElement("span");

        item.className = "heart";
        item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        item.style.left = Math.random() * 96 + "vw";
        item.style.fontSize = (Math.random() * 18 + 16) + "px";
        item.style.animationDuration = (Math.random() * 3 + 4) + "s";
        item.style.animationDelay = (Math.random() * 1.2) + "s";

        let eliminado = false;

        function limpiarItem() {
            if (eliminado) return;
            eliminado = true;
            item.remove();
            eliminados++;

            if (eliminados >= cantidad) {
                lluviaActiva = false;
            }
        }

        item.addEventListener("animationend", limpiarItem, { once: true });
        document.body.appendChild(item);

        // Limpieza de seguridad
        window.setTimeout(limpiarItem, duracionMaxima + 1500);
    }
}

/* Luciernagas magicas */
const contenedorLuciernagas = document.getElementById("luciernagas");

if (contenedorLuciernagas) {
    for (let i = 0; i < 24; i++) {
        const luz = document.createElement("span");
        luz.className = "luciernaga";

        luz.style.left = Math.random() * 100 + "vw";
        luz.style.top = (15 + Math.random() * 75) + "vh";
        luz.style.setProperty("--duracion", (4 + Math.random() * 7) + "s");
        luz.style.setProperty("--retraso", (-Math.random() * 8) + "s");
        luz.style.setProperty("--movimiento-x", (-35 + Math.random() * 70) + "px");
        luz.style.setProperty("--movimiento-y", (-30 + Math.random() * 60) + "px");

        contenedorLuciernagas.appendChild(luz);
    }
}

/* Jack sigue suavemente el cursor */
const jack = document.querySelector(".jack-animado");

if (jack && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let movimientoPendiente = false;
    let ultimaX = 0;
    let ultimaY = 0;

    document.addEventListener("pointermove", (evento) => {
        ultimaX = evento.clientX;
        ultimaY = evento.clientY;

        if (movimientoPendiente) return;
        movimientoPendiente = true;

        requestAnimationFrame(() => {
            const rect = jack.getBoundingClientRect();
            const centroX = rect.left + rect.width / 2;
            const centroY = rect.top + rect.height / 2;

            const diferenciaX = ultimaX - centroX;
            const diferenciaY = ultimaY - centroY;

            const giro = Math.max(-5, Math.min(5, diferenciaX / 35));
            const x = Math.max(-4, Math.min(4, diferenciaX / 100));
            const y = Math.max(-4, Math.min(4, diferenciaY / 100));

            jack.style.setProperty("--giro-cursor", giro + "deg");
            jack.style.setProperty("--movimiento-x", x + "px");
            jack.style.setProperty("--movimiento-y", y + "px");
            jack.classList.add("cursor-activo");

            movimientoPendiente = false;
        });
    });

    document.addEventListener("pointerleave", (evento) => {
        if (evento.relatedTarget === null) {
            jack.classList.remove("cursor-activo");
        }
    });
}

/* Destellos magicos al abrir la carta */
function crearDestellos() {
    const reducirMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducirMovimiento || !carta) return;

    const rect = carta.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + 30;
    const cantidad = 26;

    for (let i = 0; i < cantidad; i++) {
        const destello = document.createElement("span");
        destello.className = "destello-carta";
        destello.textContent = Math.random() > 0.5 ? "✦" : "✧";

        const angulo = Math.random() * Math.PI * 2;
        const distancia = 35 + Math.random() * 110;

        destello.style.left = centroX + "px";
        destello.style.top = centroY + "px";
        destello.style.setProperty(
            "--destello-x",
            Math.cos(angulo) * distancia + "px"
        );
        destello.style.setProperty(
            "--destello-y",
            Math.sin(angulo) * distancia + "px"
        );
        destello.style.setProperty(
            "--duracion-destello",
            (0.7 + Math.random() * 0.8) + "s"
        );

        document.body.appendChild(destello);

        destello.addEventListener("animationend", () => destello.remove(), {
            once: true
        });

        window.setTimeout(() => destello.remove(), 2000);
    }
}
