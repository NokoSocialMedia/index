var dev = true;

window.onbeforeunload = function(){
	eraseLocalData();
}

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
	if(dev){
		userName = user;
		firstName = f;
		lastName = l;
		password = p;
		email = e;
		birthDay = b;
		male = m;
		localStorage.setItem("UserName", userName);
		localStorage.setItem("Name", firstName + " " + lastName);
		localStorage.setItem("Email", email);
		localStorage.setItem("Birthday", birthDay);
		var gender;
		if(male){
			gender = "Male";
		}
		else{
			gender = "Female";
		}
		localStorage.setItem("Gender", gender);
		
		alert(
			"UserName: " + localStorage.getItem("UserName") + "\n" +
			"Name: " + localStorage.getItem("Name") + "\n" +
			"Email: " + localStorage.getItem("Email") + "\n" +
			"Birthday: " + localStorage.getItem("Birthday") + "\n" +
			"Gender: " + localStorage.getItem("Gender")
		);
	}
}
function eraseLocalData(){
	localStorage.removeItem("UserName");
	localStorage.removeItem("Name");
	localStorage.removeItem("Email");
	localStorage.removeItem("Birthday");
	localStorage.removeItem("Gender");
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