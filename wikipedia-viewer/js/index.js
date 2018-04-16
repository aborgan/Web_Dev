$(document).ready(function() {
  $('.mag-cont').click(open_search_bar);
});

function open_search_bar() {
  $('.mag-cont').css('border-radius', '0 10px 10px 0');
  $('.search').css('display', 'block');
  $('.search-cont').animate({
      "width":"80%"
  }, 1000);
  $('.mag-cont').off('click');
  $('.mag-cont').click(search_wiki);
  $('.search').keypress(function(e) {
    if(e.which === 13) {
      search_wiki();
    }
  });
}

function search_wiki() {
  if(!$('.search').val()) {
    return;
  }
  var search = encodeURI($('.search').val());
  var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&limit=10&search=';
  $('.search-cont').fadeOut();
  $('.search-cont').after('<button class="back">Back</button>');
  
  $.ajax({
    url:url+search,
    type:"GET",
    success: function(json, status, error) {
      if(json.length > 0) {
        var length = json[1].length;
        for(var i = 0; i < length; i++) {
          var title = json[1][i];
          var snippet = json[2][i];
          var url = json[3][i];
          var results = '<div class="results-cont"><h4 class="results-title">' + title + '</h4><p class="results-snippet">' + snippet + '</p><a target="_blank" class="results-link" href="' + url + '">Read More...</a></div>';
          if(!$('.results-cont').length) {
            $('.back').after(results);
          } else {
            $('.results-cont').last().after(results);
          }
        }
      }
      
      $('.back').click(function() {
        $('.back').remove();
        $('.results-cont').remove();
        $('.search-cont').fadeIn();
        $('.search').val('');
      });
    },
    error: function(json, status, error) {
      console.log('error' + error);
    }
  });
}