// Struttura per la palla
export class Ball
{
    constructor(x, y, radius, speed)
    {
        // Posizione iniziale della palla
        this.x = x;
        this.y = y;

        // indica se la palla si muovera verso destra o sinistra
        if (Math.random() < 0.5)
            this.speedx = -speed;
        else
            this.speedx = speed;        
        //velocità della palla
        this.speedy = speed;
        // Raggio della palla
        this.radius = radius;
        //frame di collisione
        this.isCollidingLastFrame = false;

        // Crea l'elemento HTML per la palla
        this.element = document.createElement('div');
        //dimensione della palla
        this.element.style.width = '20px';
        this.element.style.height = '20px';
        //colore
        this.element.style.backgroundColor = 'green';
        //forma
        this.element.style.borderRadius = '50%';
        this.element.style.position = 'absolute';
        this.updatePosition(); // Aggiorna la posizione iniziale della palla

        // Aggiunge la palla al corpo del documento
        document.body.appendChild(this.element);
    }

    // Metodo per aggiornare la posizione della palla
    updatePosition()
    {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
}

export class Timer
{
    constructor()
    {
        this.playerScore = 0; // Punteggio del giocatore
        this.aiScore = 0; // Punteggio dell'IA
        this.setsToWin = 2; // Numero di set necessari per vincere
    }
}

// Struttura per la racchetta
export class Paddle
{
    constructor(x, y, width, height, color, speed)
    {
        // Posizione iniziale della racchetta
        this.x = x;
        this.y = y;
        this.width = width; // Larghezza del racchetta
        this.height = height; // Altezza del racchetta
        this.speed = speed; // Velocità della racchetta
        
        // Crea l'elemento HTML per la racchetta
        this.element = document.createElement('div');
        this.element.style.width = this.width + 'px'; //largezza
        this.element.style.height = this.height + 'px'; // altezza
        this.element.style.backgroundColor = color; // colore
        this.element.style.position = 'absolute';
        this.updatePosition(); // Aggiorna la posizione iniziale della racchetta
        
        // Aggiunge la racchetta al corpo del documento
        document.body.appendChild(this.element);
    }

    // Metodo per aggiornare la posizione della racchetta
    updatePosition()
    {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    // Metodo per muovere la racchetta
    move(direction) 
    {
        if (direction === 'up')
            this.y = Math.max(0, this.y - this.speed); //sposto su senza superare 0
        else if (direction === 'down')
            this.y = Math.min(window.innerHeight - this.height, this.y + this.speed); //sposto giu senza superare la finestra
        // aggiorna la posizione
        this.updatePosition();
    }
}
