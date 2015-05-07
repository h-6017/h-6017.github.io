//this is my new blog... isn't it great?
function getBlog() {
    alert("infunction");
    $.get('entries.json', function(data) {
        alert("we got the file");
        $.each(data.entries, function(key, val) {
            console.log(key + " " + val.date);

        });
    });
}
$(document).ready(function(){
    alert("My body is ready");
    getBlog();
});

