(() => {
    "use strict";
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (function() {
        const loader = document.querySelector(".page__loader");
        setTimeout((() => {
            gsap.to(loader, {
                duration: 1,
                opacity: 0,
                ease: "power2.out",
                onComplete: () => {
                    loader.style.display = "none";
                    document.body.style.overflow = "auto";
                }
            });
        }), 3e3);
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        var script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
        script.onload = function() {
            particlesJS("snow", {
                particles: {
                    number: {
                        value: 200,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#ffffff"
                    },
                    opacity: {
                        value: .7,
                        random: false,
                        anim: {
                            enable: false
                        }
                    },
                    size: {
                        value: 5,
                        random: true,
                        anim: {
                            enable: false
                        }
                    },
                    line_linked: {
                        enable: false
                    },
                    move: {
                        enable: true,
                        speed: 5,
                        direction: "bottom",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: true,
                            rotateX: 300,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    events: {
                        onhover: {
                            enable: false
                        },
                        onclick: {
                            enable: false
                        },
                        resize: false
                    }
                },
                retina_detect: true
            });
        };
        document.head.append(script);
    }));
    let snowflakes_count = 200;
    if (typeof total !== "undefined") snowflakes_count = total;
    function spawn_snow(snow_density = 200) {
        snow_density -= 1;
        for (let x = 0; x < snow_density; x++) {
            let board = document.createElement("div");
            board.className = "snowflake";
            document.getElementById("snow").appendChild(board);
        }
    }
    function add_css(rule) {
        let css = document.createElement("style");
        css.type = "text/css";
        css.appendChild(document.createTextNode(rule));
        document.getElementsByTagName("head")[0].appendChild(css);
    }
    function random_int(value = 200) {
        return Math.floor(Math.random() * value) + 1;
    }
    function random_range(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function spawnSnowCSS(snow_density = 100) {
        let snowflake_name = "snowflake";
        let rule = ``;
        if (typeof base_css !== "undefined") rule = base_css;
        for (let i = 1; i < snow_density; i++) {
            let random_x = Math.random() * 100;
            let random_offset = random_range(-1e5, 1e5) * 1e-4;
            let random_x_end = random_x + random_offset;
            let random_x_end_yoyo = random_x + random_offset / 2;
            let random_yoyo_time = random_range(3e4, 8e4) / 1e5;
            let random_yoyo_y = random_yoyo_time * 100;
            let random_scale = Math.random();
            let fall_duration = random_range(10, 30) * 1;
            let fall_delay = random_int(30) * -1;
            let opacity_ = Math.random();
            rule += `\n        .${snowflake_name}:nth-child(${i}) {\n            opacity: ${opacity_};\n            transform: translate(${random_x}vw, -10px) scale(${random_scale});\n            animation: fall-${i} ${fall_duration}s ${fall_delay}s linear infinite;\n        }\n\n        @keyframes fall-${i} {\n            ${random_yoyo_time * 100}% {\n                transform: translate(${random_x_end}vw, ${random_yoyo_y}vh) scale(${random_scale});\n            }\n\n            to {\n                transform: translate(${random_x_end_yoyo}vw, 100vh) scale(${random_scale});\n            }\n            \n        }\n        `;
        }
        add_css(rule);
    }
    window.onload = function() {
        spawnSnowCSS(snowflakes_count);
        spawn_snow(snowflakes_count);
    };
    const doorFrames = document.querySelectorAll(".door-frame");
    document.querySelectorAll(".door");
    const contents = [ {
        text: "Упс.. Пусто",
        gif: "https://media.giphy.com/media/L1pefElwXDsMU/giphy.gif"
    }, {
        text: "Опять анлак рапік :(",
        gif: "https://media.giphy.com/media/nR4L10XlJcSeQ/giphy.gif"
    }, {
        text: "Походу в тебе ліміт удачі)",
        gif: "https://media.giphy.com/media/Md4xQfuJeTtx6/giphy.gif"
    }, {
        text: "ЛАПУХ 100лвл",
        gif: "https://media.giphy.com/media/12xDxBbj7CPAOI/giphy.gif"
    }, {
        text: `<div class="present _act">\n             <span>Маладец, тицяй кнопку</span>\n             <a href="victorina.html" class="button">LETS GO!</a>\n           </div>`,
        gif: "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
    } ];
    let currentContentIndex = 0;
    function toggleDoor(event) {
        const clickedDoorFrame = event.currentTarget;
        const door = clickedDoorFrame.querySelector(".door");
        const present = clickedDoorFrame.querySelector(".present");
        if (!door.classList.contains("doorOpen")) {
            door.classList.add("doorOpen");
            present.innerHTML = contents[currentContentIndex].text;
            present.style.display = "block";
            clickedDoorFrame.style.background = `url('${contents[currentContentIndex].gif}') center center / contain no-repeat`;
            currentContentIndex = (currentContentIndex + 1) % contents.length;
            clickedDoorFrame.removeEventListener("click", toggleDoor);
        }
    }
    doorFrames.forEach((doorFrame => {
        doorFrame.addEventListener("click", toggleDoor);
    }));
    const questionContainer = document.getElementById("question");
    const answersContainer = document.getElementById("answers");
    const feedbackContainer = document.getElementById("feedback");
    const nextButton = document.getElementById("next-btn");
    const resultContainer = document.getElementById("result");
    if (questionContainer && answersContainer && nextButton) {
        const questions = [ {
            question: "Що їдять всі на НГ?",
            answers: [ "Морську капусту", "Пільмені+оцит", "Снікерс+пепсі" ],
            correct: 0
        }, {
            question: "Найпопулярніше різдв*яне ім*я?",
            answers: [ "Лена", "Хейзор", "Алег" ],
            correct: 2
        }, {
            question: "2025 рік це рік?",
            answers: [ "Змії", "Лени", "Цибулі" ],
            correct: 1
        } ];
        let currentQuestionIndex = 0;
        let score = 0;
        function showQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            questionContainer.textContent = currentQuestion.question;
            answersContainer.innerHTML = "";
            feedbackContainer.textContent = "";
            nextButton.style.display = "none";
            currentQuestion.answers.forEach(((answer, index) => {
                const button = document.createElement("button");
                button.textContent = answer;
                button.addEventListener("click", (() => selectAnswer(index)));
                answersContainer.appendChild(button);
            }));
        }
        function selectAnswer(selectedIndex) {
            const currentQuestion = questions[currentQuestionIndex];
            if (selectedIndex === currentQuestion.correct) {
                feedbackContainer.textContent = "🎉 Правильно! 🎉";
                score++;
            } else feedbackContainer.textContent = `❌ Неправильно! Правильна відповідь: ${currentQuestion.answers[currentQuestion.correct]}`;
            nextButton.style.display = "inline-block";
        }
        function showResult() {
            questionContainer.style.display = "none";
            answersContainer.style.display = "none";
            feedbackContainer.style.display = "none";
            nextButton.style.display = "none";
            resultContainer.innerHTML = `\n      🎉 Не погано ${score} з ${questions.length} питань! 🎉 Ось заслужений подарок\n      <a href="gift.html" class="button">Тицяй на мене!</a>\n    `;
        }
        nextButton.addEventListener("click", (() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) showQuestion(); else showResult();
        }));
        showQuestion();
    }
    const outcomes = [ {
        name: "СЯОМІ А5",
        rarity: "common",
        image: "https://kokos.com.ua/content/images/15/480x480l50nn0/xiaomi-redmi-note-5a3964-20541943816674.jpg"
    }, {
        name: "ФОФАН",
        rarity: "common",
        image: "https://www.meme-arsenal.com/memes/6630ec13816a93a0ab8bb69eced8b60e.jpg"
    }, {
        name: "ЦИБУЛЯ",
        rarity: "common",
        image: "https://fermercenter.com/image/data/1Delfis/galant1.jpg"
    }, {
        name: "ІПХОН 16",
        rarity: "legendary",
        image: "https://cdn1.it4profit.com/AfrOrF3gWeDA6VOlDG4TzxMv39O7MXnF4CXpKUwGqRM/resize:fill:540/bg:f6f6f6/q:100/plain/s3://catalog-products/240909223903027695/240911100009443187.png@webp"
    }, {
        name: "Капуста",
        rarity: "rare",
        image: "https://assets.dots.live/misteram-public/0188953b-be62-7083-b5ea-f04e2d2ba42c-826x0.png"
    }, {
        name: "Крем за 109грн",
        rarity: "rare",
        image: "https://pwa-api.eva.ua/img/300/300/resize/1/6/163030_1_1718704821.jpg"
    }, {
        name: "ПЕПСІ",
        rarity: "rare",
        image: "https://img.fozzyshop.com.ua/180343-thickbox_default/pepsi-1l.jpg"
    }, {
        name: "КРІСЛО",
        rarity: "epic",
        image: "https://signalua.com.ua/image/cache/catalog/image/cache/catalog/products_images/1179-550x550.webp"
    }, {
        name: "ДУЛЯ",
        rarity: "epic",
        image: "https://t3.ftcdn.net/jpg/00/53/87/18/360_F_53871827_0HhsCD63TmVANCl58nTKa8w69Yf5Ug7K.jpg"
    }, {
        name: "ОУДІ Р8",
        rarity: "legendary",
        image: "https://cdn1.riastatic.com/photosnew/auto/photo/audi_r8__235586821f.jpg"
    } ];
    const caseSlider = document.getElementById("case-slider");
    const openButton = document.getElementById("open-gift");
    const caseContainer = document.getElementById("case-container");
    const backgroundMusic = document.getElementById("background-music");
    let isOpening = false;
    document.addEventListener("DOMContentLoaded", (() => {
        if (backgroundMusic) backgroundMusic.play().catch((err => console.error("Audio autoplay blocked:", err)));
        populateSlider();
    }));
    function playSound(soundId) {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch((err => console.error("Error playing sound:", err)));
        }
    }
    function populateSlider() {
        const totalItems = outcomes.length * 5;
        for (let i = 0; i < totalItems; i++) {
            const item = outcomes[i % outcomes.length];
            const gift = document.createElement("div");
            gift.className = `gift ${item.rarity}`;
            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;
            const name = document.createElement("div");
            name.textContent = item.name;
            gift.appendChild(img);
            gift.appendChild(name);
            caseSlider.appendChild(gift);
        }
        caseSlider.style.transition = "left 4s cubic-bezier(0.5, 0, 0.5, 1)";
        caseSlider.style.left = "0px";
    }
    function openCase() {
        if (isOpening) return;
        isOpening = true;
        openButton.disabled = true;
        playSound("sound-open");
        const randomIndex = Math.floor(Math.random() * outcomes.length);
        const selectedGift = outcomes[randomIndex];
        const extraCycles = 3;
        const giftWidth = 160;
        const containerWidth = caseContainer.offsetWidth;
        const giftsInView = Math.floor(containerWidth / giftWidth);
        const offsetGifts = outcomes.length * extraCycles;
        const stopPosition = -(offsetGifts + randomIndex - Math.floor(giftsInView / 2)) * giftWidth;
        caseSlider.style.left = `${stopPosition}px`;
        setTimeout((() => {
            playSound(`sound-${selectedGift.rarity}`);
            alert(`ТВІЙ ПОДАРУНОК! ЗАСЛУЖИЛА😘`);
            resetCase();
        }), 5e3);
    }
    function resetCase() {
        setTimeout((() => {
            caseSlider.style.transition = "none";
            caseSlider.style.left = "0px";
            isOpening = false;
            openButton.disabled = false;
            setTimeout((() => {
                caseSlider.style.transition = "left 4s cubic-bezier(0.5, 0, 0.5, 1)";
            }), 100);
        }), 100);
    }
    openButton.addEventListener("click", openCase);
    window["FLS"] = true;
})();