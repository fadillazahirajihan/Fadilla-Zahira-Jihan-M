"use strict";

/* Materi Operasi Pecahan: tab, pemeriksaan jawaban, dan pembahasan */

    // ==================================================
    // 10. TAB OPERASI PECAHAN
    // ==================================================
    // Hindari dua handler pada tab yang sama: script.js menangani panel operasi lengkap.
    if (!document.getElementById("operasi-pecahan")) {
    const operationData = {
        tambah: {
            title: "Penjumlahan Pecahan",
            example: "1/2 + 1/4 = 3/4",
            explanation:
                "Samakan penyebut menjadi 4. Hasilnya 2/4 + 1/4 = 3/4."
        },

        kurang: {
            title: "Pengurangan Pecahan",
            example: "3/4 - 1/4 = 2/4 = 1/2",
            explanation:
                "Karena penyebut sama, kurangkan pembilangnya: 3 - 1 = 2."
        },

        kali: {
            title: "Perkalian Pecahan",
            example: "1/2 × 1/4 = 1/8",
            explanation:
                "Kalikan pembilang dengan pembilang dan penyebut dengan penyebut."
        },

        bagi: {
            title: "Pembagian Pecahan",
            example: "1/2 ÷ 1/4 = 2",
            explanation:
                "Balik pecahan pembagi, kemudian kalikan: 1/2 × 4/1 = 2."
        }
    };

    const operationTitle = document.getElementById("operationTitle");
    const operationExample =
        document.getElementById("operationExample");
    const operationExplanation =
        document.getElementById("operationExplanation");

    document.querySelectorAll(".operation-tab").forEach(function (button) {
        button.addEventListener("click", function () {
            const type = button.dataset.operation;
            const data = operationData[type];

            if (
                !data ||
                !operationTitle ||
                !operationExample ||
                !operationExplanation
            ) {
                return;
            }

            document.querySelectorAll(".operation-tab").forEach(function (tab) {
                tab.classList.remove("active");
            });

            button.classList.add("active");

            operationTitle.textContent = data.title;
            operationExample.textContent = data.example;
            operationExplanation.textContent = data.explanation;
        });
    });
    }

/* =========================================
   MATERI 05 â€” OPERASI PECAHAN
   JAVASCRIPT INTERAKTIF
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const operationSection =
        document.getElementById("operasi-pecahan");

    if (!operationSection) return;


    /* =====================================
       1. NAVIGASI ANTAR OPERASI
    ===================================== */

    const tabs =
        operationSection.querySelectorAll(".operation-tab");

    const panels =
        operationSection.querySelectorAll(".operation-panel");


    tabs.forEach(tab => {

        tab.addEventListener("click", function () {

            const target = this.dataset.operation;

            // Menghapus status aktif semua tombol
            tabs.forEach(item => {
                item.classList.remove("active");
                item.setAttribute("aria-selected", "false");
            });

            // Mengaktifkan tombol yang dipilih
            this.classList.add("active");
            this.setAttribute("aria-selected", "true");


            // Menyembunyikan semua panel
            panels.forEach(panel => {

                panel.classList.remove("active");
                panel.hidden = true;

            });


            // Menampilkan panel yang dipilih
            const selectedPanel =
                operationSection.querySelector(
                    `#${target}`
                );

            if (selectedPanel) {

                selectedPanel.hidden = false;
                selectedPanel.classList.add("active");

            }

        });

    });


    /* =====================================
       2. NORMALISASI JAWABAN
    ===================================== */

    function normalizeAnswer(value) {

        return value
            .trim()
            .replace(/\s+/g, "")
            .replace(/,/g, ".")
            .replace(/\u2212/g, "-")
            .replace(/\u00D7/g, "*")
            .replace(/\u00F7/g, "/")
            .toLowerCase();

    }


    /* =====================================
       3. MEMERIKSA NILAI PECAHAN
    ===================================== */

    function parseFraction(value) {

        const normalized = normalizeAnswer(value);

        // Memeriksa pecahan
        if (normalized.includes("/")) {

            const parts = normalized.split("/");

            if (parts.length !== 2) return null;

            const numerator = Number(parts[0]);
            const denominator = Number(parts[1]);

            if (
                !Number.isFinite(numerator) ||
                !Number.isFinite(denominator) ||
                denominator === 0
            ) {
                return null;
            }

            return numerator / denominator;

        }

        // Memeriksa bilangan biasa
        const number = Number(normalized);

        if (!Number.isFinite(number)) {

            return null;

        }

        return number;

    }


    /* =====================================
       4. MEMBANDINGKAN JAWABAN
    ===================================== */

    function checkAnswer(userAnswer, correctAnswer) {

        const userValue = parseFraction(userAnswer);

        const correctValue = parseFraction(correctAnswer);

        if (
            userValue === null ||
            correctValue === null
        ) {

            return false;

        }

        return Math.abs(userValue - correctValue) < 0.0000001;

    }


    /* =====================================
       5. MEMBERSIHKAN STATUS SEBELUMNYA
    ===================================== */

    function resetInputStatus(input) {

        input.classList.remove(
            "correct",
            "incorrect"
        );

    }


    // Jika siswa memperbaiki isian,
    // status lama dihapus
    operationSection
        .querySelectorAll(".operation-workspace input")
        .forEach(input => {

            input.addEventListener("input", function () {

                resetInputStatus(this);

            });

        });


    /* =====================================
       6. MENAMPILKAN UMPAN BALIK
    ===================================== */

    function showFeedback(feedback, type, title, message) {

        feedback.hidden = false;

        feedback.className =
            `operation-feedback ${type}`;

        const heading =
            document.createElement("strong");

        heading.textContent = title;

        const description =
            document.createElement("span");

        description.textContent = message;

        feedback.replaceChildren(
            heading,
            description
        );

    }


    /* =====================================
       7. MEMERIKSA SETIAP AKTIVITAS
    ===================================== */

    const checkButtons =
        operationSection.querySelectorAll(
            ".operation-check-btn"
        );


    checkButtons.forEach(button => {

        button.addEventListener("click", function () {

            const operation =
                this.dataset.check;

            const workspace =
                operationSection.querySelector(
                    `[data-exercise="${operation}"]`
                );

            if (!workspace) return;


            const inputs =
                workspace.querySelectorAll(
                    "input[data-answer]"
                );

            const feedback =
                workspace.querySelector(
                    ".operation-feedback"
                );


            let correctCount = 0;

            let emptyCount = 0;

            let incorrectCount = 0;


            /* =================================
               MEMERIKSA SELURUH KOLOM
            ================================= */

            inputs.forEach(input => {

                const userAnswer = input.value;

                const correctAnswer =
                    input.dataset.answer;


                // Menghapus status sebelumnya
                resetInputStatus(input);


                // Memeriksa apakah masih kosong
                if (userAnswer.trim() === "") {

                    emptyCount++;

                    input.classList.add("incorrect");

                    return;

                }


                // Memeriksa kebenaran jawaban
                const isCorrect = checkAnswer(
                    userAnswer,
                    correctAnswer
                );


                if (isCorrect) {

                    correctCount++;

                    input.classList.add("correct");

                } else {

                    incorrectCount++;

                    input.classList.add("incorrect");

                }

            });


            /* =================================
               HASIL PEMERIKSAAN
            ================================= */

            const totalQuestions = inputs.length;


            // Semua jawaban benar
            if (correctCount === totalQuestions) {

                showFeedback(
                    feedback,
                    "correct",
                    "Hebat! Semua jawaban benar!",
                    `Kamu berhasil menjawab seluruh ${totalQuestions} bagian dengan tepat. Pertahankan pemahamanmu tentang operasi pecahan!`
                );

            }


            // Ada jawaban kosong
            else if (emptyCount > 0 && incorrectCount === 0) {

                showFeedback(
                    feedback,
                    "partial",
                    "Jawaban belum lengkap.",
                    `Kamu sudah menjawab ${correctCount} dari ${totalQuestions} bagian dengan benar. Masih ada ${emptyCount} bagian yang belum diisi. Silakan lengkapi terlebih dahulu.`
                );

            }


            // Ada jawaban salah
            else if (incorrectCount > 0 && emptyCount === 0) {

                showFeedback(
                    feedback,
                    "incorrect",
                    "Masih ada jawaban yang belum tepat.",
                    `Kamu menjawab ${correctCount} dari ${totalQuestions} bagian dengan benar. Periksa kembali kolom yang berwarna merah, lalu perbaiki jawabanmu.`
                );

            }


            // Ada jawaban kosong dan salah
            else {

                showFeedback(
                    feedback,
                    "partial",
                    "Ayo, periksa kembali jawabanmu!",
                    `Jawaban benar: ${correctCount}. Jawaban belum tepat: ${incorrectCount}. Kolom kosong: ${emptyCount}. Perhatikan tanda warna pada setiap kolom dan coba perbaiki.`
                );

            }

        });

    });


});


