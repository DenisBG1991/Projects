/**
 * Произвольное множество значений.
 * @constructor
 */
function Set() {
    this.values = {};
    this.n = 0;
    this.add.apply(this, arguments);
}

Set.prototype.add = function () {
    for (let i = 0; i < arguments.length; i++){
        let val = arguments[i];
        let str = Set._v2s(val);
        if (!this.values.hasOwnProperty(str)){
            this.values[str] = val;
            this.n++;
        }
    }
    return this;
};

Set.prototype.remove = function () {
    for (let i = 0; i < arguments.length; i++){
        let str = Set._v2s(arguments[i]);
        if (!this.values.hasOwnProperty(str)){
            delete this.values[str];
            this.n--;
        }
    }
    return this;
};

Set.prototype.contains = function (value) {
    return this.values.hasOwnProperty(Set._v2s(value));
};

Set.prototype.size = function () {
    return this.n;
};

Set.prototype.foreach = function (f, context) {
    for (let s in this.values){
        if (this.values.hasOwnProperty(s)){
            f.call(context, this.values[s]);
        }
    }
};

Set.prototype.toString = function () {
    let s = "{", i = 0;
    this.foreach(function (v) {
        s += ((i++ > 0)?", ":"") + v;
    });
    return s + "}";
};

Set.prototype.toLocaleString = function () {
    let s = "{", i = 0;
    this.foreach(function (v) {
        if (i++ > 0) s += ", ";
        if (v == null) s += v;
        else s += v.toLocaleString();
    });
    return s + "}";
};

Set.prototype.toArray = function () {
    let a = [];
    this.foreach(function (v) {
        a.push(v);
    });
    return a;
};

Set.prototype.toJSON = Set.prototype.toArray;

Set.prototype.equal = function (that) {
    if (this === that) return true;
    if (!(that instanceof Set)) return false;
    if (this.size() != that.size()) return false;
    try {
        this.foreach(function (v) {
            if (!that.contains(v)) throw false;
        });
        return true;
    } catch (x) {
        if (x === false) return false;
        throw x;
    }
};

Set._v2s = function (val) {
    switch (val){
        case undefined: return "u";
        case null: return "n";
        case true: return "t";
        case false: return "f";
        default: switch (typeof val){
            case "number": return "#" + val;
            case "string": return ':' + val;
            default: return "@" + objectId(val);
        }
    }

    function objectId(o) {
        let prop = "|**objectid**|";
        if (!o.hasOwnProperty(prop)){
            o[prop] = Set._v2s.next++;
        }
        return o[prop];
    }
};

Set._v2s.next = 100;

/*==============================================================*/
/*==============================================================*/

/**
 * Типы-перечисдения в JavaScript.
 */
function enumeration(nameToValue) {
    let enumeration = function () {
        throw "Нельзя создать экземпляр класса Enumeration";
    };

    let proto = enumeration.prototype = {
        constructor: enumeration,
        toString: function () {
            return this.name;
        },
        valueOf: function () {
            return this.value;
        },
        toJSON: function () {
            return this.name;
        }
    };

    enumeration.values = [];

    for(let n in nameToValue){
        let e = Object.create(proto);
        e.name = n;
        e.value = nameToValue[n];
        enumeration[n] = e;
        enumeration.values.push(e);
    }

    enumeration.foreach = function (f, c) {
        for (let i  = 0; i < enumeration.values.length; i++){
            f.call(c, enumeration.values[i]);
        }
    };
    return enumeration;
}

/**
 * И тут же представлен пример использования типа-перечисления на карточной игре:
 */

/**
 * Определение класса для представления игральной карты.
 */
function Card(suit, rank){
    this.suit = suit;
    this.rank = rank;
}

Card.Suit = enumeration({Clubs: 1, Diamonds: 2, Hearts: 3, Spades: 4});
Card.Rank = enumeration({Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, Eight: 8, Nine: 9, Ten: 10,
Jack: 11, Queen: 12, King: 13, Ace: 14});

/**
 * Определение текстового представления карты.
 */
Card.prototype.toString = function () {
    return this.rank.toString() + " " + this.suit.toString();
};

/**
 * Сравнение двух карт в соответствии с правилами игры в покер.
 */
Card.prototype.compareTo = function (that) {
    if (this.rank < that.rank) return -1;
    if (this.rank > that.rank) return 1;
    return 0;
};

/**
 * Функция упорядочения карт в соответствии с правилами игры в покер.
 */
Card.orderByRank = function (a, b) {
    return a.compareTo(b);
};

/**
 * Функция упорядочения карт в соответствии с правилами игры в бридж.
 */
Card.orderBySuit = function (a, b) {
    if (a.suit < b.suit) return -1;
    if (a.suit > b.suit) return 1;
    if (a.rank < b.rank) return -1;
    if (a.rank > b.rank) return 1;
    return 0;
};

/**
 * Определение класса представления стандартной колоды карт.
 */
function Deck() {
    let cards = this.cards = [];
    Card.Suit.foreach(function (s) {
        Card.Rank.foreach(function (r) {
            cards.push(new Card(s, r));
        })
    })
}

/**
 * Метод перемешивания: тасует колоду карт и возвращает ее.
 */
Deck.prototype.shuffle = function () {
    let deck = this.cards,
        len = deck.length;
    for (let i = len - 1; i > 0; i--){
        let r = Math.floor(Math.random()*(i+1)), temp;
        temp = deck[i];
        deck[i] = deck[r];
        deck[r] = temp;
    }
    return this;
};

/**
 * Метод раздачи: возвращает массив карт.
 */
Deck.prototype.deal = function (n) {
    if (this.cards.length < n) throw "Карт для выдачи не хватает.";
    return this.cards.splice(this.cards.length - n, n);
};

/**
 * Наконец создадим новую колоду карт, перетасуем ее и раздадим.
 */
let deck = (new Deck()).shuffle();
let hand = deck.deal(13).sort(Card.orderBySuit);
console.log(hand);
console.log("===============================================");

/*==============================================================*/
/*==============================================================*/

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

/**
 * Объект FilteredSet обертывает указанный объект множества и применяет
 * указанный фильтр в своем методе add(). Обращение ко всем остальным базовым
 * методам просто передается обернутому экземпляру множества.
 */
let FilteredSet = Set.extend(
    function FilteredSet(set, filter) {
        this.set = set;
        this.filter = filter;
    },
    {
        add: function () {
            if (this.filter){
                for (let i = 0; i < arguments.length; i++){
                    let v = arguments[i];
                    if (!this.filter(v)){
                        throw new Error("FilteredSet: значение " + v + " отвергнуто фильтром.");
                    }
                }
            }
            this.set.add.apply(this.set, arguments);
            return this;
        },
        remove: function () {
            this.set.remove.apply(this.set, arguments);
            return this;
        },
        contains: function (v) {
            return this.set.contains(v);
        },
        size: function () {
            return this.set.size();
        },
        foreach: function (f, c) {
            return this.set.foreach(f, c);
        }
    }
);

/**
 * Пример реализован на создании подкласса NonNullSet.
 * Создает множество из общего множества при помощи фильтрации
 * нулевых элементов.
 */
let nonNullSet = new FilteredSet(new Set(), function (x) {
    return x !== null;
});

/*==============================================================*/
/*==============================================================*/



