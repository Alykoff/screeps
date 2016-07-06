var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleWarrior = require('role.warriors')
var towerLogic = require('tower.logic');
var C = require('Cons'); 
var bio = require('bio.logic');
var utils = require('utils');

module.exports.loop = function () {
    // console.log('tick');
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        } else {
            var creep = Game.creeps[name];
            if (typeof creep.memory.sourceId !== 'number') {
                var sources = creep.room.find(FIND_SOURCES);
                creep.memory.sourceId = utils.getRandomInt(0, 3) >= 1 ? 0 : 1;
                //Math.round(Math.random() * (sources.length - 1));
            }
        }
    }
    bio.recreate();
    towerLogic.do([]);
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch (creep.memory.role) {
            case C.HARVESTER_ROLE: roleHarvester.run(creep); break;
            case C.UPGRADER_ROLE: roleUpgrader.run(creep); break;
            case C.BUILDER_ROLE: roleBuilder.run(creep); break;
            case C.WARRIOR_ROLE: roleWarrior.run(creep); break;
            default: console.log("unknow role: " + creep.memory.role + "; for " + name);
        }
    }
}