var book = {
    "page" : 12,
    "len" : 90,
    "title" : "Ololo"
};

for (var nam in book) {
    alert (nam);
}
displ(book);

function displ (obj){
    var names = "";
    for (var name in obj) {
        names += name + "\n";
        alert (names);
    }
}