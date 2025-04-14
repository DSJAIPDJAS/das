document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initScrollSpy();
    initCounters();
    initProjects();
    initClients();
    initTeam();
    initTestimonials();
    initParallax();
    initAnimations();
    initAuthModals();
    initInvestments();
    initScrollAnimations();
    initPropertySearch();
});

// Navbar and Mobile Menu
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenuBtn = document.querySelector('.close-menu-btn');

    // Scroll effect
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 100);
    });

    // Mobile menu toggle
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', toggleMobileMenu);
        
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', toggleMobileMenu);
        }
        
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                toggleMobileMenu();
            }
        });
    });

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
}

// Scroll Spy for navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounter(counter, target) {
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter, target), 1);
        } else {
            counter.innerText = target;
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    animateCounter(counter, target);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsSection.parentElement.style.visibility = 'hidden';
        setTimeout(() => {
            statsSection.parentElement.style.visibility = 'visible';
            observer.observe(statsSection);
        }, 500);
    }
}


// عرض المشاريع العقارية
function initProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    const projects = [
        {
            id: 1,
            title: 'Luxury Villa in Riyadh',
            titleAr: 'فيلا فاخرة بالرياض',
            description: 'Modern villa with 500 sqm area in upscale neighborhood, 5 bedrooms and 3 living rooms.',
            descriptionAr: 'فيلا حديثة بمساحة 500 متر مربع في حي راقي، تحتوي على 5 غرف نوم و3 صالات.',
            image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/096f8290363747.5e15979a06759.jpg',
            price: '3,500,000',
            priceAr: '3,500,000 ر.س',
            area: '500 sqm',
            areaAr: '500 م²',
            location: 'Riyadh',
            locationAr: 'الرياض',
            featured: true
        },
        {
            id: 2,
            title: 'Business District Apartment',
            titleAr: 'شقة بمنطقة الأعمال',
            description: 'Elegant apartment in modern commercial tower, 180 sqm area, panoramic city view.',
            descriptionAr: 'شقة أنيقة في برج تجاري حديث، مساحة 180 متر مربع، إطلالة بانورامية على المدينة.',
            image: 'https://algedra.com.tr/assets/imgs/fitout/jsWiVadZxcv82Hr-yEeu4U-riyadh-city-a-luxurious-villa.jpg',
            price: '2,200,000',
            priceAr: '2,200,000 ر.س',
            area: '180 sqm',
            areaAr: '180 م²',
            location: 'Jeddah',
            locationAr: 'جدة',
            featured: true
        },
        {
            id: 3,
            title: 'Beachfront Palace',
            titleAr: 'قصر على البحر',
            description: 'Luxurious palace directly on the beach, 1200 sqm area, private garden and swimming pool.',
            descriptionAr: 'قصر فاخر مباشر على البحر، مساحة 1200 متر مربع، حديقة خاصة وحمام سباحة.',
            image: 'https://cdn.cilomarbella.com/wp-content/uploads/2021/07/W.C.-VILLA-HACIENDA-LAS-CHAPAS-EN_Page_1_Image_0002.jpg',
            price: '12,000,000',
            priceAr: '12,000,000 ر.س',
            area: '1200 sqm',
            areaAr: '1200 م²',
            location: 'Khobar',
            locationAr: 'الخبر',
            featured: true
        },
        {
            id: 4,
            title: 'Investment Land',
            titleAr: 'أرض استثمارية',
            description: 'Residential land with 1000 sqm area in promising area, excellent investment opportunity.',
            descriptionAr: 'أرض سكنية بمساحة 1000 متر مربع في منطقة واعدة، فرصة استثمارية ممتازة.',
            image: 'https://smddecoration.com/smdturkiyedecoration/vi/blog/7541/Villa%20design%20company2.webp',
            price: '1,800,000',
            priceAr: '1,800,000 ر.س',
            area: '1000 sqm',
            areaAr: '1000 م²',
            location: 'Dammam',
            locationAr: 'الدمام',
            featured: false
        },
        {
            id: 5,
            title: 'Commercial Complex',
            titleAr: 'مجمع تجاري',
            description: 'Modern commercial complex with 10 shops and 3 offices in prime location.',
            descriptionAr: 'مجمع تجاري حديث يحتوي على 10 محلات تجارية و3 مكاتب إدارية في موقع مميز.',
            image: 'https://gooceantravel.com/wp-content/uploads/2023/04/Hideaway-Maldives-villas-7-family-villa-one-bedroom-4-1030x579-1.jpg',
            price: '8,500,000',
            priceAr: '8,500,000 ر.س',
            area: '1500 sqm',
            areaAr: '1500 م²',
            location: 'Riyadh',
            locationAr: 'الرياض',
            featured: false
        },
        {
            id: 6,
            title: 'Family Villa',
            titleAr: 'فيلا عائلية',
            description: 'Family villa with 700 sqm area, modern design with garden and guest annex.',
            descriptionAr: 'فيلا عائلية بمساحة 700 متر مربع، تصميم عصري مع حديقة وملحق للضيوف.',
            image: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/f6a6f5fe-b2e7-4d87-990d-c753c983b0d0.jpg?im_w=720',
            price: '4,750,000',
            priceAr: '4,750,000 ر.س',
            area: '700 sqm',
            areaAr: '700 م²',
            location: 'Taif',
            locationAr: 'الطائف',
            featured: false
        },
        {
            id: 7,
            title: 'Penthouse with View',
            titleAr: 'بنتهاوس بإطلالة',
            description: 'Luxury penthouse with 360° view, 400 sqm area, high-end finishes.',
            descriptionAr: 'بنتهاوس فاخر بإطلالة 360 درجة، مساحة 400 متر مربع، تشطيب فاخر.',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/558181698.jpg?k=bb9d27893032deaeeb9f88f7a4232006831fb9b315b43d7f85e86c63c9697e4f&o=&hp=1',
            price: '6,200,000',
            priceAr: '6,200,000 ر.س',
            area: '400 sqm',
            areaAr: '400 م²',
            location: 'Jeddah',
            locationAr: 'جدة',
            featured: true
        },
        {
            id: 8,
            title: 'Villa Star',
            titleAr: 'مزرعة سكنية',
            description: 'Agricultural estate with 5000 sqm area, fruit trees and modern villa.',
            descriptionAr: 'مزرعة سكنية بمساحة 5000 متر مربع، أشجار مثمرة وفيلا حديثة.',
            image: 'https://metropolitan.realestate/wp-content/uploads/2022/04/cavalli-estates-1.jpg',
            price: '5,500,000',
            priceAr: '5,500,000 ر.س',
            area: '5000 sqm',
            areaAr: '5000 م²',
            location: 'Al Kharj',
            locationAr: 'الخرج',
            featured: false
        },
        // المشاريع الجديدة المضافة
        {
            id: 9,
            title: 'Sky Tower Residence',
            titleAr: 'سكن برج السماء',
            description: 'Ultra-modern residence in the heart of the city with breathtaking views and premium amenities.',
            descriptionAr: 'سكن عصري جداً في قلب المدينة بإطلالات خلابة ومرافق فاخرة.',
            image: 'https://images.skyscrapercenter.com/building/The-Address-Residence-Sky-View-Tower-1-Thuc-Bui-1606654012266.jpg',
            price: '9,750,000',
            priceAr: '9,750,000 ر.س',
            area: '650 sqm',
            areaAr: '650 م²',
            location: 'Riyadh',
            locationAr: 'الرياض',
            featured: true
        },
        {
            id: 10,
            title: 'Desert Oasis Resort',
            titleAr: 'منتجع واحة الصحراء',
            description: 'Luxury desert resort with private villas, spa and entertainment facilities.',
            descriptionAr: 'منتجع صحراوي فاخر مع فلل خاصة، منتجع صحي ومرافق ترفيهية.',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/630454226.jpg?k=0d5df06db9fa5fe6a3da818414816f1cf7a16dda0ddbbd12029c868a122fb528&o=&hp=1',
            price: '15,000,000',
            priceAr: '15,000,000 ر.س',
            area: '8000 sqm',
            areaAr: '8000 م²',
            location: 'Al Ula',
            locationAr: 'العلا',
            featured: true
        },
        {
            id: 11,
            title: 'Downtown Office Space',
            titleAr: 'مساحة مكتبية في وسط المدينة',
            description: 'Premium office space in central business district with high-tech infrastructure.',
            descriptionAr: 'مساحة مكتبية مميزة في منطقة الأعمال المركزية مع بنية تحتية عالية التقنية.',
            image: 'https://www.mindspace.me/wp-content/uploads/2022/08/688A8145-1.jpg',
            price: '6,800,000',
            priceAr: '6,800,000 ر.س',
            area: '1200 sqm',
            areaAr: '1200 م²',
            location: 'Jeddah',
            locationAr: 'جدة',
            featured: false
        },
        {
            id: 12,
            title: 'Mountain Retreat',
            titleAr: 'منتجع جبلي',
            description: 'Exclusive mountain retreat with panoramic views and private hiking trails.',
            descriptionAr: 'منتجع جبلي حصري بإطلالات بانورامية ومسارات مشي خاصة.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfvac8q9y3tOhLArpC_Cll_AxXEDhUh4JZog&s',
            price: '7,200,000',
            priceAr: '7,200,000 ر.س',
            area: '3500 sqm',
            areaAr: '3500 م²',
            location: 'Abha',
            locationAr: 'أبها',
            featured: true
        }
    ];
    
    
    projectsGrid.innerHTML = '';

    // Keep featured projects first
    const featuredProjects = projects.filter(project => project.featured);
    const otherProjects = projects.filter(project => !project.featured);
    const allProjects = [...featuredProjects, ...otherProjects];

    allProjects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        
        // Determine animation based on position (right, center, left)
        let animation = '';
        if (index % 3 === 0) { // Right column
            animation = 'fade-right';
        } else if (index % 3 === 1) { // Middle column
            animation = 'fade-up';
        } else { // Left column
            animation = 'fade-left';
        }

        projectCard.className = 'project-card';
        projectCard.setAttribute('data-scroll', animation);
        projectCard.setAttribute('data-delay', index * 100);
        
        projectCard.innerHTML = `
            <div class="card-content">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    ${project.featured ? '<div class="featured-badge">Featured</div>' : ''}
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-meta">
                        <span><i class="fas fa-tag"></i> ${project.price} SAR</span>
                        <span><i class="fas fa-ruler-combined"></i> ${project.area}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
                    </div>
                    <button class="details-btn" data-id="${project.id}">
                        <span>View Details</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    // Modal functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.details-btn')) {
            const btn = e.target.closest('.details-btn');
            const projectId = parseInt(btn.getAttribute('data-id'));
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                const modal = document.getElementById('projectModal');
                
                modal.querySelector('#modalProjectImage').src = project.image;
                modal.querySelector('#modalProjectTitle').textContent = project.title;
                modal.querySelector('#modalProjectDesc').textContent = project.description;
                modal.querySelector('#modalProjectPrice').textContent = project.price + ' SAR';
                modal.querySelector('#modalProjectArea').textContent = project.area;
                modal.querySelector('#modalProjectLocation').textContent = project.location;
                
                modal.style.display = 'block';
            }
        }
        
        if (e.target.classList.contains('close-modal') || e.target === document.getElementById('projectModal')) {
            document.getElementById('projectModal').style.display = 'none';
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initProjects);
// JavaScript for Clients Section with Same Scroll Animations
function initClients() {
    const clientsGrid = document.querySelector('.clients-grid');
    
    const clients = [
        {
            id: 1,
            name: 'Tech Innovations',
            logo: 'https://cdn-icons-png.flaticon.com/512/2721/2721287.png',
            description: 'Technology Partner',
            featured: true
        },
        {
            id: 2,
            name: 'Global Finance',
            logo: 'https://cdn-icons-png.flaticon.com/512/1965/1965661.png',
            description: 'Financial Services',
            featured: true
        },
        {
            id: 3,
            name: 'Urban Developers',
            logo: 'https://cdn-icons-png.flaticon.com/512/1570/1570887.png',
            description: 'Real Estate Group',
            featured: false
        },
        {
            id: 4,
            name: 'Luxury Brands',
            logo: 'https://cdn-icons-png.flaticon.com/512/2589/2589900.png',
            description: 'Premium Retail',
            featured: true
        },
        {
            id: 5,
            name: 'Skyline Architects',
            logo: 'https://cdn-icons-png.flaticon.com/512/2458/2458246.png',
            description: 'Design Studio',
            featured: false
        },
        {
            id: 6,
            name: 'Ocean Resorts',
            logo: 'https://cdn-icons-png.flaticon.com/512/2503/2503183.png',
            description: 'Hospitality Group',
            featured: true
        }
    ];

    clientsGrid.innerHTML = '';

    clients.forEach((client, index) => {
        const clientCard = document.createElement('div');
        const delay = 100 + (index * 50); // 100ms increment for each card
        
        clientCard.className = 'client-card';
        clientCard.setAttribute('data-scroll', 'fade-up');
        clientCard.setAttribute('data-delay', delay);
        
        clientCard.innerHTML = `
            <div class="card-3d">
                <div class="card-front">
                    <div class="logo-container">
                        <img src="${client.logo}" alt="${client.name}" class="client-logo" loading="lazy">
                        ${client.featured ? '<div class="featured-badge">Premium</div>' : ''}
                    </div>
                    <div class="client-details">
                        <p class="title">${client.name}</p>
                        <p class="description">${client.description}</p>
                    </div>
                </div>
                <div class="card-back">
                    <button class="client-btn" data-id="${client.id}">
                        View Portfolio <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        clientsGrid.appendChild(clientCard);
    });

    // Button click handler
    document.addEventListener('click', function(e) {
        if (e.target.closest('.client-btn')) {
            const btn = e.target.closest('.client-btn');
            const clientId = parseInt(btn.getAttribute('data-id'));
            const client = clients.find(c => c.id === clientId);
            if (client) {
                console.log(`Viewing portfolio for ${client.name}`);
                // يمكنك إضافة المزيد من الأكواد هنا عند النقر
            }
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initClients);
//  Team Section //
function initTeam() {
    const teamCards = document.querySelector('.team-cards');
    
    const teamMembers = [
        {
            id: 1,
            name: 'John Smith',
            position: 'CEO',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            social: {
                twitter: '#',
                facebook: '#',
                linkedin: '#',
                instagram: '#'
            },
            bio: 'Seasoned executive with 15+ years in real estate development.'
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            position: 'Sales Director',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            social: {
                twitter: '#',
                facebook: '#',
                linkedin: '#',
                instagram: '#'
            },
            bio: 'Top-performing sales professional with a passion for client relationships.'
        },
        {
            id: 3,
            name: 'Michael Brown',
            position: 'Real Estate Expert',
            image: 'https://randomuser.me/api/portraits/men/75.jpg',
            social: {
                twitter: '#',
                facebook: '#',
                linkedin: '#',
                instagram: '#'
            },
            bio: 'Market analyst with deep knowledge of local property trends.'
        },
        {
            id: 4,
            name: 'Emily Davis',
            position: 'Interior Designer',
            image: 'https://randomuser.me/api/portraits/women/68.jpg',
            social: {
                twitter: '#',
                facebook: '#',
                linkedin: '#',
                instagram: '#'
            },
            bio: 'Creative designer specializing in luxury home staging.'
        }
    ];

    teamCards.innerHTML = '';

    teamMembers.forEach((member, index) => {
        const memberCard = document.createElement('div');
        memberCard.className = 'team-card';
        memberCard.style.animationDelay = `${index * 0.1}s`;
        memberCard.innerHTML = `
            <div class="card-content">
                <img src="${member.image}" alt="${member.name}" class="team-img" loading="lazy">
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p>${member.position}</p>
                    <div class="member-social">
                        <a href="${member.social.twitter}" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="${member.social.facebook}" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="${member.social.linkedin}" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                        <a href="${member.social.instagram}" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        `;
        teamCards.appendChild(memberCard);

        // Intersection Observer للتحميل عند الظهور
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(memberCard);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initTeam();
    
});
// Display Client Testimonials with Enhanced Features
function initTestimonials() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    const testimonials = [
        {
            id: 1,
            content: 'I have worked with many real estate companies, but Elite Real Estate was the best in terms of service, follow-up, and transparency. I highly recommend them to everyone.',
            author: 'Robert Wilson',
            position: 'Businessman',
            image: 'https://randomuser.me/api/portraits/men/22.jpg',
            rating: 5
        },
        {
            id: 2,
            content: 'The team helped me find my dream home in record time. Their attention to detail and understanding of my needs was exceptional.',
            author: 'Sarah Johnson',
            position: 'Housewife',
            image: 'https://randomuser.me/api/portraits/women/33.jpg',
            rating: 4
        },
        {
            id: 3,
            content: 'We were looking for suitable investment land, and thanks to the expertise of Elite Real Estate team, we found exactly what we were looking for at a great price. Thank you.',
            author: 'David Thompson',
            position: 'Investor',
            image: 'https://randomuser.me/api/portraits/men/55.jpg',
            rating: 5
        },
        {
            id: 4,
            content: 'Dealing with Elite Real Estate was different - their credibility and professionalism were evident from the first moment. I recommend them to anyone looking for property.',
            author: 'Jennifer Adams',
            position: 'Doctor',
            image: 'https://randomuser.me/api/portraits/women/77.jpg',
            rating: 5
        }
    ];

    testimonialsSlider.innerHTML = '';

    testimonials.forEach((testimonial, index) => {
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card animate__animated animate__fadeIn';
        testimonialCard.style.animationDelay = `${index * 0.15}s`;
        testimonialCard.innerHTML = `
            <div class="testimonial-content">
                <div class="quote-icon">"</div>
                <p>${testimonial.content || 'No testimonial content available'}</p>
                <div class="rating">${stars}</div>
            </div>
            <div class="testimonial-author">
                <div class="author-image">
                    <img src="${testimonial.image}" alt="${testimonial.author || 'Client'}" loading="lazy">
                </div>
                <div class="author-info">
                    <h4>${testimonial.author || 'Satisfied Client'}</h4>
                    <p>${testimonial.position || 'Customer'}</p>
                </div>
            </div>
        `;
        testimonialsSlider.appendChild(testimonialCard);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__fadeIn');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(testimonialCard);
    });

    initTestimonialSlider();
}

function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse events
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch events
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// Parallax Effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-image');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const elementPosition = element.offsetTop;
            const distance = scrollPosition - elementPosition;
            
            if (distance < 1000 && distance > -500) {
                element.style.transform = `translateY(${distance * 0.1}px)`;
            }
        });
    });
}

// General Animations
function initAnimations() {
    const animateElements = document.querySelectorAll('.project-card, .client-card, .team-member, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                entry.target.classList.remove('fade-out-hidden');
                
                if (entry.target.id === 'projects') {
                    animateSectionElements('.project-card', 'in');
                } else if (entry.target.id === 'team') {
                    animateSectionElements('.team-member', 'in');
                }
            } else if (entry.boundingClientRect.top < 0) {
                entry.target.classList.add('fade-out-hidden');
                entry.target.classList.remove('fade-in-visible');
                
                if (entry.target.id === 'projects') {
                    animateSectionElements('.project-card', 'out');
                } else if (entry.target.id === 'team') {
                    animateSectionElements('.team-member', 'out');
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        section.classList.add('fade-section');
        observer.observe(section);
    });
}

function animateSectionElements(selector, direction) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        setTimeout(() => {
            if (direction === 'in') {
                element.classList.add('animate-in');
                element.classList.remove('animate-out');
            } else {
                element.classList.add('animate-out');
                element.classList.remove('animate-in');
            }
        }, index * 100);
    });
}

// Property Search
function initPropertySearch() {
    const searchBox = document.querySelector('.search-box');
    if (!searchBox) return;

    const searchInput = searchBox.querySelector('input');
    const searchButton = searchBox.querySelector('button');
    
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchBox.appendChild(searchResults);
    
    const properties = [
        { title: "Luxury Villa in Riyadh", type: "Villa", price: "3,500,000 SAR", location: "Riyadh" },
        { title: "Modern Apartment in Jeddah", type: "Apartment", price: "2,200,000 SAR", location: "Jeddah" },
        { title: "Beachfront Palace", type: "Palace", price: "12,000,000 SAR", location: "Khobar" },
        { title: "Commercial Space", type: "Commercial", price: "5,800,000 SAR", location: "Riyadh" },
        { title: "Investment Land", type: "Land", price: "1,800,000 SAR", location: "Dammam" }
    ];

    function showResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No properties found</div>';
            searchResults.classList.add('active');
            return;
        }
        
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <h4>${item.title}</h4>
                <p>${item.type} - ${item.price} - ${item.location}</p>
            `;
            resultItem.addEventListener('click', () => {
                searchInput.value = item.title;
                searchResults.classList.remove('active');
            });
            searchResults.appendChild(resultItem);
        });
        
        searchResults.classList.add('active');
    }

    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        if (query.length > 2) {
            const results = properties.filter(property => 
                property.title.toLowerCase().includes(query) ||
                property.type.toLowerCase().includes(query) ||
                property.location.toLowerCase().includes(query)
            );
            showResults(results);
        } else {
            searchResults.classList.remove('active');
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim().toLowerCase();
            if (query.length > 0) {
                const results = properties.filter(property => 
                    property.title.toLowerCase().includes(query) ||
                    property.type.toLowerCase().includes(query) ||
                    property.location.toLowerCase().includes(query)
                );
                showResults(results);
            }
        }
    });

    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length > 0) {
            const results = properties.filter(property => 
                property.title.toLowerCase().includes(query) ||
                property.type.toLowerCase().includes(query) ||
                property.location.toLowerCase().includes(query)
            );
            showResults(results);
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchBox.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

// Investments Section
function initInvestments() {
    const amountSlider = document.getElementById('investment-amount');
    const amountValue = document.getElementById('amount-value');
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (amountSlider && amountValue) {
        const updateAmountValue = () => {
            amountValue.textContent = new Intl.NumberFormat('en-US').format(amountSlider.value) + ' SAR';
        };
        
        amountSlider.addEventListener('input', updateAmountValue);
        updateAmountValue();
    }
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateReturns);
        calculateReturns();
    }
    
    const opportunityCards = document.querySelectorAll('.opportunity-card');
    
    opportunityCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
        
        const detailsBtn = card.querySelector('.opportunity-btn');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showOpportunityDetails(card);
            });
        }
        
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('opportunity-btn')) {
                showOpportunityDetails(card);
            }
        });
    });
    
    function calculateReturns() {
        const amount = parseInt(amountSlider.value);
        const period = parseInt(document.getElementById('investment-period').value);
        const type = document.getElementById('property-type').value;
        
        const returnRates = {
            residential: { annual: 8.5, roiYears: 8 },
            commercial: { annual: 10.2, roiYears: 6 },
            land: { annual: 12.5, roiYears: 4 }
        };
        
        const rate = returnRates[type];
        const annualReturn = (amount * rate.annual / 100).toLocaleString('en-US');
        const totalReturn = (amount * rate.annual / 100 * period).toLocaleString('en-US');
        
        document.getElementById('expected-return').textContent = totalReturn + ' SAR';
        document.getElementById('annual-return').textContent = rate.annual + '%';
        document.getElementById('roi-period').textContent = rate.roiYears + ' years';
    }
    
    function showOpportunityDetails(card) {
        const title = card.querySelector('h4').textContent;
        const location = card.querySelector('p').textContent;
        const returnRate = card.querySelector('.opportunity-meta span:nth-child(1)').textContent;
        const period = card.querySelector('.opportunity-meta span:nth-child(2)').textContent;
        const image = card.querySelector('img').src;
        const badge = card.querySelector('.opportunity-badge')?.textContent || '';
        
        const modal = document.getElementById('opportunityModal');
        if (!modal) return;

        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalLocation').textContent = location;
        document.getElementById('modalImage').src = image;
        document.getElementById('modalImage').alt = title;
        document.getElementById('modalReturn').textContent = returnRate;
        document.getElementById('modalPeriod').textContent = period;
        document.getElementById('modalROI').textContent = 'ROI: ' + getROI(title) + '%';
        document.getElementById('modalType').textContent = getType(title);
        document.getElementById('modalDescription').textContent = getDescription(title);
        
        modal.style.display = 'block';
    }
    
    function getROI(title) {
        const roiData = {
            'Sarawat Villas Compound': '8.5',
            'International Business Tower': '10.2',
            'Residential Investment Land': '12.5'
        };
        return roiData[title] || '8.0';
    }
    
    function getType(title) {
        const typeData = {
            'Sarawat Villas Compound': 'Residential Compound',
            'International Business Tower': 'Commercial Tower',
            'Residential Investment Land': 'Land Plot'
        };
        return typeData[title] || 'Real Estate';
    }
    
    function getDescription(title) {
        const descriptions = {
            'Sarawat Villas Compound': 'Luxury residential compound with premium amenities in the heart of Riyadh. This project offers villas with modern designs and high-end finishes, suitable for families looking for luxury living.',
            'International Business Tower': 'Prime commercial space in Jeddah\'s business district. The tower features smart offices, conference rooms, and retail spaces with high rental yields and long-term appreciation potential.',
            'Residential Investment Land': 'Prime land in developing area with high appreciation potential. This plot is zoned for residential use and is ideal for developers or long-term investors.'
        };
        return descriptions[title] || 'Premium investment opportunity with excellent returns and growth potential.';
    }

    // Modal close handlers
    const modal = document.getElementById('opportunityModal');
    if (modal) {
        const closeBtn = document.querySelector('.close-modal');
        
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}


// Auth Modals (simplified)
function initAuthModals() {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const forgotModal = document.getElementById('forgotModal');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const forgotPassword = document.getElementById('forgotPassword');

    if (!loginModal || !registerModal || !forgotModal) return;

    // Toggle between modals
    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            registerModal.classList.add('active');
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.classList.remove('active');
            loginModal.classList.add('active');
        });
    }

    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            forgotModal.classList.add('active');
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
        if (e.target === forgotModal) {
            forgotModal.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('is-visible');
                    
                    // تشغيل العدادات إذا وجدت
                    if (element.querySelector('.counter')) {
                        animateCounters();
                    }
                }, Number(delay));
                
                // إيقاف المراقبة بعد التنشيط
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // مراقبة جميع العناصر ذات data-scroll
    document.querySelectorAll('[data-scroll]').forEach(el => {
        observer.observe(el);
    });

    // دالة العدادات
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
});


// JavaScript for Contact Form and Animations
function initContact() {
    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
                contactForm.reset();
                
                setTimeout(() => {
                    const lang = document.documentElement.lang;
                    if (lang === 'ar') {
                        submitBtn.innerHTML = '<span>أرسل مع الحب</span> <i class="fas fa-heart"></i>';
                    } else {
                        submitBtn.innerHTML = '<span>Send With Love</span> <i class="fas fa-heart"></i>';
                    }
                }, 2000);
            }, 1500);
        });
    }
    
    // Language toggle handler (example)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('lang-toggle')) {
            const lang = e.target.getAttribute('data-lang');
            document.querySelectorAll('.en, .ar').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.' + lang).forEach(el => {
                el.style.display = 'block';
            });
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initContact();
    initScrollAnimations(); // Use the same scroll animation function from other sections
});