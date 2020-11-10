$(document).ready(function(){
    let socket = io({ query: `sender=${$('input[name=message]').data('sender')}` });
    

    $('input[name=message]').on('keypress',function(e) {
        if(e.which == 13) {
            let receiever = $(this).data('receiver');
            let sender = $(this).data('sender');
            socket.emit('chat message', { message: $(this).val(), receiver: receiever, sender: sender });
            let messageBody = $('.client-message-template').clone();
            messageBody.removeClass('client-message-template');
            messageBody.find('.client-message').text($(this).val());
            messageBody.attr('hidden', false);
            $('.chat-window-current-chat-messages-pane').prepend(messageBody);
            $(this).val('');
        }
    });

    socket.on('chat message', function(message){
        let messageBody = $('.connection-message-template').clone();
        messageBody.removeClass('connection-message-template');
        messageBody.find('.connection-message').text(message.message);
        messageBody.attr('hidden', false);
        $('.chat-window-current-chat-messages-pane').prepend(messageBody);
    });
});