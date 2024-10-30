import { Ball, Paddle, Timer } from './ball_and_paddle.js';
import { checkscore, updateScoreBoard } from './win_lose.js';
import { move, paddle_collision } from './collision.js';
import { updateAIPaddle } from './IA.js';
import { isdown, isup, isWon, setWon } from './state.js';
import { updown } from './moving_paddle.js';


/*
    ia troppo veloce e non sbaglia mai
    controllare problemi di collisione palla racchetta sinistra
*/
export function simulateGame()
{
    // Inizializza la palla e le racchette
    const ball = new Ball(window.innerWidth / 2 - 10, window.innerHeight / 2 - 10, 10, 7);
    const rightPaddle = new Paddle(window.innerWidth - 10, window.innerHeight / 2 - 50, 10, 110, 'black', 5);
    const leftPaddle = new Paddle(0, window.innerHeight / 2 - 50, 10, 110, 'black', 15);
    const timer = new Timer();
    const title = document.getElementById('gameTitle');
    const button = document.getElementById('aiButton');
    const canvas = document.getElementById('gameCanvas'); // Assicurati di avere un canvas nel tuo HTML
    const ctx = canvas.getContext('2d');
    
    setWon(false); // Inizializza 'won' a false
    
    // Rimuovi il titolo e il pulsante
    if (title)
        title.remove(); // Rimuove il titolo se esiste
    
    if (button)
        button.remove(); // Rimuove il pulsante se esiste
    
    updateScoreBoard(timer); // Imposta tabellone punti
    
    // Funzione principale del ciclo di gioco
    updown();
    
    function drawPaddle(paddle)
    {
        ctx.fillStyle = paddle.color;
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    }

    function gameLoop()
    {
        if (isWon())
            return;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas
                
        paddle_collision(leftPaddle, ball, canvas);
        paddle_collision(rightPaddle, ball, canvas);
        move(ball);
        checkscore(ball, timer);
        
        // Muovi la racchetta sinistra
        if (isup())
            leftPaddle.move('up');
        else if (isdown())
            leftPaddle.move('down');
        updateAIPaddle(rightPaddle, ball);
        drawPaddle(rightPaddle);
        // Richiama gameLoop al prossimo frame
        requestAnimationFrame(gameLoop);
    }

    // Inizializza il ciclo di gioco con un'attesa di 10 secondi
    setTimeout(() => 
    {
        gameLoop(); // Avvia gameLoop dopo 10 secondi
    }, 1000);
}