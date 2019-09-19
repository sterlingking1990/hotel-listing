// $(document).ready(function () {
//     $.ajax(
//         {
//             type: 'GET',
//             url: 'http://localhost:3000/hotels',
//             success: function (data) {
//                 console.log(data);
//                 $('#list_hotel').html("<div class='card' id='list_hotel' >< div class= 'card-header'>" + data.name + "</div ><div class='card-body'><h5 class='card-title'>" + data.hotel_class + "</h5><p class='card-text'>" + data.descriptions + "</p><a class='btn btn-primary'>VIEW MORE INFO</a></div></div>");
//             }
//         }
//     )
// })
// import { privateEncrypt } from "crypto";
const DATABASE_URI = 'http://localhost:3000/hotels';

const getHotel = async () => {
    const response = await fetch(DATABASE_URI);
    const hotels = await response.json();
    populateHotels(hotels);

    $(document).ready(function () {
        $('.view_hotel').on('click', function () {
            var id = $(this).attr("id");
            viewHotel(id);
        });
    });  


}



const populateHotels = hotels => {


    const formattedHotels = hotels.map(formatHotels);
    const displayHotels = document.querySelector('#list_hotel');
    displayHotels.innerHTML += formattedHotels.join('<br/>');
    //load states

};



const formatHotels = ({ id, name, book_price, hotel_class, descriptions }) => {
    return `<div class="card" id="list_hotel">
    <div class="card-header">
        Featured
    </div>
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${descriptions}</p>
        <button id=${id} class="view_hotel">View More</button>
    </div>
</div><br/>`
};

const viewHotel = id => {
    console.log("id", id);
    $.ajax(
        {
            url: 'http://localhost:3000/hotels/' + id,
            method: 'GET',
            success: function (data) {
                console.log("data", data);

                $('#list_hotel').empty();

                $('#list_hotel').html("<div class='row' id='view_single_hotel'><div class='col-md-8'><div class='row'><h1>" + data.name + "</h1></div><div class='row'><p><img src='" + data.hotel_pic + "'/></p></div><div class='row'><p id='descrip'>" + data.descriptions + "</p></div><div class='row'><p id='booking_price' class='money'>Booking Price(#)- " + data.book_price + "</p></div><div class='row'><p id='hotel_class_single'>Hotel Class- " + data.hotel_class + "</p></div><div class='row'><p id='hotel_features'>Hotel Features- " + data.features + "</p></div><div class='row'><a href=" + 'file:///C:/Users/Kingsley/documents/decagonproject/hotellisting.html' + "><button class='move_main_page' style='font-size: 24px'>Main Page <i class='fa fa-arrow-circle-left'></i></button></a></div></div>");



                //     $('#content').append("<div class='row'>");
                // $('#content').append("<h2 class='card-title'>" + data.descriptions + "</h2></div>");
            }
        });

}



$(document).ready(getHotel);