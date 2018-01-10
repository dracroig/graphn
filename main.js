var __NONE__ = "__NONE__";

var ModuleUtilities = (function () {
    
    return {
        createArray: function(length) {

            var arr = new Array(length || 0), i = length;

            arr.fill(0);
        
            if (arguments.length > 1) {

                var args = Array.prototype.slice.call(arguments, 1);
                while(i--) arr[length-1 - i] = this.createArray.apply(this, args);
            }
        
            return arr;
        },
        print2dMatrix: function (m) {

            var ret = "Matrix "  + m.length + " x " + m[0].length + "\n";

            var maxl = 0;

            for (var i = 0; i < m.length; i++) {

                for (var j = 0; j < m[i].length; j++) {

                    var l = m[i][j].toString().length;

                    if (l > maxl) {

                        maxl = l;
                    }
                }
            }

            for (var i = 0; i < m.length; i++) {

                var row = "[";
                var coma = "";

                for (var j = 0; j < m[i].length; j++) {

                    var s = this.charFill( m[i][j], maxl, ' ');
                    row += coma + " " + s;
                    coma = ",";
                }
                row += " ]";
                ret += row + "\n";
            }

            return ret;
        },
        charFill: function ( number, width, char ) {

            width -= number.toString().length;
            if ( width > 0 ) {

                return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( char ) + number;
            }
            return number + "";
        }
    }
})();


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
        Weight: 1
    };

    this.From = from;
    this.To = to;
    this.Weight = def&&def.Weight||__def.Weight;
}

function Graph (def) {

    var __def = {
        Directed: true,
        Nodes: [],
        Arcs:[]
    };

    this.Directed = __def.Directed;
    
    if (def&&def.Directed===true) this.Directed = true;
    if (def&&def.Directed===false) this.Directed = false;
    this.Nodes = def&&def.Nodes||__def.Nodes;
    this.Arcs = def&&def.Arcs||__def.Arcs;
    this.MatrixAdj = null;
    this.MatrixAdjWeight = null;

    if (!Graph.prototype.addNode) {

        Graph.prototype.addNode = function(n) {

            this.Nodes.push(n);
            this.buildAll();

            return this;
        };
    }

    if (!Graph.prototype.addArc) {

        Graph.prototype.addArc = function(a) {

            this.Arcs.push(a);
            this.buildAll();

            return this;
        };
    }

    if (!Graph.prototype.buildAll) {

        Graph.prototype.buildAll = function() {

            this.buildMatrixAdj();

            return this;
        };
    }

    if (!Graph.prototype.buildMatrixAdj) {

        Graph.prototype.buildMatrixAdj = function() {

            var n = this.Nodes.length;
            this.MatrixAdj = ModuleUtilities.createArray(n,n);
            this.MatrixAdjWeight = ModuleUtilities.createArray(n,n);            

            for (var i = 0; i < this.Arcs.length; i++) {
                
                var from = this.Arcs[i].From;
                var to = this.Arcs[i].To;
                var w = this.Arcs[i].Weight;

                if (from < n && to < n) {

                    this.MatrixAdj[from][to] = 1;
                    this.MatrixAdjWeight[from][to] = w;                    

                    if (!this.Directed && from != to) {

                        this.MatrixAdj[to][from] = 1;
                        this.MatrixAdjWeight[to][from] = w;
                    }
                }
            }

            return this;
        };
    }

    this.buildAll();
}

var n1 = new Node({Location: [10, 10, 0]});
var a1 = new Arc(0,1,{Weight:10});

var g = new Graph ({
    Directed: true,
    Nodes: [new Node(), new Node(), new Node(), new Node(), new Node()],
    Arcs: [new Arc(0, 1, {Weight: 4}), new Arc(1, 4, {Weight: 6}), new Arc(0, 3, {Weight: 8}), new Arc(3, 2, {Weight: 4}), new Arc(2, 1, {Weight: 6}), new Arc(2, 4, {Weight: 2})]
});
g.addNode(new Node());
g.addArc(new Arc(4, 5, {Weight: 13}));


console.log(ModuleUtilities.print2dMatrix(g.MatrixAdj));
console.log(ModuleUtilities.print2dMatrix(g.MatrixAdjWeight));

debugger