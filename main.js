var __NONE__ = "__NONE__";

function Node (def) {

    var __def = {
        Location: [0, 0, 0], 
        Name: __NONE__, 
        Tag: __NONE__
    };

    this.Location = [def&&def.Location&&def.Location[0] || __def.Location[0], def&&def.Location&&def.Location[1] || __def.Location[1], def&&def.Location&&def.Location[2] || __def.Location[2]];
    this.Name = def&&def.Name || __def.Name;
    this.Tag = def&&def.Tag || __def.Tag;

    if (!Node.prototype.setLocation) {
        Node.prototype.setLocation = function(x, y, z) {
            this.Location = [x, y, z];
            return this;
        };
    }
}

function Arc (def) {

    var __def = {
        Weight: 0
    };
    this.Weight = def&&def.Weight||__def.Weight;
}

var n1 = new Node({Location: [10, 10, 0]});
var a1 = new Arc({Weight:10});

debugger

//parece que funciona...

//segundo test ...