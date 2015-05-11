//this is my new blog... isn't it great?
$('#search2').on("keyup", function(){
    alert("Im working");
    $('.blogpost').hide();
    var searchText = $(this).val().toLowerCase();
    $('.blogpost').each(function(){
        var targetText = $(this).val().toLowerCase();
        if(targetText.indexOf(searchText) != -1) {
            $(this).show();
        }else{
            $('.blogpost').show();
        }
    });
});

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
                $('.current.prev').hide();
                $('.page-link.prev').hide();
            }else{
                $('.current.prev').show();
                $('.page-link.prev').show();
            }
            if(pageNum == Math.floor((numItems/perPage)+1)) {
                $('.page-link.next').hide();
                $('.current.next').hide();
            }else {
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

