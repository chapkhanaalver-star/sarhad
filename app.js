const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.service-card');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  cards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count++;
  });
  document.querySelector('#filter-status').textContent = `عدد الخدمات المعروضة: ${count}`;
}));
const dialog = document.querySelector('#image-dialog');
const dialogImage = document.querySelector('#dialog-image');
let opener;
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  opener = button;
  const image = button.querySelector('img');
  dialogImage.onload = () => { dialog.scrollTop = 0; };
  dialogImage.src = image.src;
  dialogImage.alt = image.alt;
  document.querySelector('#dialog-title').textContent = button.closest('article').querySelector('h3').textContent;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('modal-open');
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  opener?.focus({preventScroll:true});
});
