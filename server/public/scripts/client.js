console.log('hello from client.js');
$(document).ready(onReady);

function onReady(){
    refreshBabyNames();
}

function refreshBabyNames() {
    // make GET request for all names on db
    $.ajax({
        method: 'GET',
        url: '/names'
    }).done(function(response){
        console.log('response from GET req:', response);
        // Response is the named babies array
        var namedBabies = response;
        appendNamedBabiesToDom(namedBabies);
    }).fail(function(error){
        // TODO -add alert to user
        console.log('Something went wrong with GET request');
    });
}