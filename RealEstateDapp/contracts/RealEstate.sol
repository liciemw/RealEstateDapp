// SPDX-License-Identifier: MIT
pragma solidity ^0.4.18;

import "./SafeMath.sol";

contract RealEstate {
    using SafeMath for uint256;

    struct Property {
        uint256 price;
        address owner;
        bool forSale;
        string name;
        string description;
        string location;
        string propertyType;
        uint256 size;
        uint256 dateListed;
        uint256 taxDue;
    }

    mapping(uint => Property) public properties;
    uint[] public propertyIds;

    event PropertyListed(uint propertyId, uint256 price, string name, string location);
    event PropertySold(uint propertyId, address newOwner);

    function listPropertyForSale(
        uint _propertyId,
        uint _price,
        string _name,
        string _description,
        string _location,
        string _propertyType,
        uint256 _size,
        uint256 _taxDue
    ) public {
        Property memory newProperty = Property({
            price: _price,
            owner: msg.sender,
            forSale: true,
            name: _name,
            description: _description,
            location: _location,
            propertyType: _propertyType,
            size: _size,
            dateListed: now,
            taxDue: _taxDue
        });

        properties[_propertyId] = newProperty;
        propertyIds.push(_propertyId);

        PropertyListed(_propertyId, _price, _name, _location);
    }

    function buyProperty(uint _propertyId) public payable {
        Property storage property = properties[_propertyId];

        require(property.forSale); // The property is not for sale
        require(property.price <= msg.value); // Insufficient funds

        address previousOwner = property.owner;
        property.owner = msg.sender;
        property.forSale = false;

        previousOwner.transfer(property.price);

        PropertySold(_propertyId, msg.sender);
    }

    function updateTaxDue(uint _propertyId, uint256 _newTaxDue) public {
        require(properties[_propertyId].owner == msg.sender);
        properties[_propertyId].taxDue = _newTaxDue;
    }

    function toggleSaleStatus(uint _propertyId, uint256 _newPrice) public {
        require(properties[_propertyId].owner == msg.sender); // Only the owner can toggle sale status
        properties[_propertyId].forSale = !properties[_propertyId].forSale;
        if (properties[_propertyId].forSale) {
            properties[_propertyId].price = _newPrice;
        }
    }

    // New method to get the count of properties
    function getPropertyCount() public view returns (uint) {
        return propertyIds.length;
    }
}
