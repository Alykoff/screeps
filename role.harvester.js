var util = require('utils');
var roleManager = require('role.manager');

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            var index = util.getSourceId(creep);
            if (creep.harvest(sources[index]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[index]);
            }
            return;
        }
        if (!roleManager.repair(creep, [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER]) &&
                !roleManager.repairRoad(creep)) {
            creep.moveTo(31, 27);
        }
    }
};

module.exports = roleHarvester;