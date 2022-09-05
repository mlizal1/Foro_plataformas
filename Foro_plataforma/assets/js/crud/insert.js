class UI {
  constructor() {
    let flag = false;
    let _setTimeout = null;
    let _setInterval = null;
  }

  mensaje(elemento, mensaje, alerta) {
    let body = document.querySelector("body");
    let submit = body.querySelector("#" + elemento + ' input[type="submit"]');
    let divMensaje = body.querySelector("#" + elemento + " .mensaje");

    if (body.contains(divMensaje)) {
      divMensaje.className = "mensaje " + alerta;
      divMensaje.innerHTML = mensaje;
    } else {
      let div = document.createElement("div");
      div.className = "mensaje " + alerta;
      div.appendChild(document.createTextNode(mensaje));
      document.getElementById(elemento).insertBefore(div, submit);
    }

    setTimeout(() => {
      let div = body.querySelector("#" + elemento + " .mensaje");
      if (body.contains(div)) {
        div.remove();
      }
    }, 10000);

    console.log(mensaje);
  }

  notificacion(titulo, mensaje, alerta, tiempo) {
    tiempo = typeof tiempo === "undefined" ? 5 : tiempo <= 1 ? 5 : tiempo;

    let notificacion = document.querySelector("#notificacion");

    if (document.body.contains(notificacion)) {
      let div = notificacion.querySelector("div");
      let span = notificacion.querySelector("div span span");
      let h1 = div.querySelector("h1");
      let p = div.querySelector("p");
      div.removeAttribute("class");

      switch (alerta) {
        case "informacion":
          div.classList.add(alerta, "animated", "bounceIn");
          break;
        case "exito":
          div.classList.add(alerta, "animated", "rubberBand");
          break;
        default:
          div.classList.add(alerta, "animated", "wobble");
          break;
      }

      span.innerHTML = tiempo;
      h1.innerHTML = titulo;
      p.innerHTML = mensaje;
    } else {
      notificacion = document.createElement("div");
      let body = document.querySelector("body");
      let div = document.createElement("div");
      let span1 = document.createElement("span");
      let span2 = document.createElement("span");
      let i = document.createElement("i");
      let h1 = document.createElement("h1");
      let p = document.createElement("p");

      i.addEventListener("click", (e) => {
        div.classList.add("fadeOutUp");
        setTimeout(() => {
          notificacion.remove();
        }, 1000);
      });

      notificacion.setAttribute("id", "notificacion");

      switch (alerta) {
        case "informacion":
          div.classList.add(alerta, "animated", "bounceIn");
          break;
        case "exito":
          div.classList.add(alerta, "animated", "rubberBand");
          break;
        default:
          div.classList.add(alerta, "animated", "wobble");
          break;
      }

      i.classList.add("fas", "fa-times-circle");
      span2.innerHTML = tiempo;
      h1.innerHTML = titulo;
      p.innerHTML = mensaje;

      span1.appendChild(span2);
      span1.appendChild(i);
      div.appendChild(span1);
      div.appendChild(h1);
      div.appendChild(p);
      notificacion.appendChild(div);
      body.appendChild(notificacion);
    }

    if (this.flag) {
      clearInterval(this._setInterval);
      clearTimeout(this._setTimeout);
    } else {
      this.flag = true;
    }

    let t = tiempo - 1;
    this._setInterval = setInterval(() => {
      if (document.body.contains(notificacion)) {
        let span = notificacion.querySelector("div span span");
        span.innerHTML = t--;
      }
    }, 1000);

    this._setTimeout = setTimeout(() => {
      if (document.body.contains(notificacion)) {
        let div = notificacion.querySelector("div");
        div.classList.add("fadeOutUp");
        setTimeout(() => {
          notificacion.remove();
        }, 1000);
      }
    }, tiempo * 1000);

    console.log(mensaje);
  }

  limpiarFormulario(formulario) {
    document.getElementById(formulario).reset();
  }

  actualizarPagina(tiempo) {
    tiempo = typeof tiempo !== "undefined" ? tiempo : 0;

    if (tiempo <= 0) {
      location.reload(true);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        location.reload(true);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0);
      }, tiempo * 1000);
    }
  }
}

let carga = setInterval(() => {
  if (document.readyState === "complete") {
    clearInterval(carga);
    console.log("Documento cargado completamente...");

    const ui = new UI();
    const body = document.querySelector("body");

    body.addEventListener("submit", (e) => {
      e.preventDefault();
      let elemento = e.target.id;

      if (elemento === "registro_persona") {
        let datos_persona = new FormData(body.querySelector("#" + elemento));

        fetch("./backend/crud/insert.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: datos_persona,
        })
          .then((response) => response.json())
          .then((data) => {
            switch (data) {
              case "OK":
                ui.limpiarFormulario(elemento);
                ui.notificacion(
                  "Guardado",
                  "Información guardada con éxito.",
                  "exito"
                );
                break;

              case "VACIO":
                ui.notificacion("Información", "Campos vacíos.", "informacion");
                break;

              case "ERROR":
                ui.notificacion(
                  "Información",
                  "Verifica los datos ingresados e intenta nuevamente.",
                  "error"
                );
                break;

              default:
                ui.notificacion(
                  "Error",
                  "No se pudo enviar la Información!. Por favor vuelva a intentarlo (revisa que tu conexión sea óptima y estable).",
                  "error"
                );
                break;
            }
          })
          .catch((error) => {
            ui.notificacion(
              "Error",
              "No se pudo enviar la Información!. Por favor vuelva a intentarlo (revisa que tu conexión sea óptima y estable).",
              "error"
            );
            console.error(error);
          });
      }
    });

    body.addEventListener("keyup", (e) => {
      let tag = e.target.nodeName.toLowerCase();
      let type = e.target.type.toLowerCase();
      if (
        (tag === "input" && type === "text") ||
        (tag === "input" && type === "email") ||
        tag === "textarea"
      ) {
        setInterval(() => {
          e.target.value = e.target.value.toUpperCase();
        }, 10);
      }
    });
  }
}, 100);
