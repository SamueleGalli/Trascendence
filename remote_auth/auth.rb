require_relative 'config'
require_relative 'session'
require_relative 'guest'
require "webrick"
require 'sinatra'

enable :sessions


# Avvia il server Sinatra in un thread separato
Thread.new { Sinatra::Application.run! }

# Configura il server WEBrick per il gioco
ia_path = File.expand_path('IA', __dir__)
game_server = WEBrick::HTTPServer.new(
  Port: 8000,
  DocumentRoot: File.join(File.dirname(__FILE__), 'remote_auth')
)

# Monta la cartella del gioco
game_server.mount('/remote_auth/IA', WEBrick::HTTPServlet::FileHandler, ia_path)

# Gestisce l'interruzione del server con CTRL+C
trap("INT") { game_server.shutdown }

# Avvia il server di gioco
game_server.start
