function Complex (real, imaginary){
    this.x = real;
    this.y = imaginary;
}

Complex.prototype.magnitude = function(){
    return Math.sqrt(this.x*this.x + this.y*this.y);
}

Complex.prototype.negative = function(){
    return new Complex (-this.x, -this.y);
}

Complex.prototype.multiply = function(that){
    return new Complex (that.x*that.x - this.y*that.y, this.x*that.y + this.y*that.x);
}

Complex.prototype.toString = function(){
    return "{ " + this.x + " , " + this.y + " }";
}

Complex.prototype.equals = function(that){
    return this.x == that.x && this.y == that.y;
}

Complex.prototype.valueOf = function() {return this.x;}

Complex.add = function(a, b){
    return new Complex (a.x + b.x, a.y + b.y);
}

Complex.multiply = function(a, b){
    return new Complex (a.x* b.x - a.y* b.y, a.x* b.y + a.y* b.x);
}

Complex.ZERO = new Complex (0,0);
Complex.ONE = new Complex (1,0);
Complex.I = new Complex(0,1);

