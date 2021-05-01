var numClassifier = (function classifierModule() {
  var publicInterface = {
    classify
  };
  return publicInterface;

  function classify(num) {
    if (num < 1) throw new Error("Classification is only for natural numbers");

    var factors = (function getFactors(num) {
      var result = [];
      for (let idx = 1; idx < Math.ceil(Math.sqrt(num)); idx += 1) {
        if (num % idx === 0) {
          const other = num / idx;
          result.push(idx);
          if (other !== num) {
            result.push(other);
          }
        }
      }
      return result;
    })(num);

    var sumTotal = (function reduceFactors(factors) {
      return factors.reduce(function add(acc, ele) {
        acc += ele;
        return acc;
      }, 0);
    })(factors);

    return sumTotal === num ? "perfect" : sumTotal > num ? "abundant" : "deficient";
  }
})();

module.exports.numClassifier = numClassifier;
