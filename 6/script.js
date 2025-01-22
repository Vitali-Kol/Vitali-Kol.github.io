document.addEventListener('DOMContentLoaded', () => {
    // Модальное окно
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModal');
  
    if (openModalBtn) {
      openModalBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
      });
    }
  
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
  
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    // Переключение темы
    const themeToggleCheckbox = document.getElementById('theme-toggle');
    if (themeToggleCheckbox) {
      themeToggleCheckbox.addEventListener('change', function() {
        document.body.classList.toggle('light-theme');
      });
    }
  
    // Карусель
    const slides = document.querySelectorAll('.carousel__slide');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;
  
    // Функция для отображения текущего слайда
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
          slide.classList.add('active');
        }
      });
    }
  
    // Функция для перехода к следующему слайду
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }
  
    // Автоматическое переключение слайдов каждые 5 секунд
    function startSlideShow() {
      slideInterval = setInterval(nextSlide, 5000);
    }
  
    // Остановка автоматического переключения
    function stopSlideShow() {
      clearInterval(slideInterval);
    }
  
    // Инициализация карусели
    if (slides.length > 0) {
      showSlide(currentSlide);
      startSlideShow();
    }
  
    // Пауза автопереключения при наведении на карусель
    const carouselContainer = document.querySelector('.carousel__container');
  
    carouselContainer.addEventListener('mouseenter', stopSlideShow);
    carouselContainer.addEventListener('mouseleave', startSlideShow);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const themeToggleCheckbox = document.getElementById('theme-toggle');
    const body = document.body;
  
    // Если пользователь ранее выбирал тему, применяем её при загрузке
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      body.classList.add('light-theme');
      themeToggleCheckbox.checked = true;
    }
  
    // Обработчик события изменения состояния чекбокса
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
  