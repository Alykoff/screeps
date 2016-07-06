var utils = require('utils');
var roleManager = require('role.manager');

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                var index = utils.getSourceId(creep);
                if(creep.build(targets[index]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[index]);
                }
            } else {
                roleManager.repair(creep, [STRUCTURE_ROAD, STRUCTURE_WALL, STRUCTURE_SPAWN, STRUCTURE_TOWER]);
            }
        } else {
            var index = utils.getSourceId(creep);
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[index]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[index]);
            }
        }
    }
};

module.exports = roleBuilder;