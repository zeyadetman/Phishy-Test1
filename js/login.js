

function login(){
  var role = document.getElementsByClassName("username")[0].value;
    var data = JSON.stringify({
        "username": role,
        "password": document.getElementsByClassName("password")[0].value
    });

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
    if(this.responseText == "Unauthorized"){
      $(".errorMessage").html("Hello there, you entered incorrect username or password.");
      $(".errorMessage").css("display","block");
    }
    else{
      if(role == "admin"){window.location.href = "/admin"; storageSet('admin',JSON.parse(this.responseText)['token']);}
      else if(role == 'collaborator'){window.location.href = "/collaborator"; storageSet('collaborator',JSON.parse(this.responseText)['token']);}
    }
  }
});

xhr.open("POST", "https://phishy-rest-server.herokuapp.com/login");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "8ac16fa5-6c1c-7aa1-5a1d-4b87fbe3a3e9");
xhr.send(data);
}

$(".username").focus(()=>$(".errorMessage").css("display","none")) 
$(".password").focus(()=>$(".errorMessage").css("display","none"))

/**
 * Set Storage to store login data
 * @param {userType} str 
 * @param {returnedTokenFromAPI} tok 
 */
function storageSet(str,tok){
  localStorage.setItem('usertype',str);
  localStorage.setItem(`path`,`/${str}`);
  localStorage.setItem('token',tok)
}
/**Finish Storage Section */
