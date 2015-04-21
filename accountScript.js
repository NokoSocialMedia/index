var Account = {
	loggedIn: function(){
		return this.getStorageItem("LoggedIn");
	},
	setLoggedIn: function(bool){
		this.setStorageItem("LoggedIn", bool);
	},
	accountBox: document.getElementById("accountBox"),
	loadPageComponents: function(){
		if(this.loggedIn){
			accountBox.style.visibility = "visible";
			accountBox.innerHTML = "Signed in as " + this.getStorageItem("UserName") + "\u2304";
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
	}
}
