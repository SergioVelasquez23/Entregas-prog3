import threading
import server

def run_server():
    server.app.run(port=9000, debug=False, use_reloader=False)  # Cambiar al puerto 8081

if __name__ == '__main__':
    server_thread = threading.Thread(target=run_server)
    server_thread.start()
    server_thread.join()