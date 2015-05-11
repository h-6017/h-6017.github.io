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
        $('.current.prev').hide();
        onPageClick: function(pageNum) {
            $('.page-link').hide();
            $('.current').hide();
            var start = perPage * (pageNum - 1);
            var end = start + perPage;
            items.hide()
                 .slice(start, end).show();
            if(pageNum != 1) {
                $('.current.prev').show();
            }else{
                $('.current.prev').hide();
            }
            if(pageNum != numItems) {
                $('.page-link.next').show();
            }else {
                $('.page-link.next').hide();
            }
        }      
   });
        $('.page-link').hide();
        $('.current').hide();
        $('.page-link.next').show();
        $('.current.prev').show();
}


function getBlog() {
    $.get('entriesorig.json', function(data) {
        $.each(data.entries, function(key, val) {

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

        });
        $(document).trigger('entries-loaded')
    });
}

$(document).ready(function(){
    getBlog();
    $(document).on('entries-loaded', pager);
});

