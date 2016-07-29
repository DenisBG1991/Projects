function Circle (radius){
    this.r = radius;
}

Circle.PI = 3.1415;
Circle.prototype.area = function(){return Circle.PI*this.r*this.r}
Circle.max = function (a, b){
    if (a.r > b.r ) return a
    else return b;
}