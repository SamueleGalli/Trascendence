//importo funzioni da altri file
import { Ball, Paddle, Timer } from './ball_and_paddle.js';
import { checkscore, updateScoreBoard } from './win_lose.js';
import { move, paddle_collision } from './collision.js';
import { updateAIPaddle } from './IA.js';
import { isdown, isup, isWon, setWon } from './state.js';
import { updown } from './moving_paddle.js';

//rallenta la ia
export function simulateGame()
{
    // Prendi l'URI dal tag script
    const gameModuleURI = document.querySelector('script[src="start_game.js"]').src;
    console.log(gameModuleURI); // Stampa l'URI completo del modulo `start_game.js`

    // Inizializza la palla e le racchette
    //inizzializzo la palla con (x, y, raggio e la sua velocità)
    const ball = new Ball(window.innerWidth / 2 - 10, window.innerHeight / 2 - 10, 10, 5);
    //le racchette inizializzate con (x, y, larghezza, altezza, colore, velocità)
    const rightPaddle = new Paddle(window.innerWidth - 10, window.innerHeight / 2 - 50, 10, 110, 'black', 4);
    const leftPaddle = new Paddle(0, window.innerHeight / 2 - 50, 10, 110, 'black', 10);
    const timer = new Timer();

    // Inizializza il titolo e il pulsante e riquadro di gioco
    const title = document.getElementById('gameTitle');
    const button = document.getElementById('aiButton');
    const canvas = document.getElementById('gameCanvas');
    setWon(false); // Inizializza 'won' a false
    
    // Rimuovi il titolo e il pulsante
    if (title)
        title.remove(); // Rimuove il titolo se esiste
    if (button)
        button.remove(); // Rimuove il pulsante se esiste
    
    updateScoreBoard(timer); // Imposta tabellone punti
    //definisco movimenti su e giu
    updown();
    
    // Funzione principale del ciclo di gioco
    function gameLoop()
    {
        //collisione racchette
        paddle_collision(leftPaddle, ball, canvas);
        paddle_collision(rightPaddle, ball, canvas);
        //se la partita e finita torni al menu
        if (isWon())
            return;

        //gestisce movimenti palla
        move(ball);
        //decide a chi dare punto
        checkscore(ball, timer);
        
        // Muovi la racchetta sinistra
        if (isup())
            leftPaddle.move('up');
        else if (isdown())
            leftPaddle.move('down');
        //se la palla supera la parte sinistra dello schermo intercetta la palla
        if (ball.x > window.innerWidth / 2)
            updateAIPaddle(rightPaddle, ball);
        // Richiama gameLoop al prossimo frame
        requestAnimationFrame(gameLoop);
    }

    // Inizializza il ciclo di gioco con un'attesa di 10 secondi
    setTimeout(() => 
    {
        gameLoop(); // Avvia gameLoop dopo 10 secondi
    }, 1000);
}