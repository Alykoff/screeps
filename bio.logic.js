var C = require('Cons');
var utils = require('utils');

module.exports = {
    recreate: function() {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == C.HARVESTER_ROLE);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role === C.BUILDER_ROLE);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === C.UPGRADER_ROLE);
        var warriors = _.filter(Game.creeps, (creep) => creep.memory.role === C.WARRIOR_ROLE);
        if (harvesters.length === 0) {
            var newName = this.create([WORK,CARRY,MOVE], C.HARVESTER_ROLE);
        } else if (warriors.length === 0) {
            this.create([ATTACK, RANGED_ATTACK, MOVE], C.WARRIOR_ROLE); 
        } else if (upgraders.length === 0) {
            this.create([WORK,CARRY,MOVE], C.UPGRADER_ROLE);
        } else {
            var nextI = utils.getRandomInt(0, 3);
            switch (nextI) {
                case 0: if (harvesters.length < C.MAX_OF_HARVESTERS) {
                    this.create([WORK,WORK,WORK,CARRY,CARRY,MOVE], C.HARVESTER_ROLE); 
                    break;
                }
                case 1: if (builders.length < C.MAX_OF_BUILDERS) {
                    this.create([WORK,WORK,WORK,CARRY,MOVE,MOVE], C.BUILDER_ROLE); 
                    break;
                }
                case 2: if (upgraders.length < C.MAX_OF_UPGRADERS) {
                    this.create([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE], C.UPGRADER_ROLE); 
                    break;
                }
                case 3: if (warriors.length < C.MAX_OF_WARRIORS) {
                    this.create([ATTACK, ATTACK, ATTACK, RANGED_ATTACK, MOVE], C.WARRIOR_ROLE); 
                    break;
                }
                default: console.log("err unknow case create or full"); break;
            }
        }
    },
    create: function(bodies, role) {
        var newName = Game.spawns.Spawn1.createCreep(bodies, undefined, {role: role});
        if (typeof newName !== 'number') {
            console.log('Spawning new ' + role + ': ' + newName);
        }
    }

};