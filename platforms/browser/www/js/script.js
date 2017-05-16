$(document).on("pagecreate", "#page2", function() { //when entering page2
    $.getJSON("http://api.fixer.io/latest?base=SEK", function(result){
      $.each(result, function(i, field){
        $.each(result.rates, function(index, level){
          $('#currency').append($('<option>', {
            value: level,
            text: index
          }));
        });
        return false;
      });
    })
    .done(function() {
      $('#currency').selectmenu("refresh", true);
    });

    $('#omvandla').on("tap", function(e) {
      var kronor = $('#sek').val();
      if((kronor * $('#currency').val()).toFixed(2) == 0.00){
        $("#lmao").text("Skriv in ett värde i kronor");
      }
      else{
        $("#lmao").text((kronor * $('#currency').val()).toFixed(2));
      }

    });
});
$(document).on("pagehide", "#page2", function() { //When leaving page2
  $('#lmao').empty();
  $('#sek').val("");
});

$(document).on("pagecreate", "#page1", function() { //when entering page1
    $.getJSON("http://api.fixer.io/latest?base=SEK", function(result){
      $.each(result, function(i, field){
        $.each(result.rates, function(index, level){
          $('#curr').append($('<option>', {
            value: level,
            text: index
          }));
        });
        return false;
      });
    })
    .done(function() {
      $('#curr').selectmenu("refresh", true);
    });

    $('#omvandla-tillbaka').on("tap", function(e){
      var value = $('#currval').val(); //input som använder skriver
      var varde = $('#curr').val(); //värde emot SEK
      if(!value){
        $("#lol").text("Skriv in ett värde");
      }
      else{
        var output = value / varde;
        $("#lol").text(output.toFixed(2));
      }
    });

});

$(document).on("pagehide", "#page1", function() { //when leaving page1
  $('#currval').val("");
  $('#lol').empty();
});

$(document).on("pagebeforeshow","#page3", function() { //just before entering page3

  $.getJSON("js/data.json", function(result){
    $.each(result, function(i, field){
      $("tbody").append("<tr><td>" + i + "</td><td>" + field + "</td></tr>");
    });
  });
});

$(document).on("pagehide", '#page3', function() {
  $("tbody").empty();
});
