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

function Arc (from, to, def) {

    var __def = {
        Weight: 0
    };

    this.From = from;
    this.To = to;
    this.Weight = def&&def.Weight||__def.Weight;
}

function Graph (def) {

    var __def = {
        Nodes: [],
        Arcs:[]
    };

    this.Nodes = def&&def.Nodes||__def.Nodes;
    this.Arcs = def&&def.Arcs||__def.Arcs;

    if (!Graph.prototype.addNode) {
        Graph.prototype.addNode = function(n) {
            this.Nodes.push(n);
            this.build();
            return this;
        };
    }

    if (!Graph.prototype.addArc) {
        Graph.prototype.addArc = function(a) {
            this.Arcs.push(a);
            this.build();
            return this;
        };
    }

    if (!Graph.prototype.build) {
        Graph.prototype.build = function() {
            
            return this;
        };
    }
}

var n1 = new Node({Location: [10, 10, 0]});
var a1 = new Arc(0,1,{Weight:10});

var g = new Graph ({
    Nodes: [new Node(), new Node(), new Node(), new Node(), new Node()],
    Arcs: [new Arc(0, 1), new Arc(1, 4), new Arc(0, 3), new Arc(3, 2), new Arc(2, 1), new Arc(2, 4)]
});
g.addNode(new Node());
g.addArc(new Arc(4, 5));

debugger

//parece que funciona...

//segundo test ...