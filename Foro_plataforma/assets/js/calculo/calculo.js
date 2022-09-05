let carga2 = setInterval(() => {
  if (document.readyState === "complete") {
    clearInterval(carga2);
    console.log("Documento cargado completamente...");

    const ui = new UI();
    const body = document.querySelector("body");

    body.addEventListener("submit", (e) => {
      e.preventDefault();
      let elemento = e.target.id;

      if (elemento === "calculo") {
        let datos_calculo = new FormData(body.querySelector("#" + elemento));

        fetch("./backend/calculo/calculo.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: datos_calculo,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            switch (data.response) {
              case "OK":
                ui.limpiarFormulario(elemento);
                ui.notificacion(
                  "Calculos",
                  "Edad: " +
                    data.data.edad +
                    "<br/>" +
                    "Antigüedad: " +
                    data.data.antiguedad +
                    "<br/>" +
                    "Prima: " +
                    data.data.prima +
                    "<br/>" +
                    "Cesantías: " +
                    data.data.cesantias,
                  "exito",
                  10
                );
                break;

              case "VACIO":
                ui.notificacion(
                  "Información",
                  "Debe ingresar la cédula.",
                  "informacion"
                );
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
