pragma solidity ^0.5.0;

contract Sender {

    uint public amount = msg.value;

    function send(address payable _addr) payable public {
        _addr.transfer(msg.value);
    }
}