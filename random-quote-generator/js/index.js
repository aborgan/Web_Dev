var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var twitterUrl = "https://twitter.com/intent/tweet?text=";

$(document).ready(function() {
  $.ajaxSetup({ cache: false });
  $('#new-quote').on("click", function() { 
    $.getJSON(quoteUrl, function(json) {
      var content = json[0]["content"];
      content = content.substring(3, content.length-5);
      var author = json[0]["title"];
      $('#content').html("<p id='content'>" + content + "</p>");
      $('#author').html("<p id='author'>- " + author + "</p>");
      
    });
  });
  
  $('#post').on("click", function() {
    var content = $('#content').text();
    var author = $('#author').text().substring(2, this.length);
    twitterUrl+=content+ ' - ' + author;
    $('#tweet').attr("href", twitterUrl);
  });
});