$(document).ready(function () {

    // SUBMIT FORM
    $("#weatherForm").submit( (event) => {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        ajaxPost();
    });


    function ajaxPost() {

        // PREPARE FORM DATA
        var formData = {
            cityname: $("#cityname").val(),
           // lastname: $("#lastname").val()
        }

        // DO POST
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: window.location + "api/customers/save",
            data: JSON.stringify(formData),
            dataType: 'json',
            success:  (output)=> {
                $("#postResultDiv").html("<p>" +
                    "<br>" + 
                    //.replace(/\"([^"]+)\":/g, "$1:")
                    "" + JSON.stringify(`<code> ${output.addname} </code> Current Tempeature is <code>${output.temp}<sup>o</sup>C </code>`) + "</p>");
            },
            error:  (e) => {
                alert("Error!");
                console.log("ERROR: ", e);
            }
        });
        // Reset FormData after Posting
        resetData();

    }

    function resetData() {
        $("#citytname").val("");
       // $("#lastname").val("");
    }
})