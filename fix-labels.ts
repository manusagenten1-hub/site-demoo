import fs from 'fs';

let adminHtml = fs.readFileSync('admin.html', 'utf8');

adminHtml = adminHtml.replace(/<label([\s\S]*?)text-textSecondary([\s\S]*?)>/g, '<label$1text-[#D1D5DB]$2>');
adminHtml = adminHtml.replace(/<label([\s\S]*?)text-textMuted([\s\S]*?)>/g, '<label$1text-[#D1D5DB]$2>');
adminHtml = adminHtml.replace(/<label([\s\S]*?)text-white([\s\S]*?)>/g, '<label$1text-[#D1D5DB]$2>'); // Labels de inputs (index e admin): mínimo #D1D5DB. If they are white, it's fine though. The requirement is just "mínimo #D1D5DB" so white is better, but maybe they want consistency. Let's not touch white just in case, only the ones that were darker.

fs.writeFileSync('admin.html', adminHtml);

let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(/<label([\s\S]*?)text-textSecondary([\s\S]*?)>/g, '<label$1text-[#D1D5DB]$2>');
indexHtml = indexHtml.replace(/<label([\s\S]*?)text-textMuted([\s\S]*?)>/g, '<label$1text-[#D1D5DB]$2>');

fs.writeFileSync('index.html', indexHtml);
