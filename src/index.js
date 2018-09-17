// const $ = require('jquery');
/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');
/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const url = 'api/movies';
const rate = ((input) =>{
    var str = '<i class="fas fa-star"></i>';
    let star=[];
    for (let i = 0; i < parseInt(input); i++){
        star.push(str);
        console.log(star);
    }
    return star.join("");
});
// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.')
//   console.log(error);
// });



$('jumbotron').hide();
$('#welcome').hide();
$('#add').hide();
$("#progbar").attr('style', 'width: 45%');
$(document).ready(function() {
    $("#progbar").attr('style', 'width: 50%');
    //progvar is the progress variable which will change
    //progbar is the id for the progress bar
    $('#load').fadeToggle();
    $("#progbar").attr('style', 'width: 75%');
    const {getMovies} = require('./api.js');
    getMovies().then((movies) => {
        // console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
            // console.log(`id#${id} - ${title} - rating: ${rating}`);
            $(`<tr><td>${id}</td><td class="name">${title}<button type="button" class="fas fa-trash float-right trsh"></button><button class="far fa-edit float-right edt" data-toggle="modal" data-target="#editTitle" data-title="${title}" data-rate="${rating}" data-id="${id}"></button></td><td>${rate(rating)}</td></tr>`).appendTo('#list');
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
    });

    $("#progbar").attr('style', 'width: 100%');
    $('.jumbotron').delay(1000).fadeIn(1000);
    $('#welcome').delay(1000).fadeIn(800);
    $('#add').delay(15).fadeIn(800);

    $('#editTitle').on('show.bs.modal', function (event) {
        var button  = $(event.relatedTarget); // Button that triggered the modal
        // insert ajax request here.
        var modal = $(this);
        var id = button.data('id');
        var title = button.data('title');
        var rating = button.data('rating'); // add rating edit options within the modal
        modal.find('.modal-title').text(title); //inputs title of movie into the header.
        $('#save').click(() =>{
            alert('save was clicked');// insert an ajax request to edit movie with new changes.
        });
    });

});
$('#input1, #rank').keyup((e) => {

    if (e.keyCode == 13){
        let title = $('#input1').val();
        let rating = $('#rank').val();

        let m = {title, rating};
        $.ajax({
            type: "POST",
            url: url,
            data: m,
            success: (()=>{
                console.log("Data sending ");
                $('#list').empty();
                getMovies().then((movies) => {
                    console.log('Here are all the movies:');
                    movies.forEach(({title, rating, id}) => {
                        let star = rate(rating);
                        console.log(`id#${id} - ${title} - rating: ${rating}`);
                        $(`<tr><td>${id}</td><td>${title}</td><td>${rate(rating)}</td><td class="text-center"><button class="btn btn-danger" id="trash"><i class="fas fa-trash"></i></button><button class="btn btn-danger"><i class="far fa-edit" id="edit"></i></button></td></tr>`).appendTo('#list');
                    })

                });
            })
        })
    }
});
$('#new-movie').click(()=>{
    // $.post(url, {title: $('#input1').val(), rating: $('#rank').val(), id: movies.length()+1 }, ()=>{
    //     movies.push(data);
    // });
    let title = $('#input1').val();
    let rating = $('#rank').val();

    let m = {title, rating};
    $.ajax({
        type: "POST",
        url: url,
        data: m,
        success: (()=>{
            // console.log("Data sending ");
            $('#list').empty();
            getMovies().then((movies) => {
                // console.log('Here are all the movies:');
                movies.forEach(({title, rating, id}) => {
                    let star = rate(rating);
                    // console.log(`id#${id} - ${title} - rating: ${rating}`);
                    $(`<tr><td>${id}</td><td>${title}</td><td>${rate(rating)}</td><td class="text-center"><button class="btn btn-danger"><i class="fas fa-trash"></i></button><button class="btn btn-danger"><i class="far fa-edit" id="edit"></i></button></td></tr>`).appendTo('#list');
                })

            });
        })
    })
});

$(document).on('click', '.trsh', function() { // selects the title of movie to delete.
    let title = $(this).parent("td").text();
    console.log(title);// insert ajax request to remove movie
}).catch((error) => {
    console.log(error);
});






