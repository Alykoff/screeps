module.exports = {
    DEFAULT_SOURCE_ID: 0,
    getSourceId: function(creep) {
        var index = creep.memory.sourceId;
        if (typeof index === 'number' && index >= 0) {
            return index;
        } else {
            return this.DEFAULT_SOURCE_ID;
        }
    },
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
};