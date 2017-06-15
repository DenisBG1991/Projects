// function incrementAction(amount) {
//     return { type: 'INCREMENT', amount };
// }
//
// function decrementAction(amount) {
//     return { type: 'DECREMENT', amount };
// }
//
// function resetAction() {
//     return { type: 'RESET' };
// }

function incrementAction(amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                type: 'INCREMENT',
                amount
            });
        }, 1000);
    });
}

function decrementAction(amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                type: 'DECREMENT',
                amount
            });
        }, 1000);
    });
}

function resetAction() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                type: 'RESET'
            });
        }, 1000);
    });
}

export {incrementAction, decrementAction, resetAction};