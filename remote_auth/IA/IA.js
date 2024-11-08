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
        
        // Inizializza variabili per calcolare eventuali rimbalzi della palla
        const maxBounces = 10; // Limite massimo di rimbalzi da calcolare per evitare loop infiniti
        let bounces = 0; // Contatore per il numero di rimbalzi

        // Calcola il rimbalzo se la palla supera i bordi dello schermo
        while ((futureBallY < 0 || futureBallY > window.innerHeight) && bounces < maxBounces)
        {
            bounces++; // Incrementa il contatore dei rimbalzi
            if (futureBallY < 0)
            {
                // La palla ha colpito il bordo superiore
                futureBallY = -futureBallY; // Calcola la nuova posizione Y dopo il rimbalzo
            }
            else if (futureBallY > window.innerHeight)
            {
            // La palla ha colpito il bordo inferiore
            futureBallY = 2 * window.innerHeight - futureBallY; // Calcola la nuova posizione Y dopo il rimbalzo
            }
        }
    // Restituisci la posizione Y prevista della palla dopo aver considerato i rimbalzi
    return futureBallY;
    }
    // Se la palla non si sta muovendo verso la racchetta dell'IA, restituisci la posizione Y attuale
    return ball.y;
}

// Funzione per aggiornare la posizione della racchetta IA
export function updateAIPaddle(ai, ball) 
{
    let targetY = predictBallY(ball); // Previsione posizione palla
    // Distanza tra la posizione della palla prevista e il centro della racchetta
    let distance = targetY - (ai.y + ai.height / 2);
    let direction = Math.sign(distance);  // Decidi la direzione del movimento usando Math.sign

    // Usa una velocità basata su un fattore fisso
    let aiSpeed = ai.speed * 0.1;  // Riduce la velocità dell'AI in base al fattore
    // Muovi la racchetta basandosi sulla velocità e sulla distanza
    if (Math.abs(distance) > aiSpeed)
        ai.y += aiSpeed * direction;
    else
        ai.y += distance;
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
