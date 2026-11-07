document.addEventListener('DOMContentLoaded', () => {
  // Подгружаем header
  fetch('/header.html')
    .then(response => response.text())
    .then(data => {
      const headerPlaceholder = document.getElementById('site-header');
      if (headerPlaceholder) headerPlaceholder.outerHTML = data;
    });

  // Подгружаем footer
  fetch('/footer.html')
    .then(response => response.text())
    .then(data => {
      const footerPlaceholder = document.getElementById('site-footer');
      if (footerPlaceholder) footerPlaceholder.outerHTML = data;
    });
});
