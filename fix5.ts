import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

const contactHtml = `
            <div class="bg-bgSurface border border-borderPrimary rounded-xl p-6 flex flex-col gap-6">
              <div class="inline-flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div>
                  <h4 class="text-white font-medium mb-1">Endereço</h4>
                  <p class="text-[#CCCCCC] text-sm">
                    Rua das Palmeiras, 123 — Centro<br />São Paulo - SP
                  </p>
                </div>
              </div>

              <div class="inline-flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3-8.63A2 2 0 0 1 3.68 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.91 5.91l.82-.82a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <div>
                  <h4 class="text-white font-medium mb-1">WhatsApp</h4>
                  <p class="text-[#CCCCCC] text-sm">
                    <a href="#" class="transition">(11) 90000-0000</a>
                  </p>
                </div>
              </div>

              <div class="inline-flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <div>
                  <h4 class="text-white font-medium mb-1">Instagram</h4>
                  <p class="text-[#CCCCCC] text-sm">
                    @pretoautomoveis
                  </p>
                </div>
              </div>

              <div class="inline-flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <div>
                  <h4 class="text-white font-medium mb-1">Horário de Funcionamento</h4>
                  <p class="text-[#CCCCCC] text-sm">
                    Seg–Sex: 8h às 18h<br />Sáb: 8h às 13h<br />Dom: Fechado
                  </p>
                </div>
              </div>
            </div>`;


html = html.replace(/<div\s+class="bg-bgSurface border border-borderPrimary rounded-xl p-6 flex flex-col gap-6"[\s\S]*?Dom: Fechado[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, contactHtml);

fs.writeFileSync('index.html', html);
console.log("Restored contact block");
