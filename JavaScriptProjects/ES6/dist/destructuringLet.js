"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//let languages = ["JavaScript", "PHP", "Python", "Ruby"];
//let languagesMore = ["JavaScript", "PHP", ["C++", "Java"], "Python", "Ruby"];

//let [js, php, python, ruby] = languages;
//let [js, php, python, ruby, c] = languages;
//let [js, , python, ruby] = languages;
//let [js, ...rest] = languages;
//let [js, php, python, ruby, c = "C"] = languages;
//let [js, php, [c, java], python, ruby] = languagesMore;

//console.log(js, php, c, java, python, ruby);

function computeLanguages(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        java = _ref2[0],
        javascript = _ref2[1];

    console.log(java, javascript);
}

computeLanguages(["Java", "JavaScript"]);

function getLanguages() {
    return ["Java", "PHP", "Ruby"];
}

var _getLanguages = getLanguages(),
    _getLanguages2 = _slicedToArray(_getLanguages, 3),
    java = _getLanguages2[0],
    php = _getLanguages2[1],
    ruby = _getLanguages2[2];

console.log(java, php, ruby);

var yes = "yes",
    no = "no";

var _ref3 = [no, yes];
yes = _ref3[0];
no = _ref3[1];


console.log("Yes is " + yes + ", No is " + no);