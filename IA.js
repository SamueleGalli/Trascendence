// Previsione della posizione Y della palla
function predictBallY(ball)
{
    // Se la palla si sta muovendo verso la IA
    if (ball.speedx > 0)
    {
        // Tempo necessario affinché la palla raggiunga la IA
        let timeToReachAI = (window.innerWidth - ball.x) / ball.speedx;

        // Prevedi la posizione Y della palla in quel momento
        let futureBallY = ball.y + ball.speedy * timeToReachAI;
        
        // Se la palla supera i bordi dello schermo, calcola il rimbalzo
        // Limitiamo il numero di rimbalzi per evitare loop infiniti
        const maxBounces = 10;
        let bounces = 0;

        // Se la palla supera i bordi dello schermo, calcola il rimbalzo
        while ((futureBallY < 0 || futureBallY > window.innerHeight) && bounces < maxBounces)
        {
            bounces++;
            if (futureBallY < 0)
            {
                // La palla rimbalza dal bordo superiore
                futureBallY = -futureBallY; // Rimbalzo
            }
            else if (futureBallY > window.innerHeight)
            {
                // La palla rimbalza dal bordo inferiore
                futureBallY = 2 * window.innerHeight - futureBallY; // Rimbalzo
            }
        }
        
        return futureBallY;
    }
    
    // Altrimenti, restituisci la posizione attuale della palla
    return ball.y;
}

// Funzione per aggiornare la posizione della racchetta IA
export function updateAIPaddle(ai, ball) 
{
    let targetY = predictBallY(ball); // Previsione posizione palla
    let distance = targetY - (ai.y + ai.height / 2);  // Distanza tra la posizione della palla prevista e il centro della racchetta
    let direction = Math.sign(distance);  // Decidi la direzione del movimento usando Math.sign
    
    // Muovi la racchetta basandosi sulla velocità e sulla distanza
    ai.y += direction * Math.min(ai.speed, Math.abs(distance));

    // Limita il movimento della racchetta all'interno dello schermo
    if (ai.y < 0)
        ai.y = 0;   
    if (ai.y + ai.height > window.innerHeight)
        ai.y = window.innerHeight - ai.height;
    if (distance < -5) 
        ai.move('up'); // Muovi verso l'alto
    else if (distance > 5) 
        ai.move('down'); // Muovi verso il basso
}
