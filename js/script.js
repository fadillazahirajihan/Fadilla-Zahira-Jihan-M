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

/* =========================================
   MATERI 04 â€” PERBANDINGAN PECAHAN
   REVISI INTERAKSI DAN PEMBAHASAN
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       1. MENGAMBIL ELEMEN HTML
    ===================================== */

    const comparisonSignButtons =
        document.querySelectorAll(".comparison-sign");

    const comparisonSelectedInfo =
        document.getElementById("comparisonSelectedInfo");

    const checkComparisonButton =
        document.getElementById("checkComparisonAnswer");

    const comparisonFeedback =
        document.getElementById("comparisonFeedback");

    const thinkingOptions =
        document.querySelectorAll('input[name="thinkingMethod"]');

    const otherMethod =
        document.getElementById("comparisonOtherMethod");

    const otherExplanation =
        document.getElementById("comparisonOtherExplanation");

    const wordCount =
        document.getElementById("comparisonWordCount");

    const solutionSection =
        document.getElementById("comparisonSolution");

    const solutionTitle =
        document.getElementById("comparisonSolutionTitle");

    const solutionStatus =
        document.getElementById("comparisonSolutionStatus");

    const solutionMessage =
        document.getElementById("comparisonSolutionMessage");

    const solutionContent =
        document.getElementById("comparisonSolutionContent");

    const finalAnswer =
        document.getElementById("comparisonFinalAnswer");

    const retryButton =
        document.getElementById("comparisonRetry");


    /* =====================================
       2. DATA PECAHAN DARI HTML
    ===================================== */

    const fractionCards =
        document.querySelectorAll(".fraction-card");

    // Lindungi materi lain jika komponen perbandingan belum dimuat.
    if (fractionCards.length < 2 || !checkComparisonButton ||
        !comparisonFeedback || !comparisonSelectedInfo || !otherMethod ||
        !otherExplanation || !wordCount || !solutionSection ||
        !solutionTitle || !solutionStatus || !solutionMessage ||
        !solutionContent || !finalAnswer || !retryButton) return;

    const fraction1 = {
        numerator: Number(fractionCards[0].dataset.numerator),
        denominator: Number(fractionCards[0].dataset.denominator)
    };

    const fraction2 = {
        numerator: Number(fractionCards[1].dataset.numerator),
        denominator: Number(fractionCards[1].dataset.denominator)
    };

    let selectedComparisonSign = null;


    /* =====================================
       3. FUNGSI MATEMATIKA
    ===================================== */

    // Mencari FPB
    function findGCD(a, b) {

        while (b !== 0) {

            let temp = b;

            b = a % b;

            a = temp;

        }

        return Math.abs(a);

    }


    // Mencari KPK
    function findLCM(a, b) {

        return Math.abs(a * b) / findGCD(a, b);

    }


    // Membandingkan dua pecahan menggunakan
    // perkalian silang agar hasilnya akurat
    function getCorrectSign() {

        const leftProduct =
            fraction1.numerator * fraction2.denominator;

        const rightProduct =
            fraction2.numerator * fraction1.denominator;

        if (leftProduct < rightProduct) {

            return "<";

        } else if (leftProduct > rightProduct) {

            return ">";

        } else {

            return "=";

        }

    }


    // Mengubah pecahan ke desimal
    function convertToDecimal(numerator, denominator) {

        return numerator / denominator;

    }


    // Menampilkan desimal maksimal 6 angka
    function formatDecimal(value) {

        return Number(value.toFixed(6)).toString();

    }


    // Membuat format pecahan
    function fractionText(numerator, denominator) {

        return `${numerator}/${denominator}`;

    }


    // Menentukan perbandingan dalam bentuk kalimat
    function comparisonDescription(sign) {

        if (sign === "<") {

            return "lebih kecil daripada";

        } else if (sign === ">") {

            return "lebih besar daripada";

        } else {

            return "sama dengan";

        }

    }


    /* =====================================
       4. FUNGSI MEMBUAT ELEMEN PEMBAHASAN
    ===================================== */

    function createElement(tag, className, text) {

        const element = document.createElement(tag);

        if (className) {

            element.className = className;

        }

        if (text !== undefined) {

            element.textContent = text;

        }

        return element;

    }


    // Membuat kotak langkah penyelesaian
    function createStep(title, description) {

        const step = createElement(
            "div",
            "comparison-solution-step"
        );

        const heading = createElement(
            "strong",
            "",
            title
        );

        step.appendChild(heading);

        if (description) {

            const paragraph = createElement(
                "p",
                "",
                description
            );

            step.appendChild(paragraph);

        }

        return step;

    }


    // Membuat ekspresi matematika
    function createMathExpression(text) {

        return createElement(
            "div",
            "comparison-math-expression",
            text
        );

    }


    // Menambahkan elemen ke pembahasan
    function addStep(container, title, expressions, description) {

        const step = createStep(title);

        expressions.forEach(expression => {

            step.appendChild(
                createMathExpression(expression)
            );

        });

        if (description) {

            step.appendChild(
                createElement("p", "", description)
            );

        }

        container.appendChild(step);

    }


    /* =====================================
       5. MEMILIH TANDA PERBANDINGAN
    ===================================== */

    comparisonSignButtons.forEach(button => {

        button.addEventListener("click", function () {

            comparisonSignButtons.forEach(item => {

                item.classList.remove("selected");

            });

            this.classList.add("selected");

            selectedComparisonSign = this.dataset.sign;

            comparisonSelectedInfo.textContent =
                `Kamu memilih tanda ${selectedComparisonSign}.`;

            clearPreviousResult();

        });

    });


    /* =====================================
       6. MEMILIH METODE PENYELESAIAN
    ===================================== */

    thinkingOptions.forEach(option => {

        option.addEventListener("change", function () {

            if (this.value === "lain") {

                otherMethod.hidden = false;

            } else {

                otherMethod.hidden = true;

            }

            clearPreviousResult();

        });

    });


    /* =====================================
       7. MENGHITUNG JUMLAH KATA
    ===================================== */

    function countWords(text) {

        const trimmed = text.trim();

        if (trimmed === "") {

            return 0;

        }

        return trimmed.split(/\s+/).length;

    }


    function updateWordCounter() {

        let words = countWords(otherExplanation.value);

        // Maksimal 2.000 kata
        if (words > 2000) {

            const wordArray =
                otherExplanation.value.trim().split(/\s+/);

            otherExplanation.value =
                wordArray.slice(0, 2000).join(" ");

            words = 2000;

        }

        wordCount.textContent = words;

        const counter = wordCount.parentElement;

        counter.classList.toggle(
            "limit",
            words >= 2000
        );

    }


    otherExplanation.addEventListener(
        "input",
        updateWordCounter
    );


    /* =====================================
       8. METODE 1 â€” MENGGUNAKAN GAMBAR
    ===================================== */

    function createFractionDiagram(numerator, denominator, label) {

        const diagram = createElement(
            "div",
            "comparison-diagram"
        );

        const title = createElement(
            "div",
            "comparison-diagram-title",
            label
        );

        diagram.appendChild(title);


        const row = createElement(
            "div",
            "comparison-diagram-row"
        );

        const fractionLabel = createElement(
            "div",
            "comparison-diagram-fraction",
            fractionText(numerator, denominator)
        );

        const rightArea = document.createElement("div");

        const bar = createElement(
            "div",
            "comparison-diagram-bar"
        );


        // Membuat bagian sesuai penyebut
        for (let i = 0; i < denominator; i++) {

            const part = createElement(
                "div",
                "comparison-diagram-part"
            );

            // Mengarsir sesuai pembilang
            if (i < numerator) {

                part.classList.add("shaded");

            }

            bar.appendChild(part);

        }


        const caption = createElement(
            "p",
            "comparison-diagram-caption",
            `${numerator} dari ${denominator} bagian diarsir.`
        );

        rightArea.appendChild(bar);

        rightArea.appendChild(caption);

        row.appendChild(fractionLabel);

        row.appendChild(rightArea);

        diagram.appendChild(row);

        return diagram;

    }


    function solveUsingImage() {

        const container = document.createDocumentFragment();

        const intro = createElement(
            "p",
            "",
            "Kita dapat membandingkan kedua pecahan dengan melihat bagian yang diarsir pada setiap diagram. Setiap batang menunjukkan satu keseluruhan yang dibagi menjadi beberapa bagian sama besar."
        );

        container.appendChild(intro);


        // Diagram pecahan pertama
        container.appendChild(
            createFractionDiagram(
                fraction1.numerator,
                fraction1.denominator,
                "1. Diagram pecahan pertama"
            )
        );


        // Diagram pecahan kedua
        container.appendChild(
            createFractionDiagram(
                fraction2.numerator,
                fraction2.denominator,
                "2. Diagram pecahan kedua"
            )
        );


        // Penjelasan perbandingan
        const decimal1 = convertToDecimal(
            fraction1.numerator,
            fraction1.denominator
        );

        const decimal2 = convertToDecimal(
            fraction2.numerator,
            fraction2.denominator
        );

        const correctSign = getCorrectSign();

        const explanation = createStep(
            "3. Membandingkan bagian yang diarsir",
            `Berdasarkan diagram, pecahan ${fractionText(
                fraction1.numerator,
                fraction1.denominator
            )} ${comparisonDescription(correctSign)} pecahan ${fractionText(
                fraction2.numerator,
                fraction2.denominator
            )}.`
        );

        explanation.appendChild(
            createMathExpression(
                `${fractionText(
                    fraction1.numerator,
                    fraction1.denominator
                )} ${correctSign} ${fractionText(
                    fraction2.numerator,
                    fraction2.denominator
                )}`
            )
        );

        container.appendChild(explanation);

        return container;

    }


    /* =====================================
       9. METODE 2 â€” MENYAMAKAN PENYEBUT
    ===================================== */

    function solveUsingDenominator() {

        const container = document.createDocumentFragment();

        const commonDenominator = findLCM(
            fraction1.denominator,
            fraction2.denominator
        );

        const multiplier1 =
            commonDenominator / fraction1.denominator;

        const multiplier2 =
            commonDenominator / fraction2.denominator;

        const newNumerator1 =
            fraction1.numerator * multiplier1;

        const newNumerator2 =
            fraction2.numerator * multiplier2;


        // Pengantar
        container.appendChild(
            createElement(
                "p",
                "",
                "Untuk membandingkan dua pecahan dengan menyamakan penyebut, kita perlu menentukan KPK dari kedua penyebut terlebih dahulu."
            )
        );


        // Langkah 1
        addStep(
            container,
            "Langkah 1. Menentukan KPK penyebut",
            [
                `KPK (${fraction1.denominator}, ${fraction2.denominator}) = ${commonDenominator}`
            ],
            "KPK dari kedua penyebut digunakan sebagai penyebut yang sama."
        );


        // Langkah 2
        addStep(
            container,
            "Langkah 2. Mengubah pecahan pertama",
            [
                `${fraction1.numerator}/${fraction1.denominator}`,
                `= (${fraction1.numerator} \u00D7 ${multiplier1}) / (${fraction1.denominator} \u00D7 ${multiplier1})`,
                `= ${newNumerator1}/${commonDenominator}`
            ],
            "Pembilang dan penyebut dikalikan dengan bilangan yang sama sehingga diperoleh pecahan senilai."
        );


        // Langkah 3
        addStep(
            container,
            "Langkah 3. Mengubah pecahan kedua",
            [
                `${fraction2.numerator}/${fraction2.denominator}`,
                `= (${fraction2.numerator} \u00D7 ${multiplier2}) / (${fraction2.denominator} \u00D7 ${multiplier2})`,
                `= ${newNumerator2}/${commonDenominator}`
            ],
            "Pecahan kedua juga diubah menjadi pecahan senilai dengan penyebut yang sama."
        );


        // Langkah 4
        const correctSign = getCorrectSign();

        addStep(
            container,
            "Langkah 4. Membandingkan pembilang",
            [
                `${newNumerator1}/${commonDenominator} ${correctSign} ${newNumerator2}/${commonDenominator}`,
                `${newNumerator1} ${correctSign} ${newNumerator2}`
            ],
            `Karena penyebut kedua pecahan sudah sama, perbandingan dapat ditentukan dengan melihat pembilangnya.`
        );


        return container;

    }


    /* =====================================
       10. METODE 3 â€” MENGUBAH KE DESIMAL
    ===================================== */

    function solveUsingDecimal() {

        const container = document.createDocumentFragment();

        const decimal1 = convertToDecimal(
            fraction1.numerator,
            fraction1.denominator
        );

        const decimal2 = convertToDecimal(
            fraction2.numerator,
            fraction2.denominator
        );

        const result1 = formatDecimal(decimal1);

        const result2 = formatDecimal(decimal2);

        const correctSign = getCorrectSign();


        // Pengantar
        container.appendChild(
            createElement(
                "p",
                "",
                "Cara lain untuk membandingkan pecahan adalah mengubah masing-masing pecahan menjadi bentuk desimal. Caranya dengan membagi pembilang dengan penyebut."
            )
        );


        // Langkah 1
        addStep(
            container,
            "Langkah 1. Mengubah pecahan pertama menjadi desimal",
            [
                `${fraction1.numerator} \u00F7 ${fraction1.denominator}`,
                `= ${result1}`
            ],
            "Pembilang dibagi dengan penyebut untuk memperoleh nilai desimal."
        );


        // Langkah 2
        addStep(
            container,
            "Langkah 2. Mengubah pecahan kedua menjadi desimal",
            [
                `${fraction2.numerator} \u00F7 ${fraction2.denominator}`,
                `â‰ˆ ${result2}`
            ],
            "Pembilang dibagi dengan penyebut. Jika hasil desimal tidak berakhir, nilai ditampilkan dengan pembulatan sampai enam angka di belakang koma."
        );


        // Langkah 3
        addStep(
            container,
            "Langkah 3. Membandingkan bilangan desimal",
            [
                `${result1} ${correctSign} ${result2}`
            ],
            `Dengan membandingkan nilai desimal tersebut, kita dapat menentukan hubungan antara kedua pecahan.`
        );


        return container;

    }


    /* =====================================
       11. METODE 4 â€” CARA LAIN
    ===================================== */

    function solveUsingOtherMethod() {

        const container = document.createDocumentFragment();

        container.appendChild(
            createElement(
                "p",
                "",
                "Kamu memilih untuk menyelesaikan soal menggunakan cara lain."
            )
        );


        const answerBox = createElement(
            "div",
            "comparison-student-answer"
        );

        const answerTitle = createElement(
            "strong",
            "",
            "Penjelasan penyelesaian siswa"
        );

        const answerText = createElement(
            "p",
            "",
            otherExplanation.value.trim()
        );

        answerBox.appendChild(answerTitle);

        answerBox.appendChild(answerText);

        container.appendChild(answerBox);


        const note = createElement(
            "div",
            "comparison-teacher-note",
            "Catatan: Penjelasan yang kamu tuliskan sudah ditampilkan. Ketepatan langkah dan alasan matematis pada cara lain ini perlu ditinjau oleh guru, karena sistem belum melakukan penilaian otomatis terhadap isi penjelasan."
        );

        container.appendChild(note);


        return container;

    }


    /* =====================================
       12. MENGHAPUS HASIL SEBELUMNYA
    ===================================== */

    function clearPreviousResult() {

        comparisonFeedback.hidden = true;

        comparisonFeedback.className =
            "comparison-feedback";

        solutionSection.hidden = true;

        solutionContent.replaceChildren();

    }


    /* =====================================
       13. MENAMPILKAN UMPAN BALIK
    ===================================== */

    function showFeedback(type, title, message) {

        comparisonFeedback.hidden = false;

        comparisonFeedback.className =
            `comparison-feedback ${type}`;

        comparisonFeedback.replaceChildren();

        const heading = createElement(
            "strong",
            "",
            title
        );

        const description = createElement(
            "span",
            "",
            message
        );

        comparisonFeedback.appendChild(heading);

        comparisonFeedback.appendChild(description);

    }


    /* =====================================
       14. MENAMPILKAN PEMBAHASAN
    ===================================== */

    function displaySolution(method, isCorrect) {

        const correctSign = getCorrectSign();

        // Menampilkan area pembahasan
        solutionSection.hidden = false;

        // Status benar atau belum tepat
        if (isCorrect) {

            solutionTitle.textContent =
                "Jawaban Kamu Benar!";

            solutionStatus.textContent =
                "Benar";

            solutionStatus.className =
                "comparison-solution-status correct";

            solutionMessage.textContent =
                "Bagus! Tanda perbandingan yang kamu pilih sudah tepat. Berikut proses penyelesaian berdasarkan cara yang kamu gunakan.";

        } else {

            solutionTitle.textContent =
                "Jawaban Belum Tepat";

            solutionStatus.textContent =
                "Perlu Diperbaiki";

            solutionStatus.className =
                "comparison-solution-status incorrect";

            solutionMessage.textContent =
                "Tanda perbandingan yang kamu pilih belum tepat. Pelajari langkah-langkah berikut untuk mengetahui cara membandingkan kedua pecahan dengan benar.";

        }


        // Menghapus pembahasan sebelumnya
        solutionContent.replaceChildren();


        // Menampilkan pembahasan berdasarkan pilihan siswa
        let explanation;

        switch (method) {

            case "gambar":

                explanation = solveUsingImage();

                break;

            case "penyebut":

                explanation = solveUsingDenominator();

                break;

            case "desimal":

                explanation = solveUsingDecimal();

                break;

            case "lain":

                explanation = solveUsingOtherMethod();

                break;

        }


        solutionContent.appendChild(explanation);


        // Kesimpulan akhir
        finalAnswer.textContent =
            `${fraction1.numerator}/${fraction1.denominator} ${correctSign} ${fraction2.numerator}/${fraction2.denominator}. Dengan demikian, tanda perbandingan yang tepat adalah "${correctSign}".`;


        // Mengarahkan halaman ke pembahasan
        solutionSection.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }


    /* =====================================
       15. TOMBOL CEK JAWABAN
    ===================================== */

    checkComparisonButton.addEventListener("click", function () {

        // Memeriksa tanda perbandingan
        if (selectedComparisonSign === null) {

            showFeedback(
                "incorrect",
                "Jawaban belum lengkap!",
                "Silakan pilih tanda perbandingan terlebih dahulu."
            );

            return;

        }


        // Memeriksa pilihan metode
        const selectedMethod = document.querySelector(
            'input[name="thinkingMethod"]:checked'
        );

        if (!selectedMethod) {

            showFeedback(
                "incorrect",
                "Cara penyelesaian belum dipilih!",
                "Silakan pilih cara yang kamu gunakan untuk membandingkan kedua pecahan."
            );

            return;

        }


        // Memeriksa isian cara lain
        if (selectedMethod.value === "lain") {

            const totalWords = countWords(
                otherExplanation.value
            );

            if (totalWords === 0) {

                showFeedback(
                    "incorrect",
                    "Penjelasan belum diisi!",
                    "Tuliskan terlebih dahulu langkah penyelesaian yang kamu gunakan."
                );

                otherExplanation.focus();

                return;

            }

            if (totalWords > 2000) {

                showFeedback(
                    "incorrect",
                    "Batas kata terlampaui!",
                    "Penjelasan maksimal adalah 2.000 kata."
                );

                return;

            }

        }


        // Menghitung jawaban yang benar
        const correctSign = getCorrectSign();

        const isCorrect =
            selectedComparisonSign === correctSign;


        // Menampilkan umpan balik
        if (isCorrect) {

            showFeedback(
                "correct",
                "Jawaban kamu benar!",
                "Sekarang perhatikan proses penyelesaian berdasarkan strategi yang kamu pilih."
            );

        } else {

            showFeedback(
                "incorrect",
                "Jawaban kamu belum tepat.",
                "Jangan khawatir. Pelajari pembahasan berikut untuk mengetahui proses penyelesaian yang benar."
            );

        }


        // Menampilkan proses penyelesaian
        displaySolution(
            selectedMethod.value,
            isCorrect
        );

    });


    /* =====================================
       16. TOMBOL COBA KEMBALI
    ===================================== */

    retryButton.addEventListener("click", function () {

        // Menghapus tanda yang dipilih
        selectedComparisonSign = null;

        comparisonSignButtons.forEach(button => {

            button.classList.remove("selected");

        });


        // Menghapus pilihan metode
        thinkingOptions.forEach(option => {

            option.checked = false;

        });


        // Mengosongkan cara lain
        otherExplanation.value = "";

        wordCount.textContent = "0";

        wordCount.parentElement.classList.remove("limit");

        otherMethod.hidden = true;


        // Mengembalikan informasi awal
        comparisonSelectedInfo.textContent =
            "Pilih tanda yang tepat untuk membandingkan kedua pecahan.";


        // Menyembunyikan hasil
        clearPreviousResult();


        // Kembali ke bagian atas materi
        document.getElementById(
            "perbandingan-pecahan"
        ).scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});


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
            });

            // Mengaktifkan tombol yang dipilih
            this.classList.add("active");


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


/* =========================================================
   PROFIL PEMBELAJAR â€” IDENTITAS & PERJALANAN BELAJAR
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("profileToggle");
    const dropdown = document.getElementById("profileDropdown");
    if (!toggle || !dropdown) return;

    const PROFILE_KEY = "mathConnectLearnerProfile";
    const VISITED_KEY = "mathConnectVisitedTopics";
    const QUIZ_KEY = "mathConnectQuizResult";
    const REFLECTION_KEY = "mathConnectStudentReflection";

    const nameInput = document.getElementById("profileNameInput");
    const classInput = document.getElementById("profileClassInput");
    const displayName = document.getElementById("profileDisplayName");
    const displayClass = document.getElementById("profileDisplayClass");
    const saveDetails = document.getElementById("saveProfileDetails");
    const inlineFeedback = document.getElementById("profileInlineFeedback");
    const topicsCount = document.getElementById("profileTopicsCount");
    const quizScore = document.getElementById("profileQuizScore");
    const learningTarget = document.getElementById("profileLearningTarget");
    const learningPlan = document.getElementById("profileLearningPlan");
    const journeyButton = document.getElementById("profileJourneyButton");

    const topicIds = [
        "bilangan",
        "pecahan",
        "desimal",
        "perbandingan-pecahan",
        "operasi-pecahan",
        "penerapan"
    ];

    function readJSON(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    function updateIdentity() {
        const profile = readJSON(PROFILE_KEY, {});
        const name = profile.name || "";
        const learnerClass = profile.learnerClass || "";

        if (nameInput && document.activeElement !== nameInput) nameInput.value = name;
        if (classInput) classInput.value = learnerClass;
        if (displayName) displayName.textContent = name || "Pembelajar Math Connect";
        if (displayClass) {
            displayClass.textContent = learnerClass
                ? `Siswa kelas ${learnerClass}`
                : "Pelajar Math Connect";
        }
    }

    function updateLearningStats() {
        const visited = readJSON(VISITED_KEY, []);
        if (topicsCount) {
            const count = Array.isArray(visited)
                ? visited.filter(id => topicIds.includes(id)).length
                : 0;
            topicsCount.textContent = String(count);
        }

        const quiz = readJSON(QUIZ_KEY, null);
        if (quizScore) {
            quizScore.textContent = quiz && typeof quiz.score === "number"
                ? String(quiz.score)
                : "-";
        }

        const reflection = readJSON(REFLECTION_KEY, null);
        const fields = reflection && reflection.fields ? reflection.fields : {};
        if (learningTarget) {
            learningTarget.textContent = fields.reflectionTarget || "Belum ada target";
        }
        if (learningPlan) {
            learningPlan.textContent = fields.reflectionPlan
                ? fields.reflectionPlan
                : "Tentukan target dan rencana melalui halaman Refleksi.";
        }
    }

    function saveIdentity() {
        const name = nameInput ? nameInput.value.trim() : "";
        const learnerClass = classInput ? classInput.value : "";

        if (!name) {
            if (inlineFeedback) inlineFeedback.textContent = "Masukkan nama pembelajar terlebih dahulu.";
            nameInput?.focus();
            return;
        }

        const profile = { name: name, learnerClass: learnerClass };
        try {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
            updateIdentity();
            if (inlineFeedback) inlineFeedback.textContent = "Identitas berhasil disimpan.";
        } catch (error) {
            if (inlineFeedback) inlineFeedback.textContent = "Identitas belum dapat disimpan di browser.";
        }
    }

    function recordVisitedTopic() {
        const currentId = window.location.hash.replace("#", "");
        if (!topicIds.includes(currentId)) return;

        const visited = readJSON(VISITED_KEY, []);
        if (!Array.isArray(visited)) return;
        if (!visited.includes(currentId)) {
            visited.push(currentId);
            try {
                localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
            } catch (error) {
                // Profil tetap dapat digunakan meskipun penyimpanan dibatasi browser.
            }
        }
        updateLearningStats();
    }

    function closeProfile() {
        dropdown.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function (event) {
        event.stopPropagation();
        const willOpen = dropdown.hidden;
        dropdown.hidden = !willOpen;
        toggle.setAttribute("aria-expanded", String(willOpen));
        if (willOpen) {
            updateIdentity();
            updateLearningStats();
        }
    });

    dropdown.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    saveDetails?.addEventListener("click", saveIdentity);

    journeyButton?.addEventListener("click", function () {
        closeProfile();
        const reflectionLink = document.querySelector('a[href="#refleksi"]');
        if (reflectionLink) {
            reflectionLink.click();
        } else {
            window.location.hash = "refleksi";
        }
    });

    document.addEventListener("click", closeProfile);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeProfile();
            toggle.focus();
        }
    });

    window.addEventListener("hashchange", recordVisitedTopic);
    window.addEventListener("storage", updateLearningStats);

    updateIdentity();
    updateLearningStats();
    recordVisitedTopic();
});


/* =========================================================
   NOTIFIKASI MATH CONNECT â€” BERDASARKAN AKTIVITAS SISWA
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("notificationToggle");
    const wrap = document.getElementById("notificationMenuWrap");
    const dropdown = document.getElementById("notificationDropdown");
    const badge = document.getElementById("notificationBadge");
    const list = document.getElementById("notificationList");
    const subtitle = document.getElementById("notificationSubtitle");
    const closeButton = document.getElementById("notificationClose");
    const markAllButton = document.getElementById("markAllNotificationsRead");
    const clearAllButton = document.getElementById("clearAllNotifications");

    if (!toggle || !wrap || !dropdown || !list || !badge) return;

    const STORAGE_KEY = "mathConnectNotifications";
    const WELCOME_KEY = "mathConnectNotificationWelcomeShown";
    const MAX_NOTIFICATIONS = 30;

    const icons = {
        welcome: "âœ¦",
        achievement: "ðŸ†",
        reflection: "âœŽ",
        tip: "ðŸ’¡",
        material: "ðŸ“˜",
        reminder: "ðŸ””"
    };

    function readNotifications() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const data = raw ? JSON.parse(raw) : [];
            return Array.isArray(data) ? data : [];
        } catch (error) {
            return [];
        }
    }

    function saveNotifications(items) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_NOTIFICATIONS)));
        } catch (error) {
            console.warn("Notifikasi tidak dapat disimpan:", error);
        }
    }

    function formatTime(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "Informasi belajar";
        return date.toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    function addNotification(id, type, title, message, target) {
        const items = readNotifications();
        if (items.some(item => item.id === id)) return;

        items.unshift({
            id: id,
            type: type,
            title: title,
            message: message,
            target: target || "#beranda",
            createdAt: new Date().toISOString(),
            read: false
        });
        saveNotifications(items);
        renderNotifications();
    }

    function renderNotifications() {
        const items = readNotifications();
        const unreadCount = items.filter(item => !item.read).length;

        badge.textContent = unreadCount > 9 ? "9+" : String(unreadCount);
        badge.hidden = unreadCount === 0;
        toggle.setAttribute(
            "aria-label",
            unreadCount ? `Notifikasi, ${unreadCount} belum dibaca` : "Buka notifikasi"
        );

        if (subtitle) {
            subtitle.textContent = unreadCount
                ? `${unreadCount} notifikasi belum dibaca`
                : "Semua informasi belajarmu";
        }

        list.replaceChildren();

        if (!items.length) {
            const empty = document.createElement("div");
            empty.className = "notification-empty";
            empty.innerHTML = '<span aria-hidden="true">âœ¦</span><strong>Belum ada notifikasi</strong><p>Informasi belajar akan muncul di sini.</p>';
            list.appendChild(empty);
            return;
        }

        items.forEach(item => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = `notification-item${item.read ? "" : " unread"}`;
            button.dataset.id = item.id;
            button.dataset.type = item.type || "reminder";

            const icon = document.createElement("span");
            icon.className = "notification-item-icon";
            icon.setAttribute("aria-hidden", "true");
            icon.textContent = icons[item.type] || "ðŸ””";

            const copy = document.createElement("span");
            copy.className = "notification-item-copy";

            const titleRow = document.createElement("span");
            titleRow.className = "notification-item-title-row";

            const title = document.createElement("span");
            title.className = "notification-item-title";
            title.textContent = item.title || "Informasi belajar";
            titleRow.appendChild(title);

            if (!item.read) {
                const dot = document.createElement("span");
                dot.className = "notification-unread-dot";
                dot.setAttribute("aria-label", "Belum dibaca");
                titleRow.appendChild(dot);
            }

            const message = document.createElement("span");
            message.className = "notification-item-message";
            message.textContent = item.message || "";

            const time = document.createElement("span");
            time.className = "notification-item-time";
            time.textContent = formatTime(item.createdAt);

            copy.append(titleRow, message, time);
            button.append(icon, copy);

            button.addEventListener("click", function () {
                const current = readNotifications();
                const selected = current.find(entry => entry.id === item.id);
                if (selected) {
                    selected.read = true;
                    saveNotifications(current);
                }
                renderNotifications();
                closePanel();

                const target = item.target || "#beranda";
                if (target.startsWith("#")) {
                    window.location.hash = target;
                }
            });

            list.appendChild(button);
        });
    }

    function openPanel() {
        dropdown.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        renderNotifications();
    }

    function closePanel() {
        dropdown.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function (event) {
        event.stopPropagation();
        if (dropdown.hidden) openPanel();
        else closePanel();
    });

    dropdown.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    closeButton?.addEventListener("click", closePanel);

    markAllButton?.addEventListener("click", function () {
        const items = readNotifications().map(item => ({ ...item, read: true }));
        saveNotifications(items);
        renderNotifications();
    });

    clearAllButton?.addEventListener("click", function () {
        saveNotifications([]);
        renderNotifications();
    });

    document.addEventListener("click", function (event) {
        if (!wrap.contains(event.target)) closePanel();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !dropdown.hidden) {
            closePanel();
            toggle.focus();
        }
    });

    // Sambut siswa dan tampilkan satu tips awal hanya pada kunjungan pertama.
    try {
        if (localStorage.getItem(WELCOME_KEY) !== "yes") {
            addNotification(
                "welcome-math-connect",
                "welcome",
                "Selamat datang di Math Connect!",
                "Mulai perjalanan belajarmu dari materi, lalu lanjutkan dengan latihan dan refleksi.",
                "#beranda"
            );
            addNotification(
                "tip-pecahan-awal",
                "tip",
                "Tips Matematika",
                "Pecahan, desimal, dan persen dapat menyatakan nilai yang sama dalam bentuk berbeda.",
                "#bilangan"
            );
            localStorage.setItem(WELCOME_KEY, "yes");
        }
    } catch (error) {
        console.warn("Pengaturan notifikasi awal tidak dapat disimpan:", error);
    }

    // Hubungkan perubahan data latihan dan refleksi dengan notifikasi.
    // Pembungkus ini memantau setItem dari skrip Math Connect di tab yang sama.
    if (!window.__mathConnectStorageHooked && window.Storage) {
        window.__mathConnectStorageHooked = true;
        const originalSetItem = Storage.prototype.setItem;

        Storage.prototype.setItem = function (key, value) {
            originalSetItem.call(this, key, value);
            window.dispatchEvent(new CustomEvent("mathconnect:storage", {
                detail: { key: String(key), value: String(value) }
            }));
        };
    }

    window.addEventListener("mathconnect:storage", function (event) {
        const detail = event.detail || {};

        if (detail.key === "mathConnectQuizResult") {
            try {
                const result = JSON.parse(detail.value || "{}");
                const stamp = result.completedAt || new Date().toISOString();
                addNotification(
                    `quiz-complete-${stamp}`,
                    "achievement",
                    "Latihan berhasil diselesaikan!",
                    `Hasil latihanmu sudah tersedia: ${result.score ?? "-"} dari 100 poin. Yuk, lihat hasilnya.`,
                    "#latihan"
                );
            } catch (error) {
                addNotification(
                    `quiz-complete-${Date.now()}`,
                    "achievement",
                    "Latihan berhasil diselesaikan!",
                    "Hasil latihanmu sudah tersedia. Yuk, lihat kembali jawabanmu.",
                    "#latihan"
                );
            }
        }

        if (detail.key === "mathConnectStudentReflection") {
            let stamp = new Date().toISOString();
            try {
                const reflection = JSON.parse(detail.value || "{}");
                stamp = reflection.savedAt || reflection.completedAt || stamp;
            } catch (error) {
                // Gunakan waktu saat ini jika format data refleksi tidak terbaca.
            }
            addNotification(
                `reflection-saved-${stamp}`,
                "reflection",
                "Refleksi berhasil disimpan!",
                "Terima kasih sudah mengevaluasi proses belajarmu. Terus kembangkan target belajarmu.",
                "#refleksi"
            );
        }
    });

    // Notifikasi ketika siswa pertama kali membuka materi tertentu.
    const topicNames = {
        bilangan: "Bilangan",
        pecahan: "Pecahan",
        desimal: "Desimal",
        "perbandingan-pecahan": "Perbandingan Pecahan",
        "operasi-pecahan": "Operasi Pecahan",
        penerapan: "Penerapan"
    };

    function notifyTopicVisit() {
        const topicId = window.location.hash.replace("#", "");
        if (!topicNames[topicId]) return;

        const seenKey = `mathConnectNotifiedTopic_${topicId}`;
        try {
            if (localStorage.getItem(seenKey) === "yes") return;
            addNotification(
                `topic-opened-${topicId}`,
                "material",
                `Materi ${topicNames[topicId]} dibuka`,
                `Kamu sedang mempelajari ${topicNames[topicId]}. Pelajari konsepnya secara bertahap, ya!`,
                `#${topicId}`
            );
            localStorage.setItem(seenKey, "yes");
        } catch (error) {
            // Notifikasi tetap tidak mengganggu navigasi jika penyimpanan dibatasi.
        }
    }

    window.addEventListener("hashchange", notifyTopicVisit);
    notifyTopicVisit();
    renderNotifications();
});