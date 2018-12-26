pragma solidity ^0.4.22;

contract Dispute{
    
    uint total_weight;
    uint uid;
    uint test;
    
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
        uint value;
    }
    
    struct disputed {
        uint _id;
        bool open;
        uint weight_for;
        uint weight_against;
        address[] list_for;
        address[] list_against;
    }
    
    Agreement[] all_agreement;
    disputed[] current_disputes;
    mapping (address => uint) address_to_weight;
    mapping (address => uint) address_to_solved;

    function add_agreement(address _service_provider,string memory _name,uint _max_time) public payable returns(uint){
        uint claimed_time = now;
        Agreement memory agreement = Agreement(msg.sender,_service_provider,false,_name,true,false,false,claimed_time,_max_time,msg.value);
        all_agreement.push(agreement);
        return all_agreement.length;
    }
    
    function accept_agreement(uint _id) public onlyServer(_id){
        all_agreement[_id].accepted = true;
    }
    
    function claim_completition(uint _id) public onlyServer(_id){
        all_agreement[_id].claimed = true;
        all_agreement[_id].claimed_time = now;
    }
    
    function create_dispute(uint _id) private {
        disputed memory dispute = disputed(_id,true,0,0,new address[](0),new address[](0));
        current_disputes.push(dispute);
    }
    
    function go_for_disagreement(uint _id) public {
        if(msg.sender==all_agreement[_id].client){
            all_agreement[_id].disagreement = true;
            create_dispute(_id);
        }
        if(msg.sender==all_agreement[_id].service_provider){
            if(all_agreement[_id].claimed==true){
                if(all_agreement[_id].claimed_time+all_agreement[_id].max_time<now){
                    all_agreement[_id].disagreement = true;
                    create_dispute(_id);
                }
            }
        }
        
    }
    
    function payout(uint _id) public onlyCLient(_id){
        uint value = all_agreement[_id].value;
        address reciever = all_agreement[_id].service_provider;
        reciever.transfer(value);
        all_agreement[_id].status = false;
    }
    
    function check_max(uint _id) private {
        uid = current_disputes[_id]._id;
        uint amount = all_agreement[uid].value;
        uint sum = 0;
        if(current_disputes[_id].weight_for*2 > total_weight)
        {
            address[] memory addresses = current_disputes[_id].list_against;
            uint len = addresses.length;
            for(uint i = 0;i<len;i++)
            {
                uint weight = address_to_weight[addresses[i]];
                address_to_weight[addresses[i]] += 25;
                uint incentive = uint(amount*weight/(20*total_weight));
                addresses[i].transfer(incentive);
                sum += incentive;
                weight += 25;
                total_weight += 25;
            }
            amount -= sum;
            all_agreement[uid].client.transfer(amount);
            all_agreement[uid].status = false;
            current_disputes[_id].open = false;
        }
        if(current_disputes[_id].weight_against*2 > total_weight)
        {
            address[] memory addressess = current_disputes[_id].list_against;
            uint lens = addressess.length;
            for(uint j = 0;j < lens;j++)
            {
                uint weigt = address_to_weight[addressess[j]];
                address_to_weight[addressess[j]] += 25;
                uint incentives = uint(amount*weigt/(20*total_weight));
                addressess[j].transfer(incentives);
                sum += incentives;
                weigt += 25;
                total_weight += 25;
            }
            amount -= sum;
            all_agreement[uid].service_provider.transfer(amount);
            all_agreement[uid].status = false;
            current_disputes[_id].open = false;
        }
    }
    
    function arbitration(uint _id,uint _for) public{
        address arbitrator = msg.sender;
        if(address_to_weight[arbitrator]==0){
            address_to_weight[arbitrator] = 100;
            total_weight += 100;
        }
        if(_for == 1)
        {
            current_disputes[_id].weight_for += address_to_weight[arbitrator];
            current_disputes[_id].list_for.push(arbitrator);
        }
        else
        {
            current_disputes[_id].weight_against += address_to_weight[arbitrator];
            current_disputes[_id].list_against.push(arbitrator);
        }
        address_to_solved[arbitrator] = _id+1;
        check_max(_id);
    }
    
    function get_next_dispute() public returns(uint){
        address arbitrator = msg.sender;
        test = address_to_solved[arbitrator];
        for (uint i = test; i<current_disputes.length; i++) {
            if(current_disputes[i].open==false)
                continue;
            else
            {
                address_to_solved[arbitrator] = i;
                return i;
            }
        }
    }
    
    
    function get_agreement(uint _id) public view returns(string memory,uint,uint,uint, uint){
        uint state = 0;
        uint typeOwner = 0;
        if(all_agreement[_id].status == false){
            state = 4;
        }
        else if(all_agreement[_id].disagreement == true){
            state = 3;
        }else if (all_agreement[_id].claimed == true){
            state = 2;        
        }else if (all_agreement[_id].accepted == true){
            state = 1;
        }
        
        if(msg.sender == all_agreement[_id].client){
            typeOwner = 1;
        }else if (msg.sender == all_agreement[_id].service_provider){
            typeOwner = 2;
        }
        return (all_agreement[_id].name, all_agreement[_id].max_time, all_agreement[_id].value, state, typeOwner);
    }
    
    modifier onlyCLient(uint _id){
        require(msg.sender == all_agreement[_id].client);
        _;
    }
    
    function result_out(uint _id) external view returns(uint){
        if(current_disputes[_id].open == true)
        {
            return 0;
        }
        else
        {
            if(current_disputes[_id].weight_for>current_disputes[_id].weight_against){
                return 1;
            }
            else
            return 2;
        }
    }
    
    modifier onlyServer(uint _id){
        require(msg.sender == all_agreement[_id].service_provider);
        _;
    }
}