// Projects Filter Script
const projectsFilter = document.querySelectorAll('.projects-filters a');
const projectsGrid = document.querySelector('.projects-grid');

projectsFilter.forEach(filter => {
    filter.addEventListener('click', () => {
        projectsFilter.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        // Filter logic here (replace with your actual filtering logic)
        const filterValue = filter.textContent.toLowerCase();
        const projects = projectsGrid.querySelectorAll('.projects-item');

        projects.forEach(project => {
            if (filterValue === 'all' || project.querySelector('img').alt.toLowerCase().includes(filterValue)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
});

// Testimonials Slider Script
const testimonialsSlider = document.querySelector('.testimonials-slider');
const testimonialItems = testimonialsSlider.querySelectorAll('.testimonial-item');
let currentItem = 0;

function nextTestimonial() {
    currentItem++;
    if (currentItem >= testimonialItems.length) {
        currentItem = 0;
    }
    updateTestimonials();
}

function prevTestimonial() {
    currentItem--;
    if (currentItem < 0) {
        currentItem = testimonialItems.length - 1;
    }
    updateTestimonials();
}

function updateTestimonials() {
    testimonialItems.forEach(item => {
        item.style.display = 'none';
    });
    testimonialItems[currentItem].style.display = 'block';
}

updateTestimonials();

// Set timer for automatic slider navigation (adjust interval as needed)
setInterval(nextTestimonial, 5000);