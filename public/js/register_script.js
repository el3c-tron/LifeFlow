$.fn.ForceNumericOnly = function () {
  return this.each(function () {
    $(this).keydown(function (e) {
      var key = e.charCode || e.keyCode || 0;
      // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
      // home, end, period, and numpad decimal
      return (
        key == 8 ||
        key == 9 ||
        key == 13 ||
        key == 46 ||
        key == 110 ||
        key == 190 ||
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105)
      );
    });
  });
};

$('input').on('keyup', function () {
  this.value = this.value.toUpperCase();
});

$('#phone').ForceNumericOnly();

$.ajax({
  type: 'GET',
  url: '/cities.json',
  success: function (response) {
    response.forEach((city) => {
      var o = new Option(city, city);
      $(o).html(city);
      $('#city').append(o);
    });
  },
});

$(document).ready(() => {
  $('.sidenav').sidenav();
});

let OTP = "#";


function getLocation(temp) {
  console.log("HELLO from getloaction");
    if (navigator.geolocation) {
        if(temp == 1)
          navigator.geolocation.getCurrentPosition(showPosition);
        else
          navigator.geolocation.getCurrentPosition(fun);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function fun(position) {
  // document.getElementById("search").setAttribute("href","http://localhost:5000/bank?lat="+position.coords.latitude+"&lon="+position.coords.longitude);
  window.location.href = "http://localhost:5000/bank?lat="+position.coords.latitude+"&lon="+position.coords.longitude;
}

function showPosition(position) {
    // console.log(position);
    document.getElementById("lat").value = position.coords.latitude;
    document.getElementById("lon").value = position.coords.longitude;
    
    // console.log(document.getElementById("lon").value);
    // console.log(document.getElementById("lat").value);
}

const generateOTP = async () => {
  
  getLocation(1);

  let receiverEmail = document.getElementById('email').value;
  // if(!receiverEmail.isEmail())
  // {
  //   alert("Please enter a valid email");
  //   return;
  // }
  if(OTP != "#")
  {
    alert("OTP has already been sent to given email");
    return;
  }
  var digits = '0123456789'; 
    OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    let data = {  
            "otp" : OTP,
            "receiverEmail" : receiverEmail
        } 
    let options = { 
            method: 'POST', 
            headers: { 
                'Content-Type':  
                    'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(data) 
        } 
        let fetchRes = await fetch( "http://localhost:5000/api/sendOTP",  options); 
        fetchRes.then(res => 
            res.json()).then(d => { 
                console.log(d)
                if(d.status != 201) OTP = "#";
            }) 

  
  
  

}



const verifyOTP = () => {

  

  if(OTP == "#")
  {
    alert("Please generate OTP first");
    document.getElementById('otp').value = "";
    return;
  }
  let enteredOTP = document.getElementById('otp').value;


  if(enteredOTP != OTP)
  {
    alert("Wrong OTP, please enter again");
    document.getElementById('otp').value = "";
    return;
  }

 

  document.getElementById('registerForm').submit();

}















// let fun = () => {

//   console.log("HELLO FROM FUN");
//   getLocation();
  
  
  // let data = {  
  //           "longitude" : longitude,
  //           "latitude" : latitude
  //       } 
  //   let options = { 
  //           method: 'POST', 
  //           headers: { 
  //               'Content-Type':  
  //                   'application/json;charset=utf-8'
  //           }, 
  //           body: JSON.stringify(data) 
  //       } 
  //       let fetchRes = await fetch( "http://localhost:5000/bank",  options); 
        
        
  //       window.location.href = "http://localhost:5000/bank";
  //       fetchRes.then(res => 
  //           res.json()).then(d => { 
  //               console.log(d)
  //               if(d.status != 201) OTP = "#";
  //           })

// }

















