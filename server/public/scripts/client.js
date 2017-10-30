console.log('hello from client.js');
$(document).ready(onReady);

function onReady(){
    refreshBabyNames();
    $('#nameBtn').on('click', nameBtnClicked);
    $('#namesList').on('click', '.deleteBtn', deleteBtnClicked);
}

function nameBtnClicked() {
    //store input values in variables
    var babyBday = $('#bdayIn').val();
    var babyHeight = $('#heightIn').val();
    var babyEyeColor = $('#eyeColorIn').val();
    var babySAnimal = $('#sAnimalIn').val();
    console.log('baby bday:', babyBday);
    console.log('baby height:', babyHeight);
    // store info in object to send
    var babyInfo = {
        bday: babyBday,
        height: babyHeight,
        eyeColor: babyEyeColor,
        sAnimal: babySAnimal
    };
    //clear input fields
    $('input').val('');
    //call function that makes POST request, pass it babyInfo object
    addNewBaby(babyInfo);
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
        // display only bday from string that's returned
        var displayBDay = namedBaby.bday.substr(0, 10);
        $tr.append('<td>' + displayBDay + '</td>');
        $tr.append('<td>' + namedBaby.height + ' inches</td>');
        $tr.append('<td>' + namedBaby.eyeColor + '</td>');
        $tr.append('<td>' + namedBaby.spiritAnimal + '</td>');
        $tr.append('<td>' + namedBaby.fName + '</td>');
        $tr.append('<td>' + namedBaby.mName + '</td>');
        $tr.append('<td><button class="deleteBtn btn btn-danger btn-sm" data-id="' + namedBaby.id + '">DELETE</button></td>')
        $('#namesList').append($tr);
    }
}

function addNewBaby(objToSend){
   //POST request with a new baby to get named
   $.ajax({
       method: 'POST',
       url: '/names',
       data: objToSend
   }).done(function(response){
       console.log('response from POST req', response);
       refreshBabyNames();
   }).fail(function(error){
       console.log('something went wrong in POST req');
   });
}

function deleteBtnClicked(){
    var namedBabyId = $(this).data('id');
    console.log('delete baby with this namedBabyId:', namedBabyId);
    //DELETE request
    $.ajax({
        method: 'DELETE',
        url: '/names/' + namedBabyId //req.params
    }).done(function(response){
        refreshBabyNames();
    }).fail(function(error){
        console.log('something went wrong in DELETE request', error);
    })
}