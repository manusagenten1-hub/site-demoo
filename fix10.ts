import fs from 'fs';

let indexHtml = fs.readFileSync('index.html', 'utf8');

const newMapIframe = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.3308697155203!2d-50.95011423301579!3d-29.938637129269562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95190bc99296e4b3%3A0x93c400b6e7050579!2sPreto%20Autom%C3%B3veis%20%26%20Despachante!5e0!3m2!1spt-BR!2sbr!4v1781101912609!5m2!1spt-BR!2sbr" width="100%" height="100%" style="border:0; filter: invert(90%) hue-rotate(180deg) grayscale(1);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

indexHtml = indexHtml.replace(/<iframe[\s\S]*?https:\/\/maps\.google\.com\/maps\?q=Sao\+Paulo&output=embed[\s\S]*?<\/iframe>/, newMapIframe);

fs.writeFileSync('index.html', indexHtml);
console.log("Iframe fixed.");
