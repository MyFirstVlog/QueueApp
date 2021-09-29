const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl()

const socketController = (socket) => {
    
    //console.log('Cliente conectado', socket.id );

    /*socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });*/
    socket.emit('ultimo-ticket', ticketControl.ultimo)
    socket.emit('estado-actual' , ticketControl.ultimos4)
    socket.emit('tickets-pendientes', ticketControl.tickets.length)
    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const sgte = ticketControl.siguiente()

        callback(sgte)

        //TODO:Notificar de un nuevo tivket oendiente a asignar

    })
    socket.on('atender-ticket', ({escritorio}, callback)=>{
        if(!escritorio){
            return callback({
                ok:false,
                msg: 'El escritorio es oblogatorio'
            })
        }

        const ticket  = ticketControl.atenderTicket(escritorio)

        //TODO: Notificar cambios en los ultimos 4

        socket.broadcast.emit('estado-actual' , ticketControl.ultimos4)
        socket.emit('tickets-pendientes', ticketControl.tickets.length) //al socket que atiende
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length) // reporta a las otras ventanas

        if(!ticket){
            return callback({
                ok : false,
                msg : 'Ya no hay tickets pendientes'
            })
        }else{
            return callback({
                ok : true,
                ticket
            })
        }
    })

}



module.exports = {
    socketController
}

