$(document).ready(function () {
	function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
	// Add click event handler to button
	$("#submit").click( function () {
		if ( ! window.FileReader ) {
			return alert( 'FileReader API is not supported by your browser.' );
		}
    console.log("hi");
		var $i = $( '#inputFile' ); // Put file input ID here
			input = $i[0]; // Getting the element from jQuery
      console.log(input);
		if ( input.files && input.files[0] ) {
			file = input.files[0]; // The file
			fr = new FileReader(); // FileReader instance
			fr.onload = function () {
				// Do stuff on onload, use fr.result for contents of file
				//Empty the div tag before the insertions
				$('.modal-body').empty();
        //Split the lines
        lines=fr.result.split("\n");
        for (var i = 0; i < lines.length; i++) {

              if(validateEmail(lines[i]))
              {
                $( '.modal-body' ).append( $("<p></p>").text(lines[i]));
              }

      }
			};
			fr.readAsText( file );
			//fr.readAsDataURL( file );
		} else {
			// Handle errors here
			alert( "File not selected or browser incompatible." );
		}
	} );
} );
