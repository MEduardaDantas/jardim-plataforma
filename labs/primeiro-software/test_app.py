import json,threading,unittest
from urllib.request import urlopen
from urllib.error import HTTPError
from http.server import ThreadingHTTPServer
from app import Handler
class AppTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
        cls.thread=threading.Thread(target=cls.server.serve_forever,daemon=True);cls.thread.start()
        cls.url=f'http://127.0.0.1:{cls.server.server_port}'
    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown();cls.server.server_close();cls.thread.join()
    def test_home(self):
        with urlopen(self.url) as r:
            self.assertEqual(r.status,200);self.assertIn(b'Portal Aurora',r.read())
    def test_health(self):
        with urlopen(self.url+'/health') as r:self.assertEqual(json.load(r),{'status':'ok','version':'v1'})
    def test_missing(self):
        with self.assertRaises(HTTPError) as ctx:urlopen(self.url+'/nao-existe')
        self.assertEqual(ctx.exception.code,404)
