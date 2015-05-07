//this is my new blog... isn't it great?
$(document).ready(getblog);
/*
function getblog(){
    var entries = $.getJSON('entries.json');
    $('#blog').html($.parseJSON(entries));
*/    
function getblog(){
alert("Im working");
    $.getJSON('entries.json', function(data) {
$.each(data.entries, function(key, val) {
                       console.log(key + " " + val.date);
});
     });
}
///
