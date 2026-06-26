export const showResult = (elementId, content) => {
  const el = document.getElementById(elementId);
  if (!el) {
    console.error(`Елемент з ID "${elementId}" не знайдено.`);
    return;
  }
  el.textContent = content;
};

export const handleFormSubmit = (formId, callback) => {
  const form = document.getElementById(formId);
  if (!form) {
    console.warn(`[Utils] Form with ID "${formId}" not found in current DOM.`);
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    callback(data, form);
  });
};
