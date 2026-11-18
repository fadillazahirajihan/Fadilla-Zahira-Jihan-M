"use strict";

/* Materi Penerapan: simulasi dan tantangan kontekstual */

/* =========================================================
   MATERI 06 â€” PENERAPAN MATEMATIKA
   SIMULASI PECAHAN, PERSEN, DESIMAL, DAN TANTANGAN
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const applicationSection = document.getElementById("penerapan");
    if (!applicationSection) return;

    /* -----------------------------------------------------
       1. SIMULASI PIZZA â€” REPRESENTASI PECAHAN
    ----------------------------------------------------- */
    const pizzaSlices = Array.from(
        applicationSection.querySelectorAll("[data-pizza-slice]")
    );
    const pizzaAmount = applicationSection.querySelector("#pizzaAmount");
    const pizzaAmountValue = applicationSection.querySelector("#pizzaAmountValue");
    const pizzaFractionResult = applicationSection.querySelector("#pizzaFractionResult");
    const pizzaExplanation = applicationSection.querySelector("#pizzaExplanation");

    function updatePizzaDisplay() {
        if (!pizzaSlices.length) return;

        const selectedCount = pizzaSlices.filter(slice =>
            slice.classList.contains("is-selected")
        ).length;
        const totalSlices = pizzaSlices.length;

        if (pizzaAmount) pizzaAmount.value = String(selectedCount);
        if (pizzaAmountValue) pizzaAmountValue.textContent = String(selectedCount);
        if (pizzaFractionResult) {
            pizzaFractionResult.textContent = `${selectedCount}/${totalSlices}`;
        }
        if (pizzaExplanation) {
            pizzaExplanation.textContent =
                `${selectedCount} dari ${totalSlices} bagian pizza telah dimakan.`;
        }

        pizzaSlices.forEach(slice => {
            const selected = slice.classList.contains("is-selected");
            slice.setAttribute("aria-pressed", String(selected));
        });
    }

    pizzaSlices.forEach(slice => {
        slice.addEventListener("click", function () {
            this.classList.toggle("is-selected");
            updatePizzaDisplay();
        });
    });

    if (pizzaAmount) {
        pizzaAmount.addEventListener("input", function () {
            const amount = Math.max(
                0,
                Math.min(pizzaSlices.length, Number(this.value) || 0)
            );

            // Slider memilih potongan dari urutan pertama hingga jumlah yang ditentukan.
            pizzaSlices.forEach((slice, index) => {
                slice.classList.toggle("is-selected", index < amount);
            });

            updatePizzaDisplay();
        });
    }

    updatePizzaDisplay();


    /* -----------------------------------------------------
       2. SIMULASI BELANJA â€” PERHITUNGAN DISKON
    ----------------------------------------------------- */
    const itemPrice = applicationSection.querySelector("#itemPrice");
    const itemPriceValue = applicationSection.querySelector("#itemPriceValue");
    const discountRate = applicationSection.querySelector("#discountRate");
    const discountRateValue = applicationSection.querySelector("#discountRateValue");
    const discountSticker = applicationSection.querySelector("#discountSticker");
    const originalPriceResult = applicationSection.querySelector("#originalPriceResult");
    const discountAmountResult = applicationSection.querySelector("#discountAmountResult");
    const finalPriceResult = applicationSection.querySelector("#finalPriceResult");
    const discountExplanation = applicationSection.querySelector("#discountExplanation");

    const rupiah = value => "Rp" + Math.round(value).toLocaleString("id-ID");

    function updateShoppingSimulation() {
        if (!itemPrice || !discountRate) return;

        const price = Math.max(0, Number(itemPrice.value) || 0);
        const rate = Math.max(0, Math.min(100, Number(discountRate.value) || 0));
        const saving = price * rate / 100;
        const finalPrice = price - saving;

        if (itemPriceValue) itemPriceValue.textContent = rupiah(price);
        if (discountRateValue) discountRateValue.textContent = `${rate}%`;
        if (discountSticker) discountSticker.textContent = `${rate}% OFF`;
        if (originalPriceResult) originalPriceResult.textContent = rupiah(price);
        if (discountAmountResult) discountAmountResult.textContent = rupiah(saving);
        if (finalPriceResult) finalPriceResult.textContent = rupiah(finalPrice);

        if (discountExplanation) {
            discountExplanation.textContent = rate === 0
                ? "Belum ada potongan harga. Harga yang dibayar masih sama dengan harga awal."
                : `Kamu menghemat ${rupiah(saving)} dari harga awal.`;
        }
    }

    itemPrice?.addEventListener("input", updateShoppingSimulation);
    discountRate?.addEventListener("input", updateShoppingSimulation);
    updateShoppingSimulation();


    /* -----------------------------------------------------
       3. SIMULASI PENGUKURAN â€” CM KE METER
    ----------------------------------------------------- */
    const objectLength = applicationSection.querySelector("#objectLength");
    const objectLengthValue = applicationSection.querySelector("#objectLengthValue");
    const measurementObject = applicationSection.querySelector("#measurementObject");
    const lengthMeterResult = applicationSection.querySelector("#lengthMeterResult");
    const lengthExplanation = applicationSection.querySelector("#lengthExplanation");

    function formatDecimalID(value) {
        return value.toLocaleString("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    }

    function updateMeasurementSimulation() {
        if (!objectLength) return;

        const centimeters = Math.max(0, Number(objectLength.value) || 0);
        const meters = centimeters / 100;

        if (objectLengthValue) objectLengthValue.textContent = `${centimeters} cm`;
        if (lengthMeterResult) lengthMeterResult.textContent = `${formatDecimalID(meters)} m`;
        if (lengthExplanation) {
            lengthExplanation.textContent =
                `${centimeters} cm sama dengan ${formatDecimalID(meters)} meter.`;
        }

        if (measurementObject) {
            // Lebar ilustrasi mengikuti nilai pengukuran (10â€“200 cm).
            const min = Number(objectLength.min) || 10;
            const max = Number(objectLength.max) || 200;
            const percentage = ((centimeters - min) / (max - min)) * 100;
            measurementObject.style.width = `${Math.max(10, Math.min(100, percentage))}%`;
        }
    }

    objectLength?.addEventListener("input", updateMeasurementSimulation);
    updateMeasurementSimulation();


    /* -----------------------------------------------------
       4. TANTANGAN KONTEKSTUAL â€” PILIHAN GANDA DAN SKOR
    ----------------------------------------------------- */
    const challengeQuestions = {
        pizza: {
            answer: "3/8",
            feedbackId: "pizzaChallengeFeedback",
            explanation: "Benar! Pembilang menunjukkan 3 potong yang dimakan, sedangkan penyebut menunjukkan 8 seluruh potongan pizza."
        },
        discount: {
            answer: "75000",
            feedbackId: "discountChallengeFeedback",
            explanation: "Benar! Diskon 25% dari Rp100.000 adalah Rp25.000, sehingga harga setelah diskon menjadi Rp75.000."
        },
        measurement: {
            answer: "75",
            feedbackId: "measurementChallengeFeedback",
            explanation: "Benar! Karena 1 meter = 100 sentimeter, maka 0,75 \u00D7 100 = 75 cm."
        }
    };

    const challengeOptions = Array.from(
        applicationSection.querySelectorAll(".challenge-option[data-challenge]")
    );
    const challengeSummary = applicationSection.querySelector("#applicationChallengeSummary");
    const challengeScore = applicationSection.querySelector("#applicationChallengeScore");
    const challengeMessage = applicationSection.querySelector("#applicationChallengeMessage");
    const resetChallengeButton = applicationSection.querySelector("#resetApplicationChallenge");

    const challengeState = {
        pizza: null,
        discount: null,
        measurement: null
    };

    function getChallengeFeedback(key) {
        const id = challengeQuestions[key]?.feedbackId;
        return id ? applicationSection.querySelector(`#${id}`) : null;
    }

    function updateChallengeSummary() {
        const keys = Object.keys(challengeQuestions);
        const answeredCount = keys.filter(key => challengeState[key] !== null).length;

        if (answeredCount < keys.length) {
            if (challengeSummary) challengeSummary.hidden = true;
            return;
        }

        const score = keys.filter(key =>
            challengeState[key] === challengeQuestions[key].answer
        ).length;

        if (challengeSummary) challengeSummary.hidden = false;
        if (challengeScore) challengeScore.textContent = `Skor: ${score}/3`;

        if (challengeMessage) {
            if (score === 3) {
                challengeMessage.textContent = "Luar biasa! Semua jawabanmu benar. Kamu sudah memahami penerapan pecahan, persen, dan desimal.";
            } else if (score === 2) {
                challengeMessage.textContent = "Bagus! Dua jawabanmu benar. Pelajari kembali pembahasan pada soal yang belum tepat.";
            } else if (score === 1) {
                challengeMessage.textContent = "Kamu sudah mulai memahami materi. Ayo pelajari kembali simulasi dan pembahasan setiap soal.";
            } else {
                challengeMessage.textContent = "Jangan menyerah! Pelajari kembali ketiga simulasi, lalu coba tantangannya sekali lagi.";
            }
        }
    }

    challengeOptions.forEach(option => {
        option.addEventListener("click", function () {
            const key = this.dataset.challenge;
            const selectedAnswer = this.dataset.answer;
            const question = challengeQuestions[key];

            if (!question || challengeState[key] !== null) return;

            challengeState[key] = selectedAnswer;
            const isCorrect = selectedAnswer === question.answer;
            const feedback = getChallengeFeedback(key);

            // Tandai pilihan yang dipilih, lalu tunjukkan jawaban yang benar.
            const optionsForQuestion = challengeOptions.filter(
                item => item.dataset.challenge === key
            );

            optionsForQuestion.forEach(item => {
                item.disabled = true;

                if (item.dataset.answer === question.answer) {
                    item.classList.add("is-correct");
                } else if (item === this && !isCorrect) {
                    item.classList.add("is-wrong");
                }
            });

            if (feedback) {
                feedback.className = `challenge-feedback ${isCorrect ? "correct" : "incorrect"}`;
                feedback.textContent = isCorrect
                    ? question.explanation
                    : `Belum tepat. ${question.explanation}`;
            }

            updateChallengeSummary();
        });
    });

    resetChallengeButton?.addEventListener("click", function () {
        Object.keys(challengeState).forEach(key => {
            challengeState[key] = null;
            const feedback = getChallengeFeedback(key);

            if (feedback) {
                feedback.textContent = "";
                feedback.className = "challenge-feedback";
            }
        });

        challengeOptions.forEach(option => {
            option.disabled = false;
            option.classList.remove(
                "is-correct",
                "is-wrong",
                "correct",
                "incorrect"
            );
        });

        if (challengeSummary) challengeSummary.hidden = true;

        applicationSection.querySelector("#applicationChallenge")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});


