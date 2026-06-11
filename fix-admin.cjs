const fs = require('fs');

let html = fs.readFileSync('admin.html', 'utf8');

// 2. Fix the Tailwind Colors to have dark surfaces
html = html.replace(/bgSurface: "#FFFFFF"/, 'bgSurface: "#0A0A0A"');
html = html.replace(/bgSurface2: "#F9FAFB"/, 'bgSurface2: "#141414"');
html = html.replace(/bgSurface3: "#F3F4F6"/, 'bgSurface3: "#1E1E1E"');
html = html.replace(/borderPrimary: "#E5E7EB"/, 'borderPrimary: "#2A2A2A"');
html = html.replace(/textSecondary: "#4B5563"/, 'textSecondary: "#9CA3AF"');
html = html.replace(/textMuted: "#6B7280"/, 'textMuted: "#6B7280"');

html = html.replace(/<body class="(.*?)">/, '<body class="$1 bg-bgPrimary">');
html = html.replace(/text-textMain/g, 'text-white');

// For the login screen bgPrimary should be textMain wrapper?
// Background is F2F2F2 so any text outside bgSurface should be textMain
html = html.replace(/<body class="(.*?) bg-bgPrimary">/, '<body class="$1 bg-bgPrimary text-textMain">');

// For any card, bgSurface, bgSurface2, text should be white
// we just replaced all textMain with white, so cards are white!
// But then the text outside of the cards (like in the lists if there is any) might be white on white. Admin has `bg-bgPrimary` wrapper.
// Let's just restore `textMain` for admin panel sidebar and headers if needed but wait: In `admin.html` everything was dark mode originally. Just replacing text-textMain -> text-white brings it back to original dark mode text. The only issue is `bgPrimary` is now White (#F2F2F2). Let's see if admin uses `bgPrimary` a lot

// Actually, let's keep admin.html in pure dark mode. It's a dashboard. So bgPrimary = "#0A0A0A" in admin.html only!
// The user said "deixa os bullets e cards pretos ... branco é apenas no fundo" which applies to the site (index).
// So let's restore admin.html colors to full dark mode.
let originalColors = `colors: {
              bgPrimary: "#0A0A0A",
              bgSurface: "#141414",
              bgSurface2: "#1E1E1E",
              bgSurface3: "#262626",
              accent: { DEFAULT: "#E63946", dark: "#C1121F" },
              borderPrimary: "#2A2A2A",
              textSecondary: "#9CA3AF",
              textMuted: "#6B7280",
              success: "#22C55E",
              warning: "#F59E0B",
              danger: "#EF4444",
            },`;

html = html.replace(/colors: \{[\s\S]*?danger: "#EF4444",\n\s*\},/, originalColors);
html = html.replace(/<body class="font-sans antialiased text-white bg-bgPrimary text-textMain">/, '<body class="font-sans antialiased text-white bg-bgPrimary">');
html = html.replace(/<body class="font-sans antialiased text-textMain">/, '<body class="font-sans antialiased text-white bg-bgPrimary">');

fs.writeFileSync('admin.html', html);
console.log("Admin fixed.");
