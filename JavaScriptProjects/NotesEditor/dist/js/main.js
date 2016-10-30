/**
 * Основная функция, которая запускает обработчики сбытий.
 */
function main() {
    // Подгрузка созраненных записей из хранилища.
    let textarea = document.getElementById('node_editor');
    textarea.value = localStorage.getItem("text");
    textarea.innerHTML = textarea.value;

    // Подгрузка созраненных тегов из хранилища.
    searchTags();

    let but_save = document.getElementById('save');
    let but_clean = document.getElementById('clean');
    let but_filter = document.getElementById('filter');
    let but_delete = document.getElementById('delete');

    let param_for_save = [but_save, "click", save];
    let param_for_clean = [but_clean, "click", clean];
    let param_for_add = [textarea,"blur", add];
    let param_for_input = [textarea,"input", entry];
    let param_for_filter = [but_filter, "click", filtered];
    let param_for_delete = [but_delete, "click", deleter];
    let parameters = [but_save, but_clean, textarea, but_filter, but_delete];
    let param_for_onbeforeunload = [window, "beforeunload", beforeunload, parameters];

    addHandler(...param_for_save);
    addHandler(...param_for_clean);
    addHandler(...param_for_add);
    addHandler(...param_for_input);
    addHandler(...param_for_filter);
    addHandler(...param_for_delete);
    addHandler(...param_for_onbeforeunload);
}
/*---------------------------------------------------------------------------------------------------------*/
/**
 * Осуществляет поиск всех сохраненных тегов в хранилище и добаление их на страницу.
 */
function searchTags(){
    var local_array = [];
    if (localStorage.getItem("tags")) {
        local_array = localStorage.getItem("tags");
        local_array = local_array.split(",");
    }
    if (local_array.length != 0){
        let select = document.getElementsByTagName('select')[0];
        for (let m = 0; m < local_array.length; m++){
            let newOpt = document.createElement('option');
            newOpt.innerHTML = local_array[m];
            newOpt.value = local_array[m];
            select.appendChild(newOpt);
        }
    }
}
/*---------------------------------------------------------------------------------------------------------*/
function entry() {
    var textarea = document.getElementById('node_editor');
    textarea.innerHTML = textarea.value;
}
/*---------------------------------------------------------------------------------------------------------*/
/**
 * Сохраняет записи в хранилище.
 */
function save() {
    event.preventDefault();
    let textarea = document.getElementById('node_editor');
    let value = textarea.value;
    localStorage.setItem("text", value);
    let nodeEditor = $('article');
    nodeEditor[0].className = nodeEditor[0].className + " saved";
}
/*---------------------------------------------------------------------------------------------------------*/
/**
 * Очищает страницу записей.
 */
function clean() {
    event.preventDefault();
    let textarea = document.getElementById('node_editor');
    textarea.value = "";
    let nodeEditor = $('article');
    nodeEditor[0].className = "nodeEditor";
}
/*---------------------------------------------------------------------------------------------------------*/
/**
 * Добавляет новые теги на закладку.
 */
function add() {
    let textarea = document.getElementById('node_editor');
    let text = textarea.value;
    let pattern = /#\w+/g;
    let matchers = text.match(pattern);

    if (!matchers){
        return;
    }
    matchers = returnUnique(matchers);
    if (matchers.length != 0){
        let result = [];
        for (let n = 0; n < matchers.length; n++){
            result.push(matchers[n].substring(1));
        }
        let opt = $('option');
        let tags = [];
        if (opt.length != 0){
            for (let y = 0; y < opt.length; y++){
                tags.push(opt[y].value);
            }
            let add = [];
            for (let i = 0; i < result.length; i++){
                for (let j =0; j < tags.length; j++) {
                    var r = "";
                    if (result[i] == tags[j]) {
                        r = "";
                        break;
                    }
                    else {
                        r = result[i];
                    }
                }
                if (r) add.push(r);
            }
            if (add.length != 0){
                let select = document.getElementsByTagName('select')[0];
                for (let m = 0; m < add.length; m++){
                    let newOpt = document.createElement('option');
                    newOpt.innerHTML = add[m];
                    newOpt.value = add[m];
                    select.appendChild(newOpt);
                }
            }
        }
        else {
            let select = document.getElementsByTagName('select')[0];
            for (let m = 0; m < result.length; m++){
                let newOpt = document.createElement('option');
                newOpt.innerHTML = result[m];
                newOpt.value = result[m];
                select.appendChild(newOpt);
            }
        }
    }
    //domRangeHighlight();
}
/*---------------------------------------------------------------------------------------------------------*/
/**
 * Вспомогательная функция для выбора уникальных хначений.
 * @param arr
 * @returns {Array}
 */
function returnUnique(arr) {
    var obj = {};
    for (var i = 0, i_max = arr.length; i < i_max; i++) {
        obj[arr[i]] = ''; // запоминаем элемент как свойство объекта
    }
    return Object.keys(obj);
}
/*---------------------------------------------------------------------------------------------------------*/
function filtered() {
    event.preventDefault();

    let arr = [];
    $("select[name=tags] option:selected").each(function() {
        arr.push($(this).val());
    });
    let tag = String(arr);

    let textarea = document.getElementById('node_editor');
    let text = textarea.value;
    if (!text){
        return;
    }
    text = text.split("\n");
    let new_arr = [];
    let old_arr = [];
    for (let t = 0; t < text.length; t++){
        let mat = text[t].match(tag);
        if (mat){
            new_arr.push(text[t]);
        }
    }
    for (let r = 0; r < text.length; r++){
        for(let u = 0; u < new_arr.length; u++){
            var w = "";
            if (text[r] == new_arr[u]){
                w = "";
                break;
            }
            else {
                w = text[r];
            }
        }
        if (w) old_arr.push(w);
    }
    let finite_arr = new_arr.concat(old_arr);
    let new_text = finite_arr.join("\n");
    $('textarea').val(new_text);
}
/*---------------------------------------------------------------------------------------------------------*/
/**
 * Удаляет выбранный тег.
 */
function deleter() {
    event.preventDefault();
    let arr = [];
    $("select[name=tags] option:selected").each(function() {
        arr.push($(this).val());
    });
    let tag = String(arr);
    if (localStorage.getItem("tags")) {
        let old_local_array = [];
        old_local_array = localStorage.getItem("tags");
        old_local_array = old_local_array.split(",");
        for (let r = 0; r < old_local_array.length; r++){
            if(old_local_array[r] == tag){
                delete old_local_array[r];
            }
        }
        localStorage.setItem("tags", old_local_array);

        let opt = $('option');
        if (opt.length != 0){
            for (let y = 0; y < opt.length; y++){
                if (opt[y].value == tag){
                    let select = document.getElementsByTagName('select')[0];
                    select.removeChild(opt[y]);
                }
            }
        }
    }
    else {
        let opt = $('option');
        if (opt.length != 0){
            for (let y = 0; y < opt.length; y++){
                if (opt[y].value == tag){
                    let select = document.getElementsByTagName('select')[0];
                    select.removeChild(opt[y]);
                }
            }
        }
    }
}
/*---------------------------------------------------------------------------------------------------------*/
/**
 * Вспомогательная функция для сохранения в хранилище всех использовавшихся тегов.
 */
function tagPreservation() {
    let local_arrays = [];
    let opt = $('option');
    if (opt.length != 0) {
        for (let y = 0; y < opt.length; y++) {
            local_arrays.push(opt[y].value);
        }
    }
    let old_local_array = [];
    if (localStorage.getItem("tags")){
        old_local_array = localStorage.getItem("tags");
        old_local_array = old_local_array.split(",");
    }
    let news = [];
    if (old_local_array.length == 0) {
        news = local_arrays;
    }
    else {
        for (let i = 0; i < local_arrays.length; i++){
            for (let j =0; j < old_local_array.length; j++) {
                var r = "";
                if (local_arrays[i] == old_local_array[j]) {
                    r = "";
                    break;
                }
                else {
                    r = local_arrays[i];
                }
            }
            if (r) news.push(r);
        }
    }
    for (let u = 0; u < news.length; u++){
        old_local_array.push(news[u]);
    }
    localStorage.setItem("tags", old_local_array);
}
/*---------------------------------------------------------------------------------------------------------*/
/**
 * Эта функция запускается перед закрытием окна для удаления всех созданных подписок на события и вызова
 * функции tagPreservation().
 */
function beforeunload(_save, _clean, _textarea, _filter, _delete){
    tagPreservation();
    removeHandler(_save, 'click', save);
    removeHandler(_clean, "click", clean);
    removeHandler(_textarea,"blur", add);
    removeHandler(_textarea,"input", entry);
    removeHandler(_filter, "click", filtered);
    removeHandler(_delete, "click", deleter);
}
/*---------------------------------------------------------------------------------------------------------*/
/*
function domRangeHighlight() {
    let arr = [];
    $("select[name=tags] option:selected").each(function() {
        arr.push($(this).val());
    });
    let text = String(arr);
    let textarea = document.getElementById('node_editor');
    var root = textarea;
    var content = textarea.innerHTML;
    // Проверим есть ли совпадения с переданным текстом
    if (content.indexOf(text) >= 0) {
        if (document.createRange) {
            // Если есть совпадение, и браузер поддерживает Range, создаем объект
            var rng = document.createRange();
            // Ставим верхнюю границу по индексу совпадения,
            rng.setStart(root, content.indexOf(text));
            // а нижнюю по индексу + длина текста
            rng.setEnd(root, content.indexOf(text) + text.length);
            // Создаем спан с синим фоном
            var highlightDiv = document.createElement('span');
            highlightDiv.style.Color = 'blue';
            // Обернем наш Range в спан
            rng.surroundContents(highlightDiv);
        } else {
            alert( 'Вероятно, у вас IE8-, смотрите реализацию TextRange ниже' );
        }
    } else {
        alert( 'Совпадений не найдено' );
    }
    textarea.value = textarea.innerHTML;
}
*/

