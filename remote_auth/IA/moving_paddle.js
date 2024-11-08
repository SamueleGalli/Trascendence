import { isWon, setdown, setup } from "./state.js";
// Funzione per muovere la racchetta sinistra
export function updown()
{
    // Aggiunge un listener per l'evento 'keydown'
    document.addEventListener('keydown', (event) => {
        // Verifica se il tasto premuto è 'w'
        if (event.key === 'w')
            setup(true)
        // Chiama la funzione setup se 'w' e stato premuto
        // Verifica se il tasto premuto è 's'
        else if (event.key === 's')
            setdown(true); 
        // Chiama la funzione setup se 's' e stato premuto
    });
     // Aggiunge un listener per l'evento 'keyup'
    document.addEventListener('keyup', (event) => {
        // Verifica se il tasto rilasciato è 'w'
        if (event.key === 'w')
            setup(false);
        // Chiama la funzione setup se 'w' e stato rilasciato
        // Verifica se il tasto rilasciato è 's'
        else if (event.key === 's')
            setdown(false); 
        // Chiama la funzione setup se 's' e stato rilasciato
    });
}