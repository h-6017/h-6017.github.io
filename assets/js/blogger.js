//this is my new blog... isn't it great?
function pager() {
    var items = $('.blogpost');
    var numItems = items.length;
    var perPage = 2;
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
    $.get('entriesorig.json', function(data) {
        $.each(data.entries, function(key, val) {

            console.log("Selecting Blog number " + key + " for next generation.");
            var newBlogPost = $("<div id='" + key + "' class='col-sm-12 blogpost'></div>") 
            var small = $("<small>")
            var para = $("<p class='muted' style='float:right;'>" + val.date + "</p>")

            small.append(para)
            var heading = $("<h5>" + val.title + "</h5>");
            var content = $("<p>" + val.text + "</p>");

            newBlogPost
                .append(small)
                .append(heading)
                .append(content)
                .append("<hr/>")

            $('#blog').append(newBlogPost);

            console.log("Blog number " + key + " generating...");
        });
        $(document).trigger('entries-loaded')
    });
}

$(document).ready(function(){
    getBlog();
    $(document).on('entries-loaded', pager);
});

