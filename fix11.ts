import fs from 'fs';

let indexHtml = fs.readFileSync('index.html', 'utf8');

const verTodosBtnHtml = `
      <div id="ver-todos-container" class="hidden justify-center mt-12 w-full">
        <button id="btn-ver-todos" class="bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors border border-borderPrimary shadow-lg">
          Ver todos os carros
        </button>
      </div>
      <div id="empty-state"`;

indexHtml = indexHtml.replace(/<div\\s+id="empty-state"/, verTodosBtnHtml);

fs.writeFileSync('index.html', indexHtml);
console.log("Ver todos inserted");
