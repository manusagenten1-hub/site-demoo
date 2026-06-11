import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// Replace tailwind config for textSecondary to be good on light mode and add textDarkSurface for dark mode
html = html.replace(/textSecondary:\s*"#[A-Fa-f0-9]+"/g, 'textSecondary: "#4B5563"');

// Fix NavBar
// "deixe a Navbar numa cor fixa: branco #F2F2F2"
html = html.replace(/class="fixed top-0 w-full z-\[1000\] border-b border-borderPrimary bg-bgPrimary\/92 backdrop-blur-md transition-all h-14 md:h-16 text-textMain"/, 
    'class="fixed top-0 w-full z-[1000] border-b border-borderPrimary bg-bgPrimary transition-all h-14 md:h-16 text-textMain"');

// Dark sections:
// They are: bg-bgSurface, bg-bgSurface2
// We will replace text-textSecondary with text-[#CCCCCC] inside these sections.

// Also "troque tamém a cor do título "NOSSOS SERVIÇOS" pars branco FFFFFF."
html = html.replace(/<h2\s+class="font-condensed font-extrabold text-\[40px\] md:text-\[48px\] uppercase tracking-wide text-center mb-4"\s*>\s*Nossos Serviços\s*<\/h2>/,
    '<h2 class="font-condensed font-extrabold text-[40px] md:text-[48px] uppercase tracking-wide text-center mb-4 text-[#FFFFFF]">\n          Nossos Serviços\n        </h2>');

// But actually, the color of text inside dark elements:
// Let's replace text-textSecondary with text-[#CCCCCC] or text-white depending on necessity inside dark sections...
// Currently, `fix4.ts` changed SOME text-textSecondary to text-[#CCCCCC]. But anything that is still textSecondary inside dark backgrounds must be replaced.

// Dark background sections in index.html where text might be black now (due to my previous textSecondary changes? Wait, if textSecondary is #4B5563 it will be dark gray).
// Sections with dark background:
// 1. "bg-bgSurface py-20 px-6 border-y border-borderPrimary" -> this has text-white. P is text-textSecondary. Let's make the P text-[#CCCCCC].
html = html.replace(/<p class="text-textSecondary text-center mb-12">/, '<p class="text-[#CCCCCC] text-center mb-12">');

// Inside cards:
html = html.replace(/bg-bgSurface2 border border-borderPrimary border-l-\[3px\] border-l-accent p-6 rounded-xl transition duration-200"([\s\S]*?)<p class="text-textSecondary text-sm">/g, 
    'bg-bgSurface2 border border-borderPrimary border-l-[3px] border-l-accent p-6 rounded-xl transition duration-200"$1<p class="text-[#CCCCCC] text-sm">');

// Footer:
html = html.replace(/<p class="text-textSecondary text-sm mb-6 max-w-md">/, '<p class="text-[#CCCCCC] text-sm mb-6 max-w-md">');
html = html.replace(/<ul class="space-y-2 text-sm text-textSecondary">/, '<ul class="space-y-2 text-sm text-[#CCCCCC]">');
html = html.replace(/<ul class="space-y-3 text-\[13px\] text-textSecondary">/, '<ul class="space-y-3 text-[13px] text-[#CCCCCC]">');

// Any remaining text-textSecondary inside dark sections:
// Let's do a simple regex for dark sections and replace internal text-textSecondary with text-[#CCCCCC]
// Wait, an easier way is to just look through the file and change text-textSecondary to text-[#CCCCCC] where bg is bg-bgSurface, bg-bgSurface2 or where it makes sense.

fs.writeFileSync('index.html', html);

