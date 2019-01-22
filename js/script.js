/*******************************************/
	/*** [On Page Load] ***/
/*******************************************/
$(document).ready(function() {
	//Set Selection Focus on First Text Field
  $("#name").focus();
  	//Hide job role "other" text box
  $("#other-title").hide()
  	//Hide t-shirt color selection box
  $("#colors-js-puns").hide();
  	//Hide paypal payment text
  $(".paypal").hide();
  	//Hide bitcoin payment text
  $(".bitcoin").hide();
  	//Turn off browser auto-validate on email address
  $("form").attr("novalidate", "novalidate");

/*******************************************/
	/*** [Job Role Section] ***/
/*******************************************/
	//Reveal a new text field when "Other" option is selected
	$("#title").on('change', function() {
		if ($(this).val() === "other") {
			$("#other-title").show();
		} else {
			$("#other-title").hide();
		}
	});

/*******************************************/
	/*** [T-Shirt Info Section] ***/
/*******************************************/
	//Only display color options depending on what design is selected
	$("#design").change(function() {
		if ($("#design").val() === "js puns") {
			$('#colors-js-puns').show();
			$('#color option[value="tomato"]').hide().removeAttr("selected");
			$('#color option[value="steelblue"]').hide();
			$('#color option[value="dimgrey"]').hide();
			$('#color option[value="cornflowerblue"]').show().attr('selected', '');
			$('#color option[value="darkslategrey"]').show();
			$('#color option[value="gold"]').show();
		} else if ($("#design").val() === "heart js") {
			$('#colors-js-puns').show();
			$('#color option[value="cornflowerblue"]').hide().removeAttr("selected");
			$('#color option[value="darkslategrey"]').hide();
			$('#color option[value="gold"]').hide();
			$('#color option[value="tomato"]').show().attr('selected', '');
			$('#color option[value="steelblue"]').show();
			$('#color option[value="dimgrey"]').show();
		} else {
			$('#colors-js-puns').hide();
		}
	});

/*******************************************/
	/*** [Register for Activities Section] ***/
/*******************************************/
	//If a user selects a workshop event which clashes with another events date and time then disable that checkbox
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

	//Add a running total cost text below the activities list
	$(".activities").append('<div class="total">Total: $0</div>');

	//Function to automatically update running total depending on selections
	$(".activities input").on("click", function(){
		let price = 0;
		if ($('input[name="all"]').prop("checked")){
			price += 200;
		} if ($('input[name="js-frameworks"]').prop('checked')){
			price += 100;
		} if ($('input[name="js-libs"]').prop('checked')){
			price += 100;
		} if ($('input[name="express"]').prop('checked')){
			price += 100;
		} if ($('input[name="node"]').prop('checked')){
			price += 100;
		} if ($('input[name="build-tools"]').prop('checked')){
			price += 100;
		} if ($('input[name="npm"]').prop('checked')){
			price += 100;
		}
		$(".total").html('Total: $' + (price));
	});

/*******************************************/
	/*** [Payment info section] ***/
/*******************************************/
	//Disable select payment method option and default select credit card option
	$("option[value='select_method']").attr('disabled', '');
	$("option[value='credit-card']").attr('selected', '');

	//function to show payment information based on selection
	$('#payment').on('change', function() {
		if ($(this).val() === "credit-card") {
			$('.credit-card').show();
		} else {
			$('.credit-card').hide();
		}
		if ($(this).val() === "paypal") {
			$('.paypal').show();
		} else {
			$('.paypal').hide();
		}
		if ($(this).val() === "bitcoin") {
			$('.bitcoin').show();
		} else {
			$('.bitcoin').hide();
		}
	});

/*******************************************/
	/*** [Form Validation] ***/
/*******************************************/
	//Validate form on submit button
	$('button[type="submit"]').click(function(event){
		
		//Run all validation functions
		isValidName();
		isValidEmail();
		isValidActivities();
		isValidCreditCard();
		isValidZip();
		isValidCVV();

		//If any are false then prevent submit event
		if (
		isValidName() === false ||
		isValidEmail() === false ||
		isValidActivities() === false ||
		isValidCreditCard() === false ||
		isValidZip() === false ||
		isValidCVV() === false) {
			event.preventDefault();
		}
	});
	
	//Real-time error messages on Name and Email field
	$('#name').keyup(isValidName);
	$('#mail').keyup(isValidEmail);
});

//Validation Name Field - Letters only
function isValidName(){
	let validate = /[a-z]+/i.test($('#name').val());
	if (validate === false) {
		$('#name').prev().text("Name: \(Please enter your name\)").show();
		$('#name').prev().css("color", "red");
		$('#name').css("border", "2px solid red");
	} else {
		$('#name').prev().text("Name:");
		$('#name').prev().css("color", "black");
		$('#name').css("border", "none");
	}
	return validate;
}

//Validation on Email Field - Valid email
function isValidEmail() {
	let validate = /^[^@]+@[^@.]+\.[a-z]+$/i.test($('#mail').val());
	if (validate === false) {
		$('#mail').prev().text("Email: \(Please enter a valid email address\)").show();
		$('#mail').prev().css("color", "red");
		$('#mail').css("border", "2px solid red");
	} else {
		$('#mail').prev().text("Email:");	
		$('#mail').prev().css("color", "black");
		$('#mail').css("border", "none");
	}
	return validate;
}

//Validation on Activities Selection - At least 1 must be selected
function isValidActivities() {
	if ($("form input:checkbox:checked").length > 0) {
		$('.activities legend').css("color", "black");
		$('.activities legend').text("Register for Activities");
		return true;
	} else {
		$('.activities legend').css("color", "red");
		$('.activities legend').text("Register for Activities - Please select at least one activity");
		return false;
	}
}

//Validation on Credit Card Number - Conditional Error Messages when empty or not correct number of digits
function isValidCreditCard() {
	if ($('#payment option:selected').val() === "credit-card") {
		let validate = /^\d{13,16}$/.test($('#cc-num').val());
		if (validate === false) {
			$('#cc-num').prev().css("color", "red");
			if ($('#cc-num').val() === "") {
				$('#cc-num').prev().text("Please enter your credit card number").show();
			} else {
				$('#cc-num').prev().text("Enter a number between 13-16 digits").show();
			}
			return false;
		} else {
			$('#cc-num').prev().text("Card Number:");
			$('#cc-num').prev().css("color", "black");
			return true;
		}
	}
}

//Validation on Zip code - Must be 5 digits
function isValidZip() {
	if ($('#payment option:selected').val() === "credit-card") {
		let validate = /^\d{5}$/.test($('#zip').val());
		if (validate === false) {
			$('#zip').prev().css("color", "red");
			$('#zip').prev().text("Zip Code: 5 digits").show();
			return false;
		} else {
			$('#zip').prev().text("Zip Code:");
			$('#zip').prev().css("color", "black");
			return true;
		}
	}
}

//Validation on CVV - Must be 3 digits
function isValidCVV() {
	if ($('#payment option:selected').val() === "credit-card") {
		let validate = /^\d{3}$/.test($('#cvv').val());
		if (validate === false) {
			$('#cvv').prev().css("color", "red");
			$('#cvv').prev().text("CVV: 3 digits").show();
			return false;
		} else {
			$('#cvv').prev().text("CVV:");
			$('#cvv').prev().css("color", "black");
			return true;
		}
	}
}