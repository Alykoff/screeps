module.exports = {
    repair: (creep, structs) => {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                var strType = structure.structureType;
                return _.reduceRight(
                    structs, (acc, str) => {return acc || strType == str;}, false
                ) && structure.energy < structure.energyCapacity;
            }
        });
        
        if (targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
            return true;
        } else {
            return false;
        }
    },
    repairRoad: (creep) => {
        var roadToRepair = creep.pos.findClosest(FIND_STRUCTURES, {
            filter: function(object) {
                return object.structureType === STRUCTURE_ROAD && (object.hits > object.hitsMax / 3);
            } 
        });
        if (roadToRepair) {
            creep.moveTo(roadToRepair);
            creep.repair(roadToRepair);
            return true;
        } else {
            return false;
        }
    }
};