var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/dashboard', function(req,res,next){
  console.log("DASSSS");
  res.render('dashboard');
});

router.get('/arbitration', function(req, res, next){
  console.log("Aribter");
  disputeContract.methods.get_next_dispute().call({from:"0x2d67d7768858937d64e95b28b68abfcc03674f4d", gas: 4700000})
  .then((e)=>{
    console.log(e);
    //res.render("arbitration",{id:e});
  })
  .catch((e)=>{
    console.log(e);
  })
})


module.exports = router;
