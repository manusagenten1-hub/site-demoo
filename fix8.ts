import fs from 'fs';

let indexHtml = fs.readFileSync('index.html', 'utf8');
let adminHtml = fs.readFileSync('admin.html', 'utf8');

// 1. Number Validation and Formatting
// For index.html:
// We will replace the parseUnmask & blur logic with real-time formatting logic, or simply add input eventListeners.
const maskLogic = `
      function maskCurrencyInput(el) {
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
`;

indexHtml = indexHtml.replace(/const parseUnmask = \(v\) => parseFloat\(v\.replace\(\/\\D\/g, ""\)\) \|\| 0;/, "const parseUnmask = (v) => parseFloat(v.replace(/\\D/g, \"\")) || 0;\n" + maskLogic);

indexHtml = indexHtml.replace(/const minEl = document\.getElementById\("filter-min-price"\);/, 'const minEl = document.getElementById("filter-min-price");\n        maskCurrencyInput(minEl);');
indexHtml = indexHtml.replace(/const maxEl = document\.getElementById\("filter-max-price"\);/, 'const maxEl = document.getElementById("filter-max-price");\n        maskCurrencyInput(maxEl);');

indexHtml = indexHtml.replace(/minEl\.addEventListener\("blur", \(\) => \{[\s\S]*?\}\);/, 'minEl.addEventListener("blur", () => { let v = parseUnmask(minEl.value); activeFilters.minPrice = v; applyFilters(); });');
indexHtml = indexHtml.replace(/maxEl\.addEventListener\("blur", \(\) => \{[\s\S]*?\}\);/, 'maxEl.addEventListener("blur", () => { let v = parseUnmask(maxEl.value); activeFilters.maxPrice = v; applyFilters(); });');


// For admin.html:
adminHtml = adminHtml.replace(/const parseUnmask = \(v\) => parseFloat\(v\.replace\(\/\\D\/g, ""\)\) \|\| 0;/, "const parseUnmask = (v) => parseFloat(v.replace(/\\D/g, \"\")) || 0;\n" + maskLogic);

// Add masks to admin inputs for preco and km
const adminInputMaskCall = `
      document.addEventListener("DOMContentLoaded", () => {
        maskCurrencyInput(document.getElementById("v-preco"));
        maskCurrencyInput(document.getElementById("v-km"));
      });
`;
adminHtml = adminHtml.replace(/const parseUnmask = \(v\) => parseFloat\(v\.replace\(\/\\D\/g, ""\)\) \|\| 0;/, "const parseUnmask = (v) => parseFloat(v.replace(/\\D/g, \"\")) || 0;\n" + maskLogic + adminInputMaskCall);

// Wait, the DOM loaded is tricky. Just put it near the querySelectors.
// admin.html has:
// const modalObj = document.getElementById("vehicle-modal");
adminHtml = adminHtml.replace(/const modalTitle = document\.getElementById\("modal-title"\);/, 'const modalTitle = document.getElementById("modal-title");\n      maskCurrencyInput(document.getElementById("v-preco"));\n      maskCurrencyInput(document.getElementById("v-km"));');


// 2. Limit to 20 cars shown, with "ver todos os carros" button
// Add button to index.html UI
const verTodosBtnHtml = `
      <div id="ver-todos-container" class="hidden flex justify-center mt-12 w-full">
        <button id="btn-ver-todos" class="bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors border border-borderPrimary shadow-lg">
          Ver todos os carros
        </button>
      </div>
      <div id="empty-state"`;
indexHtml = indexHtml.replace(/<div id="empty-state"/, verTodosBtnHtml);

// Add logic to index.html script
const verTodosLogic = `
      let showAllCars = false;
      document.getElementById("btn-ver-todos").addEventListener("click", () => {
        showAllCars = true;
        applyFilters();
      });

      function renderGrid(data) {
        gridEl.innerHTML = "";
        const verTodosContainer = document.getElementById("ver-todos-container");
        if (data.length === 0) {
          gridEl.classList.add("hidden");
          emptyStateEl.classList.remove("hidden");
          emptyStateEl.classList.add("flex");
          verTodosContainer.classList.add("hidden");
        } else {
          gridEl.classList.remove("hidden");
          emptyStateEl.classList.add("hidden");
          emptyStateEl.classList.remove("flex");

          let itemsToRender = data;
          if (!showAllCars && data.length > 20) {
              itemsToRender = data.slice(0, 20);
              verTodosContainer.classList.remove("hidden");
              verTodosContainer.classList.add("flex");
          } else {
              verTodosContainer.classList.add("hidden");
              verTodosContainer.classList.remove("flex");
          }

          gridEl.innerHTML = itemsToRender.map(createCardHTML).join("");
        }
      }
`;

indexHtml = indexHtml.replace(/function renderGrid\(data\) \{[\s\S]*?\}\s*window\.changeMainPhoto/, verTodosLogic + '\n      window.changeMainPhoto');
// Reset `showAllCars` to false on filter changes? The user might just want to see first 20 on new filters.
indexHtml = indexHtml.replace(/function applyFilters\(\) \{/, 'function applyFilters() {\n        // Reset show all when filters change?\n        // showAllCars = false; // Decided not to reset if not requested, or maybe better to reset if activeFilters changes? Let\'s not reset for now, unless clear filters.\n');
indexHtml = indexHtml.replace(/function clearFilters\(\) \{/, 'function clearFilters() {\n        showAllCars = false;');

// Actually, it's better if changing a filter resets `showAllCars` to false. 
// Just tracking if the user wants to see all.
indexHtml = indexHtml.replace(/(document\.getElementById\("filter-.*?\.addEventListener\(.*?, \(e\) => \{)/g, '$1\n            showAllCars = false;');
indexHtml = indexHtml.replace(/(document\.querySelectorAll\("\.filter-pill"\)\.forEach.*?btn\.addEventListener\("click", \(e\) => \{)/g, '$1\n            showAllCars = false;');

// 3. Add Cupê and Cabriolet to categories.
const extraCategoriesIndex = `
              <button
                class="filter-pill px-4 py-1.5 text-xs font-medium rounded-full bg-bgSurface3 text-white hover:text-white border border-borderPrimary"
                data-cat="Cupê"
              >
                Cupê
              </button>
              <button
                class="filter-pill px-4 py-1.5 text-xs font-medium rounded-full bg-bgSurface3 text-white hover:text-white border border-borderPrimary"
                data-cat="Cabriolet"
              >
                Cabriolet
              </button>
`;
indexHtml = indexHtml.replace(/(<button[\s\S]*?data-cat="Van"[\s\S]*?<\/button>)/, '$1' + extraCategoriesIndex);

const extraCategoriesAdmin = `
                  <option value="Van">Van</option>
                  <option value="Cupê">Cupê</option>
                  <option value="Cabriolet">Cabriolet</option>
`;
adminHtml = adminHtml.replace(/<option value="Van">Van<\/option>/g, extraCategoriesAdmin);

// Add to default categories in state script in both index and admin if needed:
// They are dynamically from mock, no need to change mock unless we want to, but options are available to add.

// 4. Update Google Maps iframe
const newMapIframe = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.3308697155203!2d-50.95011423301579!3d-29.938637129269562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95190bc99296e4b3%3A0x93c400b6e7050579!2sPreto%20Autom%C3%B3veis%20%26%20Despachante!5e0!3m2!1spt-BR!2sbr!4v1781101912609!5m2!1spt-BR!2sbr" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

indexHtml = indexHtml.replace(/<iframe[\s\S]*?https:\/\/www\.google\.com\/maps\/embed[\s\S]*?<\/iframe>/, newMapIframe);


fs.writeFileSync('index.html', indexHtml);
fs.writeFileSync('admin.html', adminHtml);
console.log("Changes applied");
