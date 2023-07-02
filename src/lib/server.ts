import http, { IncomingMessage, ServerResponse } from 'node:http';
import { StringDecoder } from 'node:string_decoder';
import { file } from './files.js';

export const serverLogic = async (req: IncomingMessage, res: ServerResponse) => {
    const baseUrl = `http://${req.headers.host}`;
    const parsedUrl = new URL(req.url ?? '', baseUrl);
    const trimmedPath = parsedUrl.pathname
        .replace(/^\/+|\/+$/g, '')
        .replace(/\/+/g, '/');

    const textFileExtensions = ['css', 'js', 'svg', 'webmanifest'];
    const binaryFileExtensions = ['png', 'jpg', 'jpeg', 'webp', 'ico', 'eot', 'ttf', 'woff', 'woff2', 'otf'];
    const extension = (trimmedPath.includes('.') ? trimmedPath.split('.').at(-1) : '') as string;
    
    const isTextFile = textFileExtensions.includes(extension);
    const isBinaryFile = binaryFileExtensions.includes(extension);
    const isAPI = trimmedPath.startsWith('api/');
    const isPage = !isTextFile && !isBinaryFile && !isAPI;
    
    type Mimes = Record<string, string>;

    const MIMES: Mimes = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        json: 'application/json',
        txt: 'text/plain',
        svg: 'image/svg+xml',
        xml: 'application/xml',
        ico: 'image/vnd.microsoft.icon',
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        png: 'image/png',
        webp: 'image/webp',
        woff2: 'font/woff2',
        woff: 'font/woff',
        ttf: 'font/ttf',
        webmanifest: 'application/manifest+json',
    };
    
    let responseContent: string | Buffer = '';
    let buffer = '';
    const stringDecoder = new StringDecoder('utf-8');

    req.on('data', (data) => {
        buffer += stringDecoder.write(data);
    });

    req.on('end', async () => {
        buffer += stringDecoder.end();

        console.log(buffer);

        if (isTextFile) {
            const [err, msg] = await file.readPublic(trimmedPath);
           
            if (err) {
                responseContent = 'ERROR: not find to...';
            } else {
                res.writeHead(200, {
                    'Content-Type': MIMES[extension],
                })
                responseContent = msg;
            }
        }
    
        if (isBinaryFile) {
            const [err, msg] = await file.readPublicBinary(trimmedPath);
           
            if (err) {
                responseContent = 'ERROR: not find...';
            } else {
                res.writeHead(200, {
                    'Content-Type': MIMES[extension],
                })
                responseContent = msg;
            }
        }
    
        if (isAPI) {

            const jsonData = buffer ? JSON.parse(buffer) : {};

            const [err, msg] = await file.create('users', jsonData.email + '.json', jsonData)

            if (err) {
                responseContent = msg.toString();
            } else {
                responseContent = 'User created!';
            }

            if (req.method === 'POST') {
                const [err] = await file.create('users', jsonData.email + '.json', jsonData);
                if (err) {
                    responseContent = 'User already exists, dublicate email';
                    // responseContent = msg.toString();
                } else {
                    responseContent = 'User Created';
                }
            } else if (req.method === 'GET') {
                 const [err, msg] = await file.read('users', jsonData.email + '.json');
                if (err) {
                    responseContent = msg.toString();
                } else {
                    responseContent = jsonData;
                }
               
            } else if (req.method === 'PUT') {
                const [err, msg] = await file.update('users', jsonData.email + '.json', jsonData);
                if (err) {
                    responseContent = msg.toString();
                } else {
                    responseContent = 'User Updated';
                }
            } else if (req.method === 'DELETE') {
                const [err, msg] = await file.delete('users', jsonData.email + '.json');
                if (err) {
                    responseContent = msg.toString();
                } else {
                    responseContent = 'User Delete';
                }
            }
        }

        if (isPage) {
            let fileResponse = await file.read('../pages', trimmedPath + '.html');
            let [err, msg] = fileResponse;
                
            if (err) {
                fileResponse = await file.read('../pages', '404.html');
                err = fileResponse[0];
                msg = fileResponse[1];
            }
    
            res.writeHead(err ? 404 : 200, {
                'Content-Type': MIMES.html,
            });

            responseContent = msg as string;
            
        }
        
        res.end(responseContent);   
    });

};

export const httpServer = http.createServer(serverLogic);

export const init = () => {
    httpServer.listen(4415, () => {
        console.log('serverr running at http://Localhost:4415');
    })
};

export const server = {
    init,
    httpServer,
};

export default server;


