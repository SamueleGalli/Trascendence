
export function move(ball)
{
    ball.x += ball.speedx;
    ball.y += ball.speedy;

    // Controlla le collisioni con i bordi
    if (ball.y <= 0)
    {
        ball.y = 0; // Limita la palla al bordo superiore
        ball.speedy = -ball.speedy; // Inverte la direzione verticale
    }
    else if (ball.y + ball.radius * 2 >= window.innerHeight)
    {
        ball.y = window.innerHeight - ball.radius * 2; // Limita la palla al bordo inferiore
        ball.speedy = -ball.speedy; // Inverte la direzione verticale
    }
    ball.updatePosition(); // Aggiorna la posizione visiva della palla
}

export function paddle_collision(paddle, ball)
{
    // Controlla se la palla è a contatto con il paddle
    if (
        ball.x - ball.radius <= paddle.x + paddle.width &&  // Verifica il lato destro del paddle
        ball.x + ball.radius >= paddle.x &&                // Verifica il lato sinistro del paddle
        ball.y >= paddle.y &&                              // Verifica la parte superiore del paddle
        ball.y <= paddle.y + paddle.height                 // Verifica la parte inferiore del paddle
    )
    {
        // Inverti la direzione orizzontale della palla per simulare il rimbalzo
        ball.speedx = -ball.speedx;
        // Sposta leggermente la palla nella direzione opposta solo di una piccola distanza
        // per prevenire ripetuti rilevamenti di collisione nello stesso frame
        ball.x += ball.speedx * 0.1; 
    }
}
