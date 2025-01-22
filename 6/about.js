// Ждём загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', () => {
    // Получаем все слайды карусели
    const slides = document.querySelectorAll('.carousel__slide');
    let currentIndex = 0;
    const totalSlides = slides.length;
    const intervalTime = 5000; // 5000 мс = 5 секунд
  
    // Функция для переключения слайдов
    function changeSlide() {
      // Удаляем класс 'active' у текущего слайда
      slides[currentIndex].classList.remove('active');
      // Вычисляем индекс следующего слайда
      currentIndex = (currentIndex + 1) % totalSlides;
      // Добавляем класс 'active' следующему слайду
      slides[currentIndex].classList.add('active');
    }
  
    // Запускаем смену слайдов через заданный интервал
    setInterval(changeSlide, intervalTime);
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const themeToggleCheckbox = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Если сохранённый режим темы в localStorage есть, применяем его
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'light') {
      body.classList.add('light-theme');
      themeToggleCheckbox.checked = true;
    }
    
    themeToggleCheckbox.addEventListener('change', () => {
      if (themeToggleCheckbox.checked) {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      } else {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      }
    });
  });