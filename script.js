const bars = document.querySelector(".bars"),
      close = document.querySelector(".close"),
      menu = document.querySelector(".menu");

bars.addEventListener("click", () => {
    menu.classList.add("active");
    gsap.from(".menu", {
        opacity: 0,
        duration: .3
    })
    gsap.from(".menu ul", {
        opacity: 0,
        x: -300
    })
});   

close.addEventListener("click", () => {
    menu.classList.remove("active")
});


const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');   


// Add click event listeners to the navigation links   

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetSection = document.getElementById(link.hash.slice(1));   

        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Update the active class
        navLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
    });
});


function animateContent(selector) {
    selector.forEach((selector) => {
        gsap.to(selector, {
            y: 30,
            duration: 0.1,
            opacity: 1,
            delay: 0.2,
            stagger: 0.2,
            ease: "power2.out",
        });
    });
}

function scrollTirggerAnimation(triggerSelector, boxSelectors) {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: triggerSelector,
            start: "top 50%",
            end: "top 80%",
            scrub: 1,
        },
    });

    boxSelectors.forEach((boxSelector) => {
        timeline.to(boxSelector, {
            y: 0,
            duration: 1,
            opacity: 1,
        });
    })
}

function swipeAnimation(triggerSelector, boxSelectors) {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: triggerSelector,
            start: "top 50%",
            end: "top 100%",
            scrub: 3,
        },
    });

    boxSelectors.forEach((boxSelector) => {
        timeline.to(boxSelector, {
            x: 0,
            duration: 1,
            opacity:1,
        });
    });
}

function galleryAnimation(triggerSelector, boxSelectors) {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: triggerSelector,
            start: "top 100%",
            end: "bottom 100%",
            scrub: 1,
        },
    });

    boxSelectors.forEach((boxSelector) => {
        timeline.to(boxSelector, {
            y: 0,
            opacity: 1,
            duration: 1,
        });
    });
}




animateContent([".home .content h5, .home .content h1, .home .content p, .home .content .search"]);


swipeAnimation(".destinations", [".destinations .heading", ".destinations .content"])

swipeAnimation(".photo-gallery", [".photo-gallery .heading", ".photo-gallery .content"])


galleryAnimation(".destinations .gallery", [".destinations .gallery .box1",".destinations .gallery .box2",
".destinations .gallery .box3",".destinations .gallery .box4",".destinations .gallery .box5"])
