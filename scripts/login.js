'use strict';

// Handles Login
function FirebaseManager() {
	this.checkSetup();
	this.signInButton = document.getElementById('sign-in');
	this.signOutButton = document.getElementById('sign-out');
	
	this.userPic = document.getElementById('user-pic');
	this.userName = document.getElementById('user-name');
	
	this.signOutButton.addEventListener('click', this.signOut.bind(this));
	this.signInButton.addEventListener('click', this.signIn.bind(this));
	
	this.initFirebase();
} 

// Sets up shortcuts to Firebase features and initiate firebase auth.
FirebaseManager.prototype.initFirebase = function() {
	// Shortcuts to Firebase SDK features.
	this.auth = firebase.auth();
	this.database = firebase.database();
	this.storage = firebase.storage();
	// Initiates Firebase auth and listen to auth state changes.
	this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Signs-in Friendly Chat.
FirebaseManager.prototype.signIn = function() {
	// Sign in Firebase using popup auth and Google as the identity provider.
	var provider = new firebase.auth.GoogleAuthProvider();
	this.auth.signInWithPopup(provider);
};

// Signs-out of Friendly Chat.
FirebaseManager.prototype.signOut = function() {
	// Sign out of Firebase.
	this.auth.signOut();
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
FirebaseManager.prototype.onAuthStateChanged = function(user) {
	if (user) { // User is signed in!
		// Get profile pic and user's name from the Firebase user object.
		var profilePicUrl = user.photoURL;
		var userName = user.displayName;
		
		// Set the user's profile pic and name.
		this.userPic.style.backgroundImage = 'url(' + (profilePicUrl || '/images/profile_placeholder.png') + ')';
		this.userName.textContent = userName;
		
		// Show user's profile and sign-out button.
		this.userName.removeAttribute('hidden');
		this.userPic.removeAttribute('hidden');
		this.signOutButton.removeAttribute('hidden');
		// Hide sign-in button.
		this.signInButton.setAttribute('hidden', 'true');
		
		var pathname = window.location.pathname;
		switch(pathname) {
			case "/" :
				window.location = "/home.html";
				break;
			default:
				break;
		}
	} else { // User is signed out!
		// Hide user's profile and sign-out button.
		this.userName.setAttribute('hidden', 'true');
		this.userPic.setAttribute('hidden', 'true');
		this.signOutButton.setAttribute('hidden', 'true');
		
		// Show sign-in button.
		this.signInButton.removeAttribute('hidden');
		
		var pathname = window.location.pathname;
		switch(pathname) {
			case "/" :
				break;
			default:
				window.location = "/";
				break;
		}
		
	}
};

// Checks that the Firebase SDK has been correctly setup and configured.
FirebaseManager.prototype.checkSetup = function() {
	if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
		window.alert('You have disabled the Firebase SDK.');
		} else if (config.storageBucket === '') {
		window.alert('Firebase Storage bucket has not been enabled.');
	}
};