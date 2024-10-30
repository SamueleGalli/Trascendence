// Struttura per la palla
export class Ball
{
    constructor(x, y, radius, speed)
    {
        this.x = x;
        this.y = y;
        if (Math.random() < 0.5)
            this.speedx = -speed;
        else
            this.speedx = speed;        
        this.speedy = speed;
        this.radius = radius;

        // Crea l'elemento HTML per la palla
        this.element = document.createElement('div');
        this.element.style.width = '20px';
        this.element.style.height = '20px';
        this.element.style.backgroundColor = 'gray';
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
        this.deltaTime = 0.016; // Approssimativamente 60 FPS
        this.playerScore = 0;
        this.aiScore = 0;
        this.setsToWin = 2; // Numero di set necessari per vincere
    }
}

// Struttura per la racchetta
export class Paddle
{
    constructor(x, y, width, height, color, speed)
    {
        this.x = x;
        this.y = y;
        this.width = width; // Larghezza del paddle
        this.height = height;
        this.speed = speed;
        
        // Crea l'elemento HTML per la racchetta
        this.element = document.createElement('div');
        this.element.style.width = this.width + 'px'; // Usa this.width per la larghezza
        this.element.style.height = this.height + 'px';
        this.element.style.backgroundColor = color;
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
            this.y = Math.max(0, this.y - this.speed);
        else if (direction === 'down')
            this.y = Math.min(window.innerHeight - this.height, this.y + this.speed);
        this.updatePosition(); // Assicurati che la posizione venga aggiornata dopo il movimento
    }
}
