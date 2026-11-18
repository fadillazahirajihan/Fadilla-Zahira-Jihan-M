"use strict";

/* =========================================================
   MATERI 01 - BILANGAN
   Interaksi untuk enam bagian materi Bilangan saja.
   Tidak mengubah fitur materi lain.
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const section = document.getElementById("bilangan");
    if (!section) return;

    // 1. Navigasi daftar isi Bilangan.
    // Tangani klik lebih awal agar tidak ditangkap oleh navigasi global app.js/page-view.js
    // yang dapat menganggap tautan internal sebagai perpindahan halaman.
    const contentsNav = section.querySelector(".number-contents");
    if (contentsNav) {
        contentsNav.addEventListener("click", function (event) {
            const link = event.target.closest("a[href^='#']");
            if (!link || !contentsNav.contains(link)) return;

            const targetId = link.getAttribute("href").slice(1);
            const target = document.getElementById(targetId);
            if (!target || !section.contains(target)) return;

            // Cegah handler navigasi global mengarahkan pengguna ke Beranda.
            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === "function") {
                event.stopImmediatePropagation();
            }

            section.querySelectorAll(".number-contents a").forEach(function (item) {
                item.classList.remove("is-current");
                item.removeAttribute("aria-current");
            });
            link.classList.add("is-current");
            link.setAttribute("aria-current", "location");

            target.setAttribute("tabindex", "-1");
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            target.focus({ preventScroll: true });

            // Perbarui hash tanpa memicu event hashchange/navigasi halaman.
            if (window.history && typeof window.history.replaceState === "function") {
                window.history.replaceState(null, "", "#" + targetId);
            }
        }, true);
    }


    // 2. Eksplorasi hubungan himpunan: pilih keterangan untuk menyorot diagram.
    const setDiagram = section.querySelector(".number-set-diagram");
    const setItems = section.querySelectorAll(".number-set-guide-item");
    const setClassByName = {
        natural: ".set-natural",
        whole: ".set-whole",
        integer: ".set-integer",
        rational: ".set-rational",
        irrational: ".set-irrational",
        real: ".set-real"
    };

    if (setDiagram && setItems.length) {
        setItems.forEach(function (item) {
            item.addEventListener("click", function () {
                setItems.forEach(function (otherItem) {
                    otherItem.classList.remove("is-selected");
                    otherItem.setAttribute("aria-pressed", "false");
                });
                setDiagram.querySelectorAll("[data-highlight]").forEach(function (node) {
                    node.removeAttribute("data-highlight");
                });

                item.classList.add("is-selected");
                item.setAttribute("aria-pressed", "true");

                const selector = setClassByName[item.dataset.set];
                const target = selector ? setDiagram.querySelector(selector) : null;
                if (target) {
                    target.setAttribute("data-highlight", "true");
                }
            });
        });
    }

    // 3. Garis bilangan interaktif.
    const slider = section.querySelector("#numberLineSlider");
    const valueOutput = section.querySelector("#numberLineValue");
    const marker = section.querySelector("#numberLineMarker");
    const feedback = section.querySelector("#numberLineFeedback");

    if (slider && valueOutput && marker && feedback) {
        function updateNumberLine() {
            const value = Number(slider.value);
            const min = Number(slider.min);
            const max = Number(slider.max);
            const position = ((value - min + 0.5) / (max - min + 1)) * 100;
            const displayValue = value < 0 ? "−" + Math.abs(value) : String(value);

            valueOutput.textContent = displayValue;
            marker.style.left = position + "%";

            if (value < 0) {
                feedback.textContent = displayValue +
                    " berada di sebelah kiri nol. Nilainya lebih kecil daripada nol.";
            } else if (value > 0) {
                feedback.textContent = value +
                    " berada di sebelah kanan nol. Nilainya lebih besar daripada nol.";
            } else {
                feedback.textContent =
                    "Bilangan 0 berada di titik asal, yaitu di antara bilangan negatif dan positif.";
            }
        }

        slider.addEventListener("input", updateNumberLine);
        updateNumberLine();
    }

    // 4. Latihan interaktif (empat soal, masing-masing 25 poin).
    const quiz = section.querySelector("#numberCheckQuiz");
    if (!quiz) return;

    const questions = [
        {
            question: "Bilangan yang digunakan untuk membilang mulai dari 1 adalah ...",
            options: ["Bilangan asli", "Bilangan cacah", "Bilangan bulat", "Bilangan irasional"],
            answer: 0,
            explanation: "Bilangan asli dimulai dari 1, 2, 3, dan seterusnya."
        },
        {
            question: "Bilangan cacah yang bukan bilangan asli adalah ...",
            options: ["1", "2", "0", "5"],
            answer: 2,
            explanation: "Bilangan cacah memuat nol, sedangkan bilangan asli dimulai dari 1."
        },
        {
            question: "Bilangan berikut yang termasuk bilangan irasional adalah ...",
            options: ["0,5", "−3", "¾", "√2"],
            answer: 3,
            explanation: "√2 merupakan bilangan irasional karena desimalnya tidak berakhir dan tidak berulang."
        },
        {
            question: "Pada garis bilangan, bilangan yang terletak paling kanan memiliki nilai ...",
            options: ["Paling kecil", "Paling besar", "Selalu negatif", "Selalu nol"],
            answer: 1,
            explanation: "Semakin ke kanan posisi bilangan pada garis bilangan, semakin besar nilainya."
        }
    ];

    const questionEl = quiz.querySelector("#numberQuizQuestion");
    const optionsEl = quiz.querySelector("#numberQuizOptions");
    const feedbackEl = quiz.querySelector("#numberQuizFeedback");
    const progressEl = quiz.querySelector("#numberQuizProgress");
    const progressBar = quiz.querySelector("#numberQuizProgressBar");
    const scoreEl = quiz.querySelector("#numberQuizScore");
    const nextBtn = quiz.querySelector("#numberQuizNext");
    const resultEl = quiz.querySelector("#numberQuizResult");
    const restartBtn = quiz.querySelector("#numberQuizRestart");

    if (!questionEl || !optionsEl || !feedbackEl || !progressEl ||
        !progressBar || !scoreEl || !nextBtn || !resultEl || !restartBtn) {
        console.warn("Elemen latihan Bilangan belum lengkap. Periksa ID pada indeks.html.");
        return;
    }

    let currentQuestion = 0;
    let score = 0;
    let hasAnswered = false;

    function renderQuestion() {
        const item = questions[currentQuestion];
        hasAnswered = false;

        questionEl.textContent = item.question;
        progressEl.textContent = "Soal " + (currentQuestion + 1) +
            " dari " + questions.length;
        progressBar.style.width =
            ((currentQuestion + 1) / questions.length * 100) + "%";
        scoreEl.textContent = "Skor: " + score;
        feedbackEl.textContent = "Pilih satu jawaban yang menurutmu benar.";
        feedbackEl.className = "number-quiz-feedback";
        nextBtn.disabled = true;
        nextBtn.hidden = false;
        nextBtn.textContent = currentQuestion === questions.length - 1
            ? "Lihat hasil" : "Soal berikutnya →";
        resultEl.hidden = true;
        restartBtn.hidden = true;
        optionsEl.replaceChildren();

        item.options.forEach(function (option, index) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "number-quiz-option";
            button.dataset.index = String(index);
            button.textContent = String.fromCharCode(65 + index) + ". " + option;

            button.addEventListener("click", function () {
                if (hasAnswered) return;
                hasAnswered = true;

                const isCorrect = index === item.answer;
                if (isCorrect) score += 25;

                optionsEl.querySelectorAll("button").forEach(function (choice) {
                    choice.disabled = true;
                    const choiceIndex = Number(choice.dataset.index);
                    if (choiceIndex === item.answer) {
                        choice.classList.add("is-correct");
                    }
                    if (choiceIndex === index && !isCorrect) {
                        choice.classList.add("is-wrong");
                    }
                });

                feedbackEl.textContent =
                    (isCorrect ? "Tepat! " : "Belum tepat. ") + item.explanation;
                feedbackEl.classList.add(isCorrect ? "is-correct" : "is-wrong");
                scoreEl.textContent = "Skor: " + score;
                nextBtn.disabled = false;
            });

            optionsEl.appendChild(button);
        });
    }

    nextBtn.addEventListener("click", function () {
        if (!hasAnswered) return;

        if (currentQuestion < questions.length - 1) {
            currentQuestion += 1;
            renderQuestion();
            return;
        }

        questionEl.textContent = "Latihan selesai!";
        optionsEl.replaceChildren();
        feedbackEl.textContent = "Kamu sudah menyelesaikan seluruh pertanyaan.";
        feedbackEl.className = "number-quiz-feedback is-correct";
        progressEl.textContent = "Selesai";
        progressBar.style.width = "100%";
        nextBtn.hidden = true;
        resultEl.hidden = false;
        resultEl.textContent = "Skor akhir kamu " + score + " dari 100. " +
            (score >= 75
                ? "Bagus! Kamu sudah memahami sebagian besar konsep bilangan."
                : "Terus berlatih, ya. Pelajari kembali jenis bilangan dan eksplorasi garis bilangannya.");
        restartBtn.hidden = false;
    });

    restartBtn.addEventListener("click", function () {
        currentQuestion = 0;
        score = 0;
        renderQuestion();
    });

    renderQuestion();
});
