var Account = {
	boxVisible: false,
	loggedIn: function(){
		return this.getStorageItem("LoggedIn");
	},
	setLoggedIn: function(bool){
		this.setStorageItem("LoggedIn", bool);
	},
	accountBox: document.getElementById("accountBox"),
    loginTable: document.getElementById("logintable"),
	loadPageComponents: function(){
		if(this.loggedIn() === "true"){
            this.loginTable.style.visibility = "hidden";
			this.accountBox.style.visibility = "visible";
			this.accountBox.innerHTML = "Signed in as " + this.getStorageItem("UserName") + "\u2304";
		}
	},
	getStorageItem: function(item){
		return localStorage.getItem(item);
	},
	setStorageItem: function(name, item){
		localStorage.setItem(name, item);
	},
	eraseLocalData: function(){
		localStorage.removeItem("UserName");
		localStorage.removeItem("Name");
		localStorage.removeItem("Email");
		localStorage.removeItem("Birthday");
		localStorage.removeItem("Gender");
		localStorage.removeItem("LoggedIn");
		this.setLoggedIn(false);
	},
    signOut: function(){
        this.eraseLocalData();
        location.reload();
    },
	decryptedLocalData: function(data){
		return CryptoJS.DES.decrypt(localStorage.getItem(data), "Temporary123");
	}
}
function addListeners(){
	document.getElementById("accountBox").addEventListener("click", function(){
		if(!Account.boxVisible){
			Account.boxVisible = true;
			document.getElementById("accountDropDown").style.visibility = "visible";
		}
		else if(Account.boxVisible){
			Account.boxVisible = false;
			document.getElementById("accountDropDown").style.visibility = "hidden";
		}
	});
    document.getElementById("signOut").addEventListener("click", function(){
        Account.signOut();
    });
    
}