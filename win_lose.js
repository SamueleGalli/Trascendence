
import  { setWon } from './state.js';

export function resetBall(ball)
{
    //ressetta la pozzizione della palla
    ball.x = window.innerWidth / 2 - 10;
    ball.y = window.innerHeight / 2 - 10;

    //randomizza la direzione x e y
    if (Math.random() > 0.5)
        ball.speedX = 1 * 7;
    else
        ball.speedX = -1 * 7;
    
    if (Math.random() > 0.5)
        ball.speedY = 1 * 7;
    else
        ball.speedY = -1 * 7;
    
}

export function updateScoreBoard(timer)
{
    // Controlla se esiste già il div con id 'scoreBoard'; se non esiste, lo crea.
    let scoreBoard = document.getElementById('scoreBoard');
    if (!scoreBoard)
    {
        scoreBoard = document.createElement('div'); // Crea il div del pannello di punteggio.
        scoreBoard.id = 'scoreBoard'; // Imposta un id per riferirsi facilmente a questo elemento.
        
        // Posiziona il pannello dei punteggi nell'angolo superiore sinistro dello schermo.
        scoreBoard.style.position = 'absolute';
        scoreBoard.style.top = '20px';
        scoreBoard.style.left = '20px';
        
        // Applica gli stili al pannello per renderlo visibile e ordinato.
        scoreBoard.style.padding = '10px'; //fornisce spazio intorno al testo
        scoreBoard.style.backgroundColor = 'yellow'; //colore di sfondo
        scoreBoard.style.border = '1px solid #000'; //aggiunge spessore intorno al pannello
        scoreBoard.style.width = '120px';
        scoreBoard.style.fontSize = '20px'; // dimensione del testo
        scoreBoard.style.fontFamily = 'Arial, sans-serif';
        
        document.body.appendChild(scoreBoard); // Aggiunge il pannello alla pagina.
    }

    // Aggiorna il contenuto del pannello con i punteggi attuali.
    scoreBoard.innerHTML = `<strong>Player</strong>: ${timer.playerScore}<br><strong>IA</strong>: ${timer.aiScore}`;
}
    
    
export function endGame(winner)
{
    setWon(true); // Usa la funzione per impostare 'won' a true
    let timeLeft = 3; // Tempo iniziale del timer
    const message = document.createElement('div'); // Crea un nuovo elemento <div> per il messaggio.
    // Posiziona il messaggio al centro dello schermo.
    message.style.position = 'absolute';
    message.style.top = '50%'; 
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)'; // Centra il div sia orizzontalmente che verticalmente.
    message.style.padding = '20px'; //fornisce spazio intorno al testo
    message.style.backgroundColor = '#FFF'; // Imposta il colore di sfondo a bianco.
    message.style.border = '2px solid #000'; // Aggiunge un bordo nero intorno al messaggio.
    document.body.appendChild(message); // Aggiunge il messaggio alla pagina.
    // Imposta il contenuto del messaggio
    //countdown
    message.innerHTML = `${winner} have won the match! Returning back to menu in ${timeLeft} seconds...`;
    const countdown = setInterval(() => {
        timeLeft--;
        message.innerHTML = `${winner} have won the match! Returning back to menu in ${timeLeft} seconds...`;
        
        if (timeLeft <= 0) {
            clearInterval(countdown); // Ferma il timer
            message.innerHTML = `${winner} have won the match! Returning back to menu...`; // Messaggio finale
            setTimeout(() => {
                location.reload(); // Riavvia la pagina automaticamente dopo un secondo
            }, 1000);
        }
    }, 1000); // Aggiorna ogni secondo
}

export function checkscore(ball, timer)
{
    // Se la palla esce dal lato destro (punto al giocatore)
    if (ball.x >= window.innerWidth)
    {
        timer.playerScore++; //1 punto al giocatore
        updateScoreBoard(timer); // Aggiorna la visualizzazione dei punteggi
        resetBall(ball); //ripristina palla
        setTimeout(() => {            
        }, 10000);
        return;
    }
    // Se la palla esce dal lato sinistro (punto alla IA)
    else if (ball.x <= 0)
    {
        timer.aiScore++; //1 punto alla IA
        updateScoreBoard(timer); // Aggiorna la visualizzazione dei punteggi
        resetBall(ball); //ripristina palla
        setTimeout(() => {            
        }, 10000);
        return;
    }

    // Controlla se qualcuno ha vinto
    if (timer.playerScore === timer.setsToWin)
        endGame("player"); //ha vinto il giocatore
    else if (timer.aiScore === timer.setsToWin)
        endGame("ia_player"); //ha vinto l'IA
}
