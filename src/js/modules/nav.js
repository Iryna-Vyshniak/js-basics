export const  initNavigation = () => {
    const modal = document.getElementById('nav-modal');
    const btnOpen = document.getElementById('btn-burger');
    const btnClose = document.getElementById('btn-close-modal');

    if (!modal || !btnOpen || !btnClose) return () => {};

    const toggleAriaExpanded = (isExpanded) => {
        btnOpen.setAttribute('aria-expanded', isExpanded);
    };

    const handleOpen = () => {
        modal.showModal();
        toggleAriaExpanded('true');
        document.body.classList.add('overflow-hidden');
    };

    const handleClose = () => {
        modal.close();
        toggleAriaExpanded('false');
        document.body.classList.remove('overflow-hidden');
        btnOpen.focus();
    };

    const handleBackdropClick = (e) => {
        if (e.target === modal) {
            handleClose();
        }
    };

    btnOpen.addEventListener('click', handleOpen);
    btnClose.addEventListener('click', handleClose);
    modal.addEventListener('click', handleBackdropClick);

    return () => {
        btnOpen.removeEventListener('click', handleOpen);
        btnClose.removeEventListener('click', handleClose);
        modal.removeEventListener('click', handleBackdropClick);
        document.body.classList.remove('overflow-hidden');
    };
};