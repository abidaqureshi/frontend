import io from 'socket.io-client';

const HOST = 'localhost';
const PORT = 3005;
const config = {
                    apiBaseUrl: `http://${HOST}:${PORT}/v1/employees`,
                    io:io(`http://${HOST}:${PORT}`)

};

export default config;