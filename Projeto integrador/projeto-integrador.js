class Carousel {
    constructor(carouselId, navId) {
        this.carousel = document.getElementById(carouselId);
        this.nav = document.getElementById(navId);
        this.items = this.carousel.children;
        this.currentIndex = 0;

        this.createDots();
        this.startAutoPlay();
    }

    createDots() {
        this.nav.innerHTML = '';

        for (let i = 0; i < this.items.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            dot.addEventListener('click', () => this.goToSlide(i));
            this.nav.appendChild(dot);
        }

        this.updateDots();
    }

    updateDots() {
        this.nav.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.carousel.style.transform = `translateX(-${index * 100}%)`;
        this.updateDots();
    }

    move(direction) {
        let newIndex = this.currentIndex + direction;

        if (newIndex < 0) newIndex = this.items.length - 1;
        if (newIndex >= this.items.length) newIndex = 0;

        this.goToSlide(newIndex);
    }

    startAutoPlay() {
        setInterval(() => {
            this.move(1); 
        }, 5000);
    }
}

const carousel1 = new Carousel('carousel1', 'nav1');
const carousel2 = new Carousel('carousel2', 'nav2');

function moveCarousel(carouselId, direction) {
    if (carouselId === 'carousel1') {
        carousel1.move(direction);
    } else if (carouselId === 'carousel2') {
        carousel2.move(direction);
    }
}