
const lblEscriotio = document.querySelector('h1')
const button = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert') //primera clase con alert 
const lblPendientes = document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams(window.location.search)

if(!searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio')
lblEscriotio.innerHTML = escritorio

divAlerta.style.display = 'none'

//refs parte del cliente



const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    button.disabled = false
});

socket.on('tickets-pendientes', (valor) => {
    lblPendientes.innerHTML = valor 
    console.log({valor})
})

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    button.disabled = true
});



button.addEventListener( 'click', () => {

    socket.emit('atender-ticket', {escritorio}, ({ok,ticket}) => {
        if(!ok){
            lblTicket.innerHTML = 'Nadie'
            return divAlerta.style.display = ''
        }
        lblTicket.innerHTML = 'Ticket: ' + ticket.numero
    }) //evento , lo que envia el cliente, lo que responde el back-end

    
    
    
  /*  socket.emit( 'siguiente-ticket', null, ( ticket ) => {
       lblNuevoTicket.innerHTML = ticket
    });*/

});