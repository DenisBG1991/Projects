export function usefulFunctions() {
    /**
     * inherit() возвращает вновь созданный объект, наследующий свойства
     * объекта-прототипа p. Использует функцию Object.create() из ECMAScript 5,
     * если она определена, иначе используется более старый прием.
     */
    function inherit(p) {
        if (p == null) throw TypeError();
        if (Object.create) return Object.create(p);
        var t = typeof p;
        if (t !== "object" && t !== "function") throw TypeError();
        function f() {
        }
        f.prototype = p;
        return new f();
    }

    /**
     * Копирует перечислимые свойства из объекта p в объект o и возвращает o.
     * Если o и p имеют свойства с одинаковыми именами, значение свойства
     * в объекте o затирается значением свойства из объекта p.
     * Эта функция не учитывает наличие методов доступа и не копирует атрибуты.
     */
    function extend(o, p) {
        for (var prop in p) {
            o[prop] = p[prop];
        }
        return o;
    }

    /**
     * Копирует перечислимые свойства из объекта p в объект o и возвращает o.
     * Если o и p имеют свойства с одинаковыми именами, значение свойства
     * в объекте o остается неизменным.
     * Эта функция не учитывает наличие методов доступа и не копирует атрибуты.
     */
    function merge(o, p) {
        for (var prop in p) {
            if (o.hasOwnProperty(prop)) continue;
            o[prop] = p[prop];
        }
        return o;
    }

    /**
     * Удаляет из объекта o свойства, отсутствующие в объекте p.
     * Возвращает o. Объект o будет являться подмножеством множества 
     * объекта p.
     */
    function restrict(o, p) {
        for(var prop in o){
            if (!(prop in p)) delete o[prop];
        }
        return o;
    }

    /**
     * Удаляет из объекта o свойства, присутствующие в объекте p.
     * Возвращает o. Объект o будет представлять разность двух множеств.
     */
    function subtract(o, p) {
        for(var prop in p){
            delete o[prop];
        }
        return o;
    }

    /**
     * Возвращает новый объект, содержащий свойства, присутствующие сразу в обоих
     * объектах, o или p. Если оба объекта имеют свойства с одним и тем же именем,
     * используется значение свойства из объекта p.
     */
    function union(o, p) {
        return extend(extend({}, o), p);
    }

    /**
     * Возвращает новый объект, содержащий свойства, присутствующие хотя бы в одном
     * из объектов, o или p.
     */
    function intersection(o, p) {
        return restrict(extend({}, o), p);
    }

    /**
     * Возвращает массив имен собственных перечислимых свойств объекта o.
     */
    function keys(o) {
        if (typeof o !== "object") throw TypeError();
        var result = [];
        for (var prop in o) {
            if (o.hasOwnProperty(prop)) {
                result.push(prop);
            }
        }
        return result;
    }

    /**
     * Добавляет в прототип объекта Object новый метод extend, который копирует все
     * собственные перечислимые и неперечислимые свойства из объекта o в объект вызова.
     */
    Object.defineProperty(Object.prototype, "extend", {
        writable: true,
        enumerate: false,
        configurable: true,
        value: function (o) {
            var names = Object.getOwnPropertyNames(o);
            for (var i = 0; i < names.length; i++){
                if (names[i] in this) continue;
                var desc = Object.getOwnPropertyDescriptor(o.names[i]);
                Object.defineProperty(this, names[i], desc);
            }
        }
    });

    /**
     * Monkey-Patching.
     */
    function trace(o,m){
        alert(this);
        var original = o[m];
        o[m] = function(){
            console.log(new Date(), "Entering", m);
            console.log(this, arguments);
            var result = original.apply(this, arguments);
            //var result = original.apply(undefined, arguments);
            console.log(new Date(), "Exiting", m);
            return result;
        };
    }
    function useTrace() {
        var f = {x: function(a) {
            alert(a);
            alert(this);
        }};
        trace(f, "x");
        var name = "Denis";
        f.x(name);
    }
}


