var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
      console.log(this.responseText);
    var articles = JSON.parse(this.responseText)["articles"];
    console.log(articles);
    for(var i=0;i<articles.length;i++){
      $('.articles').append(`
      <div class="article ${articles[i].status}" data-submit-date="${articles[i].submitDate}">
                <h2><span>[${articles[i].status}]</span>${articles[i].title}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel praesentium similique enim aliquam est doloremque illo delectus eum porro recusandae!</p>
      </div>
      `);
    }

  }
});

xhr.open("GET", "https://phishy-rest-server.herokuapp.com/me");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("authorization", `Token token=${localStorage['token']}`);
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "1aa37cf8-ac01-18b1-27f8-a9aea42bed34");

xhr.send(data);

/**
 * Create Article using API
 */

function createArticle(){
  var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    var article = JSON.parse(this.responseText);
    $('.articles').append(`
      <div class="article ${article.status}" data-submit-date="${article.submitDate}">
                <h2><span>[${article.status}]</span>${article.title}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel praesentium similique enim aliquam est doloremque illo delectus eum porro recusandae!</p>
      </div>
      `);
  }
});

xhr.open("POST", "https://phishy-rest-server.herokuapp.com/articles");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("authorization", "Token token=\\\"21232f297a57a5a743894a0e4a801fc3\\\"");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "26080942-cbb8-7ee0-fa23-1d5e33ba304d");

xhr.send(data);
}

/**
 * Finish Creating Article Section
 */

/**
 * Search bar
 */
$('#collsearch').keyup(()=>{
    var input = document.getElementById('collsearch').value.toUpperCase();
    var divs = $("div.article");
    divs.filter((ind)=>{
        let a = divs[ind].getElementsByTagName("h2")[0].innerHTML;
        if (a.toUpperCase().indexOf(input) === -1)
            divs[ind].style.display = "none";
        else
            divs[ind].style.display = "";
    });
    /*
    for (i = 0; i < divs.length; i++) {
        a = divs[i].getElementsByTagName("h2")[0].innerHTML;
        if (a.toUpperCase().indexOf(input) > -1) {
            divs[i].style.display = "";
        } else {
            divs[i].style.display = "none";
        }
    }*/
})
/**
 * Finish Search section
 */

/**
 * Sort Articles 
 */

$('#collsort').on('change', function () {
    var $divss = $(".article");
    var tagName = '';
    if($('#collsort').val() == "Sort by Status") {tagName = "span";
        var alphabeticallyOrderedDivss = $divss.sort(function (a, b) {
        return $(a).find(tagName).text().toLowerCase().localeCompare($(b).find(tagName).text().toLowerCase());
    });}
    else if($('#collsort').val() == "Sort by Date") {tagName = "submit-date";
        var alphabeticallyOrderedDivss = $divss.sort(function (a, b) {
        return Date.parse($(a).data("submit-date")) < Date.parse($(b).data("submit-date"));
    });
    }
    console.log(alphabeticallyOrderedDivss);
    $(".articles").html(alphabeticallyOrderedDivss);
});
/**
 * Finish Sort Articles
 */