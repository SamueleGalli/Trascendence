# config.rb
require 'oauth2'
require 'sinatra'
require 'json'
require 'logger'
require 'securerandom'

# Costanti per l'autenticazione
UID = "u-s4t2ud-d92dc37f98350dab3f74c31a492de6cd1db73874ba9f7798374123b4e2fa8672"
SECRET = "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"
REDIRECT_URI = "http://localhost:4567/callback"

# Creazione del client OAuth2
client = OAuth2::Client.new(
  UID,
  SECRET,
  site: "https://api.intra.42.fr",
  authorize_url: "/oauth/authorize",
  token_url: "/oauth/token"
)

# Impostazioni di Sinatra
enable :sessions
set :session_secret, SecureRandom.hex(64)
set :sessions, expire_after: 2592000
set :port, 4567
set :logging, false
configure do
  set :logger, Logger.new(STDOUT)
  settings.logger.level = Logger::INFO
end

# Variabili per la gestione della sessione
$active_session_id = nil
$session_last_active = nil
SESSION_TIMEOUT = 60 # Timeout della sessione in secondi

# Punto di ingresso per il login OAuth
get '/' do
  if session[:user_authenticated]
    redirect 'http://localhost:8000/remote_auth/IA/index.html'
  elsif $active_session_id && $active_session_id != session.id
    if Time.now - $session_last_active > SESSION_TIMEOUT
      $active_session_id = nil
      redirect '/'
    else
      redirect '/session_already_active'
    end
  else
    authorization_url = client.auth_code.authorize_url(redirect_uri: REDIRECT_URI)
    redirect authorization_url
  end
end

# Pagina di recupero o logout
get '/session_recover_or_logout' do
  erb :session_recover_or_logout
end

# Pagina di sessione già attiva
get '/session_already_active' do
  erb :session_already_active
end
