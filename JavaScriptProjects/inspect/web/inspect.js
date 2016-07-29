function fac(n){
    var inspector = function ($){return eval($);};
    inspect (inspector, "Вход в функцию fac()");
    var result = 1;
    while (n>1){
        result = result * n;
        n --;
        inspect(inspector, "fac() loop");
    }
    inspect(inspector, "Выход их функции fac()");
    return result;
}

function inspect (inspector, title){
    var expression, result;
    if ("ignor" in arguments.callee) return;
    while (true){
        var message = "";
        if (title) message = title + "\n";
        if (expression) message += "\n" + expression + " ==> " + result + "\n";
        else expression = "";
        message += "Введите выражение которое следует вычислить: ";
        expression = prompt(message, expression);
        if (!expression) return;
        result = inspector(expression);
    }
}