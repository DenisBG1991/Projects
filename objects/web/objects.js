function getProperty (o){
    var r = [];
    for(var name in o) r.push(name);
    return r;
}

function copyProperty (from , to){
    if (!to) to = {};
    for (var p in from) {
        to[p] = from[p];
    }
    return to;
}

function copyUndefinedProperty (from , to){
    for (var o in from){
        if (!(o in to)) to[o] = from[o];
    }
    return to;
}

