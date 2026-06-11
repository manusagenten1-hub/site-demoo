const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the body styling
html = html.replace(/body \{\s*background-color: #0a0a0a;\s*color: #ffffff;\s*\}/, '');
html = html.replace(/<body class=".*">/, '<body class="font-sans antialiased text-textMain bg-bgPrimary">');


// 2. Fix the Tailwind Colors to have dark surfaces
html = html.replace(/bgSurface: "#FFFFFF"/, 'bgSurface: "#0A0A0A"');
html = html.replace(/bgSurface2: "#F9FAFB"/, 'bgSurface2: "#141414"');
html = html.replace(/bgSurface3: "#F3F4F6"/, 'bgSurface3: "#1E1E1E"');
html = html.replace(/borderPrimary: "#E5E7EB"/, 'borderPrimary: "#2A2A2A"');
// text secondary / muted back to light-friendly but wait, they are text colors for dark mode?
html = html.replace(/textSecondary: "#4B5563"/, 'textSecondary: "#9CA3AF"');
html = html.replace(/textMuted: "#6B7280"/, 'textMuted: "#6B7280"');

// 3. Revert text-textMain to text-white in elements that are now dark wrappers.
// Diferenciais wrapper uses bg-bgSurface, cards use bg-bgPrimary (wait, let's change them to bg-bgSurface2)
html = html.replace(/<section class="bg-bgSurface (.*?)">/g, '<section class="bg-bgSurface $1 text-white">');
html = html.replace(/class="bg-bgPrimary border border-borderPrimary border-l-\[3px\] border-l-accent p-6 rounded-xl hover:bg-bgSurface3 transition duration-200"/g, 
    'class="bg-bgSurface2 border border-borderPrimary border-l-[3px] border-l-accent p-6 rounded-xl transition duration-200"'); // Removed hover animation
html = html.replace(/hover:text-accent/g, '');
html = html.replace(/group-hover:text-accent/g, '');

// Also change back text-textMain to text-white inside sections with bg-bgSurface or bg-bgSurface2.
// Let's just do a global replace of text-textMain for text-white except for navbar and hero.
// This is tedious. Let's do it section by section or use regex carefully.
// Actually, they want JUST the cards and bullets to be black (#0A0A0A), and the white only for background.
// "Além disso, pode deixa os bullets e cards pretos #0A0A0A mesmo, branco é apenas no fundo! e tire aquela animação de deixar as coisas vermelhas ao passar por cima com o mouse"

html = html.replace(/text-textMain/g, 'text-white');
// Now we manually restore textMain for white sections: Hero, Header? Header is bg-bgPrimary/92
html = html.replace(/class="fixed top-0 w-full z-\[1000\] border-b border-borderPrimary bg-bgPrimary\/92 backdrop-blur-md transition-all h-14 md:h-16"/, 'class="fixed top-0 w-full z-[1000] border-b border-borderPrimary bg-bgPrimary/92 backdrop-blur-md transition-all h-14 md:h-16 text-textMain"');
html = html.replace(/id="logo-text"\n\s+style="display: none"\n\s+class="(.*?)"\n\s+>PRETO <span class="text-accent">AUTOMÓVEIS<\/span><\/span\n\s+>/, 
    'id="logo-text"\n            style="display: none"\n            class="$1 text-textMain"\n            >PRETO <span class="text-accent">AUTOMÓVEIS</span></span>');

// Replace Hero Section completely
const heroRegex = /<section\n\s+class="pt-24 pb-16 md:pt-32 md:pb-24 min-h-\[420px\] md:min-h-\[580px\] flex items-center px-6 bg-bgPrimary"\n\s+>[\s\S]*?<\/section>/;

const newHero = `<section class="pt-16 pb-16 md:pt-24 md:pb-24 min-h-[420px] md:min-h-[580px] flex items-center px-6 bg-bgPrimary relative overflow-hidden">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full relative h-full">

        <!-- Logo Mobile bg / Logo Desktop right -->
        <div class="absolute inset-0 md:relative md:inset-auto flex justify-center md:justify-end items-start md:items-center -translate-y-10 md:-translate-y-4 opacity-15 md:opacity-100 pointer-events-none md:w-1/2 z-0 md:z-10">
          <img
            src="https://i.ibb.co/hF4gTj2x/Chat-GPT-Image-10-de-jun-de-2026-10-18-33.png"
            alt="Logo Preto Automóveis"
            class="w-[150%] max-w-none md:max-w-[90%] md:w-auto h-auto drop-shadow-2xl md:scale-125"
          />
        </div>

        <!-- Texto Esquerda (Movido pra cima + cor preta porque o fundo é branco) -->
        <div class="flex flex-col items-start text-left relative z-10 w-full md:w-[55%] -translate-y-6 md:-translate-y-12">
          <span class="text-accent text-xs font-bold tracking-[3px] uppercase mb-4 block">
            — PRETO AUTOMÓVEIS —
          </span>
          <h1 class="font-condensed font-extrabold text-[42px] md:text-[64px] md:whitespace-nowrap leading-[0.9] tracking-[-1px] uppercase mb-6 text-textMain">
            ENCONTRE SEU PRÓXIMO<br class="hidden md:block" /> VEÍCULO
          </h1>
          <div class="w-[60px] h-[3px] bg-accent mt-0 mb-6 rounded-none"></div>
          <p class="text-textSecondary font-medium text-base md:text-xl max-w-[500px] mb-10 leading-relaxed">
            Veículos selecionados com procedência garantida. Transparência e
            atendimento especializado em cada negociação.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#estoque"
              class="bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors w-full sm:w-auto text-sm md:text-base text-center"
              >VER ESTOQUE</a
            >
            <button
              onclick="openGenericWhatsapp()"
              class="border border-accent text-accent hover:bg-accent/10 font-semibold py-3 px-8 rounded-lg transition-colors w-full sm:w-auto text-sm md:text-base"
            >
              FALAR NO WHATSAPP
            </button>
          </div>
        </div>

      </div>
    </section>`;

if (heroRegex.test(html)) {
    html = html.replace(heroRegex, newHero);
} else {
    console.log("Hero section not found/matched.");
    fs.writeFileSync('index.html.debug', html);
}

// 4. Update Header logo link if it has textMain
html = html.replace(/<a href="#" class="font-condensed font-extrabold text-\[22px\] tracking-\[2px\] uppercase text-white block">/, '<a href="#" class="font-condensed font-extrabold text-[22px] tracking-[2px] uppercase text-textMain block">');
html = html.replace(/<a\n\s+href="#estoque"\n\s+class="text-textSecondary hover:text-white transition duration-200"\n\s+>/g, '<a\n            href="#estoque"\n            class="text-textSecondary hover:text-textMain transition duration-200"\n            >');
html = html.replace(/<a\n\s+href="#sobre"\n\s+class="text-textSecondary hover:text-white transition duration-200"\n\s+>/g, '<a\n            href="#sobre"\n            class="text-textSecondary hover:text-textMain transition duration-200"\n            >');
html = html.replace(/<a\n\s+href="#servicos"\n\s+class="text-textSecondary hover:text-white transition duration-200"\n\s+>/g, '<a\n            href="#servicos"\n            class="text-textSecondary hover:text-textMain transition duration-200"\n            >');
html = html.replace(/<a\n\s+href="#localizacao"\n\s+class="text-textSecondary hover:text-white transition duration-200"\n\s+>/g, '<a\n            href="#localizacao"\n            class="text-textSecondary hover:text-textMain transition duration-200"\n            >');
html = html.replace(/<a\n\s+href="#contato"\n\s+class="text-textSecondary hover:text-white transition duration-200"\n\s+>/g, '<a\n            href="#contato"\n            class="text-textSecondary hover:text-textMain transition duration-200"\n            >');

html = html.replace(/<button id="mobile-menu-btn" class="md:hidden text-white p-2">/, '<button id="mobile-menu-btn" class="md:hidden text-textMain p-2">');

html = html.replace(/class="text-white font-medium py-2 border-b border-borderPrimary\/50"/g, 'class="text-textMain font-medium py-2 border-b border-borderPrimary/50"');
html = html.replace(/<a href="#contato" class="text-white font-medium py-2 mb-2">Contato<\/a>/, '<a href="#contato" class="text-textMain font-medium py-2 mb-2">Contato</a>');

// For sections that were bg-bgPrimary but aren't Hero (like Sobre, Estoque wrapper, Footer?):
// "branco é apenas no fundo!" -> The entire site background is white #F2F2F2 EXCEPT Cards and Bullets (which are #0A0A0A).
// So "Sobre", "Contato", "Localizacao", "Footer" should have white texts? Or dark texts?
// If the background is white, text should be dark.
// But some sections could be completely black boxes. Let's make the sections bg-bgPrimary have text-textMain.
// But we globally replaced textMain with white.
// Let's restore textMain for titles in section "Sobre", "Servicos", "Contato".
html = html.replace(/<section id="sobre" class="bg-bgPrimary (.*?)">/g, '<section id="sobre" class="bg-bgPrimary text-textMain $1">');
html = html.replace(/<section id="servicos" class="bg-bgPrimary (.*?)">/g, '<section id="servicos" class="bg-bgPrimary text-textMain $1">');
html = html.replace(/<section id="localizacao" class="bg-bgPrimary (.*?)">/g, '<section id="localizacao" class="bg-bgPrimary text-textMain $1">');
html = html.replace(/<section id="contato" class="bg-bgPrimary (.*?)">/g, '<section id="contato" class="bg-bgPrimary text-textMain $1">');
html = html.replace(/<footer class="(.*?) bg-bgPrimary (.*?)">/g, '<footer class="$1 bg-bgPrimary text-textMain $2">');
// Change text-white overrides in these sections to text-textMain
// This regex might be tricky. Let's just fix specific headings manually.

// "Estoque" section wrapper:
html = html.replace(/<section id="estoque" class="bg-bgPrimary (.*?)">/g, '<section id="estoque" class="bg-bgPrimary text-textMain $1">');

html = html.replace(/<h2(.*?)text-white(.*?)>(\s*Nosso Estoque\s*)<\/h2>/, '<h2$1text-textMain$2>$3</h2>');
html = html.replace(/<h2(.*?)text-white(.*?)>(\s*Sobre a Preto Automóveis\s*)<\/h2>/, '<h2$1text-textMain$2>$3</h2>');
html = html.replace(/<h2(.*?)text-white(.*?)>(\s*Nossos Serviços\s*)<\/h2>/, '<h2$1text-textMain$2>$3</h2>');
html = html.replace(/<h2(.*?)text-white(.*?)>(\s*Localização\s*)<\/h2>/, '<h2$1text-textMain$2>$3</h2>');
html = html.replace(/<h2(.*?)text-white(.*?)>(\s*Fale Conosco\s*)<\/h2>/, '<h2$1text-textMain$2>$3</h2>');

// Filter bar: "bg-bgPrimary"
html = html.replace(/<div\n\s+id="filter-bar"\n\s+class="bg-bgPrimary(.*?)"\n\s+>/, '<div\n        id="filter-bar"\n        class="bg-bgSurface text-white$1"\n      >');
// Make bullets dark bg-bgSurface2 #141414
html = html.replace(/class="filter-pill(.*?)bg-bgSurface2(.*?)text-textSecondary/g, 'class="filter-pill$1bg-bgSurface3$2text-textSecondary');

// Vehicle cards
html = html.replace(/<article class="bg-bgSurface (.*?)">/g, '<article class="bg-bgSurface2 text-white $1">');

// We also need to fix text-white in text wrappers
// Just fix the cards explicitly:
html = html.replace(/<h3 class="(.*?)text-white group-hover(.*?)"/g, '<h3 class="$1text-white"');

// Fix contact form card to be dark:
html = html.replace(/<div\n\s+class="bg-bgPrimary border border-borderPrimary p-8 md:p-12 rounded-2xl md:col-span-3 lg:col-span-2"/, '<div class="bg-bgSurface border border-borderPrimary p-8 md:p-12 rounded-2xl md:col-span-3 lg:col-span-2 text-white"');

// Removes any remaining group-hover:text-accent
html = html.replace(/group-hover:text-accent/g, '');

// Save changes
fs.writeFileSync('index.html', html);
console.log("Transformation completed.");
