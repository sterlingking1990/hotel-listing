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
        $('#cancel_update').on('click', function (e) {
            e.preventDefault();
            cancelUpdate();
        });
    });

    $(document).ready(function () {
        $('.view_hotel').on('click', function () {
            var id = $(this).attr("id");
            viewHotel(id);
        });
    });


  

    $(document).ready(function () {
        $('.move_main_page').on('click', function () {
            moveMainPage();
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
    data.hotel_class = $("input[name='hotel_class']").val();
    data.number_of_room = $("input[name='number_of_room']").val();
    data.descriptions = $("input[name='descriptions']").val();
    
    console.log(data.id, data.name, data.state, data.address, data.phone, data.book_price, data.hotel_class, data.number_of_room, data.descriptions);    

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

const cancelUpdate=()=>{
    window.location.reload();
}

const editHotel = id => {
    console.log("id", id);
    const updateList = document.querySelector('#update_list');
    updateList.style.display = 'unset';
    const cancelUpdate = document.querySelector('#cancel_update');
    cancelUpdate.style.display = 'unset';
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
                var hotel_class = data.hotel_class;
                var number_of_room = data.number_of_room;
                var descriptions = data.descriptions;
                $("input[name='id']").val(id);
                $("input[name='name']").val(name);
                $("input[name='state']").val(state);
                $("input[name='address']").val(address);
                $("input[name='phone']").val(phone);
                $("input[name='book_price']").val(book_price);
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

                $('#content').empty();

                $('#content').html("<div class='row' id='view_single_hotel'><div class='col-md-8'><div class='row'><h1>" + data.name + "</h1></div><div class='row'><p><img src='" + data.hotel_pic + "'/></p></div><div class='row'><p id='descrip'>" + data.descriptions + "</p></div><div class='row'><p id='booking_price' class='money'>Booking Price(#)- " + data.book_price + "</p></div><div class='row'><p id='hotel_class_single'>Hotel Class- " + data.hotel_class + "</p></div><div class='row'><p id='hotel_features'>Hotel Features- " + data.features + "</p></div><div class='row'><a href="+ 'file:///C:/Users/Kingsley/documents/decagonproject/index.html' +"><button class='move_main_page' style='font-size: 24px'>Main Page <i class='fa fa-arrow-circle-left'></i></button></a></div></div>");
    
                    

                //     $('#content').append("<div class='row'>");
                // $('#content').append("<h2 class='card-title'>" + data.descriptions + "</h2></div>");
            }
        });

}

const moveMainPage=()=>{
    alert("Hello");
}


const addHotel=()=>{
        // const displayContacts = document.querySelector('#firstName');
        // console.log(displayContacts.html());
        var data = new Object();

    var hotel_images = ['https://buzznigeria.com/wp-content/uploads/2015/03/four_points_by_sheraton_lagos.jpg','https://www.reviewcious.com/wp-content/uploads/2017/09/Top-10-Best-Hotels-in-Abuja-Nigeria.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/03/4f/a7/b3/protea-hotel-ikeja.jpg','https://media-cdn.tripadvisor.com/media/photo-s/08/2b/22/6f/the-george.jpg','http://allinnigeria.com/wp-content/uploads/2016/08/Protea-Hotel-Ikeja-54614959_z.jpg',
        'https://travel.jumia.com/blog/ng/wp-content/uploads/2018/06/eko-hotels-suites-2.jpeg','https://cdn-travel.jumia.com/web_hotel_detail_gallery/chantella-suites-208-1c83afe6fbc952b2eed3015f8cf24c4eb79a9773.jpeg'];

        let image_gotten=Math.floor((Math.random()*hotel_images.length)+1);

        let image_to_upload=hotel_images[image_gotten];
        let text_area =  $.trim($("#descriptions").val())


        data.name = $("input[name='name']").val();
        data.state = $("input[name='state']").val();
        data.address = $("input[name='address']").val();
        data.phone = $("input[name='phone']").val();
        data.book_price = $("input[name='book_price']").val();
        data.hotel_class = $("input[name='hotel_class']").val();
        data.descriptions = text_area;
        data.hotel_pic=image_to_upload;
        data.features = [$("input[name='bar'").val(), $("input[name='restaurant'").val(), $("input[name='pool'").val()];

        console.log(data.name, data.state, data.address, data.phone, data.book_price,data.hotel_class,data.descriptions,data.hotel_pic,data.features);

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
                window.location.reload();
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
            <p class="card-text"><strong>booking</strong>-${book_price}</p>
            <button id=${id} class='view_hotel'>View</button>
            <button id=${id} class='edit_hotel'>Edit</button>
            <button id=${id} class='delete_hotel'>Delete</button>
            </span>
          </div>
        </div><br/>`
};



$(document).ready(getHotel);