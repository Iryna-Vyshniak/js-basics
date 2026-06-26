export const initSubmenu = () => {
  const disclosureBtn = document.getElementById('btn-materials');
  const disclosureContent = document.getElementById('materials-content');

  const toggleDisclosure = () => {
    const isExpanded = disclosureBtn.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;

    disclosureBtn.setAttribute('aria-expanded', newState);

    if (newState) {
      disclosureContent.classList.remove('grid-rows-[0fr]');
      disclosureContent.classList.add('grid-rows-[1fr]');
    } else {
      disclosureContent.classList.remove('grid-rows-[1fr]');
      disclosureContent.classList.add('grid-rows-[0fr]');
    }
  };

  disclosureBtn.addEventListener('click', toggleDisclosure);
};
