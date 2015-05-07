//this is my new blog... isn't it great?
$(document).ready(function(){
/*
function getblog(){
    var entries = $.getJSON('entries.json');
    $('#blog').html($.parseJSON(entries));
*/    
    alert("My body is ready");
function getblog(){
    alert("infunction");
    $.getJSON('../../entries.json', function(data) {
        alert("we got the file");
        $.each(data.entries, function(key, val) {
            alert("reading the file");
            console.log(key + " " + val.date);
        });
    });
}
getblog();

});
