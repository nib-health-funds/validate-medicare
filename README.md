# validate-medicare

Medicare validation methods.

Australian Medicare Numbers must adhere to the following format:

- 1 digit between 2 and 6
- 7 digits
- 1 check digit - sum of digits 1-8 with weights 1,3,7,9,1,3,7,9 % 10
- 1 issue digit
- 1 individual digit (optional)

Taken from [Stack Overflow](http://stackoverflow.com/questions/3589345/how-do-i-validate-an-australian-medicare-number#answer-15823818).

## Example

    var validator   = require('validate-medicare');
    var method      = validator({allowIndividualDigit: true});

    method('000');          //false
    method('2123456701');   //true