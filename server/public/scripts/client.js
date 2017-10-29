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

function appendNamedBabiesToDom(arrOfNamedBabies) {
    //start with an empty tbody
    $('#namesList').empty();
    //loop through named babies and append to DOM
    for (var i = 0; i < arrOfNamedBabies.length; i += 1) {
        var namedBaby = arrOfNamedBabies[i];
        //create a new tr
        var $tr = $('<tr></tr>');
        //attach data to the table row
        $tr.data('namedBaby', namedBaby);
        $tr.append('<td>' + namedBaby.bday + '</td>');
        $tr.append('<td>' + namedBaby.height + ' inches</td>');
        $tr.append('<td>' + namedBaby.spirit-animal + '</td>');
        $tr.append('<td>' + namedBaby.fName + '</td>');
        $tr.append('<td>' + namedBaby.mName + '</td>');
        $('#namesList').append($tr);
    }
}