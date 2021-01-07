
//Initialize firebase
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDbDvLF6L4aasVHqJ08nQjZE2nLwhLnky0",
    authDomain: "testdatabase-88973.firebaseapp.com",
    projectId: "testdatabase-88973",
    storageBucket: "testdatabase-88973.appspot.com",
    messagingSenderId: "487299273875",
    appId: "1:487299273875:web:ebe9e0276cb065db3da966",
    measurementId: "G-TP6ZTNNSDJ"
  };
  // Initialize Firebase
	firebase.initializeApp(firebaseConfig);
  firebase.analytics();


//download file
document.getElementById("cvdl").addEventListener("click", function(){
	// Create a reference with an initial file path and name
		var storage = firebase.storage();
		var pathReference = storage.ref('images/stars.jpg');

// Create a reference from a Google Cloud Storage URI
		var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg')

// Create a reference from an HTTPS URL
// Note that in the URL, characters are URL escaped!
	var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');


	// Create a reference with an initial file path and name
	//var storage = require('@google-cloud/storage');
	var storage = firebase.storage();
	var pathReference = storage.ref('CareerHub_Resume_basic.rtf');
	//var pathReference = firebase.storage().ref('CareerHub_Resume_basic.rtf');
	storageRef.child('CareerHub_Resume_basic.rtf').getDownloadURL().then(function(url) {
	// `url` is the download URL for target file

	  // This can be downloaded directly:
	  var xhr = new XMLHttpRequest();
	  xhr.responseType = 'blob';
	  xhr.onload = function(event) {
	    var blob = xhr.response;
	  };
	  xhr.open('GET', url);
	  xhr.send();

	  // // Or inserted into an <img> element:
	   var file = document.getElementById('cv');
	   file.src = url;
	}).catch(function(error) {
		// A full list of error codes is available at
	  // https://firebase.google.com/docs/storage/web/handle-errors
	  switch (error.code) {
	    case 'storage/object-not-found':
	      console.log("No object exists at the desired reference.");
	      break;

	    case 'storage/unauthorized':
	      console.log("User is not authorized to perform the desired action, check your security rules to ensure they are correct.");
	      break;

	    case 'storage/canceled':
	      console.log("User canceled the operation.");
	      break;

	    case 'storage/unknown':
	      console.log("An unknown error occurred.");
	      break;
	  }
	});
})





//message collection
var messagesRef = firebase.database().ref('messages');

//Listen for contact form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);
//submit form
function submitForm(e){
	e.preventDefault();
	//get values
	var name = getInputVal('name');
	var email = getInputVal('email');
	var subject = getInputVal('subject');
	var message = getInputVal('message');
	//save message
	saveMessage(name, email, subject, message);
	//show alert
	document.querySelector('.alert').style.display = 'block';
	//Hide alert after 3 seconds
	setTimeout(function(){
			document.querySelector('.alert').style.display = 'none';
	},3000)
	//clear up contactForm
	document.getElementById('contactForm').reset();
}

//function to get form values
function getInputVal(id){
	return document.getElementById(id).value;
}

//save the messages to firebase
function saveMessage(name, email, subject, message){
	var newMessageRef = messagesRef.push();
	newMessageRef.set({
		name: name,
		email: email,
		subject: subject,
		message: message
	});
}

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			wide:      ( '1281px',  '1680px' ),
			normal:    ( '981px',   '1280px' ),
			narrow:    ( '737px',   '980px'  ),
			narrower:  ( '737px',   '840px'  ),
			mobile:    ( '481px',   '736px'  ),
			mobilep:   ( null,      '480px'  )
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right'
		});

	// NavPanel.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Header.
		if (!browser.mobile
		&&	$header.hasClass('alt')
		&&	$banner.length > 0) {

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt reveal'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			});

		}

})(jQuery);
