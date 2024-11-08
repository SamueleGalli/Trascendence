require "oauth2"    # Per la gestione dell'autenticazione OAuth2
require "sinatra"   # Framework per costruire il server web
require "webrick"   # Server web per ospitare il gioco
require "json"      # Per lavorare con dati in formato JSON
require "securerandom"  # Per generare identificatori unici (ID sessioni)
require 'logger'    # Per gestire i log

# Configura le credenziali OAuth2 per autenticarsi con il servizio 42
UID = "u-s4t2ud-d92dc37f98350dab3f74c31a492de6cd1db73874ba9f7798374123b4e2fa8672"  # Identificativo dell'app
SECRET = "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"  # Segreto dell'app
REDIRECT_URI = "http://localhost:4567/callback"  # URL a cui l'utente sarà reindirizzato dopo l'autenticazione

# Crea il client OAuth2 per interagire con il servizio API di 42
client = OAuth2::Client.new(
  UID,
  SECRET,
  site: "https://api.intra.42.fr",  # URL del sito API di 42
  authorize_url: "/oauth/authorize",  # URL per avviare il processo di autorizzazione
  token_url: "/oauth/token"  # URL per ottenere il token di accesso
)

# Memorizza gli utenti registrati (utilizza l'email come chiave per identificare gli utenti)
REGISTERED_USERS = {}

# Memorizza le sessioni attive (hash con email come chiave e ID sessione come valore)
ACTIVE_SESSIONS = {}

# Configura Sinatra per ascoltare sulla porta 4567 per le richieste di autenticazione
set :port, 4567

# Disabilita il logging predefinito di Sinatra (Rack::Logger) e usa un logger personalizzato
set :logging, false  # Disabilita il logger predefinito di Sinatra
configure do
  set :logger, Logger.new(STDOUT)  # Crea un logger che stampa i log sulla console
  settings.logger.level = Logger::INFO  # Imposta il livello del logger a INFO
end

# Definisce la route principale per avviare l'autenticazione OAuth2
get '/' do
  # Crea l'URL per la pagina di autorizzazione di 42
  authorization_url = client.auth_code.authorize_url(redirect_uri: REDIRECT_URI)
  
  # Logga l'URL generato
  settings.logger.info("Generata URL di autorizzazione per l'utente.")
  
  # Mostra il link per permettere all'utente di autenticarsi con 42
  "<a href='#{authorization_url}'>Accedi con 42</a>"
end

# Callback che gestisce il codice di autorizzazione e scambia il codice per un token di accesso
get '/callback' do
  begin
    # Ottieni il codice di autorizzazione dalla query string
    code = params[:code]
    
    # Scambia il codice di autorizzazione con un token di accesso
    token = client.auth_code.get_token(code, redirect_uri: REDIRECT_URI)
    
    # Usa il token per ottenere le informazioni dell'utente
    user_info = token.get("/v2/me").parsed
    
    # Estrai il nome utente e l'email dalle informazioni dell'utente
    username = user_info["login"]
    email = user_info["email"]
    
    # Controlla se l'email o il nome utente sono già registrati
    if REGISTERED_USERS.key?(email)
      return "Errore: L'utente con questa email è già registrato."
    end

    # Controlla se il nome utente è già stato usato da un altro utente
    if REGISTERED_USERS.values.any? { |user| user[:username] == username }
      return "Errore: L'utente con questo nome utente è già registrato."
    end

    # Genera un ID univoco per la sessione dell'utente
    session_id = SecureRandom.hex(16)

    # Registra il nuovo utente (dopo che si è autenticato)
    REGISTERED_USERS[email] = { username: username, email: email, session_id: session_id }

    # Non memorizziamo la sessione in ACTIVE_SESSIONS, quindi il login non viene "memorizzato" per la prossima volta.
    # Ogni volta che l'utente si presenta, deve fare il login nuovamente.

    # Reindirizza l'utente al gioco (la pagina di gioco locale)
    redirect 'http://localhost:8000/remote_auth/IA/index.html'

  rescue OAuth2::Error => e
    # Gestisci gli errori durante l'autenticazione
    settings.logger.error("Autenticazione fallita: #{e.message}")  # Logga l'errore
    return "Autenticazione fallita: #{e.message}. Si prega di non autorizzare nuovamente."
  end
end

# Avvia il server Sinatra in un thread separato per gestire le richieste di autenticazione
Thread.new { Sinatra::Application.run! }

# Configura il server WEBrick per servire il gioco sulla porta 8000
game_server = WEBrick::HTTPServer.new(
  Port: 8000,  # Porta su cui il server web ascolta
  DocumentRoot: "/home/sgalli/progetti/Trascendence/remote_auth"  # Directory radice per il gioco
)

# Gestisce le risorse statiche (file del gioco) dalla cartella IA
game_server.mount('/remote_auth/IA', WEBrick::HTTPServlet::FileHandler, '/home/sgalli/progetti/Trascendence/remote_auth/IA')

# Gestisce l'interruzione del server con un segnale (ad esempio CTRL+C)
trap("INT") { game_server.shutdown }

# Avvia il server di gioco
game_server.start
