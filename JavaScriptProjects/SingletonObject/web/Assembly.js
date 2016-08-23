/**
 * Поскольку данная задача является демонстрационной, без наличия сервера,
 * то приходится вручную создавать JSON оъект, соответствующий определенному
 * html-тегу.
 *
 * В подобном JSON объекте необходимо создать обязательные свойства tag и content,
 * определенные как строка, и свойства attr, events, style, определенные как
 * объекты, (в случае ненадобности этих свойств создать пустые объекты).
 *
 * В данном случае представлен объекты для тега <a> как предоставлено
 * в описании задачи.
 */
var tegA = {};
tegA.tag = "a";
tegA.content = "Это тег объекта tegA!";
tegA.attr = {href : "/app.php?123", id : "someID"};
tegA.events = {click : "alert(this.href);", focus : "this.className='active'"};
tegA.style = {width : "100px", height : "200px"};

var tegB = {};
tegB.tag = "a";
tegB.content = "Это тег объекта tegB!";
tegB.attr = {href : "/app.php?124", id : "someID1"};
tegB.events = {click : "alert(this.href);", focus : "this.className='active'"};
tegB.style = {width : "100px", height : "200px"};