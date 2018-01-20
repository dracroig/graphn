var fs = require('fs');

const  __NONE__ = "__NONE__";

//Direction
const N = 1;    //North
const E = 2;    //East
const S = 4;    //South
const W = 8;    //West
const DIRECTIONS = [N, E, S, W];

//Movement
const F = 1;    //go Forward
const R = 2;    //turn Right
const B = 3;    //go Backwards
const L = 4;    //turn Left 

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

                    var l = 0;
                    
                    if (m[i][j] !== undefined) l = m[i][j].toString().length;

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
        printMap: function (m, b) {

            var ret = "";

            for (var i = 0; i < m.length; i++) {

                var row = "";

                for (var j = 0; j < m[i].length; j++) {

                    var c = " "
                    if (b && b.x == j && b.y == i)  c = "@";

                    if (m[i][j] == 0) row += "██";
                    else if (m[i][j] == N) row += "↑" + c;
                    else if (m[i][j] == E) row += "→" + c;
                    else if (m[i][j] == S) row += "↓" + c;
                    else if (m[i][j] == W) row += "←" + c;
                    else if (m[i][j] == W+E) row += "↔" + c;
                    else if (m[i][j] == N+S) row += "↕" + c;
                    else row += " " + c;
                }
                ret += row + "\n";
            }

            return ret;
        },
        charFill: function ( number, width, char ) {

            if (number === undefined) number = "?";
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

var sampleMap = [
    [0, 0, 0, 0, 0, 0, 0 ,0 ,0 ],
    [0, 2, 2, 6, 2, 6, 2, 4, 0 ],
    [0, 1, 0, 1, 0, 1, 0, 4, 0 ],
    [0, 1, 8, 9, 8, 9, 8, 8, 0 ],
    [0, 0, 0, 0, 0, 0, 0 ,0 ,0 ]];

var sampleMap2 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [0,  , 2,  , 2,  , 2,  , 0 ],
    [0, 1, 0, 1, 0, 1, 0, 4, 0 ],
    [0,  , 8,  , 8,  , 8,  , 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0 ]];

var sampleMap3 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0,  , 2,  , 2,  , 8,  , 2,  , 2,  , 0],
    [0, 1, 0, 4, 0, 4, 0, 1, 0, 4, 0, 4, 0],
    [0,  , 8,  ,10,  , 0,  , 8,  , 8,  , 0],
    [0, 1, 0, 4, 0, 4, 0, 1, 0, 5, 0, 4, 0],
    [0,  , 2,  , 2,  , 2,  , 2,  , 2,  , 0],
    [0, 1, 0, 4, 0, 1, 0, 4, 0, 0, 0, 4, 0],
    [0,  , 8,  , 8,  , 8,  , 8,  , 8,  , 0],
    [0, 1, 0, 4, 0, 1, 0, 4, 0, 1, 0, 4, 0],
    [0,  , 2,  , 2,  , 2,  , 0,  ,10,  , 0],
    [0, 1, 0, 4, 0, 1, 0, 4, 0, 5, 0, 4, 0],
    [0,  , 8,  , 8,  , 8,  , 8,  , 8,  , 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

//Clear console screen
var clear = function() {
    fs.writeSync(1, '\033[2J');
    fs.fsyncSync(1);
}

clear();



function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) break;
    }
}

/*
for(var i = 1; i < 20; i++)
{
    clear();
    for (var j = 0; j < i; j++)
    {
        console.log(' ');
    }
    console.log(i+'*');
    sleep(1000);
}*/


//console.log(ModuleUtilities.print2dMatrix(sampleMap));
//console.log("");

var b1 = {x: 1, y: 1, dir: E };

function step (a, b) {
    
    var i = (b - 1 + (a==E) + 2*(a==S) + 3*(a==W)) % 4;
    return DIRECTIONS[i];
}

function getCell (b, testMov)
{
    var c = step(b.dir, testMov);
    switch (c) {
        case N: return {x: b.x, y: b.y-1, dir: N};
        case E: return {x: b.x+1, y: b.y, dir: E};
        case S: return {x: b.x, y: b.y+1, dir: S};
        case W: return {x: b.x-1, y: b.y, dir: W};
    }
}

console.log(ModuleUtilities.print2dMatrix(sampleMap3, b1));

function deduceIntersections (m) {

    for (var i = 0; i < m.length; i++) {

        var row = "";

        for (var j = 0; j < m[i].length; j++) {

            if (m[i][j] === undefined )
            {
                m[i][j] = m[i-1][j]&N | m[i][j+1]&E | m[i+1][j]&S | m[i][j-1]&W;
            }            
        }
    }
}

deduceIntersections (sampleMap3);

console.log(ModuleUtilities.print2dMatrix(sampleMap3, b1));

while (true)
{
    clear ();

    console.log(ModuleUtilities.printMap(sampleMap3, b1));

    sleep(1000);

    var v = getCell (b1, F);
    var n = sampleMap3[v.y][v.x];
    if (n == 0)
    {
        v = getCell (b1, R);
        n = sampleMap3[v.y][v.x];
        if (n == 0)
        {
            v = getCell (b1, L);
            n = sampleMap3[v.y][v.x];
            if (n == 0)
            {
                v = getCell (b1, B);
                n = sampleMap3[v.y][v.x];
                if (n == 0)
                {
                    v.x = b1.x;
                    v.y = b1.y;
                    v.dir = b1.dir;
                }
            }
        }
    }
    b1.x = v.x;
    b1.y = v.y;
    b1.dir = v.dir;
}

//https://www.key-shortcut.com/en/writing-systems/35-symbols/arrows/