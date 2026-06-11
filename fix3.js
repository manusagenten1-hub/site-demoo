import fs from 'fs';

// Helper to replace regex
function replaceInFile(file, regex, replacement) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content);
}

let idx = fs.readFileSync('index.html', 'utf8');
let adm = fs.readFileSync('admin.html', 'utf8');

// 1. Text contrast corrections

// "Texto de corpo em fundos escuros (#0A0A0A, #141414, #1E1E1E): mínimo #CCCCCC"
// Let's replace `text-textSecondary` in Hero section and body paragraphs
// Actually, `textSecondary: "#CCCCCC"` in tailwind config globally satisfies this!
// And then for cards, I'll use `#B0B0B0`.
// Let's rewrite tailwind colors back to a safe baseline:
const newColorsConfig = `colors: {
              bgPrimary: "#F2F2F2",
              bgSurface: "#0A0A0A",
              bgSurface2: "#141414",
              bgSurface3: "#1E1E1E",
              accent: { DEFAULT: "#E63946", dark: "#C1121F" },
              borderPrimary: "#2A2A2A",
              textSecondary: "#CCCCCC",
              textMuted: "#9CA3AF",
              textMain: "#111827",
              success: "#22C55E",
              warning: "#F59E0B",
              danger: "#EF4444",
            },`;

idx = idx.replace(/colors: \{[\s\S]*?danger: "#EF4444",\n\s*\},/, newColorsConfig);

const adminColorsConfig = `colors: {
              bgPrimary: "#0A0A0A",
              bgSurface: "#141414",
              bgSurface2: "#1E1E1E",
              bgSurface3: "#262626",
              accent: { DEFAULT: "#E63946", dark: "#C1121F" },
              borderPrimary: "#2A2A2A",
              textSecondary: "#CCCCCC",
              textMuted: "#9CA3AF",
              textMain: "#111827",
              success: "#22C55E",
              warning: "#F59E0B",
              danger: "#EF4444",
            },`;

adm = adm.replace(/colors: \{[\s\S]*?danger: "#EF4444",\n\s*\},/, adminColorsConfig);

// Cards texto: "mínimo #B0B0B0". Well, #CCCCCC is lighter than #B0B0B0, so `#CCCCCC` passes "mínimo #B0B0B0" nicely! 
// Wait! The user said "mínimo #B0B0B0" which means lightness >= that. #CCCCCC is lighter. So we are good doing nothing special for cards if they use textSecondary. However, `#9CA3AF` is darker than `#B0B0B0`.

// Let's make sure tables in admin:
// "Texto de células de tabela no admin: mínimo #D1D5DB"
adm = adm.replace(/<td class="(.*?)"/g, (match, p1) => {
    if(!p1.includes('text-[')) return \`<td class="\${p1} text-[#D1D5DB]"\`;
    return match;
});

// "Header de tabela no admin: mínimo #9CA3AF"
// Th labels:
adm = adm.replace(/<th class="(.*?)"/g, (match, p1) => {
    if(p1.includes('text-[#9CA3AF]') || p1.includes('text-textMuted')) return match;
    // Replace text-textSecondary or whatever to text-[#9CA3AF]
    return \`<th class="\${p1.replace(/text-[\\w]+/, 'text-[#9CA3AF]')} text-[#9CA3AF]"\`;
});

// Títulos de seção: sempre #FFFFFF -> Replace text-textMain with text-white in sections if dark background.
// Onde Estamos titles and addresses.

fs.writeFileSync('index.html', idx);
fs.writeFileSync('admin.html', adm);
