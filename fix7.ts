import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// The new Tailwind config
html = html.replace(/textSecondary: "#000000"/, 'textSecondary: "#4B5563"');
html = html.replace(/textSecondary: "#CCCCCC"/, 'textSecondary: "#4B5563"');

// NavBar to be white/bgPrimary
html = html.replace(/bg-bgPrimary\/92 backdrop-blur-md/, 'bg-bgPrimary');

// "Nossos Serviços" back to white
html = html.replace(/<h2([\s\S]*?)>\s*Nossos Serviços\s*<\/h2>/, '<h2$1 text-white>\n          Nossos Serviços\n        </h2>');

// Helper to replace within dark blocks
const darkClasses = ['bg-bgSurface', 'bg-bgSurface2', 'bg-bgSurface3'];

for (const darkClass of darkClasses) {
    // A simplified approach is just to look for elements with text-textSecondary and if they are inside a dark section, we already know.
    // Given the HTML structure, and since text-textSecondary should only mean "dark gray" now, we can just replace all text-textSecondary to text-[#CCCCCC] inside the specific sections:
    
    // We already know which sections are dark:
    // 1. "Vantagens" section starts with `class="bg-bgSurface py-20 ...`
    // 2. "Serviços" section starts with `class="bg-bgSurface text-white ...` or `bg-bgSurface py-24...`
    // 3. "Onde Estamos" has dark blocks inside it `w-full h-[400px] ... bg-bgSurface2`.
    // 4. "Footer" starts with `bg-bgSurface border-y ...`
    // 5. The generic modals `bg-bgSurface` ...
}

// Let's just do targeted replaces for known items inside dark backgrounds
html = html.replace(/<span class="text-sm md:text-base font-medium text-textSecondary"/g, 
    '<span class="text-sm md:text-base font-medium text-[#CCCCCC]"');
    
// Replace for advantage cards paragraphs
html = html.replace(/<p class="text-textSecondary text-sm">/g, 
    '<p class="text-[#CCCCCC] text-sm">');

// Sobre section has a list with text-textSecondary:
html = html.replace(/<span class="text-textSecondary text-sm"/g, 
    '<span class="text-[#CCCCCC] text-sm"');
    
// Section Vantagens description
html = html.replace(/<p class="text-textSecondary text-center mb-12">/, 
    '<p class="text-[#CCCCCC] text-center mb-12">');

// Footer
html = html.replace(/<p class="text-textSecondary text-sm mb-6 max-w-md">/, 
    '<p class="text-[#CCCCCC] text-sm mb-6 max-w-md">');
html = html.replace(/<ul class="space-y-2 text-sm text-textSecondary">/, 
    '<ul class="space-y-2 text-sm text-[#CCCCCC]">');
html = html.replace(/<ul class="space-y-3 text-\[13px\] text-textSecondary">/, 
    '<ul class="space-y-3 text-[13px] text-[#CCCCCC]">');

// What else? 
html = html.replace(/class="text-textSecondary text-center text-lg max-w-2xl mx-auto mb-16"/, 
    'class="text-[#CCCCCC] text-center text-lg max-w-2xl mx-auto mb-16"');

// Form inputs
html = html.replace(/class="absolute left-3 top-1\/2 -translate-y-1\/2 w-4 h-4 text-textSecondary"/, 
    'class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CCCCCC]"');

// Form labels were already changed to text-[#D1D5DB] in an earlier step, wait, let's check if they still are.

fs.writeFileSync('index.html', html);

