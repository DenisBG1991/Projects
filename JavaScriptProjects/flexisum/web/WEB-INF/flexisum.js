function flexisum (a){
    var total = 0;
    for (var i = 0; i < arguments.length; i++){
        var element = arguments[i];
        if (!element) continue;
        var n;
        switch (typeof element){
            case "number":
                n = element;
                break;
            case "object":
                if (element instanceof Array)
                    n = flexisum.apply(this, element);
                else n = element.valueOf();
                break;
            case "function":
                n = element();
                break;
            case "string":
                n = parseFloat(element);
                break;
            case "boolean":
                n = NaN;
                break;
        }
        if (typeof n == "number" && !isNaN(n)) total +=n;
        else alert ("Error");
    }
    return total;
}