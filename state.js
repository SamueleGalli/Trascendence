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

    moveUp = value;
}


export function setdown(value)
{
    moveDown = value;
}

export function isup()
{
    return moveUp;
}
export function isdown()
{
    return moveDown;
}
