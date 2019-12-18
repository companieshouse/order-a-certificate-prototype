const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.get('/', function (req, res) {
    res.render('start')
  })
  router.get('/start', function (req, res) {
    res.render('start')
  });

router.post('delivery-extra-copy', function(req, res) {

	if(req.session.data['addcopy'] == "Yes"){
		res.redirect('additional-copies')
	}
	else
	{
		res.redirect('delivery-time')
	}
    
})

module.exports = router
