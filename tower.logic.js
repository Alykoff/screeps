/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('tower.logic');
 * mod.thing == 'a thing'; // true
 */
var towerLogic = {
    do: function(towerIds) {
        if (towerIds.length == 0) {
            return;
        }
        for (var i in towerIds) {
            var id = towerIds[i];
            var tower = Game.getObjectById(id);
            if (tower) {
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                if(closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
        
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(closestHostile) {
                    tower.attack(closestHostile);
                }
            }
        }
    }
};
module.exports = towerLogic;