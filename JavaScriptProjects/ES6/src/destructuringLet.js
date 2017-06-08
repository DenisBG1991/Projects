//let languages = ["JavaScript", "PHP", "Python", "Ruby"];
//let languagesMore = ["JavaScript", "PHP", ["C++", "Java"], "Python", "Ruby"];

//let [js, php, python, ruby] = languages;
//let [js, php, python, ruby, c] = languages;
//let [js, , python, ruby] = languages;
//let [js, ...rest] = languages;
//let [js, php, python, ruby, c = "C"] = languages;
//let [js, php, [c, java], python, ruby] = languagesMore;

//console.log(js, php, c, java, python, ruby);

function computeLanguages([java, javascript]) {
    console.log(java, javascript);
}

computeLanguages(["Java", "JavaScript"]);

function getLanguages() {
    return ["Java", "PHP", "Ruby"]
}

let [java, php, ruby] = getLanguages();

console.log(java, php, ruby);

let yes = "yes",
    no = "no";

[yes, no] = [no, yes];

console.log(`Yes is ${yes}, No is ${no}`);