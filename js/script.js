/*** [On Page Load] ***/
//Set Selection Focus on First Text Field
//Hide job role "other" text box
//Hide t-shirt color selection box

//$("input[type='text']:visible:enabled:first").focus();

$(document).ready(function(){
  $("#name").focus();
  $("#other-title").hide()
  $("#colors-js-puns").hide();
});


/*** [Job Role Section] ***/
//Reveal a new text field when "Other" option is selected

$("#title").on('change', function() {
	if ($(this).val() === "other") {
		$("#other-title").show();
	} else {
		$("#other-title").hide();
	}
});


/*** [T-Shirt Info Section] ***/

//Only display color options depending on what design is selected
$("#design").on('change', function() {
	if ($("#design").val() === "js puns") {
		$("#colors-js-puns").show();
		$('#color option[value="cornflowerblue"]').show();
		$('#color option[value="darkslategrey"]').show();
		$('#color option[value="gold"]').show();
		$('#color option[value="tomato"]').hide();
		$('#color option[value="steelblue"]').hide();
		$('#color option[value="dimgrey"]').hide();
	} else if ($("design").val() === "heart js") {
		$('#color option[value="tomato"]').show();
		$('#color option[value="steelblue"]').show();
		$('#color option[value="dimgrey"]').show();
		$('#color option[value="cornflowerblue"]').hide();
		$('#color option[value="darkslategrey"]').hide();
		$('#color option[value="gold"]').hide();
	}
});


/*** [Register for Activities Section] ***/
//If a user selects a workshop event which clashes with another events date and time then disable checkbox
$('.activities input').on('change', function(){
	//JavaScript Frameworks Workshop - Clashing with Express Workshop
	if ($('input[name="js-frameworks"]').prop('checked')){
		$('input[name="express"]').attr('disabled', true);
		$('input[name="expresss"]').parent().addClass('disable');
	} else {
		$('input[name="express"]').removeAttr('disabled');
		$('input[name="expresss"]').parent().removeClass('disable');
	}
	//Express Workshop - Clashing with JavaScript Frameworks Workshop
	if ($('input[name="express"]').prop('checked')){
		$('input[name="js-frameworks"]').attr('disabled', true);
		$('input[name="js-frameworks"]').parent().addClass('disable');
	} else {
		$('input[name="js-frameworks"]').removeAttr('disabled');
		$('input[name="js-frameworks"]').parent().removeClass('disable');
	}
	//JavaScropt Libraries Workshop - Clashing with Node.js Workshop
	if ($('input[name="js-libs"]').prop('checked')){
		$('input[name="node"]').attr('disabled', true);
		$('input[name="node"]').parent().addClass('disable');
	} else {
		$('input[name="node"]').removeAttr('disabled');
		$('input[name="node"]').parent().removeClass('disable');
	}
	//Node.js Workshop - Clashing with JavaScropt Libraries Workshop
	if ($('input[name="node"]').prop('checked')){
		$('input[name="js-libs"]').attr('disabled', true);
		$('input[name="js-libs"]').parent().addClass('disable');
	} else {
		$('input[name="js-libs"]').removeAttr('disabled');
		$('input[name="js-libs"]').parent().removeClass('disable');
	}
});

//Add a running total cost below the activities list
$(".activities").append('<div class="total">Total: $</div>');

//Event listener to automatically update total cost depending on selections
$(".activities").on("click", function(){
	let price = 0;
	if ($('input[name="all"]').prop("checked")){
		cost += 200;
	} else
})

//Payment info section


//Form validation
//Name field can't be blank
//Email field must be valid format
//User must select at least one checkbox under the "Register for Activities" section
//If payment option is "Credit Card" - Make sure it is correct format
	//Credit card number should be 13-16 digits. Zip = 5 digits. CVV exactly 3 digits

//Form validation messages

//Form works without JS - Progressive Enhancement

