import fs from 'fs';

let content = fs.readFileSync('index.html', 'utf8');

// Replace tailwind colors
content = content.replace(
  /colors: \{[\s\S]*?danger: "#EF4444",\n\s*\},/,
  `colors: {
              bgPrimary: "#F2F2F2",
              bgSurface: "#FFFFFF",
              bgSurface2: "#F9FAFB",
              bgSurface3: "#F3F4F6",
              accent: { DEFAULT: "#E63946", dark: "#C1121F" },
              borderPrimary: "#E5E7EB",
              textSecondary: "#4B5563",
              textMuted: "#6B7280",
              textMain: "#111827",
              success: "#22C55E",
              warning: "#F59E0B",
              danger: "#EF4444",
            },`
);

// We need to replace `text-white` with `text-textMain` everywhere, EXCEPT inside elements that use `bg-accent`, `bg-black`, `text-white` on badges/tags, etc.
// A simpler way: replace all `text-white` with `text-textMain`.
// Then, for exceptions, change `text-textMain` back to `text-white`.

content = content.replace(/text-white/g, 'text-textMain');

// Restore exceptions:
// Buttons with bg-accent
content = content.replace(/bg-accent(.*?)text-textMain/g, 'bg-accent$1text-white');
// Overlays with bg-black
content = content.replace(/bg-black(.*?)text-textMain/g, 'bg-black$1text-white');
// WhatsApp floating button which is green
content = content.replace(/bg-\[#25D366\](.*?)text-textMain/g, 'bg-[#25D366]$1text-white');
// Tag span bg-accent
content = content.replace(/bg-accent(.*?)text-textMain/g, 'bg-accent$1text-white');
// The inner 'border-white/50 text-white' in "VENDIDO"
content = content.replace(/text-textMain tracking-widest border-2/g, 'text-white tracking-widest border-2');

fs.writeFileSync('index.html', content);

let adminContent = fs.readFileSync('admin.html', 'utf8');

// Replace tailwind colors
adminContent = adminContent.replace(
  /colors: \{[\s\S]*?danger: "#EF4444",\n\s*\},/,
  `colors: {
              bgPrimary: "#F2F2F2",
              bgSurface: "#FFFFFF",
              bgSurface2: "#F9FAFB",
              bgSurface3: "#F3F4F6",
              accent: { DEFAULT: "#E63946", dark: "#C1121F" },
              borderPrimary: "#E5E7EB",
              textSecondary: "#4B5563",
              textMuted: "#6B7280",
              textMain: "#111827",
              success: "#22C55E",
              warning: "#F59E0B",
              danger: "#EF4444",
            },`
);

adminContent = adminContent.replace(/text-white/g, 'text-textMain');
adminContent = adminContent.replace(/bg-accent(.*?)text-textMain/g, 'bg-accent$1text-white');

fs.writeFileSync('admin.html', adminContent);

console.log("Colors fixed!");
