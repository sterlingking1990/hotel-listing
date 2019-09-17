// import { privateEncrypt } from "crypto";
const DATABASE_URI = 'http://localhost:3000/hotels';

const getHotel=async()=>{
    const response=await fetch(DATABASE_URI);
    const hotels=await response.json();
    populateHotels(hotels);

    const addList=document.querySelector('#add_list');
    
    $(document).ready(function () {
        $('#add_list').on('click', function (e) {
             e.preventDefault();
            addHotel();
        });
    });

    //trigger edit button


    $(document).ready(function () {
        $(".edit_hotel").on("click", function () {
            var id = $(this).attr("id");
            addList.style.display = 'none';
            editHotel(id);
        })
    });

    //trigger delete button
    $(document).ready(function () {
        $(".delete_hotel").on("click", function () {
            var id = $(this).attr("id");
            deleteHotel(id);
        })
    });


    $(document).ready(function () {
        $('#update_list').on('click', function (e) {
            e.preventDefault();
            updateHotel();
        });
    });

    $(document).ready(function () {
        $('.view_hotel').on('click', function () {
            var id = $(this).attr("id");
            viewHotel(id);
        });
    });

}


const updateHotel = () => {
    //console.log("id", id);
    //alert("am on edit");
    var data = new Object();
    data.id = $("input[name='id']").val();
    data.name = $("input[name='name']").val();
    data.state = $("input[name='state']").val();
    data.address = $("input[name='address']").val();
    data.phone = $("input[name='phone']").val();
    data.book_price = $("input[name='book_price']").val();
    data.rating = $("input[name='rating']").val();
    data.hotel_class = $("input[name='hotel_class']").val();
    data.number_of_room = $("input[name='number_of_room']").val();
    data.descriptions = $("input[name='descriptions']").val();
    
    console.log(data.id, data.name, data.state, data.address, data.phone, data.book_price, data.rating, data.hotel_class, data.number_of_room, data.descriptions);    

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/hotels/' + data.id,
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            console.log("updated successful");
            const addList = document.querySelector('#add_list');
            addList.style.display='unset';
            const updateList = document.querySelector('#update_list');
            updateList.style.display = 'none';


            loadHotel();
        }
    });

}

const editHotel = id => {
    console.log("id", id);
    const updateList = document.querySelector('#update_list');
    updateList.style.display = 'unset';
    $.ajax(
        {
            url: 'http://localhost:3000/hotels/' + id,
            method: 'GET',
            success: function (data) {
                console.log("data", data);
                //alert(data.title);
                var id = data.id;
                var name = data.name;
                var state = data.state;
                var address = data.address;
                var phone = data.phone;
                var book_price = data.book_price;
                var rating = data.rating;
                var hotel_class = data.hotel_class;
                var number_of_room = data.number_of_room;
                var descriptions = data.descriptions;
                $("input[name='id']").val(id);
                $("input[name='name']").val(name);
                $("input[name='state']").val(state);
                $("input[name='address']").val(address);
                $("input[name='phone']").val(phone);
                $("input[name='book_price']").val(book_price);
                $("input[name='rating']").val(rating);
                $("input[name='hotel_class']").val(hotel_class);
                $("input[name='number_of_room']").val(number_of_room);
                $("input[name='descriptions']").val(descriptions);
            }
        });

}

const deleteHotel = id => {
    console.log("id", id);

    $.ajax(
        {
            type: 'DELETE',
            contentType: 'application/json',
            url: 'http://localhost:3000/hotels/' + id,
            success: function () {
                console.log("Deleted Successful")
                $('contact').empty();
                loadHotel();
            }
        });

}

const viewHotel = id => {
    console.log("id", id);
    $.ajax(
        {
            url: 'http://localhost:3000/hotels/' + id,
            method: 'GET',
            success: function (data) {
                console.log("data", data);
                //alert(data.title);
                var id = data.id;
                var name = data.name;
                var state = data.state;
                var address = data.address;
                var phone = data.phone;
                var book_price = data.book_price;
                var rating = data.rating;
                var hotel_class = data.hotel_class;
                var number_of_room = data.number_of_room;
                var descriptions = data.descriptions;

                formatSingleDisplay(id,name,state,address,phone,book_price,rating,hotel_class,number_of_room,descriptions);
            }
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

const formatSingleDisplay = ({ id, name, state, address, phone, book_price, rating, hotel_class, image, number_of_room, descriptions }) => {
    $('#content').empty();
    alert("ready to view");
    // return `<div class="card">
    //       <h5 class="card-header">${name}</h5>
    //       <div class="card-body">
    //         <h5 class="card-title">${hotel_class}</h5>
    //         <p class="card-text">${descriptions}</p>
    //         <p class="card-text">${book_price}</p>
    //         <button id=${id} class='view_hotel'>View</button>
    //         <button id=${id} class='edit_hotel'>Edit</button>
    //         <button id=${id} class='delete_hotel'>Delete</button>
    //         </span>
    //       </div>
    //     </div>`
};

$(document).ready(getHotel);