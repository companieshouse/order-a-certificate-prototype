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
		errors.push({text: "Email address is required", href: "#email-error"});
	}
	
	if(req.session.data['password'] == ""){
        passwordHasError = true;
        errors.push({text: "Password is required", href: "#password-error"});
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
		res.redirect('good-standing')
	}
})


router.post('/good-standing', function(req, res) {
	var errors = [];
	if(typeof req.session.data['do-you-want-good-standing-information'] == 'undefined'){
		errors.push({text: "Select yes if you want Good Standing information on the certificate", href: "#do-you-want-good-standing-information-error"});
		res.render('good-standing', {
        	error: true,
        	errorList: errors
      	})
	}
	else
	{
		res.redirect('collection')
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
		res.redirect('order-details')	
	}
})

router.post('/order-details', function(req, res) {

    var errors = [];
	if(req.session.data['full-name'] == ""){
		errors.push({text: "Full name is required", href: "#full-name-error"});
		res.render('order-details', {
        	errorName: true,
        	errorList: errors
      	})
	}
	else
	{
		res.redirect('telephone-number')
	}
})


module.exports = router
