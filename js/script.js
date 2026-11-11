/* =========================================
   8 — PECAHAN
========================================= */


/* =========================================
   NAVIGASI ANTAR SCENE
========================================= */

function showFractionScene(scene) {

    const miniScene = document.getElementById("fractionMiniScene");
    const typesScene = document.getElementById("fractionTypesScene");

    const miniBtn = document.getElementById("sceneMiniBtn");
    const typesBtn = document.getElementById("sceneTypesBtn");

    if (!miniScene || !typesScene) return;

    if (scene === "mini") {

        miniScene.classList.add("active");
        typesScene.classList.remove("active");

        miniBtn.classList.add("active");
        typesBtn.classList.remove("active");

    } else if (scene === "types") {

        miniScene.classList.remove("active");
        typesScene.classList.add("active");

        miniBtn.classList.remove("active");
        typesBtn.classList.add("active");

    }

}


/* =========================================
   ELEMEN SLIDER PECAHAN
========================================= */

const fractionNumeratorSlider =
    document.getElementById("fractionNumeratorSlider");

const fractionDenominatorSlider =
    document.getElementById("fractionDenominatorSlider");


/* =========================================
   UPDATE REPRESENTASI PECAHAN
========================================= */

function updateFractionVisualization() {

    if (!fractionNumeratorSlider || !fractionDenominatorSlider) {
        return;
    }

    let numerator = Number(fractionNumeratorSlider.value);
    let denominator = Number(fractionDenominatorSlider.value);

    // Pembilang tidak boleh melebihi penyebut
    if (numerator > denominator) {
        numerator = denominator;
        fractionNumeratorSlider.value = denominator;
    }

    // Memperbarui batas maksimum slider pembilang
    fractionNumeratorSlider.max = denominator;

    // Menghitung nilai desimal dan persen
    const decimal = numerator / denominator;
    const percent = decimal * 100;

    // Memperbarui tampilan pembilang dan penyebut
    document.getElementById("fractionNumeratorDisplay").textContent = numerator;
    document.getElementById("fractionDenominatorDisplay").textContent = denominator;

    document.getElementById("fractionNumeratorInfo").textContent = numerator;
    document.getElementById("fractionDenominatorInfo").textContent = denominator;

    // Memperbarui angka pada slider
    document.getElementById("fractionNumeratorValue").textContent = numerator;
    document.getElementById("fractionDenominatorValue").textContent = denominator;

    // Memperbarui hasil pecahan
    document.getElementById("fractionResultTop").textContent = numerator;
    document.getElementById("fractionResultBottom").textContent = denominator;

    // Memperbarui hasil desimal dan persen
    document.getElementById("fractionDecimalResult").textContent =
        decimal.toLocaleString("id-ID", {
            maximumFractionDigits: 4
        });

    document.getElementById("fractionPercentResult").textContent =
        percent.toLocaleString("id-ID", {
            maximumFractionDigits: 2
        }) + "%";


    // Memperbarui lingkaran visual
    const circle = document.getElementById("fractionCircle");

    const percentage = (numerator / denominator) * 100;

    circle.style.background = `
        conic-gradient(
            #8050d7 0% ${percentage}%,
            #e8ddff ${percentage}% 100%
        )
    `;


    // Memperbarui keterangan visual
    const description = document.getElementById(
        "fractionVisualDescription"
    );

    description.textContent =
        `${numerator} dari ${denominator} bagian sama besar telah diarsir.`;

}


/* =========================================
   EVENT LISTENER SLIDER
========================================= */

if (fractionNumeratorSlider && fractionDenominatorSlider) {

    fractionNumeratorSlider.addEventListener(
        "input",
        updateFractionVisualization
    );

    fractionDenominatorSlider.addEventListener(
        "input",
        updateFractionVisualization
    );

    // Tampilan awal
    updateFractionVisualization();

}