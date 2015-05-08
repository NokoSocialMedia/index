const dev = true;
const usingLog = true;
var errorBox;

function submitData(){
	errorBox = document.getElementById("errorDialog");
	var dataTypes = ["Username", "First Name", "Last Name", "Password", "Confirm Password", "Email", "Birthday", "Gender"];
	var formValues = document.getElementById("newUser").elements;
	var formLength = getFormLength(formValues);
	if(formLength < 8 && formLength > 0){
	    if(formValues['Username'].value === ''){
             showError(dataTypes[0]);
        }    
        else if(formValues['firstname'].value === ''){
             showError(dataTypes[1]);
        }
        else if(formValues['lastname'].value === ''){
             showError(dataTypes[2]);
        }
        else if(formValues['pwd'].value === ''){
             showError(dataTypes[3]);
        }
        else if(formValues['confirmpwd'].value === ''){
             showError(dataTypes[4]);
        }
        else if(formValues['email'].value === ''){
             showError(dataTypes[5]);
        }
        else if(formValues['bday'].value === ''){
             showError(dataTypes[6]);
        }
        else if(formValues['male'].checked === false && formValues['female'].checked === false){
             showError(dataTypes[7]);
        }
	}
	else if(formLength === 0){
		showError("No Data");
	}
	else if(formValues['pwd'].value !== formValues['confirmpwd'].value){
		showError("Password Not Same");
	}
	else if(!checkValidPwd(formValues['pwd'].value)){
		showError("Weak Password");
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
		location.reload();
	}
}

function checkValidPwd(password){
	if(password.length < 6){
		return false;
	}
	else if(password.toLowerCase() === password){
		return false;
	}
	else{
		return true;
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

function setData(user, f, l, p, e, b, m, p){
	if(dev && usingLog){
		Account.setLoggedIn(true);
		Account.setStorageItem("UserName", user);
		Account.setStorageItem("Name", f + " " + l);
		Account.setStorageItem("Email", e);
		Account.setStorageItem("Birthday", b);
		if(Account.getStorageItem("PasswordList") === null || Account.getStorageItem("PasswordList") === undefined){
			Account.setStorageItem("PasswordList", []);
		}
		var passwordList = Account.getStorageItem("PasswordList");
		passwordList[passwordList.length] = CryptoJS.DES.encrypt(p, "Temporary123");
		passwordList[passwordList.length] = CryptoJS.DES.encrypt(user, "Temporary123"); 		
		Account.setStorageItem("PasswordList", passwordList);
		var gender;
		if(m){
			gender = "Male";
		}
		else{
			gender = "Female";
		}
		Account.setStorageItem("Gender", gender);
		alert(
			"UserName: " + Account.getStorageItem("UserName") + "\n" +
			"Name: " + Account.getStorageItem("Name") + "\n" +
			"Email: " + Account.getStorageItem("Email") + "\n" +
			"Birthday: " + Account.getStorageItem("Birthday") + "\n" +
			"Gender: " + Account.getStorageItem("Gender")
		);
	}
}
function showError(error){
	errorBox = document.getElementById("errorDialog");
	errorBox.style.visibility = "visible";
	switch(error){
		case "No Data":
			errorBox.innerHTML = "Please enter data into this form!";
			break;
		case "Password Not Same":
			errorBox.innerHTML = "Passwords do not match.";
			break;
		case "Weak Password":
			errorBox.innerHTML = "We recommend a password 6-20 characters long <br>with at least one upper-case letter.";
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