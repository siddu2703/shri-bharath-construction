// SERVICES MODAL - COMPLETE REWRITE

const servicesData = {
    residential: {
        title: 'Residential Construction',
        subtitle: 'Building Your Dream Home',
        items: [
            { name: 'Luxury Villas', desc: 'Premium custom-built villas with modern amenities and elegant design' },
            { name: 'Independent Houses', desc: 'Standalone homes designed specifically for families' },
            { name: 'Duplex Homes', desc: 'Two-story residential buildings with elegant architecture' },
            { name: 'Farmhouses', desc: 'Spacious countryside properties with beautiful gardens' }
        ]
    },
    commercial: {
        title: 'Commercial Projects',
        subtitle: 'Professional Business Spaces',
        items: [
            { name: 'Office Buildings', desc: 'Corporate spaces with modern infrastructure and facilities' },
            { name: 'Retail Spaces', desc: 'Shopping complexes and showrooms with prime locations' },
            { name: 'Warehouses', desc: 'Industrial storage facilities with efficient layouts' },
            { name: 'Hotels & Resorts', desc: 'Hospitality construction projects with world-class amenities' }
        ]
    },
    renovation: {
        title: 'Renovation & Remodeling',
        subtitle: 'Transform Your Space',
        items: [
            { name: 'Kitchen Remodeling', desc: 'Modern kitchen upgrades with latest appliances and design' },
            { name: 'Bathroom Renovation', desc: 'Complete bathroom transformation with luxury fittings' },
            { name: 'Interior Redesign', desc: 'Full interior space makeover with contemporary aesthetics' },
            { name: 'Exterior Updates', desc: 'Facade and outdoor space renovation for curb appeal' }
        ]
    },
    design: {
        title: 'Design & Planning',
        subtitle: 'Expert Architectural Services',
        items: [
            { name: 'Architectural Design', desc: 'Complete building design and detailed blueprints' },
            { name: 'Interior Design', desc: 'Space planning and interior aesthetics consultation' },
            { name: '3D Visualization', desc: 'Realistic renders and virtual walkthroughs of projects' },
            { name: 'Structural Planning', desc: 'Engineering and structural design for safety' }
        ]
    }
};

console.log('========== SERVICES NEW JS LOADING ==========');

document.addEventListener('DOMContentLoaded', () => {
    console.log('========== DOM LOADED - SERVICES SCRIPT ==========');

    const modal = document.getElementById('servicesModal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');
    const serviceCards = document.querySelectorAll('.service-card');

    console.log('Modal Element:', modal);
    console.log('Modal Content Element:', modalContent);
    console.log('Modal Close Button:', modalClose);
    console.log('Service Cards Found:', serviceCards.length);

    if (!modal) {
        console.error('❌ MODAL NOT FOUND!');
        return;
    }

    if (!modalContent) {
        console.error('❌ MODAL CONTENT NOT FOUND!');
        return;
    }

    if (!modalClose) {
        console.error('❌ MODAL CLOSE BUTTON NOT FOUND!');
        return;
    }

    if (serviceCards.length === 0) {
        console.error('❌ NO SERVICE CARDS FOUND!');
        return;
    }

    console.log('✅ All elements found successfully!');

    // Click on service card to open modal
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            console.log('Card clicked!');
            const serviceType = card.getAttribute('data-service');
            console.log('Service Type:', serviceType);
            const data = servicesData[serviceType];

            if (!data) {
                console.error('Service data not found for:', serviceType);
                return;
            }

            console.log('Opening modal with data:', data);

            // Build modal content
            modalContent.innerHTML = `
                <div class="modal-main-card">
                    ${card.outerHTML}
                </div>
                <div class="modal-subcategories">
                    <h2>${data.title}</h2>
                    <h4>${data.subtitle}</h4>
                    <div class="subcategories-grid">
                        ${data.items.map(item => `
                            <div class="subcategory-card">
                                <div class="subcategory-image"></div>
                                <div class="subcategory-content">
                                    <h5>${item.name}</h5>
                                    <p>${item.desc}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
