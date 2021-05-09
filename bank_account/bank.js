"use strict";

function BankAccount() {
  var balance = 0;
  var isOpen;
  var publicInterface = {
    get balance() {
      if (!isOpen) throw new ValueError();
      return balance;
    },
    open,
    close,
    deposit,
    withdraw
  };
  return publicInterface;
  function open() {
    if (isOpen) throw new ValueError();
    isOpen = true;
  }
  function close() {
    if (!isOpen) throw new ValueError();
    balance = 0;
    isOpen = false;
  }
  function deposit(amount) {
    if (!isOpen || amount < 0) throw new ValueError();
    balance += amount;
  }
  function withdraw(amount) {
    if (!isOpen || amount > balance || amount < 0) throw new ValueError();
    balance -= amount;
  }
}

class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}

Object.assign(module.exports, {
  BankAccount,
  ValueError
});
