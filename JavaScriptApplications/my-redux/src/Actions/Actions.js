function incrementAction(amount) {
    return { type: 'INCREMENT', amount };
}

function decrementAction(amount) {
    return { type: 'DECREMENT', amount };
}

function resetAction() {
    return { type: 'RESET' };
}

export {incrementAction, decrementAction, resetAction};