document.addEventListener('DOMContentLoaded', function () {

    // FAQ dropdowns
    const faqButtons = document.querySelectorAll('.faq-button');

    faqButtons.forEach(button => {
        button.addEventListener('click', function () {
            const faqContent = this.nextElementSibling;
            faqContent.style.display = faqContent.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Hero Text Rotation
    const heroText = document.getElementById('hero-text');
    const textOptions = [
        "PAY YOUR OWN BILLS.",
        "TURN TIME INTO MONEY",
        "LEARN SOMETHING NEW",
        "YOUR JOURNEY TO FINANCIAL FREEDOM",
        "EARN UPTO 1 LAC PER MONTH*"
    ];

    heroText.textContent = textOptions[Math.floor(Math.random() * textOptions.length)];

    // Custom Cursor JavaScript
    const body = document.body;

    const MathUtils = {
        lineEq: (y2, y1, x2, x1, currentVal) => {
            var m = (y2 - y1) / (x2 - x1),
                b = y1 - m * x1;
            return m * currentVal + b;
        },
        lerp: (a, b, n) => (1 - n) * a + n * b,
        getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2)
    };

    const getMousePos = e => {
        return { x: e.pageX || e.clientX, y: e.pageY || e.clientY };
    };

    let winsize = { width: window.innerWidth, height: window.innerHeight };
    window.addEventListener("resize", () => {
        winsize = { width: window.innerWidth, height: window.innerHeight };
    });

    let mousepos = { x: winsize.width / 2, y: winsize.height / 2 };
    window.addEventListener("mousemove", ev => (mousepos = getMousePos(ev)));

    // Custom cursor
    class Cursor {
        constructor(el) {
            this.DOM = { el: el };
            this.DOM.circle = this.DOM.el.querySelector(".js-cursor-inner");
            this.DOM.arrows = {
                right: this.DOM.el.querySelector(".js-cursor-right"),
                left: this.DOM.el.querySelector(".js-cursor-left")
            };
            this.bounds = this.DOM.circle.getBoundingClientRect();
            this.lastMousePos = { x: 0, y: 0 };
            this.scale = 1;
            this.lastScale = 1;
            requestAnimationFrame(() => this.render());
        }
        render() {
            this.lastMousePos.x = MathUtils.lerp(
                this.lastMousePos.x,
                mousepos.x - this.bounds.width / 2,
                0.2
            );
            this.lastMousePos.y = MathUtils.lerp(
                this.lastMousePos.y,
                mousepos.y - this.bounds.height / 2,
                0.2
            );
            this.lastScale = MathUtils.lerp(this.lastScale, this.scale, 0.15);
            this.DOM.circle.style.transform = `translateX(${this.lastMousePos.x}px) translateY(${this.lastMousePos.y}px) scale(${this.lastScale})`;
            requestAnimationFrame(() => this.render());
        }
        enter() {
            this.scale = 1.9;
        }
        leave() {
            this.scale = 1;
        }
        click() {
            this.lastScale = 0.4;
        }
        showArrows() {
            if (window.TweenMax) {
                TweenMax.to(Object.values(this.DOM.arrows), 1, {
                    ease: Expo.easeOut,
                    startAt: { x: i => (i ? 10 : -10) },
                    opacity: 1,
                    x: 0
                });
            }
        }
        hideArrows() {
            if (window.TweenMax) {
                TweenMax.to(Object.values(this.DOM.arrows), 1, {
                    ease: Expo.easeOut,
                    x: i => (i ? 10 : -10),
                    opacity: 0
                });
            }
        }
    }

    // Custom mouse cursor
    const cursor = new Cursor(document.querySelector(".js-cursor"));

    // Activate the enter/leave/click methods of the custom cursor when hovering in/out on every <a>
    document.querySelectorAll(".js-link").forEach(link => {
        link.addEventListener("mouseenter", () => cursor.enter());
        link.addEventListener("mouseleave", () => cursor.leave());
    });
});
