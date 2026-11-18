"use strict";

/* Latihan: cek pemahaman dan kuis terpadu 10 soal */

    // ==================================================
    // 10. LATIHAN PERBANDINGAN PECAHAN
    // ==================================================
    const quizFeedback = document.getElementById("quizFeedback");

    document.querySelectorAll(".quiz-options button").forEach(function (button) {
        button.addEventListener("click", function () {
            if (!quizFeedback) return;

            const isCorrect = button.dataset.answer === "benar";

            quizFeedback.textContent = isCorrect
                ? "Benar! 1/2 = 3/6, sedangkan 2/3 = 4/6. Jadi, 1/2 < 2/3."
                : "Belum tepat. Samakan penyebut menjadi 6, lalu bandingkan 3/6 dan 4/6.";

            quizFeedback.style.color = isCorrect
                ? "#16865f"
                : "#d97732";
        });
    });

/* =========================================================
   MATH CONNECT â€” LATIHAN TERPADU 10 SOAL
   Evaluasi: bilangan, pecahan, konversi, perbandingan,
   operasi pecahan, dan penerapan dalam kehidupan sehari-hari.
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const quizSection = document.getElementById("latihan");
    if (!quizSection) return;

    const questionCards = Array.from(
        quizSection.querySelectorAll(".quiz-question-card")
    );
    const progressLabel = quizSection.querySelector("#quizProgressLabel");
    const progressPercent = quizSection.querySelector("#quizProgressPercent");
    const progressFill = quizSection.querySelector("#quizProgressFill");
    const progressBar = quizSection.querySelector("#quizProgressBar");
    const topicDots = Array.from(
        quizSection.querySelectorAll("[data-topic-step]")
    );
    const resultCard = quizSection.querySelector("#quizFinalResult");
    const finalScore = quizSection.querySelector("#quizFinalScore");
    const correctCountElement = quizSection.querySelector("#quizCorrectCount");
    const incorrectCountElement = quizSection.querySelector("#quizIncorrectCount");
    const resultMessage = quizSection.querySelector("#quizResultMessage");
    const restartButton = quizSection.querySelector("#restartQuiz");
    const reflectionFeedback = quizSection.querySelector("#quizReflectionFeedback");

    if (!questionCards.length) return;

    const explanations = {
        1: "Bilangan bulat mencakup bilangan negatif, nol, dan bilangan positif tanpa bagian pecahan. Jadi, \u22123 merupakan bilangan bulat.",
        2: "Pembilang menunjukkan bagian yang dimakan, yaitu 3. Penyebut menunjukkan seluruh potongan yang sama besar, yaitu 8. Maka pecahannya adalah 3/8.",
        3: "Pecahan tidak murni memiliki pembilang lebih besar daripada penyebut. Pada 7/4, pembilang 7 lebih besar daripada penyebut 4.",
        4: "3 \u00F7 5 = 0,6. Untuk mengubah desimal menjadi persen, kalikan dengan 100%. Jadi, 0,6 = 60%.",
        5: "Dengan perkalian silang: 5 \u00D7 3 = 15 dan 2 \u00D7 8 = 16. Karena 15 lebih kecil daripada 16, maka 5/8 < 2/3.",
        6: "Karena penyebutnya sama, jumlahkan pembilangnya: 1/4 + 2/4 = 3/4.",
        7: "Samakan penyebut: 1/3 = 2/6. Kemudian 5/6 \u2212 2/6 = 3/6 = 1/2.",
        8: "Kalikan pembilang dengan pembilang dan penyebut dengan penyebut: (2 \u00D7 3)/(3 \u00D7 5) = 6/15 = 2/5.",
        9: "Balik pecahan pembagi, lalu ubah menjadi perkalian: 3/4 \u00F7 1/2 = 3/4 \u00D7 2/1 = 6/4 = 3/2.",
        10: "Susu tersisa = 2 \u2212 3/4 = 8/4 \u2212 3/4 = 5/4 = 1 1/4 liter."
    };

    const hints = {
        1: "Bilangan bulat terdiri atas bilangan negatif, nol, dan bilangan positif tanpa bagian pecahan.",
        2: "Pembilang menunjukkan bagian yang diambil, sedangkan penyebut menunjukkan jumlah seluruh bagian yang sama besar.",
        3: "Perhatikan hubungan antara pembilang dan penyebut. Pada pecahan tidak murni, pembilang lebih besar daripada penyebut.",
        4: "Ubah pecahan ke desimal dengan membagi pembilang oleh penyebut. Untuk persen, kalikan desimal dengan 100%.",
        5: "Gunakan perkalian silang: kalikan 5 dengan 3, lalu 2 dengan 8. Bandingkan hasilnya.",
        6: "Karena penyebutnya sama, jumlahkan pembilangnya dan pertahankan penyebutnya.",
        7: "Samakan penyebut terlebih dahulu. Ubah 1/3 menjadi pecahan berpenyebut 6.",
        8: "Kalikan pembilang dengan pembilang dan penyebut dengan penyebut. Sederhanakan hasilnya jika memungkinkan.",
        9: "Ubah pembagian menjadi perkalian dengan membalik pecahan pembagi.",
        10: "Susu yang tersisa diperoleh dengan mengurangkan jumlah susu awal dengan jumlah susu yang digunakan."
    };

    let currentIndex = 0;
    let score = 0;
    let correctTotal = 0;
    let answered = false;

    function updateProgress() {
        const currentNumber = currentIndex + 1;
        const percent = Math.round((currentNumber / questionCards.length) * 100);

        if (progressLabel) {
            progressLabel.textContent = `Soal ${currentNumber} dari ${questionCards.length}`;
        }
        if (progressPercent) progressPercent.textContent = `${percent}%`;
        if (progressFill) progressFill.style.width = `${percent}%`;
        if (progressBar) progressBar.setAttribute("aria-valuenow", String(currentNumber));

        topicDots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
            dot.classList.toggle("done", index < currentIndex);
        });
    }

    function showQuestion(index) {
        currentIndex = index;
        answered = false;

        questionCards.forEach((card, cardIndex) => {
            card.hidden = cardIndex !== index;
            card.classList.toggle("active", cardIndex === index);
        });

        const card = questionCards[index];
        if (!card) return;

        card.querySelectorAll(".quiz-option").forEach(option => {
            option.disabled = false;
            option.classList.remove("selected", "is-correct", "is-wrong");
            option.setAttribute("aria-pressed", "false");
        });

        const checkButton = card.querySelector(".quiz-check-btn");
        const nextButton = card.querySelector(".quiz-next-btn");
        const feedback = card.querySelector(".quiz-feedback");
        const hintButton = card.querySelector(".quiz-hint-btn");

        if (checkButton) checkButton.disabled = true;
        if (nextButton) nextButton.hidden = true;
        if (feedback) {
            feedback.hidden = true;
            feedback.className = "quiz-feedback";
            feedback.textContent = "";
        }

        if (hintButton) {
            hintButton.disabled = false;
            hintButton.textContent = "Lihat Petunjuk";
        }

        if (resultCard) resultCard.hidden = true;
        updateProgress();
    }

    questionCards.forEach((card, index) => {
        const options = Array.from(card.querySelectorAll(".quiz-option"));
        const checkButton = card.querySelector(".quiz-check-btn");
        const nextButton = card.querySelector(".quiz-next-btn");
        const hintButton = card.querySelector(".quiz-hint-btn");
        const feedback = card.querySelector(".quiz-feedback");
        const correctAnswer = card.dataset.correct;

        options.forEach(option => {
            option.addEventListener("click", function () {
                if (answered || this.disabled) return;

                options.forEach(item => {
                    item.classList.remove("selected");
                    item.setAttribute("aria-pressed", "false");
                });

                this.classList.add("selected");
                this.setAttribute("aria-pressed", "true");
                if (checkButton) checkButton.disabled = false;

                if (feedback) {
                    feedback.hidden = true;
                    feedback.textContent = "";
                }
            });
        });

        checkButton?.addEventListener("click", function () {
            if (answered) return;

            const selected = card.querySelector(".quiz-option.selected");
            if (!selected) return;

            answered = true;
            const isCorrect = selected.dataset.option === correctAnswer;

            if (isCorrect) {
                score += 10;
                correctTotal += 1;
            }

            options.forEach(option => {
                option.disabled = true;
                if (option.dataset.option === correctAnswer) {
                    option.classList.add("is-correct");
                } else if (option.classList.contains("selected")) {
                    option.classList.add("is-wrong");
                }
            });

            if (feedback) {
                feedback.hidden = false;
                feedback.className = `quiz-feedback ${isCorrect ? "correct" : "incorrect"}`;
                const heading = document.createElement("strong");
                heading.textContent = isCorrect
                    ? "Hebat! Jawabanmu benar."
                    : "Belum tepat. Yuk, pelajari pembahasannya.";
                const explanation = document.createElement("span");
                explanation.textContent = explanations[index + 1] || "";
                feedback.replaceChildren(heading, explanation);
            }

            if (checkButton) checkButton.hidden = true;
            if (hintButton) hintButton.hidden = true;
            if (nextButton) {
                nextButton.hidden = false;
                nextButton.textContent = index === questionCards.length - 1
                    ? "Lihat Hasil \u2192"
                    : "Soal Berikutnya \u2192";
            }
        });

        hintButton?.addEventListener("click", function () {
            if (answered || !feedback) return;

            feedback.hidden = false;
            feedback.className = "quiz-feedback";
            const heading = document.createElement("strong");
            heading.textContent = "Petunjuk";
            const hint = document.createElement("span");
            hint.textContent = hints[index + 1] || this.dataset.hint || "";
            feedback.replaceChildren(heading, hint);
            this.disabled = true;
            this.textContent = "Petunjuk Ditampilkan";
        });

        nextButton?.addEventListener("click", function () {
            if (!answered) return;

            if (index < questionCards.length - 1) {
                showQuestion(index + 1);
                quizSection.querySelector(".quiz-progress-panel")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                showFinalResult();
            }
        });
    });

    function showFinalResult() {
        questionCards.forEach(card => { card.hidden = true; });
        if (resultCard) resultCard.hidden = false;

        const total = questionCards.length;
        const incorrectTotal = total - correctTotal;

        // Simpan ringkasan hasil agar dapat ditampilkan kembali pada halaman Refleksi.
        try {
            localStorage.setItem("mathConnectQuizResult", JSON.stringify({
                score: score,
                correct: correctTotal,
                incorrect: incorrectTotal,
                total: total,
                completedAt: new Date().toISOString()
            }));
        } catch (error) {
            console.warn("Hasil latihan tidak dapat disimpan di browser:", error);
        }

        if (finalScore) finalScore.textContent = String(score);
        if (correctCountElement) correctCountElement.textContent = String(correctTotal);
        if (incorrectCountElement) incorrectCountElement.textContent = String(incorrectTotal);

        if (resultMessage) {
            if (score >= 80) {
                resultMessage.textContent = "Luar biasa! Kamu sudah menunjukkan pemahaman yang sangat baik. Pertahankan semangat belajarmu!";
            } else if (score >= 60) {
                resultMessage.textContent = "Bagus! Kamu sudah memahami sebagian besar materi. Pelajari kembali soal yang belum tepat agar semakin mantap.";
            } else {
                resultMessage.textContent = "Terima kasih sudah berusaha. Tidak apa-apa jika belum semuanya benar. Yuk, pelajari kembali materi dan coba lagi!";
            }
        }

        topicDots.forEach(dot => {
            dot.classList.remove("active");
            dot.classList.add("done");
        });

        if (progressLabel) progressLabel.textContent = "Semua soal telah diselesaikan";
        if (progressPercent) progressPercent.textContent = "100%";
        if (progressFill) progressFill.style.width = "100%";
        if (progressBar) progressBar.setAttribute("aria-valuenow", String(total));

        resultCard?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    restartButton?.addEventListener("click", function () {
        score = 0;
        correctTotal = 0;
        currentIndex = 0;
        answered = false;

        const reflectionInputs = quizSection.querySelectorAll('input[name="quizReflection"]');
        reflectionInputs.forEach(input => { input.checked = false; });
        if (reflectionFeedback) reflectionFeedback.textContent = "";

        questionCards.forEach(card => {
            card.querySelectorAll(".quiz-option").forEach(option => {
                option.disabled = false;
                option.classList.remove("selected", "is-correct", "is-wrong");
                option.setAttribute("aria-pressed", "false");
            });

            const checkButton = card.querySelector(".quiz-check-btn");
            const nextButton = card.querySelector(".quiz-next-btn");
            const hintButton = card.querySelector(".quiz-hint-btn");
            const feedback = card.querySelector(".quiz-feedback");

            if (checkButton) {
                checkButton.hidden = false;
                checkButton.disabled = true;
            }
            if (nextButton) nextButton.hidden = true;
            if (hintButton) {
                hintButton.hidden = false;
                hintButton.disabled = false;
                hintButton.textContent = "Lihat Petunjuk";
            }
            if (feedback) {
                feedback.hidden = true;
                feedback.className = "quiz-feedback";
                feedback.textContent = "";
            }
        });

        showQuestion(0);
        quizSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    quizSection.querySelectorAll('input[name="quizReflection"]').forEach(input => {
        input.addEventListener("change", function () {
            if (!reflectionFeedback) return;
            const messages = {
                "sudah-paham": "Bagus! Pertahankan kebiasaan belajarmu dan terus berlatih.",
                "cukup-paham": "Hebat, kamu sudah berada di jalur yang tepat. Ulangi bagian yang masih terasa sulit.",
                "perlu-belajar": "Tidak masalah. Kenali materi yang perlu dipelajari kembali, lalu coba latihan sekali lagi."
            };
            reflectionFeedback.textContent = messages[this.value] || "";
        });
    });

    showQuestion(0);
});


