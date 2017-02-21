var Login = {
	divs: {
		landing: 'landingDIV',
		signin: 'signinDIV',
		register: 'registerDIV',
	},
	buttons: {
	    guest: 'guestButton',
	    login: 'loginButton',
	    loginBack: 'loginBackButton',
	    register: 'registerButton',
	    registerBack: 'registerBackButton',
	    registerLoginRedirect: 'registerLoginRedirectButton',
	},
	submits: {
		login: 'loginSubmit',
		register: 'registerSubmit',
	},
}

$( document ).ready(function() {
    $(function () {
  		$('[data-toggle="popover"]').popover({
  			container: 'body',
  			title: 'Why should you register?',
  			content: 'Registering gives you full access to the site, comments, forums, and much much more!', 
  			trigger: 'focus'
  		});
	})
});

$('#' + Login.buttons.login).click(function() {
	$('#' + Login.divs.landing).fadeOut();
	setTimeout( function() { $('#' + Login.divs.signin).fadeIn();}, 500);
});
$('#' + Login.buttons.loginBack).click(function() {
	$('#' + Login.divs.signin).fadeOut();
	setTimeout( function() { $('#' + Login.divs.landing).fadeIn();}, 500);
});
$('#' + Login.buttons.register).click(function() {
	$('#' + Login.divs.landing).fadeOut();
	setTimeout( function() { $('#' + Login.divs.register).fadeIn();}, 500);
});
$('#' + Login.buttons.registerBack).click(function() {
	$('#' + Login.divs.register).fadeOut();
	setTimeout( function() { $('#' + Login.divs.landing).fadeIn();}, 500);
});
$('#' + Login.buttons.registerLoginRedirect).click(function() {
	$('#' + Login.divs.register).fadeOut();
	setTimeout( function() { $('#' + Login.divs.signin).fadeIn();}, 500);
});
$('#' + Login.buttons.guest).click(function() {
	window.location = "HTML/Homepage.html?prop=guest"
});
$('#' + Login.buttons.signin).click(function() {
	window.location = "HTML/Homepage.html?prop=signin"
});