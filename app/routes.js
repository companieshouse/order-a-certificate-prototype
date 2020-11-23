const express = require('express')
const app = express()
const router = express.Router()


// Add your routes here - above the module.exports line

router.get('/', function (req, res) {
    res.render('start')
  })
  router.get('/start', function (req, res) {
    res.render('start')
  });

  router.post('/more-tab-active-company', function (req, res) {

  	app.set('compType', 'incorporation');
    res.redirect('order-a-certificate-incorporation')
  });

  router.post('/more-tab-dissolved-company', function (req, res) {

  	app.set('compType', 'dissolved');
    res.redirect('order-a-certificate-dissolved')
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
		if(app.settings.compType == 'incorporation')
		{
			res.redirect('certificate-details-incorporation')
		}
		else if(app.settings.compType == 'dissolved')
		{
			res.redirect('delivery-address-name')
		}
		
	}
})

router.post('/delivery-address-name', function(req, res) {

	var errors = [];
    var buildingStreetHasError = false;
    var townCityHasError = false;
    var postcodeHasError = false;
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

	if(req.session.data['address-line-1'] == ""){
		buildingStreetHasError = true;
		errors.push({text: "Enter a building and street", href: "#building-street-error"});
	}
	
	if(req.session.data['address-town'] == ""){
        townCityHasError = true;
        errors.push({text: "Enter a town or city", href: "#town-city-error"});
	}

	if(req.session.data['address-postcode'] == ""){
        postcodeHasError = true;
        errors.push({text: "Enter a postcode", href: "#postcode-error"});
	}

	if(buildingStreetHasError || townCityHasError || postcodeHasError){
		res.render('delivery-address-name', {
			errorFirstName: firstNameHasError,
        	errorLastName: lastNameHasError,
        	errorAddressLineOne: buildingStreetHasError,
        	errorTownCity: townCityHasError,
        	errorPostcode: postcodeHasError,
        	errorList: errors
      	})
	}
	else
	{
		

		if(app.settings.compType == 'incorporation')
		{
			res.redirect('check-details-incorporation')
		}
		else if(app.settings.compType == 'dissolved')
		{
			res.redirect('check-details-dissolved')
		}
		
	}
})

router.post('/certificate-details-incorporation', function(req, res) {

		res.redirect('registered-office-options')
})

router.post('/registered-office-options', function(req, res) {
	var errors = [];
	if(typeof req.session.data['registered-office-options'] == 'undefined'){
		errors.push({text: "Select which registered office information you need on the certificate", href: "#registered-office-options-error"});
		res.render('registered-office-options', {
        	error: true,
        	errorList: errors
      	})
	}
	else
	{
		res.redirect('director-options')
	}

})

router.post('/director-options', function(req, res) {

		res.redirect('secretary-options')
})


router.post('/secretary-options', function(req, res) {

		res.redirect('delivery-address-name')
})



router.post('/payment-review', function(req, res) {
	var errors = [];
	var backtopage =[];
	if(req.session.data['delivery-type'] == "collection"){

			backtopage = res.redirect('order-details-collection');
		}
		else
		{
			res.redirect('order-details-delivery')
		}
})

module.exports = router
