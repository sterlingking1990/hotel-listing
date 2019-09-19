    $(document).ready(function () {
        $('#admin_login_btn').on('click', function (e) {
            var entry_user_name = $('#admin_name').val();
            var entry_password=$('#admin_password').val();
            logAdmin(entry_user_name,entry_password);
            e.preventDefault();
        });
    });


    const logAdmin=(username,password)=>{
        //get from db
console.log(username);
        $.ajax({
            type:'GET',
            url:'http://localhost:3000/login',
            success:function([data]){
                //begin comparision of username and password
                if((username==data.username) && (password==data.password)){
                    const error_page = document.querySelector('#error_page');
                    error_page.style.display = 'none';
                    window.location="index.html";
                }
                else{
                    const error_page = document.querySelector('#error_page');
                    error_page.style.display='unset';
                }
            }
        })

    }




    


