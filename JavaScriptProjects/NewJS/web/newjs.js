/**
 * Динамическое подключение библиотеки JQuery:
 */
/*var script = document.createElement('script');
 script.type = 'text/javascript';
 script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
 document.getElementsByTagName('head')[0].appendChild(script);
 script.addEventListener('load', function(){
 $(document).ready(function() {
 alert('jQuery загружен.');
 $("button").click(users.showFirst.bind(users));
 });
 }, false);*/

$(document).ready(function() {
    $("#Users").click(users.showFirst.bind(users));
    $("#Cars").click(cars.showFirst.bind(cars));
});

var users = {
    data: [
        {name: 'John Smith'},
        {name: 'Ellen Simons'}
    ],
    showFirst: function () {
        alert(this.data[1].name);
    }
};
//users.showFirst();

var cars = {
    data:[
        {name: 'Mitzubisi Lancer'},
        {name: 'Chevrolet Impala' }
    ]
};
cars.showFirst = users.showFirst.bind(cars);
//cars.showFirst();



