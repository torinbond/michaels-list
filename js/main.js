// On document load...
$(function () {

    // Initially hide the loading animation and tabs
    $("#Loading").hide();
    $(".tabbable").hide();

    // Event handler for clicking on button
    $(".btn-search").click(function() {
        // empties results table for new query
        $(".results").empty();
        $(".tabbable").hide();

        // URL encodes the form input
        var query = encodeURIComponent($("input").val());

        // Restful call to YQL to get craigslist data
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20craigslist.search" +
        "%20where%20location%3D%22rochester%22%20and%20type%3D%22sss%22%20and%20query%3D%22" + 
        query + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

        // Play with the YQL console here: http://tinyurl.com/cpen9m6
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            beforeSend: function() {
                // Places loading animation on page
                $("#Loading").show();
            },
            success: function(data) {
                // Hides loading animation when complete
                $("#Loading").hide();

                // TODO: Add proper error handling for when the field is empty
                if(data.query.count == 0 || typeof data.query.results.RDF.item == 'undefined') {
                    $(".results").append('<tr><td>No results found</td></tr>');
                } else {
                    for (var i = 0 ; i < data.query.results.RDF.item.length; i++) {
                        // TODO: Format data better, using a thead for price, title and location
                        $(".results").append('<tr><td><div class="btn-group"><a href="#DescriptionModal" data-toggle="modal" role="button" class="btn btn-info">' +
                            '<i class="icon-zoom-in icon-white"></i></a>' +  
                            '<a role="button" class="btn btn-warning btn-favorite"><i class="icon-star icon-white">'+
                            '</i></a></div><td><a href="' + 
                            data.query.results.RDF.item[i].source + '" target="_blank">' + 
                            data.query.results.RDF.item[i].title[0] + '</a></td></tr>');
                    };
                }

                $(".btn-favorite").click(function() {
                    $(this).addClass("disabled");
                    $(this).removeClass("btn-warning");
                    $(this).off('click');
                });

                // Show table after it has been populated and functionality is bound
                $(".tabbable").fadeIn('slow');
            },
            failure: function() {
                // TODO: Add proper error handling and update the UI to notify the user that
                // their query was unsuccessful
            }
        });
    });

    // Event handler for search field
    $("#SearchField").keyup(function(event) {
        // If user presses enter in field, search
        if (event.keyCode == 13) { 
            $(".btn-search").click();
        };
    });
});