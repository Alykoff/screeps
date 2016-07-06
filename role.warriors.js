var util = require('utils');
module.exports = {
    run: function(creep) {
        //creep.say("attaker!");
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // console.log(JSON.stringify(creep.pos));
        //
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            creep.moveTo(23, 26);
        }
        /*
        var targets = creep.room.find(
            FIND_CREEPS, 
            filter: (c) => {return !c.my;}
        );
        if(targets.length > 0) {
            if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
        */
    }
};