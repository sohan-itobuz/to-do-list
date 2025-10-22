export default showToast((message = 'This is a toast notification!') => {

  const toastContainer = document.getElementById('toast-container');

  const toast = document.createElement('div');

  toast.classList.add('toast');
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 3000);
});