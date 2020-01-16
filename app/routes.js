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
	if(req.session.data['do-you-want-good-standing-information'] == "yes" || req.session.data['do-you-want-good-standing-information'] == "no"){
		res.redirect('collection')
	}
	else
	{
		errors.push({text: "Select yes if you want Good Standing information on the certificate", href: "#do-you-want-good-standing-information-error"});
		res.render('good-standing', {
        	error: true,
        	errorList: errors
      	})
		
	}
    
})


module.exports = router
