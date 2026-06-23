const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5501;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.svg': 'image/svg+xml',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    // Loại bỏ query string (ví dụ: ?v=1.0) để lấy đường dẫn file chính xác
    let urlPath = decodeURIComponent(req.url).split('?')[0];
    let filePath = path.join(__dirname, urlPath);
    
    // Kiểm tra file có tồn tại không
    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Không tìm thấy file / File not found');
        return;
    }
    
    // Nếu đường dẫn là thư mục, tự động tìm file index.html
    try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
            if (!fs.existsSync(filePath)) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Không tìm thấy file index.html');
                return;
            }
        }
    } catch (e) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Lỗi máy chủ: ' + e.message);
        return;
    }

    // Đọc file và trả về client
    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Lỗi đọc file: ' + error.code);
        } else {
            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  MAY CHU DANG CHAY TAI: http://localhost:${PORT}`);
    console.log(`  Tu dong mo trinh duyet...`);
    console.log(`====================================================`);
    console.log(`* Giu cua so nay de duy tri may chu.`);
    console.log(`* Nhan Ctrl + C de tat may chu.`);
    
    const url = `http://localhost:${PORT}`;
    const startCmd = process.platform === 'win32' ? `start "" "${url}"` : `open "${url}"`;
    require('child_process').exec(startCmd);
});
