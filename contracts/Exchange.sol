// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Exchange {
  // Price in wei
  uint256 public price = 0.01 * 10**18;
  address payable public dev = msg.sender;
  IERC20 private cheemscoin;

  constructor(IERC20 _cheemscoin) {
    cheemscoin = _cheemscoin;
  }

  function buy() public payable {
    uint256 cheemsAmount = SafeMath.div(msg.value * 10**18, price);

    require(cheemsAmount > 0, "A positive value is necessary");
    require(
      cheemsAmount <= cheemscoin.balanceOf(address(this)),
      "Contract doesn't have enough funds"
    );

    dev.transfer(msg.value);
    cheemscoin.transfer(msg.sender, cheemsAmount);
  }

  function setPrice(uint256 _newPrice) public {
    require(msg.sender == dev, "Price can only be set by dev address");
    price = _newPrice;
  }

  // Withdraws all Cheemscoin to dev address
  // Purpose is so exchange funds can be allocated elsewhere if needed
  function withdraw() public {
    require(msg.sender == dev, "Only dev can withdraw");
    uint256 exchangeBalance = cheemscoin.balanceOf(address(this));
    require(exchangeBalance > 0, "Exchange has no funds");

    cheemscoin.transfer(dev, exchangeBalance);
  }
}
