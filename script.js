// import { privateEncrypt } from "crypto";
const DATABASE_URI = 'http://localhost:3000/hotels';

const getHotel=async()=>{
    const response=await fetch(DATABASE_URI);
    const hotels=await response.json();
    populateHotels(hotels);


//populate the already listed hotels on the page

    $(document).ready(function () {
        $('#add_list').on('click', function (e) {
             e.preventDefault();
            addHotel();
        });
    });

}

const addHotel=()=>{
        // const displayContacts = document.querySelector('#firstName');
        // console.log(displayContacts.html());
        var data = new Object();

        data.name = $("input[name='name']").val();
        data.state = $("input[name='state']").val();
        data.address = $("input[name='address']").val();
        data.phone = $("input[name='phone']").val();
        data.book_price = $("input[name='book_price']").val();
        data.rating = $("input[name='rating']").val();
        data.hotel_class = $("input[name='hotel_class']").val();
        data.descriptions = $("input[name='descriptions']").val();

        console.log(data.name, data.state, data.address, data.phone, data.book_price,data.rating,data.hotel_class,data.descriptions);

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/hotels',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                console.log("added successful");
                loadHotel();
            }
        });

    }

const loadHotel = () => {

    $.ajax(
        {
            type: 'GET',
            url: 'http://localhost:3000/hotels',
            success: function (data) {
                $('#display_hotels').empty();
                populateHotels(data);
            }
        }
    );
}



const populateHotels=hotels=>{
   
    const formattedHotels=hotels.map(formatHotels);
    const displayHotels=document.querySelector('#display_hotels');
    displayHotels.innerHTML+=formattedHotels.join('');

};



const formatHotels=({id,name,book_price,hotel_class,descriptions})=>{
    return `<div class="card">
          <h5 class="card-header">${name}</h5>
          <div class="card-body">
            <h5 class="card-title">${hotel_class}</h5>
            <p class="card-text">${descriptions}</p>
            <p class="card-text">${book_price}</p>
            <button id=${id} class='view_hotel'>View</button>
            <button id=${id} class='edit_hotel'>Edit</button>
            <button id=${id} class='delete_hotel'>Delete</button>
            </span>
          </div>
        </div>`
};

$(document).ready(getHotel);