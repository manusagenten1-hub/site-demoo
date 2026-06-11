import fs from 'fs';

let indexHtml = fs.readFileSync('index.html', 'utf8');

const verTodosBtnHtml = `
      <div id="ver-todos-container" class="hidden justify-center mt-12 w-full">
        <button id="btn-ver-todos" class="bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors border border-borderPrimary shadow-lg">
          Ver todos os carros
        </button>
      </div>
      <div id="empty-state"`;

indexHtml = indexHtml.replace(/<div\\s+id="empty-state"/, verTodosBtnHtml); // Ah, in javascript string it was fine, but in literal it needs to be just \s

indexHtml = indexHtml.replace(/<div\\s*id="empty-state"/, verTodosBtnHtml); // wait it's a regex literal
// let's do it safely:
indexHtml = indexHtml.split('id="empty-state"')[0] + 'id="replace-me"' + indexHtml.split('id="empty-state"').slice(1).join('id="empty-state"');
indexHtml = indexHtml.replace('<div\n          id="replace-me"', verTodosBtnHtml);

fs.writeFileSync('index.html', indexHtml);
