const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// remove hover:border-accent
html = html.replace(/ hover:border-accent/g, '');

// Also ensure cards in "Sobre" and "Serviços" have the proper black background (#0A0A0A = bg-bgSurface) and white text
// Actually, earlier I replaced bg-bgPrimary with bg-bgPrimary for the wrappers, but the inner cards might still be bg-bgPrimary.
// Let's check Servicos cards (line 789). They say "class="group bg-bgPrimary border... "
html = html.replace(/group bg-bgPrimary border/g, 'bg-bgSurface2 border text-white');

html = html.replace(/class="bg-bgSurface border border-borderPrimary rounded-xl p-8 text-center flex flex-col justify-center transition-colors group"/g, 'class="bg-bgSurface2 text-white border border-borderPrimary rounded-xl p-8 text-center flex flex-col justify-center transition-colors group"');
html = html.replace(/<div class="bg-bgPrimary border border-borderPrimary rounded-xl p-8">/g, '<div class="bg-bgSurface text-white border border-borderPrimary rounded-xl p-8">');

// Also remove card-shadow hover style which adds #262626 and #e63946
html = html.replace(/\.card-shadow:hover \{[\s\S]*?\}/, '');
// Remove card-shadow class
html = html.replace(/ card-shadow/g, '');

// Ensure header logo is not duplicated in index.html
// Also user asked to remove "aquela animação de deixar as coisas vermelhas ao passar por cima com o mouse", this means removing group-hover:bg-accent/something, or hover:text-accent on cards. 

fs.writeFileSync('index.html', html);
console.log("Done");
