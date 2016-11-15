/**
 * Нахождение среднего значения и стандартного отклонения для массива чисел в ECMAScript5.
 */
{
    var sum5 = function (x, y) {
        return x + y;
    }
    var square5 = function (x) {
        return x * x;
    }
    var data5 = [1, 1, 3, 5, 5];
    var mean5 = data5.reduce(sum5)/data5.length;
    var deviations5 = data5.map(function (x) {
        return x - mean5;
    });
    var stddev5 = Math.sqrt(deviations5.map(square5).reduce(sum5)/(data5.length - 1));
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Функция map() для ECMAScript3.
 */
{
    var map = Array.prototype.map
        ? function (a, f) {
            return a.map(f);
        }
        : function (a, f) {
            var results = [];
            for(var i = 0, len = a.length; i < len; i++){
                if (i in a) results[i] =  f.call(null, a[i], i, a);
            }
            return results;
        }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Функция reduce() для ECMAScript3.
 */
{
    var reduce = Array.prototype.reduce
        ? function (a, f, initial) {
            if (arguments > 2) {
                return a.reduce(f, initial);
            }
            else {
                return a.reduce(f);
            }
        }
        : function (a, f, initial) {
            var i = 0, len = a.length, accumulator;
            if (arguments.length > 2) accumulator = initial;
            else {
                if (len == 0) throw TypeError();
                while (i < len){
                    if (i in a){
                        accumulator = a[i];
                        break;
                    }
                    else  i++;
                }
                if (i == len) throw TypeError();
            }
            while (i < len){
                if(i in a){
                    accumulator = f.call(undefined, accumulator, a[i], i, a);
                }
                i++;
            }
            return accumulator;
        }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Нахождение среднего значения и стандартного отклонения для массива чисел в ECMAScript3.
 */
{
    var data3 = [1,1,3,5,5];
    var sum3 = function (x, y) {
        return x+y;
    }
    var square3 = function (x) {
        return x*x;
    }
    var mean3 = reduce(data3, sum3)/data3.length;
    var deviations3 = map(data3, function (x) {
        return x-mean3;
    });
    var stddev3 = Math.sqrt(reduce(map(deviations3, square3), sum3)/(data3.length - 1));
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Функция высшего порядка возвращает новую функцию, которая передает свои аргументы
 * функции f и возвращает логическое отрицание значения, возвращаемого функцией f.
 */
{
    function not(f) {
        return function () {
            var result = f.apply(this, arguments);
            return !result;
        };
    }

    var even = function (x) {
        return x % 2 === 0;
    };

    var odd = not(even);
    console.log([1, 1, 3, 5, 5].every(odd));
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Функция высшего порядка возвращает новую функцию, которая принимает массив в виде аргументов,
 * применяет функцию f к каждому элементу и возвращает массив возвращаемых значений.
 */
{
    function mapper(f) {
        return function (a) {
            return map(a, f);
        };
    }

    var inrement = function (x) {
        return x + 1;
    };
    var incrementer = mapper(inrement);
    console.log(incrementer([1, 2, 3]));
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Возвращает новую функцию, которая вычисляет f(g()). Возвращаемая функция h()
 * передает все свои аргументы функции g(), затем передает значение, полученное от g(),
 * функции f() и возвращает результат вызова f().
 */
{
    function compose(f, g) {
        return function () {
            return f.call(this, g.apply(this, arguments));
        };
    }

    var square = function (x) {
        return x*x;
    }
    var sum = function (x, y) {
        return x+y;
    }
    var squareofsum = compose(square, sum);
    console.log(squareofsum(2, 3));
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Вспомогательная функция преобразования объекта (или его части),
 * подобного массиву, в настоящий массив.
 */
{
    function array(a, n) {
        return Array.prototype.slice.call(a, n || 0);
    }
}

/**
 * Аргументы этой функции помещаются в начало списка.
 */
{
    function partialLeft(f /*, ... */) {
        var args = arguments;
        return function () {
            var a = array(args, 1);
            a = a.concat(array(arguments));
            return f.apply(this, a);
        };
    }
}

/**
 * Аргументы этой функции помещаются в конец списка.
 */
{
    function partialRight(f /*, ... */) {
        var args = arguments;
        return function () {
            var a = array(arguments);
            a = a.concat(array(args, 1));
            return f.apply(this, a);
        };
    }
}

/**
 * Аргументы этой функции играют роль шаблона. Неопределенные значения
 * в списке аргументов заполняются значениями из внутреннего набора.
 */
{
    function partial(f /*, ... */) {
        var args = arguments;
        return function () {
            var a = array(args, 1);
            var i = 0;
            j = 0;
            for (; i < a.length; i++) {
                if (a[i] === undefined) a[i] = arguments[j++];
            }
            a = a.concat(array(arguments, j));
            return f.apply(this, a);
        };
    }
}

/**
 * Примеры использования функций.
 */
{
    var f = function (x, y, z) {
        return x * (y - z);
    }
    console.log(partialLeft(f, 2)(3, 4));            // 2 * (3 - 4)
    console.log(partialRight(f, 2)(3, 4));           // 3 * (4 - 2)
    console.log(partial(f, undefined, 2)(3, 4));     // 3 * (2 - 4)
    var increment = partialLeft(sum, 1);
    var cuberoot = partialRight(Math.pow, 1/3);
    String.prototype.first = partial(String.prototype.charAt, 0);
    String.prototype.last = partial(String.prototype.substr(), -1, 1);
    let not = partialLeft(compose, function (x) {
        return !x;
    });
    let even = function (x) {
        return x % 2 === 0;
    };
    let odd = not(even);
    let isNumber = not(isNaN);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Использование приемов композиции и частичного применения для вычисления
 * среднего значения и стандартного отклонения.
 */
{
    let data = [1,1,3,5,5];
    let sum = function (x, y) {
        return x + y;
    }
    let product = function (x, y) {
        return x * y;
    }
    let neg = partial(product, -1);
    let square = partial(Math.pow, undefined, 2);
    let sqrt = partial(Math.pow, undefined, .5);
    let reciprocal = partial(Math.pow, undefined, -1);
    let mean = product(reduce(data, sum), reciprocal(data.length));
    let stddev = sqrt(product(reduce(map(data,
        compose(square, partial(sum, neg(mean)))), sum), reciprocal(sum(data.length - 1))));
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Возвращает мемоизованную версию функции f(). Работает, только если все возможные
 * аргументы f() имеют отличающиеся строковые представления.
 */
{
    function memoize(f) {
        var cache = {};
        return function () {
            var key = arguments.length + Array.prototype.join.call(arguments, ",");
            if (key in cache) return cache[key];
            else return cache[key] = f.apply(this, arguments);
        };
    }
}
/**
 * Примеры мемоизации функций.
 */
{
    function gcd(a, b) {
        var t;
        if (a < b) t = b, b = a, a = t;
        while (b != 0) {
            t = b,
            b = a % b,
            a = t;
        }
        return a;
    }

    var gcdmemo = memoize(gcd);
    console.log(gcdmemo(85, 197));

    var factorial = memoize(function (n) {
        return (n <= 1) ? 1 : n * factorial(n - 1);
    });
    console.log(factorial(5));
}
