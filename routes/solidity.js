var express = require('express');
var router = express.Router();
var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


var client = "0x117c9059f14d913f154308bcd466696956ed1135";
var service_provider = "0x21472396575c571325283e78b1cdfcef8e72beef";
var arbitrater_one = "0xbd1e0ee3728f076e4e7b2894ccbd173e112bfd37";
var arbitrator_two = "0x4813dbf8fe96bd81d7e97e646d37fe3536e6be3d";

var disputeContract = new web3.eth.Contract(
    [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "accept_agreement",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_service_provider",
                    "type": "address"
                },
                {
                    "name": "_name",
                    "type": "string"
                },
                {
                    "name": "_max_time",
                    "type": "uint256"
                }
            ],
            "name": "add_agreement",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "name": "_for",
                    "type": "bool"
                }
            ],
            "name": "arbitration",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "check_max",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "claim_completition",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "create_dispute",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "get_next_dispute",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "go_for_disagreement",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "payout",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "address_to_weight",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "all_agreement",
            "outputs": [
                {
                    "name": "client",
                    "type": "address"
                },
                {
                    "name": "service_provider",
                    "type": "address"
                },
                {
                    "name": "accepted",
                    "type": "bool"
                },
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "status",
                    "type": "bool"
                },
                {
                    "name": "disagreement",
                    "type": "bool"
                },
                {
                    "name": "claimed",
                    "type": "bool"
                },
                {
                    "name": "claimed_time",
                    "type": "uint256"
                },
                {
                    "name": "max_time",
                    "type": "uint256"
                },
                {
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "current_disputes",
            "outputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "name": "open",
                    "type": "bool"
                },
                {
                    "name": "weight_for",
                    "type": "uint256"
                },
                {
                    "name": "weight_against",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "get_agreement",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "result_out",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "return_id",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "test",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "total_weight",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]    
);

disputeContract.options.address = "0x9ff60280df07616dea69d4c276c8ac74c46fdda0";


router.post('/addAgreement', function(req, res, next) {
    console.log(web3.eth.accounts);
    var address = req.body.address;
    var name = req.body.name;
    var time = parseInt(req.body.time);
    var value = parseInt(req.body.value);

    // ADD AGREEMENT -
    disputeContract.methods.add_agreement(address, name, time).send({from:client, gas: 4700000,value:value})
    .then((e) => {    
        disputeContract.methods.return_id().call({from:client, gas: 4700000})
        .then((e) => {
            e-=1;
            res.render("pageCreated",{data:e});
        })
        .catch((e) => {
            console.log(e);
        })
    })
    .catch((e) => {
        console.log("XXXXXXXXXXXXXXX");
        console.log(e);
    })

  });

router.post('/getAgreement', function(req, res, next){

    var id = parseInt(req.body.ident);
    disputeContract.methods.get_agreement(id).call({from:client, gas: 4700000})
    .then((e) => {
        console.log(e);
        res.render("result",{id:id,data:e});
    })
    .catch((e) => {
        console.log(e);
    })

})

router.get('/getmyAgreement', function(req, res, next){
    disputeContract.methods.get_agreement(0).call({from:client, gas: 4700000})
    .then((e) => {
        console.log(e);
        res.render("result",{id:id,data:e});
    })
    .catch((e) => {
        console.log(e);
    })

})

// web3.eth.getCoinbase((err,account)=>{
// });

// disputeContract.methods.add_agreement("0xf5c49b11334A022b076a800fbb55B04De1fA421B","testing",3000, 100).send({from: "0xa43b3b1fc3820cf5802ddbfff0246d324dd659d9"})
// .then(function(reciept){
//   console.log(reciept);

// ACCEPT AGREEMENT -
router.get("/acceptAgreement/:id", function(req,res,next){
    var id = parseInt(req.params.id);

    disputeContract.methods.accept_agreement(id).send({from:service_provider, gas: 4700000})
    .then((e)=>{
      console.log(e);
      res.redirect("/dashboard");
    })
    .catch((e)=>{
      console.log(e);
    })
})

// CLAIM COMPLETION
router.get("/claimCompletion/:id", function(req, res, next){
    var id = parseInt(req.params.id);
    
    disputeContract.methods.claim_completition(id).send({from:service_provider, gas: 4700000})
    .then((e)=>{
      console.log(e);
      res.redirect("/dashboard");
    })
    .catch((e)=>{
      console.log(e);
    })  
})


// GO FOR DISAGREEMENT
router.get("/disagreement/:id", function(req,res,next){
    var id = parseInt(req.params.id);
    disputeContract.methods.go_for_disagreement(id).send({from:client, gas: 4700000})
    .then((e)=>{
      console.log(e);
      res.redirect("/dashboard");
    })
    .catch((e)=>{
      console.log(e);
    })
})

// PAYOUT
router.get("/payout/:id", function(req,res,next){
    var id = parseInt(req.params.id);

    disputeContract.methods.payout(id).send({from:client, gas: 4700000})
    .then((e)=>{
      console.log(e);
      res.redirect("/dashboard");
    })
    .catch((e)=>{
      console.log(e);
    })    
})


router.get("/vote/:id/:pos", function(req, res, next){
    var id = parseInt(req.params.id);
    var decision;

    if (req.params.pos == "0"){
        decision = false;
    }else{
        decision = true;
    }

    console.log(id);
    console.log(decision);

    // disputeContract.methods.arbitration(id,decision).send({from:arbitrater_one, gas: 4700000})
    // .then((e)=>{
    //   console.log(e); 
    // })
    // .catch((e)=>{
    //   console.log(e);
    // })
    res.redirect("/solidity/result/"+id);
})

router.get('/arbitration', function(req, res, next){
    console.log("Aribter");
    disputeContract.methods.get_next_dispute().call({from:arbitrater_one, gas: 4700000})
    .then((e)=>{
      console.log(e);
      res.render("arbitration",{id:e});
    })
    .catch((e)=>{
      console.log(e);
    })
})

router.get('/result/:id', function(req, res, next){
    //console.log("Aribter");
    var id = parseInt(req.params.id);
    console.log("+++++++++++",id);
    disputeContract.methods.result_out(id).call({from:arbitrater_one, gas: 4700000})
    .then((e)=>{
      console.log(e);
      if(e==0)
      res.render("arbitrated",{id:'decision in progress'});
      else if(e==1)
      res.render("arbitrated",{id:'Jury declares client as winner'});
      else
      res.render("arbitrated",{id:'Jury declares service-provider as winner'});
    })
    .catch((e)=>{
      console.log(e);
    })
})



module.exports = router;