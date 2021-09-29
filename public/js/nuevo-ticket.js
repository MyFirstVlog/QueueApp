
//refs parte del cliente

const lblNuevoTicket= document.querySelector('#lblNuevoTicket')
const button = document.querySelector('button') // no es necesario poner el # si es el unico button en el html, el coge el primerop


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    button.disabled = false
});

socket.on('ultimo-ticket', (ultimo) => {
    lblNuevoTicket.innerHTML = 'ticket: ' + ultimo
})

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    button.disabled = true
});



button.addEventListener( 'click', () => {

    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
       lblNuevoTicket.innerHTML = ticket
    });

    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)

});