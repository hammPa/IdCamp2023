window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('nav ul li');
    buttons.forEach(e => {
        e.addEventListener('click', () => {
            let target = e.getAttribute('id');
            let elementTarget = document.getElementById(target + 'Pos');
            if (elementTarget) {
                window.scrollTo({
                    top: elementTarget.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const headerHeight = header.offsetHeight;
        const scrollNow = this.scrollY;
        if(scrollNow > headerHeight - 100){
            header.style.backdropFilter = 'blur(5px)';
        } else {
            header.style.backdropFilter = 'none';
        }
    });

    


    window.addEventListener('offline', () => {
        const images = document.querySelectorAll('img');
        images.forEach(e => {
            e.classList.toggle("abu-abu");
        });
    });
    
    window.addEventListener('online', () => {
        const images = document.querySelectorAll('img');
        images.forEach(e => {
            e.classList.toggle("abu-abu");
        });
    });


    document.getElementById('hamburger').addEventListener('click', function() {
        const buttons = document.querySelectorAll('header nav ul:last-child li');

        const child = this.querySelector('a');
        child.classList.toggle('shadow');
        buttons.forEach(e => {
            e.classList.toggle('tampil');
        });
    });
});