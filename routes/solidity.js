var express = require('express');
var router = express.Router();
var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


var client = "0xf3220af994666ca0192e4b041eb41cdb2d912a4d";
var service_provider = "0x6985811e7d28c9417693f2a73450b980838ffca7";
var arbitrater_one = "0x7e1b91892f2f24e2226b2330787352dca949cb62";
var arbitrater_two = "0xcdd447a2d10cb780f36f671dfb59b4cfb39164af";

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
            "name": "create_dispute",
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
                },
                {
                    "name": "_for",
                    "type": "uint256"
                }
            ],
            "name": "arbitration",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "address_to_solved",
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
            "name": "accept_agreement",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
            "name": "go_for_disagreement",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
            "constant": true,
            "inputs": [],
            "name": "uid",
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
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }
    ]
);

disputeContract.options.address = "0x5e41e77bfaecc336e0bfb2e9324d16cd1ab510e1";


router.post('/addAgreement', function(req, res, next) {
    //console.log(web3.eth.accounts[0]);
    var address = req.body.address;
    var name = req.body.name;
    var time = parseInt(req.body.time);
    var value = parseInt(req.body.value);
    console.log(address," ",name," ",time," ",value);
    // ADD AGREEMENT -
    disputeContract.methods.add_agreement(address, name, time).call({from:client, gas: 4700000,value:value})
    .then((e) => {
        e-=1;
        res.render("pageCreated",{data:e});
    })
    .catch((e) => {
        console.log("XXXXXXXXXXXXXXX");
        console.log(e);
    })

  });

router.post('/getAgreement', function(req, res, next){

    var id = parseInt(req.body.ident);
    disputeContract.methods.get_agreement(id).call({from:service_provider, gas: 4700000})
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
    var decision = parseInt(req.params.pos);

    console.log(id);
    console.log(decision);

    disputeContract.methods.arbitration(id,decision).send({from:arbitrater_two, gas: 4700000})
    .then((e)=>{
      console.log(e);
      console.log("#############");
      res.redirect("/solidity/result/"+id); 
    })
    .catch((e)=>{
      console.log(e);
    })
})

router.get('/arbitration', function(req, res, next){
    console.log("Aribter");
    disputeContract.methods.get_next_dispute().call({from:arbitrater_two, gas: 4700000})
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
    disputeContract.methods.result_out(id).call({from:arbitrater_two, gas: 4700000})
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