document.addEventListener('DOMContentLoaded', () => {
    // Анимация появления карточек при скролле
    const cards = document.querySelectorAll('.card');

    const observerOptions = {
        threshold: 0.2 // Начинать анимацию, когда 20% карточки видно
    };

    const revealCard = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const cardObserver = new IntersectionObserver(revealCard, observerOptions);

    cards.forEach(card => {
        cardObserver.observe(card);
    });

    // Плавная прокрутка для внутренних ссылок
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
