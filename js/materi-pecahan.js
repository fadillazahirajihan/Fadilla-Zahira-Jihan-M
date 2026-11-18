"use strict";

/* Materi Pecahan: navigasi mini scene dan visualisasi pecahan */

/* =========================================================
   MATH CONNECT â€” INTERAKSI MATERI PECAHAN
   File: js/script.js
========================================================= */

"use strict";

/* =========================================================
   1. NAVIGASI MINI MATERI <-> JENIS PECAHAN
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const miniScene = document.getElementById("fractionMiniScene");
    const typesScene = document.getElementById("fractionTypesScene");
    const miniButton = document.getElementById("sceneMiniBtn");
    const typesButton = document.getElementById("sceneTypesBtn");

    // Jika halaman tidak memuat materi pecahan, hentikan bagian ini.
    if (!miniScene || !typesScene) return;

    function showFractionScene(sceneName) {
        const showMini = sceneName === "mini";
        const showTypes = sceneName === "types";

        if (!showMini && !showTypes) return;

        // Gunakan hidden dan class active secara bersamaan
        // agar tampilan tetap konsisten dengan HTML dan CSS.
        miniScene.hidden = !showMini;
        typesScene.hidden = !showTypes;
        miniScene.classList.toggle("active", showMini);
        typesScene.classList.toggle("active", showTypes);

        if (miniButton) {
            miniButton.classList.toggle("active", showMini);
            miniButton.setAttribute("aria-pressed", String(showMini));
        }

        if (typesButton) {
            typesButton.classList.toggle("active", showTypes);
            typesButton.setAttribute("aria-pressed", String(showTypes));
        }
    }

    // Tombol navigasi di bagian atas materi.
    miniButton?.addEventListener("click", function () {
        showFractionScene("mini");
    });

    typesButton?.addEventListener("click", function () {
        showFractionScene("types");
    });

    // Tombol Selanjutnya, Sebelumnya, dan Kembali ke Awal.
    document.querySelectorAll(
        "#pecahan .fraction-next-btn, #pecahan .fraction-back-btn"
    ).forEach(function (button) {
        button.addEventListener("click", function () {
            showFractionScene(this.dataset.scene);
        });
    });

    // Tampilkan scene awal saat halaman dimuat.
    showFractionScene("mini");
});

/* =========================================================
   2. SLIDER REPRESENTASI VISUAL PECAHAN
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const numeratorSlider = document.getElementById("fractionNumeratorSlider");
    const denominatorSlider = document.getElementById("fractionDenominatorSlider");

    if (!numeratorSlider || !denominatorSlider) return;

    const elements = {
        numeratorDisplay: document.getElementById("fractionNumeratorDisplay"),
        denominatorDisplay: document.getElementById("fractionDenominatorDisplay"),
        numeratorInfo: document.getElementById("fractionNumeratorInfo"),
        denominatorInfo: document.getElementById("fractionDenominatorInfo"),
        numeratorValue: document.getElementById("fractionNumeratorValue"),
        denominatorValue: document.getElementById("fractionDenominatorValue"),
        resultTop: document.getElementById("fractionResultTop"),
        resultBottom: document.getElementById("fractionResultBottom"),
        decimalResult: document.getElementById("fractionDecimalResult"),
        percentResult: document.getElementById("fractionPercentResult"),
        circle: document.getElementById("fractionCircle"),
        description: document.getElementById("fractionVisualDescription")
    };

    function setText(element, value) {
        if (element) element.textContent = value;
    }

    function updateFractionVisualization() {
        let numerator = Number(numeratorSlider.value);
        let denominator = Number(denominatorSlider.value);

        // Penyebut harus positif agar perhitungan valid.
        if (!Number.isFinite(denominator) || denominator <= 0) {
            denominator = 1;
            denominatorSlider.value = "1";
        }

        if (!Number.isFinite(numerator) || numerator < 0) {
            numerator = 0;
            numeratorSlider.value = "0";
        }

        // Batasi pembilang agar tidak melebihi penyebut.
        numeratorSlider.max = String(denominator);
        if (numerator > denominator) {
            numerator = denominator;
            numeratorSlider.value = String(denominator);
        }

        const decimal = numerator / denominator;
        const percent = decimal * 100;
        const formattedDecimal = decimal.toLocaleString("id-ID", {
            maximumFractionDigits: 4
        });
        const formattedPercent = percent.toLocaleString("id-ID", {
            maximumFractionDigits: 2
        }) + "%";

        setText(elements.numeratorDisplay, numerator);
        setText(elements.denominatorDisplay, denominator);
        setText(elements.numeratorInfo, numerator);
        setText(elements.denominatorInfo, denominator);
        setText(elements.numeratorValue, numerator);
        setText(elements.denominatorValue, denominator);
        setText(elements.resultTop, numerator);
        setText(elements.resultBottom, denominator);
        setText(elements.decimalResult, formattedDecimal);
        setText(elements.percentResult, formattedPercent);
        setText(
            elements.description,
            `${numerator} dari ${denominator} bagian sama besar telah diarsir.`
        );

        if (elements.circle) {
            elements.circle.style.background = `conic-gradient(
                #8050d7 0% ${percent}%,
                #e8ddff ${percent}% 100%
            )`;
        }
    }

    numeratorSlider.addEventListener("input", updateFractionVisualization);
    denominatorSlider.addEventListener("input", updateFractionVisualization);
    updateFractionVisualization();
});

