// state.js
let won = false; // Variabile locale
let moveUp = false;
let moveDown = false;

export function setWon(value)
{
    won = value; // Modifica il valore di 'won'
}

export function isWon()
{
    return won; // Restituisce il valore attuale di 'won'
}

export function setup(value)
{

    moveUp = value;  // Modifica il valore di 'moveUp'
}


export function setdown(value)
{
    moveDown = value; // Modifica il valore di 'moveDown'
}

export function isup()
{
    return moveUp; // Restituisce il valore attuale di 'moveUp'
}
export function isdown()
{
    return moveDown; // Restituisce il valore attuale di 'moveDown'
}
