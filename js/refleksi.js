"use strict";

/* Refleksi: form, hasil kuis, dan catatan refleksi belajar */

    // ==================================================
    // 11. FORM REFLEKSI
    // ==================================================
    const reflectionForm = document.getElementById("reflectionForm");
    const reflectionAnswer =
        document.getElementById("reflectionAnswer");
    const reflectionFeedback =
        document.getElementById("reflectionFeedback");

    if (reflectionForm) {
        reflectionForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (
                !reflectionAnswer ||
                !reflectionFeedback
            ) {
                return;
            }

            if (!reflectionAnswer.value.trim()) {
                reflectionFeedback.textContent =
                    "Silakan tuliskan refleksimu terlebih dahulu.";

                reflectionFeedback.style.color = "#d97732";
                return;
            }

            reflectionFeedback.textContent =
                "Refleksi berhasil dicatat pada halaman ini. Salin jawabanmu jika ingin menyimpannya secara permanen.";

            reflectionFeedback.style.color = "#16865f";
        });
    }

/* =========================================================
   MATH CONNECT â€” RUANG REFLEKSI BELAJAR
   Terhubung dengan hasil latihan melalui localStorage.
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reflectionForm");
    const reflectionSection = document.getElementById("refleksi");
    if (!form || !reflectionSection) return;

    const scoreElement = document.getElementById("reflectionScore");
    const scoreCaption = document.getElementById("reflectionScoreCaption");
    const correctElement = document.getElementById("reflectionCorrect");
    const incorrectElement = document.getElementById("reflectionIncorrect");
    const scoreNote = document.getElementById("reflectionScoreNote");
    const feedback = document.getElementById("reflectionFeedback");
    const summary = document.getElementById("reflectionSummary");
    const summaryText = document.getElementById("reflectionSummaryText");
    const summaryDetails = document.getElementById("reflectionSummaryDetails");
    const editButton = document.getElementById("editReflectionBtn");

    const QUIZ_KEY = "mathConnectQuizResult";
    const REFLECTION_KEY = "mathConnectStudentReflection";

    function readQuizResult() {
        try {
            const value = localStorage.getItem(QUIZ_KEY);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            return null;
        }
    }

    function showQuizResult() {
        const result = readQuizResult();
        if (!result || typeof result.score !== "number") {
            if (scoreElement) scoreElement.textContent = "-";
            if (scoreCaption) scoreCaption.textContent = "Belum ada hasil latihan";
            if (correctElement) correctElement.textContent = "-";
            if (incorrectElement) incorrectElement.textContent = "-";
            if (scoreNote) scoreNote.textContent = "Selesaikan latihan 10 soal terlebih dahulu. Hasilnya akan muncul otomatis di sini.";
            return;
        }

        if (scoreElement) scoreElement.textContent = `${result.score}/100`;
        if (scoreCaption) scoreCaption.textContent = "Nilai latihan terakhir";
        if (correctElement) correctElement.textContent = String(result.correct);
        if (incorrectElement) incorrectElement.textContent = String(result.incorrect);
        if (scoreNote) scoreNote.textContent = `Kamu telah menyelesaikan ${result.total} soal. Gunakan hasil ini untuk mengevaluasi proses belajarmu.`;
    }

    function loadSavedReflection() {
        try {
            const saved = localStorage.getItem(REFLECTION_KEY);
            if (!saved) return;
            const data = JSON.parse(saved);

            Object.entries(data.fields || {}).forEach(([name, value]) => {
                const controls = form.querySelectorAll(`[name="${CSS.escape(name)}"]`);
                controls.forEach(control => {
                    if (control.type === "checkbox" || control.type === "radio") {
                        control.checked = Array.isArray(value)
                            ? value.includes(control.value)
                            : control.value === value;
                    } else {
                        control.value = value;
                    }
                });
            });
        } catch (error) {
            console.warn("Refleksi tersimpan tidak dapat dibaca:", error);
        }
    }

    function collectReflection() {
        const fields = {};
        const formData = new FormData(form);

        for (const [key, value] of formData.entries()) {
            const control = form.querySelector(`[name="${CSS.escape(key)}"]`);
            if (control && control.type === "checkbox") {
                if (!Array.isArray(fields[key])) fields[key] = [];
                fields[key].push(value);
            } else {
                fields[key] = value;
            }
        }

        const understanding = [];
        for (let i = 1; i <= 7; i++) {
            const selected = form.querySelector(`input[name="understanding${i}"]:checked`);
            understanding.push({
                topic: form.querySelector(`input[name="understanding${i}"]`)
                    ?.closest(".reflection-topic")?.querySelector("legend")?.textContent || `Materi ${i}`,
                level: selected ? selected.value : "belum diisi"
            });
        }

        return { fields, understanding };
    }

    function renderSummary(data) {
        if (!summary || !summaryDetails) return;

        const result = readQuizResult();
        const selectedTarget = data.fields.reflectionTarget || "Belum ditentukan";
        const levels = data.understanding || [];
        const notMastered = levels.filter(item => item.level === "belum").length;
        const moderatelyMastered = levels.filter(item => item.level === "cukup").length;

        if (summaryText) {
            summaryText.textContent = result
                ? `Nilai latihanmu ${result.score}/100. Kamu sudah melakukan evaluasi diri dan menentukan langkah belajar berikutnya.`
                : "Kamu sudah melakukan evaluasi diri dan menentukan langkah belajar berikutnya. Selesaikan latihan untuk menghubungkan nilai latihanmu.";
        }

        summaryDetails.replaceChildren();

        const lines = [
            `Materi yang ingin dipelajari kembali: ${selectedTarget}.`,
            `Materi yang dinilai cukup paham: ${moderatelyMastered}.`,
            `Materi yang dinilai belum paham: ${notMastered}.`,
            `Strategi belajar: ${data.fields.reflectionStrategy || "Belum diisi"}.`,
            `Rencana belajar: ${data.fields.reflectionPlan || "Belum diisi"}.`
        ];

        lines.forEach(line => {
            const paragraph = document.createElement("p");
            paragraph.textContent = line;
            summaryDetails.appendChild(paragraph);
        });

        summary.hidden = false;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.reportValidity()) return;

        const data = collectReflection();
        const result = readQuizResult();

        try {
            localStorage.setItem(REFLECTION_KEY, JSON.stringify({
                fields: data.fields,
                understanding: data.understanding,
                quizResult: result,
                savedAt: new Date().toISOString()
            }));
        } catch (error) {
            if (feedback) {
                feedback.textContent = "Refleksi belum dapat disimpan. Periksa pengaturan penyimpanan browser.";
                feedback.classList.add("error");
            }
            return;
        }

        if (feedback) {
            feedback.textContent = "Refleksimu berhasil disimpan di perangkat ini.";
            feedback.classList.remove("error");
        }

        renderSummary(data);
        summary?.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    editButton?.addEventListener("click", function () {
        if (summary) summary.hidden = true;
        form.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    showQuizResult();
    loadSavedReflection();

    // Refresh score when the user returns to this page after completing the quiz.
    window.addEventListener("storage", showQuizResult);
});


