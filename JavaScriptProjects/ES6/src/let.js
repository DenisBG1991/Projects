let buttons = document.querySelectorAll('button');

for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.innerText = i;
    button.onclick = function (e) {
        console.log(i);
    }
}