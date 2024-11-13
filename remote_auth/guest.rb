require "sinatra"
require "securerandom"

# Gestisce il login come guest
get '/guest' do
  # Se l'utente è già autenticato, reindirizza alla pagina di gioco
  if session[:user_authenticated]
    redirect 'http://localhost:8000/remote_auth/IA/index.html' # Già autenticato
  else
    # Controlla se già esiste una sessione guest
    if session[:guest]
      redirect 'http://localhost:8000/remote_auth/IA/index.html' # Già un guest
    else
      # Crea una nuova sessione guest
      guest_id = SecureRandom.uuid
      session[:guest] = guest_id
      # Assicurati che non ci sia una sessione di utente autenticato
      session[:user_authenticated] = nil
      
      redirect 'http://localhost:8000/remote_auth/IA/index.html'
    end
  end
end
