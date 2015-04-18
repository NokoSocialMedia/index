var dev = true;

var userName, firstName, lastName, password, email, birthDay, male;
var errorBox;
function submitData(){
	errorBox = document.getElementById("errorDialog");
	var dataTypes = ["Username", "First Name", "Last Name", "Password", "Confirm Password", "Email", "Birthday", "Gender"];
	var formValues = document.getElementById("newUser").elements;
	var formLength = getFormLength(formValues);
	if(formLength < 8 && formLength > 0){
		showError(dataTypes[formLength]);
	}
	else if(formLength === 0){
		showError("No Data");
	}
	else if(formValues['pwd'].value !== formValues['confirmpwd'].value){
		showError("Password Not Same");
	}
	else{
		hideErrorBox();
		setData(
			formValues['Username'].value, formValues['firstname'].value,
			formValues['lastname'].value, formValues['pwd'].value,
			formValues['email'].value, formValues['bday'].value,
			formValues['male'].checked
		);
		document.getElementById("newUser").submit();
	}
}
function getFormLength(formElementsArray){
	var elements = formElementsArray;
	var length = 0;
	for (var i = 0, element; element = elements[i++];) {
		if(element.value === "" && element.type === "text"){
			continue;
		}
		else if(element.value === "" && element.type === "password"){
			continue;
		}
		else if(element.value === "" && element.type === "email"){
			continue;
		}
		else if(element.value === "" && element.type === "month"){
			continue;
		}
		else if(element.type === "radio" && element.checked === false){
			continue;
		}
		else if(element.type === "button"){
			continue;
		}
		else{
			length++;
		}
	}
	return length;
}
function setData(user, f, l, p, e, b, m){
	userName = user;
	firstName = f;
	lastName = l;
	password = p;
	email = e;
	birthDay = b;
	male = m;
}
function showError(error){
	errorBox = document.getElementById("errorDialog");
	errorBox.style.visibility = "visible";
	switch(error){
		case "No Data":
			errorBox.innerHTML = "Please enter data into this form!";
			break;
		case "Password Not Same":
			errorBox.innerHTML = "Passwords do not match."
			break;
		default:
			errorBox.innerHTML = "Please enter a " + error;
			break;
	}
}
function hideErrorBox(){
	errorBox = document.getElementById("errorDialog");
	errorBox.style.visibility = "hidden";
}