module.exports = {
  xor: function(bufferArray) {
    var xorVal;
    for (i = 0; i < bufferArray.length; i++) {
      xorVal ^= parseInt(bufferArray[i])
    }
    bufferArray.unshift(0xAA)
    bufferArray.push(xorVal)
    return new Buffer(bufferArray);
  }
}