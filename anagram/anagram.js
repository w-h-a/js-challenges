module.exports.anagram = anagram;

function anagram(focalStr) {
  var publicInterface = {
    match
  }
  return publicInterface;

  function match(arrOfStrs) {
    var sortedFocal = focalStr.toLowerCase().split('').sort().join('');
    return arrOfStrs.filter(function(ele) {
      if (focalStr.toLowerCase() !== ele.toLowerCase()) {
        return sortedFocal === ele.toLowerCase().split('').sort().join('');
      }
    });
  }
}
