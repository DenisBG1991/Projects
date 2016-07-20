function makeProperty(o, name, predicate){
    var value;
    o["get"+name] = function (){return value};
    o["set"+name] = function (v){
        if (predicate && !predicate(v)){
            throw new Error ("set" + name + " неверное значение : " + v);}
        else value = v;
    }
}