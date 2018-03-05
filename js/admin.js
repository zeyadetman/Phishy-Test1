///
/// Fill the content of class "Collaboratorlist" and class "articles" with apis 
///
$(document).ready(()=>{
var data = null;

var xhr = new XMLHttpRequest();  // collaboratorlist
var xhrarticles = new XMLHttpRequest(); // articles
xhr.withCredentials = true;
xhrarticles.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    var collaboratorlist = JSON.parse(this.responseText);
    for(var i=0;i<collaboratorlist.length;i++){
        $('.Collaboratorlist').append(`
        <div class="Collaboratorprof" id="collid${collaboratorlist[i].id}">
                        <img src="${collaboratorlist[i].avatar}" class="avatar">
                        <a href="#" onclick=displayMyArticles("${collaboratorlist[i].username}")>${collaboratorlist[i].username}</a>
        </div>
        `);
    }
  }
});

xhrarticles.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        var res = JSON.parse(this.responseText);
        for(var i=0;i<res.length;i++){
            var stat = ``;
            if(res[i].status == 'pending'){
                stat = `<select class="artstat" name="" id="state${i}" style="width: 30%">
                        <option id="pen" selected>Pending</option>
                        <option id="pub">Published</option>
                        <option id="inp">In-Progress</option>                        
                    </select>`
            }
            else if(res[i].status == 'published'){
                stat = `<select name=""  class="artstat" id="state${i}" style="width: 30%">
                        <option class="pen">Pending</option>
                        <option class="pub" selected>Published</option>
                        <option class="inp">In-Progress</option>                        
                    </select>`
            }
            else if(res[i].status == 'in-progress'){
                stat = `<select name="" class="artstat" id="state${i}" style="width: 30%">
                        <option class="pen">Pending</option>
                        <option class="pub">Published</option>
                        <option class="inp" selected>In-Progress</option>                        
                    </select>`
            }
            $('.articles').append(`
            <div class="article ${res[i].status}" data-submit-date="${res[i].submitDate}">
                    <h1>${res[i].title}</h1>
                    <p class="author">${res[i].collaborator.username}</p>
                    ${stat}
                </div>
            `)
        }
    }
    changeArticleState();
});

xhr.open("GET", "https://phishy-rest-server.herokuapp.com/collaborators");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("authorization", `Token token=${localStorage['token']}`);
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "2b45818b-207b-2a87-037c-e855a3ba6236");

xhrarticles.open("GET", "https://phishy-rest-server.herokuapp.com/articles");
xhrarticles.setRequestHeader("content-type", "application/json");
xhrarticles.setRequestHeader("authorization", `Token token=${localStorage['token']}`);
xhrarticles.setRequestHeader("cache-control", "no-cache");
xhrarticles.setRequestHeader("postman-token", "2b45818b-207b-2a87-037c-e855a3ba6236");

xhr.send(data);
xhrarticles.send(data);
}) // document ready close
/// --------- Finish content filling --------- ///

///
/// Display Authors Articles
///
function displayMyArticles(author){
    var divs = $("div.article");
    for (i = 0; i < divs.length; i++) {
        auth = divs[i].getElementsByTagName("p")[0].innerHTML;
        if(author == auth)
            divs[i].style.display = "";
        else{
            divs[i].style.display = "none";
        }
    }
}
/// ------ Finish Display Authors Articles --------------- ///

///
/// Sort the class "Collaboratorlist" which contains the collaborators
/// 
$('#collsort').on('change', function () {
    var $divs = $("div.Collaboratorprof");
    var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
        return $(a).find("a").text().toUpperCase().localeCompare($(b).find("a").text().toUpperCase());
    });
    $(".Collaboratorlist").html(alphabeticallyOrderedDivs);
});
/// -------- Finish sort ----------- ///

///
/// Search collaborators
///
$('#collsearch').keyup(()=>{
    var input = document.getElementById('collsearch').value.toUpperCase();
    var divs = $("div.Collaboratorprof");
    for (i = 0; i < divs.length; i++) {
        a = divs[i].getElementsByTagName("a")[0].innerHTML;
        if (a.toUpperCase().indexOf(input) > -1) {
            divs[i].style.display = "";
        } else {
            divs[i].style.display = "none";
        }
    }
})
/// ------- Finish Search -------- ///

///
/// Sort Articles
///
$('#sortarticles').on('change', function () {
    var $divss = $(".article");
    var tagName = '';
    if($('#sortarticles').val() == "Sort by Title") {tagName = "h1";
        var alphabeticallyOrderedDivss = $divss.sort(function (a, b) {
        return $(a).find(tagName).text().toLowerCase().localeCompare($(b).find(tagName).text().toLowerCase());
    });}
    else if($('#sortarticles').val() == "Sort by Sumbit date") {tagName = "submit-date";
        var alphabeticallyOrderedDivss = $divss.sort(function (a, b) {
        return Date.parse($(a).data("submit-date")) < Date.parse($(b).data("submit-date"));
    });
    }
    console.log(alphabeticallyOrderedDivss);
    $(".articles").html(alphabeticallyOrderedDivss);
});
/// -------- Finish Sort Section ------------ ///

///
/// Change Article State
///
function changeArticleState() {
$('.article').on('change','.artstat',function (ee){
    var oldClass = $(`#${ee.target.id}`).parent('.article').attr('class').split('article')[1];
    $(`#${ee.target.id}`).parent('.article').addClass(`article ${$(`#${ee.target.id}`).val().toLowerCase()}`);        
    $(`#${ee.target.id}`).parent('.article').removeClass(`${oldClass}`);         
});
}

/// -------- Finish Changing Article State --------------