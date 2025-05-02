import threading
import server

def run_server():
<<<<<<< HEAD
    server.app.run(port=9000, debug=False, use_reloader=False)  # Cambiar al puerto 8081
=======
    server.app.run(port=8081, debug=False, use_reloader=False)  # Cambiar al puerto 8081
>>>>>>> 7539102ba38228461bc4673c5023facac739485c

if __name__ == '__main__':
    server_thread = threading.Thread(target=run_server)
    server_thread.start()
    server_thread.join()