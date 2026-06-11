import fs from 'fs';

let html = fs.readFileSync('admin.html', 'utf8');
html = html.replace(/textSecondary:\s*"#[A-Fa-f0-9]+"/g, 'textSecondary: "#4B5563"');
fs.writeFileSync('admin.html', html);
