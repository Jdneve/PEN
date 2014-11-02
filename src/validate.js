
/**
* auxiliary
*
* */

function display(elementId, msg) {
	document.getElementById(elementId).innerHTML = msg;
}

function makeEmpty(elementId) {
	document.getElementById(elementId).value = "";
}

function userException(name, message) {
	this.name = name;
	this.message = message
	this.toString = function () {
		return this.name + " : " + this.message;
	}
}

/**
* Sign Up 
*
**/

var signUp = {
	firstName: null,
	secondName: null,
	email: null,
	password: null,
	confirm: null,
	birthday: null
};


/**
* validate(object,regex,ID(string),string) -> bool
*
*
**/

function validate(elm, reg, errorId, error) {
	text = elm.value;
	if(!text.match(reg)) {
		display(errorId, error);
		return false;
	}
	return true;
}

/**
* Validate Name
*
**/
function validateName(elm, errorId) {
	reg = /^[a-z ]+$/i;
	return validate(elm, reg, errorId, "No numbers allowed");
}

function validateFirstName(elm, errorId) {
	if(validateName(elm,errorId)) {
		signUp.firstName = elm.value;
	} else {
		signUp.firstName = null;
	}
}

function validateSecondName(elm, errorId) {
	if(validateName(elm, errorId)) {
		signUp.secondName = elm.value;
	} else {
		signUp.secondName = null;
	}	
}

/**
* validate email
*
**/ 

function validateEmail(elm, errorId) {
	reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(validate(elm, reg, errorId, "Not a valid email")) {
		signUp.email = elm.value;
	}
}

/**
* Validate and confirm Password
*
**/

function validatePassword(elm, errorId) {
	reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
	if(validate(elm, reg, errorId, "Must contain [a-z],[A-Z],[1-9]")) {
		signUp.password = elm.value;
	}
}	


function confirmPassword(elm, errorId) {
	text = elm.value;
	if(signUp.password != text) {
		display(errorId, "Not equal!");
	} else { 
		signUp.confirm = text;
	}	
}

/**
* Validate birthday
*
**/

function validateBirthDay(elm, errorId) {
	signUp.birthday = elm.value;
}

/**
* sign up!!
*
**/

function trySignUp(errorId) {
	try {
		s = "";
		for(var prop in signUp) {
			if(! signUp.hasOwnProperty(prop)) {
				continue;
			}
		//	if(! signUp[prop]) {
		//		throw  userException("SignUpError", "Please fill in required fields");
		//	}	
			s += signUp[prop];
		}
		//send to server blabla
		alert("Check email and confirm account " + s); //alert gevalideerde antwoorden, nog een bug met die throw
	} catch(e) {									   
		display(errorId, e.toString());
	}
}

function initialize() {
	setupInput = function (id, errorId, fun) {
		elm = document.getElementById(id);
		elm.addEventListener("change", function () { fun(this, errorId);} );
		elm.addEventListener("click", function () { makeEmpty(id); display(errorId, "");} );
	}
	setupButton = function (id, errorId, fun) {
		elm = document.getElementById(id);
		elm.addEventListener("click", function() { fun(errorId); } );
	}
	//Add callbacks
	setupInput("fssignup", "errorfs", validateFirstName);
	setupInput("scsignup", "errorsc", validateSecondName);
	setupInput("emsignup", "errorem", validateEmail);
	setupInput("pssignup", "errorps", validatePassword);
	setupInput("p2signup", "errorp2", confirmPassword);
	setupInput("bdsignup", "errorbd", validateBirthDay);

	setupButton("susignup", "errorsu", trySignUp);
}

window.onload = function () { initialize(); }
