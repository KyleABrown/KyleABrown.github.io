$(function() {
    $('.slider').slider();

    // ID of the Google Spreadsheet
    var spreadsheetID = "1MwNEfWZN6mvhgQP_D-tP5zAfOoN55OFEoMDafp8VR7Q";
    // Make sure it is public or set to Anyone with link can view 
    var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
    $.getJSON(url, function(data) {
        var entry = data.feed.entry;
        console.log(entry);
        // $(entry).each(function(){
        // // Column names are name, age, etc.
        //     $('.results').prepend('<h2>'+this.gsx$name.$t+'</h2><p>'+this.gsx$age.$t+'</p>');
        // });
    });

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [{
                label: 'apples',
                data: [12, 19, 3, 17, 6, 3, 7],
                backgroundColor: "rgba(153,255,51,0.4)"
            }, {
                label: 'oranges',
                data: [2, 29, 5, 5, 2, 3, 10],
                backgroundColor: "rgba(255,153,0,0.4)"
            }]
        }
    });
});