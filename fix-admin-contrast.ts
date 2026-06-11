import fs from 'fs';

let adminHtml = fs.readFileSync('admin.html', 'utf8');

// Colors replacement in admin.html
adminHtml = adminHtml.replace(/textMuted: "#6B7280"/g, 'textMuted: "#9CA3AF"');
adminHtml = adminHtml.replace(/textMuted: "#6b7280"/gi, 'textMuted: "#9CA3AF"');
adminHtml = adminHtml.replace(/textSecondary: "#9CA3AF"/g, 'textSecondary: "#B0B0B0"'); // using B0B0B0 for general textSecondary

// For table cells in admin.html, let's search for how they are styled. 
// "Texto de células de tabela no admin: mínimo #D1D5DB"
// Typically they might be text-textSecondary or just inherited text-white. If they are textSecondary, it's now B0B0B0 which is < D1D5DB.
// So let's replace text-textSecondary with text-[#D1D5DB] inside <td> tags.
adminHtml = adminHtml.replace(/<td class="(.*?)"/g, '<td class="$1 text-[#D1D5DB]"');
adminHtml = adminHtml.replace(/<td class="(.*?) text-\[#D1D5DB\] text-\[#D1D5DB\]"/g, '<td class="$1 text-[#D1D5DB]"'); // prevent duplicates

// "Header de tabela no admin: mínimo #9CA3AF"
// If it uses textSecondary, it will be B0B0B0 which is > 9CA3AF, so we are good. If it uses textMuted, it will be 9CA3AF.

// "Labels de inputs (index e admin): mínimo #D1D5DB"
// Let's replace label text colors to text-[#D1D5DB] where they are textMuted or textSecondary
adminHtml = adminHtml.replace(/<label class="(.*?)text-textSecondary(.*?)"/g, '<label class="$1text-[#D1D5DB]$2"');
adminHtml = adminHtml.replace(/<label class="(.*?)text-textMuted(.*?)"/g, '<label class="$1text-[#D1D5DB]$2"');

fs.writeFileSync('admin.html', adminHtml);

let indexHtml = fs.readFileSync('index.html', 'utf8');

// For index.html labels:
indexHtml = indexHtml.replace(/<label class="(.*?)text-textSecondary(.*?)"/g, '<label class="$1text-[#D1D5DB]$2"');
indexHtml = indexHtml.replace(/<label class="(.*?)text-textMuted(.*?)"/g, '<label class="$1text-[#D1D5DB]$2"');

// Inputs text themselves? Usually they are text-white. P is text-textSecondary (#B0B0B0).

fs.writeFileSync('index.html', indexHtml);
