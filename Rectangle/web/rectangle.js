function borrowMethods (borrowFrom, addTo){
    var from = borrowFrom.prototype;
    var to = addTo.prototype;
    for (var m in from){
        if (typeof from[m] != "function") continue;
        to[m] = from[m];
    }
}

function GenericToString (){}
GenericToString.prototype.toString = function () {
    var props = [];
    for (var name in this){
        if (!this.hasOwnProperty(name)) continue;
        var value = this[name];
        var s = name + ":";
        switch (typeof value){
            case 'function':
                s += "function";
                break;
            case 'object':
                if (value instanceof Array) s+= "array";
                else s += value.toString();
                break;
            default:
                s += String(value);
                break;
        }
        props.push(s);
    }
    return "{ " + props.join(", ") + " }";
};

function GenericEquals(){}
GenericEquals.prototype.equals = function(that){
    if (this == that) return true;
    var propsInThat = 0;
    for (var name in that){
        propsInThat ++;
        if (this[name] !== that[name]) return false;
    }
    var propsInThis = 0;
    for (name in this) propsInThis ++;
    if (propsInThat != propsInThis) return false;
    return true;
};


function Rectangle (w, h){
    this.width = w;
    this.height = h;
}
Rectangle.prototype.area = function (){return this.width * this.height;};
Rectangle.prototype.classname = "Rectangle";
borrowMethods(GenericEquals, Rectangle);
borrowMethods(GenericToString, Rectangle);

function PositionedRectangle (x0, y0 ,w ,h){
    Rectangle.call(this, w, h);
    this.x = x0;
    this.y = y0;
}
PositionedRectangle.prototype = new Rectangle();
delete PositionedRectangle.prototype.width;
delete PositionedRectangle.prototype.height;
delete PositionedRectangle.prototype.classname;
PositionedRectangle.prototype.constructor = PositionedRectangle;
PositionedRectangle.prototype.contains = function (x, y){
    return (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height);
};
PositionedRectangle.prototype.classname = "PositionedRectangle";


function Colored(c){
    this.color = c;
}
Colored.prototype.getColor = function() {return this.color;};

function ColorRectangle(w, h, c){
    this.supperclass (w, h);
    Colored.call(this, c);
}
ColorRectangle.prototype = new Rectangle();
ColorRectangle.prototype.constructor = ColorRectangle;
ColorRectangle.prototype.supperclass = Rectangle;
borrowMethods(Colored, ColorRectangle);

function getType(x){
    if (x == null) return "null";
    var t = typeof x;
    if (t != "object") return t;
    var c = Object.prototype.toString.apply(x);
    c = c.substring(8, c.length-1);
    if (c != "Object") return c;
    if (x.constructor == Object) return c;
    if ("classname" in x.constructor.prototype && typeof  x.constructor.prototype.classname == "string")
        return x.constructor.prototype.classname;
    return "<unknown type>";
}

