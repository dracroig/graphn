function Node (def = 7) {

    this._privatem = 1;
    this.publicm = def;


    if (!Node.prototype.getName) {
        Node.prototype.getName = function() {
            return this.publicm;
        };
    }
}

var n1 = new Node(1);
//n1.publicm = 11;
console.dir(n1.getName());

var n2 = new Node(2);
//n2.publicm = 22;
console.dir(n2.getName());

debugger;