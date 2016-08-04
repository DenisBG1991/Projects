selection = {
    getText : function() {
        var txt = '';
        if (txt = window.getSelection) // Not IE, используем метод getSelection
            txt = window.getSelection().toString();
        else // IE, используем объект selection
            txt = document.selection.createRange().text;
        alert(txt);
    }
};