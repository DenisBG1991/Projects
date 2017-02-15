/**
 * Иерархия абстрактных и конкретных классов множеств.
 */
//-------------------------------------------------------------------------------//

/**
 * Копирует перечислимые свойства из объекта p в объект o и возвращает o.
 * Если o и p имеют свойства с одинаковыми именами, значение свойства
 * в объекте o затирается значением свойства из объекта p.
 * Эта функция не учитывает наличие методов доступа и не копирует атрибуты.
 */
function extend(o, p) {
    for (let prop in p) {
        o[prop] = p[prop];
    }
    return o;
}

/**
 * Функция для создания простых подклассов.
 */
function defineSubclass(superclass, constructor, methods, statics) {
    constructor.prototype = Object.create(superclass.prototype);
    constructor.prototype.constructor = constructor;
    if (methods) extend(constructor.prototype, methods);
    if (statics) extend(constructor, statics);
    return constructor;
}

/**
 * Переопределенная функция extend для подклассов.
 */
Function.prototype.extend = function (constructor, methods, statics) {
    return defineSubclass(this, constructor, methods, statics);
};
//-------------------------------------------------------------------------------//

/**
 * Вспомогательная функция, которая может использоваться для определения
 * любого абстрактного метода.
 */
function abstractmethod() {
    throw new Error ("абстрактный метод");
}

/**
 * Класс AbstractSet определяет единственный абстрактный метод, contains().
 */
function AbstractSet() {
    throw new Error ("Нельзя создать экземпляр абстрактного класса.");
}
AbstractSet.prototype.contains = abstractmethod;

/**
 * NetSet - конкретный подкласс класса AbstractSet.
 * Элементами этого множества являются все значения, который не являются
 * элементами некоторого другого множества. Поскольку это множество
 * определяется в терминах другого множества, оно не доступно для записи,
 * а так как оно имеет бесконечное число элементов, оно не доступно для перечисления.
 * Все, что позволяет этот класс, - это проверить принадлежность к множеству.
 */
let NotSet = AbstractSet.extend(
    function NotSet(set) {
        this.set = set;
    },
    {
        contains: function (x) {
            return !this.set.contains(x);
        },
        toString: function () {
            return "~" + this.set.toString();
        },
        equals: function (that) {
            return that instanceof NotSet && this.set.equals(that.set);
        }
    }
);

/**
 * AbstractEnumerableSet - абстрактный подкласс класса AbstractSet.
 * Определяет абстрактные методы size() и foreach() и реализует конкретные
 * методы isEmpty(), toArray(), to[Local]String() и equals().
 * Подклассы наследуемые этим абстрактным подклассом получат эти пять
 * методов даром.
 */
let AbstractEnumerableSet = AbstractSet.extend(
    function () {
        throw new Error ("Нельзя создать экземпляр абстрактного класса.");
    },
    {
        size: abstractmethod,
        foreach: abstractmethod,
        isEmpty: function () {
            return this.size() == 0;
        },
        toString: function () {
            let s = "{", i = 0;
            this.foreach(function (v) {
                if (i++ > 0) s += ", ";
                s += v;
            });
            return s + "}";
        },
        toLocaleString: function () {
            let s = "{", i = 0;
            this.foreach(function (v) {
                if (i++ > 0) s += ", ";
                if (v == null) {
                    s += v;
                }
                else {
                    s += v.toLocaleString();
                }
            });
            return s + "}";
        },
        toArray: function () {
            let a = [];
            this.foreach(function (v) {
                a.push(v);
            });
            return a;
        },
        equals: function (that) {
            if (!(that instanceof AbstractEnumerableSet)) return false;
            if (that.size() != that.size()) return false;
            try {
                this.foreach(function (v) {
                    if (!that.contains(v)) throw false;
                });
                return true;
            }
            catch (x) {
                if (x === false) return false;
                throw x;
            }
        }
    }
);

/**
 * SingletonSet - конкретный подкласс класса AbstractEnumerableSet.
 * Множество из единственного элемента, доступное только для чтения.
 */
let SingletonSet = AbstractEnumerableSet.extend(
    function SingletonSet(member) {
        this.member = member;
    },
    {
        contains: function (x) {
            return x === this.member;
        },
        size: function () {
            return 1;
        },
        foreach: function (f, ctx) {
            f.call(ctx, this.member);
        }
    }
);

/**
 * AbstractWritableSet - абстрактный подкласс класса AbstractEnumerableSet.
 * Определяет абстрактные методы add() и remove() и реализует конкретные
 * методы union(), intersection() и difference().
 */
let AbstractWritableSet = AbstractEnumerableSet.extend(
    function () {
        throw new Error ("Нельзя создать экземпляр абстрактного класса.");
    },
    {
        add: abstractmethod,
        remove: abstractmethod,
        union: function (that) {
            let self = this;
            that.foreach(function (v) {
                self.add(v);
            });
            return this;
        },
        intersection: function (that) {
            let self = this;
            this.foreach(function (v) {
                if (!that.contains(v)) self.remove(v);
            });
            return this;
        },
        difference: function (that) {
            let self = this;
            that.foreach(function (v) {
                self.remove(v);
            });
            return this;
        }
    }
);

/**
 * ArraySet - конкретный подкласс класса AbstractWritableSet.
 * Представляет множество элементов как массив значений иреализует линейный
 * поиск в массиве в своем методе contains(). Поскольку агоритм метода contains()
 * имеет сложность О(n) вместо О(1), данный класс следует использовать только
 * для создания относительно небольших множеств.
 */
let ArraySet = AbstractWritableSet.extend(
    function ArraySet() {
        this.value = [];
        this.add.apply(this, arguments);
    },
    {
        contains: function (v) {
            return this.value.indexOf(v) != -1;
        },
        foreach: function (f, c) {
            return this.value.forEach(f, c);
        },
        size: function () {
            return this.value.length;
        },
        add: function () {
            for (let i = 0; i < arguments.length; i++){
                let arg = arguments[i];
                if (!this.contains(arg)) this.value.push(arg);
            }
            return this;
        },
        remove: function () {
            for (let i = 0; i < arguments.length; i++){
                let p = this.value.indexOf(arguments[i]);
                if (p == -1) continue;
                this.value.splice(p, 1);
            }
            return this;
        }
    }
);
