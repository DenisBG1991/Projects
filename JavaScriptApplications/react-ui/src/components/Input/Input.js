import React from 'react';

function Input({type, name, placeholder}) {
    return (
        <div className="mdc-textfield">
            <input
                className="mdc-textfield__input"
                type={type}
                name={name}
                placeholder={placeholder}
            />
        </div>
    );
}

export default Input;