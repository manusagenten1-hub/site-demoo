import fs from 'fs';

let idx = fs.readFileSync('index.html', 'utf8');
let adm = fs.readFileSync('admin.html', 'utf8');

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

adm = adm.replace(/<td class="(.*?)"/g, (match, p1) => {
    if(!p1.includes('text-[')) return `<td class="${p1} text-[#D1D5DB]"`;
    return match;
});

adm = adm.replace(/<th class="(.*?)"/g, (match, p1) => {
    if(p1.includes('text-[#9CA3AF]') || p1.includes('text-textMuted')) return match;
    return `<th class="${p1.replace(/text-[\w]+/, 'text-[#9CA3AF]')} text-[#9CA3AF]"`;
});

fs.writeFileSync('index.html', idx);
fs.writeFileSync('admin.html', adm);
