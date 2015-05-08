//this is my new blog... isn't it great?
function getBlog() {
    alert("infunction");
    $.get('entries.json', function(data) {
        alert("we got the file");
        $.each(data.entries, function(key, val) {

            console.log("Selecting Blog number " + key + " for next generation.");
            $('#blog').append("<div id='" + key + "' class='col-sm-12 blogpost'>");
            $('#blog').append("<small>");
            $('#blog').append("<p class='muted' style='float:right;'>" + val.date + "</p>");
            $('#blog').append("<small/>");
            $('#blog').append("<h5>" + val.title + "</h5>");
            $('#blog').append("<p>" + val.text + "</p>");
            $('#blog').append("<hr/>");
            $('#blog').append("</div>");
            console.log("Blog number " + key + " generating...");

        });
    });
}
$(document).ready(function(){
    alert("My body is ready");
    getBlog();
});

