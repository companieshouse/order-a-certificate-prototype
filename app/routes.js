const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.get('/', function (req, res) {
    res.render('start')
  })
  router.get('/start', function (req, res) {
    res.render('start')
  });

router.post('/CHS-signin', function(req, res) {

    var errors = [];
    var emailHasError = false;
    var passwordHasError = false;
	
	if(req.session.data['email'] == ""){
		emailHasError = true;
		errors.push({text: "Enter your email address", href: "#email-error"});
	}
	
	if(req.session.data['password'] == ""){
        passwordHasError = true;
        errors.push({text: "Enter your password", href: "#password-error"});
	}

	if(emailHasError || passwordHasError){
		res.render('CHS-signin', {
        	errorEmail: emailHasError,
        	errorPassword: passwordHasError,
        	errorList: errors
      	})
	}
	else
	{
		res.redirect('order-details')
	}
})

router.post('/good-standing', function(req, res) {
	var errors = [];
	if(typeof req.session.data['do-you-want-good-standing-information'] == 'undefined'){
		errors.push({text: "Select yes if you want good standing information on the certificate", href: "#do-you-want-good-standing-information-error"});
		res.render('good-standing', {
        	error: true,
        	errorList: errors
      	})
	}
	else
	{
		res.redirect('delivery-type')
	}
})

router.post('/collection', function(req, res) {
	var errors = [];
	if(typeof req.session.data['which-collection-office'] == 'undefined'){
		errors.push({text: "Select the Companies House office you want to collect your certificate from", href: "#which-collection-office-error"});
		res.render('collection', {
        	error: true,
        	errorList: errors
      	})
	}
	else
	{
		res.redirect('check-details')	
	}
})

router.post('/order-details', function(req, res) {

	var errors = [];
    var firstNameHasError = false;
    var lastNameHasError = false;
	
	if(req.session.data['first-name'] == ""){
		firstNameHasError = true;
		errors.push({text: "Enter your first name", href: "#first-name-error"});
	}
	
	if(req.session.data['last-name'] == ""){
        lastNameHasError = true;
        errors.push({text: "Enter your last name", href: "#last-name-error"});
	}

	if(firstNameHasError || lastNameHasError){
		res.render('order-details', {
        	errorFirstName: firstNameHasError,
        	errorLastName: lastNameHasError,
        	errorList: errors
      	})
	}
	else
	{
		res.redirect('good-standing')
	}
})

router.post('/telephone-number', function(req, res) {
    var errors = [];
	if(req.session.data['telephone-number'] == ""){
		errors.push({text: "Enter a UK telephone number", href: "#telephone-number-error"});
		res.render('telephone-number', {
        	errorTelephoneNumber: true,
        	errorList: errors
      	})
	}
	else
	{
		res.redirect('reference')
	}
})

router.post('/delivery-type', function(req, res) {
	var errors = [];
	if(typeof req.session.data['delivery-type'] == 'undefined'){
		errors.push({text: "Select .....", href: "#delivery-type-error"});
		res.render('delivery-type', {
        	error: true,
        	errorList: errors
      	})
	}
	else
	{
		if(req.session.data['delivery-type'] == "collection"){

			res.redirect('name-and-address')
		}
		else
		{
			res.redirect('collection')
		}
	}
})


module.exports = router
