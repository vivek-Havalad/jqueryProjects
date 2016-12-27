$(document).ready(function(){
  //Event listener for a button
$("button").click(function(){
  //get the value from the text box
search=$("#players").val();
if (search == "") {
  //default search for sachin tendulkar
urls="http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Sachin_Tendulkar&callback=?";
}
else {
  urls="http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Sachin_Tendulkar&callback=?";
//lower case all the search string
  search=search.toLowerCase();
var str="";
//split at spaces
  var arrs=search.split(" ");
  //iterate over each string in array and make first char of each string to upper case
  for (var i = 0; i < arrs.length; i++) {
    var p=arrs[i].charAt(0);
    arrs[i]=arrs[i].replace(p,p.toUpperCase());
    //conctinate each string to str with "_" appended
    str+=arrs[i]+"_";
  }
  //replace the url with str
urls=urls.replace(/Sachin_Tendulkar/g,str);
}
  $.ajax({
        type: "GET",
        url: urls ,
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
try{
          var markup = data.parse.text["*"];
         var blurb = $('<div></div>').html(markup);
         // remove links as they will not work
         blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });

         // remove any references
         blurb.find('sup').remove();

         // remove cite error
         blurb.find('.mw-ext-cite-error').remove();
         $('#article').html($(blurb).find('p'));
}
catch (err){
  $('#article').empty();
  $('#article').append("<p style='text-align: center;font-size: 40px;color:red'>Page Not Found</p>");
}

        },
        error: function (errorMessage) {
  $('#article').append("<p style='text-align: center;font-size: 40px;color:red'>Page Not Found</p>");
        }
    });
});
} );
