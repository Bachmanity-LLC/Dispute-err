pragma solidity ^0.4.22;

contract Dispute{
    
    uint public total_weight;
    event disagreement(uint id);
    
    struct Agreement {
        address client;
        address service_provider;
        bool accepted;
        string name;
        bool status;
        bool disagreement;
        bool claimed;
        uint claimed_time;
        uint max_time;
        uint weight_for;
        uint weight_against;
        uint value;
    }
    
    Agreement[] public all_agreement;
    uint[] current_disputes;
    mapping (address => uint[]) address_to_agreement;
    mapping (address => uint[]) address_from_agreement;
    mapping (address => uint) address_to_weight;

    constructor() public {
        total_weight = 0;   
    }

    function add_agreement(address _service_provider,string memory _name,uint _max_time,uint _value) public{
        uint claimed_time = now;
        Agreement memory agreement = Agreement(msg.sender,_service_provider,false,_name,true,false,false,claimed_time,_max_time,0,0,_value);
        all_agreement.push(agreement);
        uint id = all_agreement.length;
        address_to_agreement[msg.sender].push(id);
        address_from_agreement[_service_provider].push(id);
    }
    
    function accept_agreement(uint _id) public{
        all_agreement[_id].accepted=true;
    }
    
    function claim_completition(uint _id) public{
        all_agreement[_id].claimed=true;
        all_agreement[_id].claimed_time=now;
    }
    
    function go_for_disagreement(uint _id) public{
        if(msg.sender==all_agreement[_id].client){
            all_agreement[_id].disagreement=true;
            emit disagreement(_id);
        }
        if(msg.sender==all_agreement[_id].service_provider){
            if(all_agreement[_id].claimed==true){
                if(all_agreement[_id].claimed_time+all_agreement[_id].max_time<now){
                    all_agreement[_id].disagreement=true;
                    emit disagreement(_id);
                }
            }
        }
        
    }
    
    
    
    
    
}