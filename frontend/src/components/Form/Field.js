// Un Field (un champ) est un composant React enveloppé dans le composant de haut niveau createField exposé par la bibliothèque. 
// Il lie également l'état du Field interne à refléter dans l'interface utilisateur.

import React from 'react';

const Field = ({ name, type, value, onChange, children }) => {
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type={type} value={value} onChange={onChange} id={name} name={name} className="form-control" noValidate />
    </div>
}

export default Field;