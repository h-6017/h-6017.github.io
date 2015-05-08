//this is my new blog... isn't it great?
function pager() {
    var items = $('.blogpost');
    var numItems = items;
    var perPage = 5;
    items.slice(perPage).hide();

    $('#blogcontent').pagination( {
        items:numItems,
        itemsOnPage:perPage,
        cssStyle:"dark-theme",
        onPageClick: function(pageNum) {
            var start = perPage * (pageNum - 1);
            var end = start + perPage;
            items.hide()
                 .slice(start, end).show();
        }
   });
}

function getBlog() {
    $.get('entries.json', function(data) {
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
    getBlog();
    pager();
});

