// Wrap every letter in a span
var loginTextWrapper = document.querySelector('.login');
var aboutTextWrapper = document.querySelector('.about');
var contactTextWrapper = document.querySelector('.contact');
loginTextWrapper.innerHTML = loginTextWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
aboutTextWrapper.innerHTML = aboutTextWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
contactTextWrapper.innerHTML = contactTextWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

anime.timeline().add({
    targets: '.login .letter, .about .letter, .contact .letter',
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 800,
    delay: (el, i) => 500 + 30 * i
});

onClickLogin = () => {

    anime.timeline().add({
        targets: '.about .letter, .contact .letter',
        translateX: [0, -30],
        opacity: [1, 0],
        easing: 'easeInExpo',
        duration: 800,
        delay: (el, i) => 100 + 30 * i,
        complete: function (anime) {
            aboutTextWrapper.remove();
            contactTextWrapper.remove();
            animateLogin();
        }
    });
}

