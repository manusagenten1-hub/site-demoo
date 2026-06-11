import fs from 'fs';

let admin = fs.readFileSync('admin.html', 'utf8');

// Change type="number" to type="text" for km and preco
admin = admin.replace(/type="number"\s+id="f-km"\s+min="0"/, 'type="text" id="f-km"');
admin = admin.replace(/type="number"\s+id="f-preco"/, 'type="text" id="f-preco"');
admin = admin.replace(/placeholder="ex: 89900"/, 'placeholder="ex: 89.900"');

// We need a mask function and add unmask logic before save
const scriptReplacement = `
      const parseUnmask = (v) => parseFloat(String(v).replace(/\\D/g, "")) || 0;
      function maskCurrencyInput(el) {
        if (!el) return;
        el.addEventListener("input", (e) => {
          let value = e.target.value.replace(/\\D/g, "");
          if (!value) {
            e.target.value = "";
            return;
          }
          let formatted = parseInt(value, 10).toLocaleString("pt-BR");
          e.target.value = formatted;
        });
      }

      function applyMasks() {
        maskCurrencyInput(document.getElementById("f-preco"));
        maskCurrencyInput(document.getElementById("f-km"));
      }
      document.addEventListener("DOMContentLoaded", applyMasks);

      let allVehicles = [];`;

admin = admin.replace(/let allVehicles = \[\];/, scriptReplacement);

// Fix parseUnmask in the save function:
// Search for `Number(document.getElementById("f-preco").value)` and `Number(document.getElementById("f-km").value)`
admin = admin.replace(/preco:\s*Number\(document\.getElementById\("f-preco"\)\.value\)/, 'preco: parseUnmask(document.getElementById("f-preco").value)');
admin = admin.replace(/km:\s*Number\(document\.getElementById\("f-km"\)\.value\)/, 'km: parseUnmask(document.getElementById("f-km").value)');

// Inside populate form when editing, we must format it:
// document.getElementById("f-preco").value = v.preco || 0;
admin = admin.replace(/document\.getElementById\("f-preco"\)\.value = v\.preco \|\| 0;/, 'document.getElementById("f-preco").value = (v.preco || 0).toLocaleString("pt-BR");');
admin = admin.replace(/document\.getElementById\("f-km"\)\.value = v\.km \|\| 0;/, 'document.getElementById("f-km").value = (v.km || 0).toLocaleString("pt-BR");');


fs.writeFileSync('admin.html', admin);
console.log('Fixed admin formatting');
