//this is my new blog... isn't it great?

function search2() {
    $('.blogpost').hide();
    console.log("Im working");
    var searchText = $(this).val().toLowerCase();
    var results = []
    $('.blogpost').each(function(){
        var paraKids = $(this).children('p')
        var targetText = paraKids[0].textContent.toLowerCase();
        if(targetText.indexOf(searchText) != -1) {
            results.push(this);
        }
    });

    $(document).trigger("search-started", {results: results}, pager);
}
function pager(evt, data) {
    console.log(evt, data)
    var items;
    if (data) {
        items = data.results;
        $('.blogpost').hide()
        $(items).show();
    } else {
        items = $('.blogpost');
    }
    var numItems = items.length;
    var perPage = 2;
    var stuffToHide = items.slice(perPage)
    $(stuffToHide).each(function() {
        $(this).hide()
    })

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
            $(items).hide()
                 .slice(start, end).show();
            if(pageNum == 1) {
                $('.current.prev').hide();
                $('.page-link.prev').hide();
            } else {
                $('.current.prev').show();
                $('.page-link.prev').show();
            }
            if(pageNum == Math.floor((numItems/perPage)+1)) {
                $('.page-link.next').hide();
                $('.current.next').hide();
            } else {
                $('.page-link.next').show();
                $('.current.next').show();
            }
        }      
   });
    $('.page-link').hide();
    $('.ellipse').hide();
    $('.current').hide();
    $('.page-link.next').show();
    $('#search2').val('');
    $('#search2').show();

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

            $('#blog').prepend(newBlogPost);

        });
        $(document).trigger('entries-loaded')
    });
}

$(document).ready(function(){
    getBlog();
    $(document).on('entries-loaded', pager);
    $(document).on('search-started', pager);
    $('#search2').keyup(function () {
        $('#search-second').val($('#search2').val());
        $(this).ready(search2);
        $('#search-second').focus();
        $('#search2').hide();
        $('#search-second').keyup(search2);
    });
});
