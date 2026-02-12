$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Rasheeque";
            $("#favicon").attr("href", "assets/images/misc/favicon1.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/misc/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Data Scientist", "Data Analyst", "Machine Learning Engineer", "Ai Enginner", "Business Analyst"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

// Data is now loaded from data-skills.js, data-projects.js, and data-certificates.js
// accessed via global variables: skillsData, projectsData, certificatesData

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";

    // Loop through each category
    for (let category in skills) {
        skillHTML += `
            <div class="skill-category">
                <h3 class="category-title">${category}</h3>
                <div class="skills-grid">`;

        // Loop through skills in this category
        skills[category].forEach(skill => {
            skillHTML += `
                <div class="bar">
                    <div class="info">
                        <img src="${skill.icon}" alt="${skill.name}" />
                        <span>${skill.name}</span>
                    </div>
                </div>`;
        });

        skillHTML += `
                </div>
            </div>`;
    }

    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");

    if (!projectsContainer) {
        return;
    }

    let projectHTML = "";
    projects.filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

function showCertificates(certificates) {
    let certificatesContainer = document.querySelector("#certificates .box-container");

    // Switch to carousel layout if container exists
    if (!certificatesContainer) {
        // Check if we need to convert the container for carousel
        let section = document.querySelector("#certificates");
        if (section) {
            section.innerHTML = `
            <h2 class="heading"><i class="fas fa-certificate"></i> My <span>Certificates</span></h2>
            <div class="carousel-container"></div>`;
            certificatesContainer = section.querySelector(".carousel-container");
        } else {
            return;
        }
    } else {
        // If existing box-container is found, replace it with carousel container
        let section = document.querySelector("#certificates");
        section.innerHTML = `
            <h2 class="heading"><i class="fas fa-certificate"></i> My <span>Certificates</span></h2>
            <div class="carousel-container"></div>`;
        certificatesContainer = section.querySelector(".carousel-container");
    }

    // Sort certificates by ID
    certificates.sort((a, b) => a.id - b.id);

    // Split into two rows
    const mid = Math.ceil(certificates.length / 2);
    const row1Data = certificates.slice(0, mid);
    const row2Data = certificates.slice(mid);

    // Helper to generate row HTML
    const createRow = (items, reverse = false) => {
        let rowContent = "";
        // Duplicate items to ensure smooth infinite scroll (e.g., 6 times)
        const repeatedItems = [...items, ...items, ...items, ...items, ...items, ...items];

        repeatedItems.forEach(cert => {
            let imageSrc = cert.image === "placeholder.png" ? "https://via.placeholder.com/250x180?text=Certificate" : `./assets/images/certificates/${cert.image}`;

            rowContent += `
            <div class="certificate-card">
                <img draggable="false" src="${imageSrc}" alt="${cert.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/250x180?text=Certificate';"/>
                <div class="overlay">
                    <a href="${cert.links.view}" class="btn" target="_blank">
                        <i class="fas fa-eye"></i> View
                    </a>
                </div>
            </div>`;
        });

        return `<div class="carousel-row ${reverse ? 'reverse' : ''}">${rowContent}</div>`;
    };

    // Inject Rows
    certificatesContainer.innerHTML = createRow(row1Data, false) + createRow(row2Data, true);
}

// Ensure data is loaded before calling display functions
// Using simple check since scripts are loaded synchronously in order
if (typeof skillsData !== 'undefined') showSkills(skillsData);
if (typeof projectsData !== 'undefined') showProjects(projectsData);
if (typeof certificatesData !== 'undefined') showCertificates(certificatesData);

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });