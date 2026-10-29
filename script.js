// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Плавная прокрутка
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ТОКЕН И ID (Будут заменены GitHub Actions при сборке)
  const TG_TOKEN = '%%TG_TOKEN%%';
  const TG_CHAT_ID = '%%TG_CHAT_ID%%';

  const form = document.getElementById('tg-form');
  const submitBtn = document.getElementById('submit-btn');

  if(form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Отправка...';
      submitBtn.disabled = true;

      const name = form.elements['name'].value;
      const phone = form.elements['phone'].value;

      const message = `🔥 *Новая заявка на пробное занятие!*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}`;
      const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TG_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
          })
        });

        if (response.ok) {
          alert('Спасибо! Заявка отправлена. Савва скоро свяжется с тобой.');
          form.reset();
        } else {
          alert('Ой, что-то пошло не так. Попробуй позвонить напрямую.');
        }
      } catch (error) {
        alert('Ошибка сети. Проверь интернет и попробуй снова.');
      } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});
