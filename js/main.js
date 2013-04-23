$(function () {
    $("#Loading").hide();
    $(".tabbable").hide();


    $(".btn-search").click(function() {
        $(".results").empty();
        $(".tabbable").hide();

        var query = encodeURIComponent($("input").val());
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20craigslist.search%20where%20location%3D%22rochester%22%20and%20type%3D%22sss%22%20and%20query%3D%22" + query + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            beforeSend: function() {
                $("#Loading").show();
            },
            success: function(data) {
                $("#Loading").hide();
                if(data.query.results.RDF == null || data.query.results.RDF.item == undefined) {
                    $(".results").append('<tr><td>No results found</td></tr>');
                } else {
                    for (var i = 0 ; i < data.query.results.RDF.item.length; i++) {
                        $(".results").append('<tr><td><div class="btn-group"><a role="button" class="btn btn-info"><i class="icon-zoom-in icon-white"></i></a>' +  
                            '<a role="button" class="btn btn-warning"><i class="icon-star icon-white"></i></a></div><td><a href="' + data.query.results.RDF.item[i].source + '" target="_blank">' + data.query.results.RDF.item[i].title[0] + '</a></td></tr>');
                    };
                }
                $(".tabbable").fadeIn('slow');
            }
        });
    });
});