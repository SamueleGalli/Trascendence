import { isWon, setdown, setup } from "./state.js";
// Funzione per muovere la racchetta sinistra
export function move_player(leftPaddle, event)
{
    if (isWon())
        return;
    switch (event.key)
    {
        case 'w': // Tasto W per muovere su
            leftPaddle.move('up');
            break;
        case 's': // Tasto S per muovere giù
            leftPaddle.move('down');
            break;
    }
}

export function updown()
{
    document.addEventListener('keydown', (event) => {
        if (event.key === 'w')
            setup(true) // Tasto W premuto
        else if (event.key === 's')
            setdown(true); // Tasto S premuto
    });
    document.addEventListener('keyup', (event) => {
        if (event.key === 'w')
            setup(false); // Tasto W rilasciato
        else if (event.key === 's')
            setdown(false); // Tasto S rilasciato
    });
}