document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form");
  
    const enviarFormulario = async (formData, conExito, conError) => {
      try {
        const respuesta = await fetch("https://formspree.io/f/xyzkybyv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (respuesta.ok) {
          conExito();
        } else {
          conError("Hubo un error al enviar el formulario. Intenta de nuevo más tarde.");
        }
      } catch (error) {
        conError("Error al conectar con el servidor. Revisa tu conexión a internet.");
      }
    };
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const nombreField = document.getElementById("nombre");
      const apellidosField = document.getElementById("apellidos");
      const edadField = document.getElementById("edad");
      const emailField = document.getElementById("email");
      const mensajeField = document.getElementById("mensaje");
  
      const nombre = nombreField.value.trim();
      const apellidos = apellidosField.value.trim();
      const edad = edadField.value.trim();
      const email = emailField.value.trim();
      const mensaje = mensajeField.value.trim();
  
      let isValid = true;
  
      const mensajesError = form.querySelectorAll(".error-message");
      mensajesError.forEach((msg) => msg.remove());
  
      const resetBorder = (field) => (field.style.border = "1px solid #ccc");
      [nombreField, apellidosField, edadField, emailField, mensajeField].forEach(resetBorder);
  
      const showError = (field, message) => {
        field.style.border = "2px solid red";
        const error = document.createElement("span");
        error.className = "error-message";
        error.style.color = "red";
        error.style.fontSize = "14px";
        error.textContent = message;
        field.parentNode.insertBefore(error, field.nextSibling);
      };
  
      if (nombre.length < 3) {
        showError(nombreField, "El nombre debe tener al menos 3 caracteres.");
        isValid = false;
      }
  
      if (apellidos.length < 3) {
        showError(apellidosField, "Apellido inválido");
        isValid = false;
      }
  
      if (!/^\d+$/.test(edad) || parseInt(edad, 10) <= 0) {
        showError(edadField, "Edad inválida");
        isValid = false;
      }
  
      if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        showError(emailField, "Correo electrónico inválido");
        isValid = false;
      }
  
      if (mensaje.length < 10) {
        showError(mensajeField, "El mensaje debe contener al menos 10 caracteres.");
        isValid = false;
      }
  
      if (!isValid) {
        return;
      }
  
      const formData = {
        Nombre: nombre,
        Apellidos: apellidos,
        Edad: edad,
        Email: email,
        Mensaje: mensaje,
      };
  
      enviarFormulario(
        formData,
        () => {
          alert("Formulario enviado correctamente. ¡Gracias por tu mensaje!");
          form.reset();
        },
        (mensajeError) => {
          alert(mensajeError);
        }
      );
    });
  });  