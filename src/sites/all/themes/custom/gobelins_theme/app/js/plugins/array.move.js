Array.prototype.move = function (oldIndex, newIndex) {
  if (newIndex >= this.length) {
    var k = newIndex - this.newIndex;
    while ((k--) + 1) {
      this.push(undefined);
    }
  }
  this.splice(newIndex, 0, this.splice(oldIndex, 1)[0]);
  return this; // for testing purposes
};
