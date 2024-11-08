export function move(ball)
{
    ball.x += ball.speedx; // Aggiorna la posizione orizzontale
    ball.y += ball.speedy; // Aggiorna la posizione verticale

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
    // Controlla se la palla è in contatto orizzontale con il paddle
    const isCollidingHorizontal = (
        ball.x - ball.radius <= paddle.x + paddle.width &&  // Lato destro del paddle
        ball.x + ball.radius >= paddle.x                    // Lato sinistro del paddle
    );

    // Controlla se la palla è in contatto verticale con il paddle
    const isCollidingVertical = (
        ball.y + ball.radius >= paddle.y &&                 // Parte superiore del paddle
        ball.y - ball.radius <= paddle.y + paddle.height    // Parte inferiore del paddle
    );

    // Controllo specifico per la collisione con gli angoli:
    // Se la palla tocca il bordo superiore del paddle
    const isCollidingTopCorner = ball.y + ball.radius >= paddle.y && ball.y < paddle.y;
    // Se la palla tocca il bordo inferiore del paddle
    const isCollidingBottomCorner = ball.y - ball.radius <= paddle.y + paddle.height && ball.y > paddle.y + paddle.height;

    // Se c'è una collisione (orizzontale e verticale) e non c'era al frame precedente
    if (isCollidingHorizontal && isCollidingVertical && !ball.isCollidingLastFrame) {
        
        if (isCollidingTopCorner || isCollidingBottomCorner)
        {
            // Se la palla colpisce un angolo, inverti sia `speedx` sia `speedy` per un rimbalzo diagonale
            ball.speedx = -ball.speedx;
            ball.speedy = -ball.speedy;
        }
        else
        {
            // Se non colpisce un angolo, inverte solo `speedx` per un rimbalzo orizzontale
            ball.speedx = -ball.speedx;
        }

        // Calcola un leggero cambio di direzione verticale se non è un rimbalzo angolare
        if (!(isCollidingTopCorner || isCollidingBottomCorner))
        {
            // Determina il punto di impatto (0 = bordo superiore, 1 = bordo inferiore del paddle)
            let impactPoint = (ball.y - paddle.y) / paddle.height;
            // Modifica `speedy` per aggiungere una deviazione alla palla
            ball.speedy += (impactPoint - 0.5) * 2;  // Maggiore deviazione per impatti vicini ai bordi
        }

        // Evita collisioni multiple nello stesso frame spostando la palla di un piccolo passo
        ball.x += ball.speedx * 0.1;
        ball.y += ball.speedy * 0.1;
    }

    // Aggiorna lo stato della collisione per il prossimo frame
    // (memorizza se c'era una collisione in questo frame)
    ball.isCollidingLastFrame = isCollidingHorizontal && isCollidingVertical;
}


