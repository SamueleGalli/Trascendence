require "sinatra"
require "securerandom"

# Gestisce l'accesso come guest
get '/guest' do
=begin
  Crea una nuova sessione guest solo se non esiste già
  if session[:guest].nil?
    guest_id = SecureRandom.uuid
    session[:guest] = guest_id
  end
  Reindirizza alla pagina di gioco (senza controllare l'autenticazione)
=end
  redirect 'http://localhost:8000/remote_auth/IA/index.html'
end
