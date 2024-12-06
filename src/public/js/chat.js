const socket = io() // instancio socket.io

const chatBox = document.getElementById('chatBox')
const messageLogs = document.getElementById('messageLogs')
let user


Swal.fire({
    title: "Inicio de Sesion",
    input: "text",
    text: "Por favor ingrese su nombre de usuario para continuar",
    inputValidator: (valor) => {
        return !valor && 'Ingrese un valor valido'
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    console.log(user)
})
 // evento change cuando sucede algun cambio en el imput (ENTER)
chatBox.addEventListener('change', (e) => {

    if (chatBox.value.trim().length > 0) {
        //envio msj al servidor
        socket.emit('mensaje', { usuario: user, mensaje: chatBox.value, hora: new Date().toLocaleString() })
        chatBox.value = ""
    }

})

socket.on('respuesta', info => {
    messageLogs.innerHTML = ""
    //recorro el array de msj y lo muestro
    info.forEach(mensaje => {
        messageLogs.innerHTML += `<p>${mensaje.hora}hs. Usuario ${mensaje.usuario} dice: ${mensaje.mensaje}</p>`
    })
})