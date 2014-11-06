var assert    = require('assert');
var validator = require('..');

describe('validate-medicare', function() {

  var method = validator();

  it('should return true for valid 10 digit values', function() {
    assert(method('2123456701'));
    assert(method('2622563151'));
    assert(method('4299844934'));
    assert(method('4300148487'));
    assert(method('4390255081'));
    assert(method('4900541786'));
    assert(method('4904697185'));
    assert(method('5000370906'));
    assert(method('5099903728'));
    assert(method('5100211647'));
    assert(method('5156106911'));
    assert(method('6001037859'));
    assert(method('6199958033'));
    assert(method('6200144582'));
    assert(method('6248870291'));
    assert(method('6565200001'));
    assert(method('6900018939'));
    assert(method('2123456701'));
    assert(method('5126765605'));
    assert(method('4220795032'));
    assert(method('4199510364'));
    assert(method('4266245692'));
    assert(method('3372022632'));
    assert(method('2746433901'));
    assert(method('5113761952'));
    assert(method('6156695066'));
    assert(method('5114127706'));
    assert(method('2726545852'));
    assert(method('2648421075'));
    assert(method('2618660123'));
    assert(method('2446532867'));
    assert(method('6900018939'));
    assert(method('6573246583'));
    assert(method('6565200001'));
    assert(method('2000343991'));
    assert(method('2000352599'));
    assert(method('2001160007'));
  });

  it('should return true for valid 11 digit values', function() {
    var method = validator({allowIndividualDigit: true});
    assert(method('21234567019'));
  });

  // ===

  it('should return false if it is not 10 characters in length', function() {
    assert(!method('1'));
    assert(!method('21234567011')); // valid 10 with 1 extra digit
  });

  it('should return false if it is not 10-11 characters in length', function() {
    var method = validator({allowIndividualDigit: true});
    assert(!method('1'));
    assert(!method('212345670196')); // valid 10 with 2 extra digits
  });

  it('should return false if it does not start with a digit between 2-6', function() {
    assert(!method('0000000000'));
    assert(!method('933333333'));
  });

  it('should return false for invalid check digits', function() {
    assert(!method('3333333333'));
  });

  it('should return false for invalid characters', function() {
    assert(!method('abcdefghij'));
  });

});