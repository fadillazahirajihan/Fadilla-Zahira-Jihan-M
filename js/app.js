/* =========================================================
   MATH CONNECT - SCRIPT.JS
   JavaScript interaktif untuk website Math Connect
   ========================================================= */


/* =========================================================
   1. MENUNGGU HTML SELESAI DIMUAT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------------------
       REFERENSI ELEMEN HTML
       ----------------------------------------------------- */

    const sidebar = document.getElementById("sidebar");

    const menuToggle = document.getElementById("menuToggle");

    const navItems = document.querySelectorAll(
        ".nav-item[href^='#']"
    );

    const sections = document.querySelectorAll(
        ".page-section"
    );


    /* =====================================================
       2. SIDEBAR MOBILE
       ===================================================== */

    if (menuToggle && sidebar) {

        menuToggle.addEventListener("click", function () {

            sidebar.classList.toggle("open");

            const isOpen =
                sidebar.classList.contains("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });

    }


    /* =====================================================
       3. NAVIGASI SIDEBAR
       ===================================================== */

    navItems.forEach(function (item) {

        item.addEventListener("click", function (event) {

            event.preventDefault();

            const targetId =
                item.getAttribute("href");

            const targetSection =
                document.querySelector(targetId);

            if (!targetSection) return;


            /* Scroll ke section */

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            /* Aktifkan menu */

            navItems.forEach(function (nav) {

                nav.classList.remove("active");

            });

            item.classList.add("active");


            /* Tutup sidebar pada HP */

            if (
                window.innerWidth <= 1000 &&
                sidebar
            ) {

                sidebar.classList.remove("open");

            }

        });

    });


    /* =====================================================
       4. ACTIVE NAVIGATION SAAT SCROLL
       ===================================================== */

    const navSectionMap = {};


    navItems.forEach(function (item) {

        const id =
            item.getAttribute("href");

        navSectionMap[id] = item;

    });


    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const id =
                            "#" + entry.target.id;

                        const activeNav =
                            navSectionMap[id];


                        if (activeNav) {

                            navItems.forEach(
                                function (nav) {

                                    nav.classList.remove(
                                        "active"
                                    );

                                }
                            );

                            activeNav.classList.add(
                                "active"
                            );

                        }

                    }

                });

            },

            {
                threshold: 0.35
            }

        );


    sections.forEach(function (section) {

        if (section.id) {

            observer.observe(section);

        }

    });


    /* =====================================================
       5. TOMBOL HERO
       ===================================================== */

    const heroButtons =
        document.querySelectorAll(
            ".hero-buttons .btn"
        );


    if (heroButtons.length >= 2) {


        /* -----------------------------------------------
           MULAI EKSPLORASI
           ----------------------------------------------- */

        heroButtons[0].addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const konsep =
                    document.getElementById(
                        "konsep"
                    );

                if (konsep) {

                    konsep.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );


        /* -----------------------------------------------
           MULAI DARI BILANGAN
           ----------------------------------------------- */

        heroButtons[1].addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const bilangan =
                    document.getElementById(
                        "bilangan"
                    );

                if (bilangan) {

                    bilangan.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* =====================================================
       6. TOMBOL EKSPLORASI KONSEP
       ===================================================== */

    const exploreButton =
        document.querySelector(
            ".concept-section .section-action .btn"
        );


    if (exploreButton) {

        exploreButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const bilangan =
                    document.getElementById(
                        "bilangan"
                    );

                if (bilangan) {

                    bilangan.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* =====================================================
       7. INTERAKSI PETA KONSEP
       ===================================================== */

    const conceptMap =
        document.querySelector(
            ".concept-map"
        );


    const conceptNodes =
        document.querySelectorAll(
            ".concept-map .concept-node"
        );


    if (
        conceptMap &&
        conceptNodes.length > 0
    ) {

        conceptNodes.forEach(
            function (node) {

                node.addEventListener(
                    "click",
                    function () {


                        /* Reset node */

                        conceptNodes.forEach(
                            function (item) {

                                item.style.boxShadow =
                                    "";

                                item.style.borderColor =
                                    "";

                                item.style.transform =
                                    "";

                            }
                        );


                        /* Highlight node */

                        node.style.boxShadow =
                            "0 0 0 4px rgba(75,141,248,0.16), 0 15px 30px rgba(57,93,145,0.15)";


                        node.style.borderColor =
                            "#4b8df8";


                        /* Posisi khusus */

                        if (
                            node.classList.contains(
                                "main-node"
                            )
                        ) {

                            node.style.transform =
                                "translateX(-50%) scale(1.05)";

                        }

                        else if (
                            node.classList.contains(
                                "application-node"
                            )
                        ) {

                            node.style.transform =
                                "translateX(-50%) scale(1.05)";

                        }

                        else {

                            node.style.transform =
                                "translateY(-4px) scale(1.04)";

                        }


                        /* Highlight garis */

                        const lines =
                            conceptMap.querySelectorAll(
                                ".concept-line"
                            );


                        lines.forEach(
                            function (line) {

                                line.style.background =
                                    "#b8cce8";

                            }
                        );


                        /* Jika Pecahan dipilih */

                        if (
                            node.textContent.trim() ===
                            "Pecahan"
                        ) {

                            lines.forEach(
                                function (line) {

                                    line.style.background =
                                        "#4b8df8";

                                }
                            );

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       8. TAB MATERI BILANGAN
       ===================================================== */

    const materialTabs =
        document.querySelectorAll(
            ".tab-button"
        );


    const materialContent =
        document.querySelector(
            "#bilangan .material-content"
        );


    if (
        materialTabs.length > 0 &&
        materialContent
    ) {

        const cards =
            materialContent.querySelectorAll(
                ".content-card"
            );


        materialTabs.forEach(
            function (tab, index) {

                tab.addEventListener(
                    "click",
                    function () {


                        /* Aktifkan tab */

                        materialTabs.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        tab.classList.add(
                            "active"
                        );


                        /* Tampilkan semua */

                        cards.forEach(
                            function (card) {

                                card.style.display =
                                    "block";

                            }
                        );


                        /* KONSEP */

                        if (index === 0) {

                            cards.forEach(
                                function (
                                    card,
                                    cardIndex
                                ) {

                                    card.style.display =
                                        cardIndex === 0
                                            ? "block"
                                            : "none";

                                }
                            );

                        }


                        /* JENIS */

                        if (index === 1) {

                            cards.forEach(
                                function (
                                    card,
                                    cardIndex
                                ) {

                                    card.style.display =
                                        cardIndex === 1
                                            ? "block"
                                            : "none";

                                }
                            );

                        }


                        /* CONTOH */

                        if (index === 2) {

                            cards.forEach(
                                function (
                                    card,
                                    cardIndex
                                ) {

                                    card.style.display =
                                        cardIndex === 2
                                            ? "block"
                                            : "none";

                                }
                            );

                        }


                        /* HUBUNGAN */

                        if (index === 3) {

                            cards.forEach(
                                function (card) {

                                    card.style.display =
                                        "block";

                                }
                            );


                            showTemporaryMessage(
                                materialContent,

                                "Hubungan konsep: Bilangan → Pecahan → Desimal → Persen → Penerapan."
                            );

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       9. TOMBOL LANJUT KE PECAHAN
       ===================================================== */

    const continueFractionButton =
        document.querySelector(
            "#bilangan .section-action .btn"
        );


    if (continueFractionButton) {

        continueFractionButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const fractionSection =
                    document.getElementById(
                        "pecahan"
                    );

                if (fractionSection) {

                    fractionSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* =====================================================
       10. HUBUNGAN BILANGAN → PECAHAN → DESIMAL → PERSEN
       ===================================================== */

    const relationshipNodes =
        document.querySelectorAll(
            ".relationship-card .relationship-node"
        );


    relationshipNodes.forEach(
        function (node) {

            node.style.cursor =
                "pointer";


            node.addEventListener(
                "click",
                function () {


                    relationshipNodes.forEach(
                        function (item) {

                            item.classList.remove(
                                "highlight"
                            );

                        }
                    );


                    node.classList.add(
                        "highlight"
                    );


                    const value =
                        node.textContent.trim();


                    let message = "";


                    if (value === "Bilangan") {

                        message =
                            "Bilangan adalah konsep yang lebih umum. Pecahan merupakan salah satu bentuk bilangan.";

                    }


                    if (value === "Pecahan") {

                        message =
                            "Pecahan dapat diubah menjadi desimal dengan membagi pembilang dengan penyebut.";

                    }


                    if (value === "Desimal") {

                        message =
                            "Desimal dapat diubah menjadi persen dengan mengalikan 100%.";

                    }


                    if (value === "Persen") {

                        message =
                            "Persen menunjukkan suatu nilai per seratus.";

                    }


                    if (message) {

                        showTemporaryMessage(
                            node.parentElement,
                            message
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       11. PECAHAN SENILAI
       ===================================================== */

    const fractionCards =
        document.querySelectorAll(
            ".fraction-card"
        );


    fractionCards.forEach(
        function (card) {

            card.style.cursor =
                "pointer";


            card.addEventListener(
                "click",
                function () {


                    fractionCards.forEach(
                        function (item) {

                            item.style.borderColor =
                                "";

                            item.style.background =
                                "";

                        }
                    );


                    card.style.borderColor =
                        "#4b8df8";


                    card.style.background =
                        "#eaf3ff";

                }
            );

        }
    );


    /* =====================================================
       12. KONVERSI PECAHAN → DESIMAL → PERSEN
       ===================================================== */

    const conversionValues =
        document.querySelectorAll(
            ".conversion-card .conversion-value"
        );


    conversionValues.forEach(
        function (valueBox) {

            valueBox.style.cursor =
                "pointer";


            valueBox.addEventListener(
                "click",
                function () {


                    conversionValues.forEach(
                        function (item) {

                            item.style.borderColor =
                                "";

                            item.style.background =
                                "";

                            item.style.color =
                                "";

                        }
                    );


                    valueBox.style.borderColor =
                        "#4b8df8";


                    valueBox.style.background =
                        "#eaf3ff";


                    valueBox.style.color =
                        "#2563d9";


                    const value =
                        valueBox.textContent.trim();


                    let explanation = "";


                    if (value === "1/2") {

                        explanation =
                            "1/2 dibaca sebagai satu dari dua bagian yang sama besar.";

                    }

                    else if (value === "0,5") {

                        explanation =
                            "0,5 memiliki nilai yang sama dengan 1/2.";

                    }

                    else if (value === "50%") {

                        explanation =
                            "50% berarti 50 dari 100, sehingga nilainya sama dengan 1/2.";

                    }


                    if (explanation) {

                        showTemporaryMessage(
                            valueBox.parentElement,
                            explanation
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       13. LATIHAN PERBANDINGAN PECAHAN
       ===================================================== */

    const comparisonButtons =
        document.querySelectorAll(
            ".answer-buttons button"
        );


    comparisonButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {


                    comparisonButtons.forEach(
                        function (item) {

                            item.style.background =
                                "";

                            item.style.color =
                                "";

                            item.style.borderColor =
                                "";

                        }
                    );


                    const answer =
                        button.textContent.trim();


                    /* Jawaban benar */

                    if (
                        answer.includes("<")
                    ) {

                        button.style.background =
                            "#e8faf4";

                        button.style.color =
                            "#218663";

                        button.style.borderColor =
                            "#42c89b";


                        showTemporaryMessage(
                            button.parentElement,

                            "Benar! 1/2 = 3/6, sedangkan 2/3 = 4/6. Jadi 1/2 < 2/3."
                        );

                    }


                    /* Jawaban salah */

                    else {

                        button.style.background =
                            "#fff1f3";

                        button.style.color =
                            "#c65369";

                        button.style.borderColor =
                            "#f58fb2";


                        showTemporaryMessage(
                            button.parentElement,

                            "Belum tepat. Samakan penyebut terlebih dahulu agar lebih mudah membandingkan pecahan."
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       14. OPERASI PECAHAN
       ===================================================== */

    const operationTabs =
        document.querySelectorAll(
            ".operation-tab"
        );


    const operationQuestion =
        document.querySelector(
            ".operation-question"
        );


    const operationSteps =
        document.querySelector(
            ".operation-steps"
        );


    const operationResult =
        document.querySelector(
            ".operation-result"
        );


    const operationData = {

        "Penjumlahan": {

            question:
                "1/2 + 1/4 = ?",

            steps: [

                [
                    "01",
                    "Samakan penyebut.",
                    "1/2 = 2/4"
                ],

                [
                    "02",
                    "Ubah menjadi pecahan senilai.",
                    "2/4 + 1/4"
                ],

                [
                    "03",
                    "Jumlahkan pembilang.",
                    "3/4"
                ]

            ],

            result:
                "3/4"

        },


        "Pengurangan": {

            question:
                "3/4 − 1/4 = ?",

            steps: [

                [
                    "01",
                    "Periksa penyebut.",
                    "Penyebut sudah sama."
                ],

                [
                    "02",
                    "Kurangkan pembilang.",
                    "3 − 1"
                ],

                [
                    "03",
                    "Pertahankan penyebut.",
                    "2/4 = 1/2"
                ]

            ],

            result:
                "1/2"

        },


        "Perkalian": {

            question:
                "1/2 × 2/3 = ?",

            steps: [

                [
                    "01",
                    "Kalikan pembilang.",
                    "1 × 2 = 2"
                ],

                [
                    "02",
                    "Kalikan penyebut.",
                    "2 × 3 = 6"
                ],

                [
                    "03",
                    "Sederhanakan.",
                    "2/6 = 1/3"
                ]

            ],

            result:
                "1/3"

        },


        "Pembagian": {

            question:
                "1/2 ÷ 1/4 = ?",

            steps: [

                [
                    "01",
                    "Balik pecahan pembagi.",
                    "1/4 → 4/1"
                ],

                [
                    "02",
                    "Ubah pembagian menjadi perkalian.",
                    "1/2 × 4/1"
                ],

                [
                    "03",
                    "Kalikan dan sederhanakan.",
                    "4/2 = 2"
                ]

            ],

            result:
                "2"

        }

    };


    function updateOperation(type) {

        const data =
            operationData[type];


        if (!data) return;


        if (operationQuestion) {

            operationQuestion.innerHTML = `

                <p>
                    Perhatikan operasi berikut.
                </p>

                <h3>
                    ${data.question}
                </h3>

            `;

        }


        if (operationSteps) {

            operationSteps.innerHTML =
                data.steps.map(
                    function (step) {

                        return `

                            <div class="step">

                                <span>
                                    ${step[0]}
                                </span>

                                <strong>
                                    ${step[1]}
                                </strong>

                                <p>
                                    ${step[2]}
                                </p>

                            </div>

                        `;

                    }
                ).join("");

        }


        if (operationResult) {

            operationResult.innerHTML = `

                <span>
                    Hasil
                </span>

                <strong>
                    ${data.result}
                </strong>

            `;

        }

    }


    operationTabs.forEach(
        function (tab) {

            tab.addEventListener(
                "click",
                function () {


                    operationTabs.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    tab.classList.add(
                        "active"
                    );


                    updateOperation(
                        tab.textContent.trim()
                    );

                }
            );

        }
    );


    /* =====================================================
       15. AKTIVITAS TEMUKAN HUBUNGANNYA
       ===================================================== */

    const relationshipColumns =
        document.querySelectorAll(
            ".relationship-column"
        );


    if (relationshipColumns.length >= 2) {

        const conceptButtons =
            relationshipColumns[0]
                .querySelectorAll("button");


        const representationButtons =
            relationshipColumns[1]
                .querySelectorAll("button");


        let selectedConcept =
            null;


        let matchedPairs =
            0;


        const correctPairs = {

            "1/2":
                "Pecahan",

            "0,5":
                "Desimal",

            "50%":
                "Persen"

        };


        /* ---------------------------------------------
           PILIH KONSEP
           --------------------------------------------- */

        conceptButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {


                        conceptButtons.forEach(
                            function (item) {

                                item.style.background =
                                    "";

                                item.style.color =
                                    "";

                                item.style.borderColor =
                                    "";

                            }
                        );


                        selectedConcept =
                            button.textContent.trim();


                        button.style.background =
                            "#eaf3ff";


                        button.style.color =
                            "#2563d9";


                        button.style.borderColor =
                            "#4b8df8";

                    }
                );

            }
        );


        /* ---------------------------------------------
           PILIH REPRESENTASI
           --------------------------------------------- */

        representationButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {


                        if (!selectedConcept) {

                            showTemporaryMessage(

                                relationshipColumns[1],

                                "Pilih konsep terlebih dahulu."

                            );

                            return;

                        }


                        const representation =
                            button.textContent.trim();


                        const correctAnswer =
                            correctPairs[
                                selectedConcept
                            ];


                        /* BENAR */

                        if (
                            representation ===
                            correctAnswer
                        ) {


                            button.style.background =
                                "#e8faf4";


                            button.style.color =
                                "#218663";


                            button.style.borderColor =
                                "#42c89b";


                            const selectedButton =
                                Array.from(
                                    conceptButtons
                                ).find(
                                    function (item) {

                                        return (
                                            item.textContent
                                                .trim() ===
                                            selectedConcept
                                        );

                                    }
                                );


                            if (selectedButton) {

                                selectedButton.style.background =
                                    "#e8faf4";

                                selectedButton.style.color =
                                    "#218663";

                                selectedButton.style.borderColor =
                                    "#42c89b";

                            }


                            matchedPairs++;


                            showTemporaryMessage(

                                relationshipColumns[1],

                                `Benar! ${selectedConcept} berhubungan dengan ${representation}.`

                            );


                            selectedConcept =
                                null;


                            if (
                                matchedPairs === 3
                            ) {

                                showTemporaryMessage(

                                    document.querySelector(
                                        ".relationship-section"
                                    ),

                                    "🎉 Semua pasangan benar! Kamu sudah memahami hubungan pecahan, desimal, dan persen."

                                );

                            }

                        }


                        /* SALAH */

                        else {

                            button.style.background =
                                "#fff1f3";

                            button.style.color =
                                "#c65369";

                            button.style.borderColor =
                                "#f58fb2";


                            showTemporaryMessage(

                                relationshipColumns[1],

                                "Belum tepat. Coba pikirkan bentuk representasinya."

                            );

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       16. REFLEKSI SISWA
       ===================================================== */

    const reflectionButton =
        document.getElementById(
            "reflectionButton"
        );


    if (reflectionButton) {

        reflectionButton.addEventListener(
            "click",
            function () {


                const reflectionSection =
                    reflectionButton.closest(
                        ".reflection-section"
                    );


                if (!reflectionSection)
                    return;


                /* Jangan membuat form dua kali */

                if (
                    reflectionSection.querySelector(
                        ".reflection-form"
                    )
                ) {

                    reflectionSection
                        .querySelector("textarea")
                        .focus();

                    return;

                }


                const form =
                    document.createElement(
                        "div"
                    );


                form.className =
                    "reflection-form";


                form.style.marginTop =
                    "25px";


                form.style.maxWidth =
                    "700px";


                form.innerHTML = `

                    <label
                        for="reflectionInput"
                        style="
                            display:block;
                            font-weight:700;
                            margin-bottom:8px;
                        "
                    >
                        Tuliskan pemahamanmu:
                    </label>


                    <textarea
                        id="reflectionInput"
                        rows="5"
                        placeholder="Contoh: Pecahan 1/2 sama nilainya dengan 0,5 dan 50% karena ..."
                        style="
                            width:100%;
                            padding:15px;
                            border:1px solid #dfe8f5;
                            border-radius:14px;
                            resize:vertical;
                            outline:none;
                            font-family:inherit;
                        "
                    ></textarea>


                    <button
                        id="submitReflection"
                        class="btn btn-primary"
                        style="
                            margin-top:12px;
                            border:none;
                        "
                    >
                        Simpan Refleksi
                    </button>


                    <p
                        id="reflectionFeedback"
                        style="
                            margin-top:10px;
                            color:#718096;
                            font-size:13px;
                        "
                    ></p>

                `;


                reflectionSection.appendChild(
                    form
                );


                const textarea =
                    document.getElementById(
                        "reflectionInput"
                    );


                const submitReflection =
                    document.getElementById(
                        "submitReflection"
                    );


                const feedback =
                    document.getElementById(
                        "reflectionFeedback"
                    );


                textarea.focus();


                submitReflection.addEventListener(
                    "click",
                    function () {


                        const answer =
                            textarea.value.trim();


                        if (
                            answer.length < 10
                        ) {

                            feedback.textContent =
                                "Tuliskan pemahamanmu sedikit lebih lengkap.";

                            feedback.style.color =
                                "#c65369";

                            return;

                        }


                        localStorage.setItem(

                            "mathConnectReflection",

                            answer

                        );


                        feedback.textContent =
                            "✓ Refleksi berhasil disimpan pada browser ini.";


                        feedback.style.color =
                            "#218663";

                    }
                );

            }
        );

    }


    /* =====================================================
       17. PERSONAL CONCEPT MAP
       ===================================================== */

    const personalMap =
        document.querySelector(
            ".personal-map"
        );


    const saveMapButton =
        document.getElementById(
            "saveMap"
        );


    const resetMapButton =
        document.getElementById(
            "resetMap"
        );


    const personalNodes =
        document.querySelectorAll(
            ".personal-map-node"
        );


    /* -----------------------------------------------------
       PILIH NODE
       ----------------------------------------------------- */

    personalNodes.forEach(
        function (node) {

            node.style.cursor =
                "pointer";


            node.addEventListener(
                "click",
                function () {


                    node.classList.toggle(
                        "selected-node"
                    );


                    if (
                        node.classList.contains(
                            "selected-node"
                        )
                    ) {

                        node.style.background =
                            "#eaf3ff";

                        node.style.borderColor =
                            "#4b8df8";

                        node.style.color =
                            "#2563d9";

                    }

                    else {

                        node.style.background =
                            "";

                        node.style.borderColor =
                            "";

                        node.style.color =
                            "";

                    }

                }
            );

        }
    );


    /* -----------------------------------------------------
       SIMPAN PETA KONSEP
       ----------------------------------------------------- */

    if (saveMapButton) {

        saveMapButton.addEventListener(
            "click",
            function () {


                const selectedNodes = [];


                personalNodes.forEach(
                    function (node) {

                        if (
                            node.classList.contains(
                                "selected-node"
                            )
                        ) {

                            selectedNodes.push(
                                node.textContent.trim()
                            );

                        }

                    }
                );


                localStorage.setItem(

                    "mathConnectConceptMap",

                    JSON.stringify(
                        selectedNodes
                    )

                );


                showTemporaryMessage(

                    personalMap,

                    selectedNodes.length > 0

                        ? `✓ Peta konsep disimpan. ${selectedNodes.length} konsep dipilih.`

                        : "✓ Peta konsep disimpan."

                );

            }
        );

    }


    /* -----------------------------------------------------
       RESET PETA KONSEP
       ----------------------------------------------------- */

    if (resetMapButton) {

        resetMapButton.addEventListener(
            "click",
            function () {


                personalNodes.forEach(
                    function (node) {

                        node.classList.remove(
                            "selected-node"
                        );

                        node.style.background =
                            "";

                        node.style.borderColor =
                            "";

                        node.style.color =
                            "";

                    }
                );


                localStorage.removeItem(
                    "mathConnectConceptMap"
                );


                showTemporaryMessage(

                    personalMap,

                    "Peta konsep berhasil direset."

                );

            }
        );

    }


    /* -----------------------------------------------------
       MEMUAT PETA YANG TERSIMPAN
       ----------------------------------------------------- */

    try {

        const savedMap =
            JSON.parse(

                localStorage.getItem(
                    "mathConnectConceptMap"
                ) || "[]"

            );


        personalNodes.forEach(
            function (node) {

                if (
                    savedMap.includes(
                        node.textContent.trim()
                    )
                ) {

                    node.classList.add(
                        "selected-node"
                    );

                    node.style.background =
                        "#eaf3ff";

                    node.style.borderColor =
                        "#4b8df8";

                    node.style.color =
                        "#2563d9";

                }

            }
        );

    }

    catch (error) {

        console.log(
            "Data peta konsep belum tersedia."
        );

    }


    /* =====================================================
       18. SEARCH
       ===================================================== */

    const searchButton =
        document.querySelector(
            ".search-button"
        );


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function () {


                const searchTerm =
                    prompt(
                        "Cari konsep matematika:",
                        ""
                    );


                if (!searchTerm)
                    return;


                const normalizedTerm =
                    searchTerm
                        .toLowerCase()
                        .trim();


                const searchableSections =
                    Array.from(
                        document.querySelectorAll(
                            ".page-section"
                        )
                    );


                const foundSection =
                    searchableSections.find(
                        function (section) {

                            return section
                                .textContent
                                .toLowerCase()
                                .includes(
                                    normalizedTerm
                                );

                        }
                    );


                if (foundSection) {


                    foundSection.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });


                    showTemporaryMessage(

                        foundSection,

                        `Konsep "${searchTerm}" ditemukan di bagian ini.`

                    );

                }


                else {

                    alert(

                        `Konsep "${searchTerm}" belum ditemukan pada halaman ini.`

                    );

                }

            }
        );

    }


    /* =====================================================
       19. PROFILE
       ===================================================== */

    const profileButton =
        document.querySelector(
            ".profile-button"
        );


    if (profileButton) {

        profileButton.addEventListener(
            "click",
            function () {

                alert(

                    "Selamat datang di Math Connect!\n\n" +

                    "Jelajahi konsep matematika, " +

                    "hubungkan representasi, " +

                    "dan lakukan refleksi setelah belajar."

                );

            }
        );

    }


    /* =====================================================
       20. ANIMASI CARD
       ===================================================== */

    const animatedElements =
        document.querySelectorAll(

            ".content-card, " +

            ".type-card, " +

            ".application-card, " +

            ".fraction-card, " +

            ".feature-item"

        );


    const animationObserver =
        new IntersectionObserver(

            function (
                entries,
                observer
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    animatedElements.forEach(
        function (element) {

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(15px)";

            element.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";


            animationObserver.observe(
                element
            );

        }
    );


    /* =====================================================
       21. ILUSTRASI BUKU
       ===================================================== */

    const bookIllustration =
        document.querySelector(
            ".book-illustration"
        );


    if (bookIllustration) {

        bookIllustration.style.cursor =
            "pointer";


        bookIllustration.addEventListener(
            "click",
            function () {

                showTemporaryMessage(

                    bookIllustration.parentElement,

                    "📖 Matematika menjadi lebih bermakna ketika kita memahami hubungan antar konsep."

                );

            }
        );

    }


    /* =====================================================
       22. FUNGSI PESAN SEMENTARA
       ===================================================== */

    function showTemporaryMessage(
        container,
        message
    ) {


        if (!container)
            return;


        /* Hapus pesan lama */

        const oldMessage =
            container.querySelector(
                ".math-connect-message"
            );


        if (oldMessage) {

            oldMessage.remove();

        }


        /* Buat pesan */

        const messageElement =
            document.createElement(
                "div"
            );


        messageElement.className =
            "math-connect-message";


        messageElement.textContent =
            message;


        messageElement.style.marginTop =
            "15px";


        messageElement.style.padding =
            "12px 15px";


        messageElement.style.borderRadius =
            "12px";


        messageElement.style.background =
            "#eaf3ff";


        messageElement.style.color =
            "#2563d9";


        messageElement.style.fontSize =
            "13px";


        messageElement.style.fontWeight =
            "600";


        messageElement.style.opacity =
            "0";


        messageElement.style.transform =
            "translateY(5px)";


        messageElement.style.transition =
            "all 0.25s ease";


        container.appendChild(
            messageElement
        );


        requestAnimationFrame(
            function () {

                messageElement.style.opacity =
                    "1";

                messageElement.style.transform =
                    "translateY(0)";

            }
        );


        setTimeout(
            function () {

                messageElement.style.opacity =
                    "0";

                messageElement.style.transform =
                    "translateY(-5px)";


                setTimeout(
                    function () {

                        if (
                            messageElement.parentElement
                        ) {

                            messageElement.remove();

                        }

                    },
                    300
                );

            },
            4000
        );

    }


    /* =====================================================
       23. STATUS
       ===================================================== */

    console.log(
        "Math Connect berhasil dimuat."
    );


    console.log(
        "Interactive learning system siap digunakan."
    );

});