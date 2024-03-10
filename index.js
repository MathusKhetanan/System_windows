const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
    const userAgent = req.headers['user-agent'];
    const platform = getPlatformName(os.platform());
    const windowsVersion = getWindowsVersion(userAgent);
    const deviceType = userAgent.includes('Windows') ? 'Windows' : (userAgent.includes('Macintosh') ? 'Mac' : 'another device');

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(`<!DOCTYPE html>
    <html>
    <head>
    <title>System Information</title>
    <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    header { background-color: #333; color: #fff; padding: 20px; text-align: center; }
    h1 { margin-top: 0; }
    .container { max-width: 800px; margin: 20px auto; padding: 20px; background-color: #fff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
    p { margin: 10px 0; }
    </style>
    </head>
    <body>
    <header>
    <h1>System Information</h1>
    </header>
    <div class="container">
    <p><strong>Platform:</strong> ${platform === 'Windows' ? 'Windows ' + windowsVersion : platform}</p>
    <p><strong>CPU Architecture:</strong> ${os.arch()}</p>
    <p><strong>CPU Model:</strong> ${os.cpus()[0].model}</p>
    <p><strong>Total Memory:</strong> ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB</p>
    <p><strong>Free Memory:</strong> ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB</p>
    <p><strong>Device Type:</strong> ${deviceType}</p>
    </div>
    </body>
    </html>`);
    res.end();
});

function getPlatformName(platform) {
    switch (platform) {
        case 'win32':
            return 'Windows';
        case 'darwin':
            return 'Mac';
        default:
            return platform;
    }
}

function getWindowsVersion(userAgent) {
    if (userAgent.includes('Windows')) {
        const windowsVersion = userAgent.match(/Windows NT (\d+\.\d+)/);
        if (windowsVersion) {
            const versionNumber = parseFloat(windowsVersion[1]);
            switch (versionNumber) {
                case 10:
                    return '10';
                case 6.3:
                    return '8.1';
                case 6.2:
                    return '8';
                case 6.1:
                    return '7';
                default:
                    return 'Unknown';
            }
        }
    }
    return 'Unknown';
}

const PORT = process.env.PORT || 2000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
