import argparse
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
VERSION = 'v1'
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/health':
            code, kind, body = 200, 'application/json', json.dumps({'status':'ok','version':VERSION}).encode()
        elif self.path == '/':
            code, kind, body = 200, 'text/html; charset=utf-8', '<html lang="pt-BR"><title>Aurora</title><h1>Portal Aurora</h1><p>Nosso primeiro software está em execução.</p></html>'.encode()
        else:
            code, kind, body = 404, 'text/plain', b'Rota nao encontrada'
        self.send_response(code)
        self.send_header('Content-Type',kind)
        self.send_header('Content-Length',str(len(body)))
        self.end_headers()
        self.wfile.write(body)
    def log_message(self,*args):
        pass
if __name__ == '__main__':
    p=argparse.ArgumentParser();p.add_argument('--port',type=int,default=8000);p.add_argument('--host',default='127.0.0.1');a=p.parse_args()
    server=ThreadingHTTPServer((a.host,a.port),Handler)
    print(f'Aurora em http://{a.host}:{a.port}',flush=True)
    try: server.serve_forever()
    except KeyboardInterrupt: pass
    finally: server.server_close()
