/**
 * 11 digit cards have 8 digits, 1 check digit, a card issue number and a reference number


 */
/**
 * Calculate the checksum of a medicare number
 * @param   {String}  value
 * @returns {Number}
 */
function checksum(value) {
  var
    digits    = value.split('').map(function(digit) { return Number(digit); }),
    weights   = [1, 3, 7, 9, 1, 3, 7, 9],
    checksum  = 0
  ;

  for (var i=0; i<weights.length; ++i) {
    checksum += digits[i]*weights[i];
  }

  return checksum;
}

/**
 * Calculate the checkdigit of a medicare number
 * @param   {String}  value
 * @returns {Number}
 */
function checkdigit(value) {
  return checksum(value) % 10;
}

/**
 * Create a validate method
 * @param   {Object}  options
 * @param   {Object}  options.allowIndividualDigit
 */
function validate(options) {
  options = options || {};

  /**
   * Check a value is a valid Australian Medicare number
   * @see     http://stackoverflow.com/questions/3589345/how-do-i-validate-an-australian-medicare-number#answer-15823818
   * @see     http://clearwater.com.au/code/medicare
   * @see     http://www.e-health.standards.org.au/LinkClick.aspx?fileticket=L3IUMUqMaxk%3D&tabid=139
   * @see     http://www.medicareaustralia.gov.au/provider/vendors/files/acir-immunisation-document-formats.pdf
   * @param   {String} value
   */
  return function(value) {

    //check the value length
    if (value.length !== 10) {
      if (!(options.allowIndividualDigit && value.length === 11)) {
        return false;
      }
    }

    //check the value only contains digits
    if (!/^\d+$/.test(value)) {
      return false;
    }

    //check the first digit is in the range 2-6
    var firstDigit = parseInt(value.charAt(0));
    if (firstDigit < 2 || firstDigit > 6) {
      return false;
    }

    //calculate the check digit
    return Number(value.charAt(8)) === checkdigit(value);
  };
}

module.exports            = validate;
module.exports.checksum   = checksum;
module.exports.checkdigit = checkdigit;