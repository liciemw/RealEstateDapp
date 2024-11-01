// SPDX-License-Identifier: MIT
pragma solidity ^0.4.18;

contract Migrations {
    address public owner = msg.sender;
    uint public last_completed_migration;

    modifier restricted() {
        require(msg.sender == owner);
        _; // Continue execution
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }
}

