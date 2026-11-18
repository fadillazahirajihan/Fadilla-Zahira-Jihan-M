"use strict";

/* Materi Perbandingan Pecahan: eksplorasi, pemeriksaan, dan pembahasan */

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


