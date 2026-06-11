import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Change textSecondary in tailwind.config from #CCCCCC to #000000
const oldConfig = `textSecondary: "#CCCCCC",`;
const newConfig = `textSecondary: "#000000",`;
html = html.replace(oldConfig, newConfig);

// 2. Fix the missing "Onde estamos" card background 
// It currently has bg-bgPrimary (F2F2F2) with text-white, making text invisible. 
// Change it to bg-bgSurface (#0A0A0A)
html = html.replace(/<div\s+class="bg-bgPrimary border border-borderPrimary rounded-xl p-6 flex flex-col gap-6"/, 
    '<div class="bg-bgSurface border border-borderPrimary rounded-xl p-6 flex flex-col gap-6"');

// And inside it, the subtexts use text-textSecondary, they need to be text-[#CCCCCC]
html = html.replace(/<div class="inline-flex items-center gap-3">[\s\S]*?<h4 class="text-white font-medium mb-1">Endereço<\/h4>\s*<p class="text-textSecondary text-sm">/g,
    '<div class="inline-flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><div><h4 class="text-white font-medium mb-1">Endereço</h4><p class="text-[#CCCCCC] text-sm">');

html = html.replace(/<div class="inline-flex items-center gap-3">[\s\S]*?<h4 class="text-white font-medium mb-1">WhatsApp<\/h4>\s*<p class="text-textSecondary text-sm">/g,
    '<div class="inline-flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3-8.63A2 2 0 0 1 3.68 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.91 5.91l.82-.82a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg><div><h4 class="text-white font-medium mb-1">WhatsApp</h4><p class="text-[#CCCCCC] text-sm">');

html = html.replace(/<div class="inline-flex items-center gap-3">[\s\S]*?<h4 class="text-white font-medium mb-1">Instagram<\/h4>\s*<p class="text-textSecondary text-sm">/g,
    '<div class="inline-flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg><div><h4 class="text-white font-medium mb-1">Instagram</h4><p class="text-[#CCCCCC] text-sm">');

html = html.replace(/<div class="inline-flex items-center gap-3">[\s\S]*?<h4 class="text-white font-medium mb-1">Horário de Funcionamento<\/h4>\s*<p class="text-textSecondary text-sm">/g,
    '<div class="inline-flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><div><h4 class="text-white font-medium mb-1">Horário de Funcionamento</h4><p class="text-[#CCCCCC] text-sm">');


// 3. Fix "NOSSOS SERVIÇOS" heading color and text color of the services cards
// Add text-white to the servicos section
html = html.replace(/<section\s+id="servicos"\s+class="bg-bgSurface py-24 px-6 border-t border-borderPrimary"/, 
    '<section id="servicos" class="bg-bgSurface text-white py-24 px-6 border-t border-borderPrimary"');

// And replace text-textSecondary with text-[#B0B0B0] inside those service cards
let serviceCardRegex = /<div\s+class="bg-bgSurface2 border text-white border-borderPrimary rounded-xl p-8 transition-colors duration-300"\s*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
html = html.replace(/<h3 class="text-xl font-bold text-white mb-3 tracking-wide">([\s\S]*?)<\/h3>\s*<p class="text-textSecondary text-\[15px\] leading-relaxed">/g, 
    '<h3 class="text-xl font-bold text-white mb-3 tracking-wide">$1</h3>\n            <p class="text-[#B0B0B0] text-[15px] leading-relaxed">');


// 4. Increase logo size in footer
html = html.replace(/<img\s+src="https:\/\/i\.ibb\.co\/hF4gTj2x\/Chat-GPT-Image-10-de-jun-de-2026-10-18-33\.png"\s+alt="Logo Preto Automóveis"\s+class="h-10 mb-6 drop-shadow-lg opacity-80 hover:opacity-100 transition-opacity"\s*\/>/,
    '<img src="https://i.ibb.co/hF4gTj2x/Chat-GPT-Image-10-de-jun-de-2026-10-18-33.png" alt="Logo Preto Automóveis" class="h-16 md:h-20 mb-6 drop-shadow-lg opacity-80 hover:opacity-100 transition-opacity" />');

// 5. navbar branding rename
html = html.replace(/<a href="#" class="font-condensed font-extrabold text-\[22px\] tracking-\[2px\] uppercase text-textMain block">\s*PRETO\s*<span class="text-accent">\.<\/span>\s*<\/a>/,
    '<a href="#" class="font-condensed font-extrabold text-[22px] tracking-[2px] uppercase text-textMain block"> PRETO <span class="text-accent">AUTOMÓVEIS</span> </a>');

// Remove — PRETO AUTOMÓVEIS — from hero section
html = html.replace(/<span class="text-accent text-xs font-bold tracking-\[3px\] uppercase mb-4 block">\s*— PRETO AUTOMÓVEIS —\s*<\/span>/, '');


// 6. Fix footer texts to be #B0B0B0 instead of textSecondary
html = html.replace(/<p class="text-textSecondary text-sm mb-6 max-w-md">/, '<p class="text-[#B0B0B0] text-sm mb-6 max-w-md">');
html = html.replace(/<ul class="space-y-2 text-sm text-textSecondary">/, '<ul class="space-y-2 text-sm text-[#B0B0B0]">');
html = html.replace(/<ul class="space-y-3 text-\[13px\] text-textSecondary">/, '<ul class="space-y-3 text-[13px] text-[#B0B0B0]">');
// Replace links in footer
html = html.replace(/class="text-sm text-textSecondary hover:text-white transition"/g, 'class="text-sm text-[#B0B0B0] hover:text-white transition"');
html = html.replace(/class="text-textSecondary hover:text-white transition-colors"/g, 'class="text-[#B0B0B0] hover:text-white transition-colors"');


fs.writeFileSync('index.html', html);
console.log("Done");
