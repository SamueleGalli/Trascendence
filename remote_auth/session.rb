# session.rb
require 'sinatra'
require_relative 'config'  # Carica il file di configurazione

# Usa le costanti definiti in config.rb
client = OAuth2::Client.new(UID, SECRET, site: 'https://api.intra.42.fr')

# Impostiamo le sessioni per essere persistenti (a lungo termine)
set :session_secret, SecureRandom.hex(64)
set :sessions, expire_after: 2592000 # Timeout della sessione (30 giorni)

# Controlla se c'è una sessione attiva prima di procedere con l'autenticazione
before do
  # Se una sessione è già attiva e l'ID della sessione è diverso, impedisci l'accesso
  if $active_session_id && $active_session_id != session.id
    halt 403, "Una sessione è già attiva. Effettua il logout prima di continuare."
  end
end

# Gestisce il callback dopo il login con OAuth2
get '/callback' do
  if session[:user_authenticated]
    redirect 'http://localhost:8000/remote_auth/IA/index.html'
  end

  begin
    code = params[:code]
    token = client.auth_code.get_token(code, redirect_uri: REDIRECT_URI)
    user_info = token.get("/v2/me").parsed
    username = user_info["login"]
    email = user_info["email"]
    puts "Authenticated user: #{username}, #{email}"

    session[:user_authenticated] = true
    $active_session_id = session.id
    $session_last_active = Time.now

    redirect 'http://localhost:8000/remote_auth/IA/index.html'
  rescue OAuth2::Error => e
    settings.logger.error("Autenticazione fallita: #{e.message}")
    halt 500, "Errore nell'autenticazione. Per favore, riprova più tardi."
  end
end

# Controlla se la sessione è ancora attiva quando l'utente riapre il browser
get '/' do
  if session[:user_authenticated] && $active_session_id == session.id
    # Se la sessione è attiva, reindirizza l'utente alla pagina principale
    redirect 'http://localhost:8000/remote_auth/IA/index.html'
  else
    # Altrimenti, mostra la pagina di login OAuth
    authorization_url = client.auth_code.authorize_url(redirect_uri: REDIRECT_URI)
    redirect authorization_url
  end
end