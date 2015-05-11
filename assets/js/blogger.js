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
            $('.page-link').hide();
            $('.current').hide();
            $('.ellipse').hide();
            var start = perPage * (pageNum - 1);
            var end = start + perPage;
            items.hide()
                 .slice(start, end).show();
            if(pageNum == 1) {
                console.log('hiding the previous  button');
                $('.current.prev').hide();
                $('.page-link.prev').hide();
            }else{
                console.log('showing the previous button');
                $('.current.prev').show();
                $('.page-link.prev').show();
            }
            if(pageNum == Math.floor((numItems/perPage)+1)) {
                console.log('hiding the next button');
                $('.page-link.next').hide();
                $('.current.next').hide();
            }else {
                console.log('showing the next button');
                $('.page-link.next').show();
                $('.current.next').show();
            }
        }      
   });
        $('.page-link').hide();
        $('.ellipse').hide();
        $('.current').hide();
        $('.page-link.next').show();
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

