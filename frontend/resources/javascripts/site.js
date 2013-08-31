$(document).ready( function() {

	$('#modal-btn')[0].click();
	$('#gem_name').focus();

	// render( document.getElementById('viz') );

	$('.pure-button').click( function(e) {
					$('#welcome').fadeOut();
					e.preventDefault();
				});
});
