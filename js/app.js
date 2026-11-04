
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // ==================================================
    // 1. MENGAMBIL ELEMEN HTML
    // ==================================================
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    const materiToggle = document.getElementById("materiToggle");
    const materiSubmenu = document.getElementById("materiSubmenu");

    const searchToggle = document.getElementById("searchToggle");
    const searchForm = document.getElementById("searchForm");
    const conceptSearch = document.getElementById("conceptSearch");

    // ==================================================
    // 2. MENU MATERI BUKA / TUTUP
    // ==================================================
    if (materiToggle && materiSubmenu) {
        materiToggle.addEventListener("click", function () {
            const isExpanded =
                materiToggle.getAttribute("aria-expanded") === "true";

            materiToggle.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            materiSubmenu.hidden = isExpanded;
        });
    }

    // ==================================================
    // 3. SIDEBAR MOBILE
    // ==================================================
    function openSidebar() {
        if (!sidebar || !menuToggle) return;

        sidebar.classList.add("open");
        sidebarOverlay?.classList.add("visible");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Tutup menu");

        document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
        if (!sidebar || !menuToggle) return;

        sidebar.classList.remove("open");
        sidebarOverlay?.classList.remove("visible");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu");

        document.body.style.overflow = "";
    }

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", function () {
            const isOpen = sidebar.classList.contains("open");

            if (isOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    sidebarOverlay?.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeSidebar();

            if (searchForm && !searchForm.hidden) {
                searchForm.hidden = true;
            }
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 760) {
            closeSidebar();
        }
    });

    // ==================================================
    // 4. NAVIGASI AKTIF
    // ==================================================
    const navLinks = document.querySelectorAll(
        ".main-navigation a.nav-item, .submenu-item"
    );

    function updateActiveLink() {
        const currentHash = window.location.hash || "#beranda";

        navLinks.forEach(function (link) {
            const isActive = link.getAttribute("href") === currentHash;

            link.classList.toggle("active", isActive);

            if (link.classList.contains("nav-item")) {
                link.classList.toggle("active", isActive);
            }
        });

        // Jika yang aktif adalah salah satu materi,
        // tandai juga tombol Materi.
        const isMaterial = [
            "#bilangan",
            "#pecahan",
            "#desimal",
            "#persen",
            "#rasio",
            "#operasi",
            "#penerapan"
        ].includes(currentHash);

        if (materiToggle && isMaterial) {
            materiToggle.classList.add("active");
        } else if (materiToggle) {
            materiToggle.classList.remove("active");
        }
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            const target = link.getAttribute("href");

            if (
                materiSubmenu &&
                materiToggle &&
                target !== "#bilangan" &&
                target !== "#pecahan" &&
                target !== "#desimal" &&
                target !== "#persen" &&
                target !== "#rasio" &&
                target !== "#operasi" &&
                target !== "#penerapan"
            ) {
                materiSubmenu.hidden = true;
                materiToggle.setAttribute("aria-expanded", "false");
            }

            if (window.innerWidth <= 760) {
                closeSidebar();
            }
        });
    });

    window.addEventListener("hashchange", updateActiveLink);
    updateActiveLink();

    // ==================================================
    // 5. TOPBAR AKTIF
    // ==================================================
    const topLinks = document.querySelectorAll(".top-link");

    topLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            topLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });

    // ==================================================
    // 6. PENCARIAN KONSEP
    // ==================================================
    if (searchToggle && searchForm) {
        searchToggle.addEventListener("click", function () {
            searchForm.hidden = !searchForm.hidden;

            if (!searchForm.hidden) {
                conceptSearch?.focus();
            }
        });
    }

    const searchableSections = [
        {
            keywords: ["bilangan", "cacah", "bulat", "rasional"],
            target: "#bilangan"
        },
        {
            keywords: ["pecahan", "pembilang", "penyebut"],
            target: "#pecahan"
        },
        {
            keywords: ["desimal", "koma"],
            target: "#desimal"
        },
        {
            keywords: ["persen", "persentase", "diskon"],
            target: "#persen"
        },
        {
            keywords: ["rasio", "perbandingan"],
            target: "#rasio"
        },
        {
            keywords: ["operasi", "penjumlahan", "pengurangan",
                "perkalian", "pembagian"],
            target: "#operasi"
        },
        {
            keywords: ["penerapan", "kehidupan", "sehari-hari"],
            target: "#penerapan"
        },
        {
            keywords: ["latihan", "kuis", "soal"],
            target: "#latihan"
        },
        {
            keywords: ["refleksi"],
            target: "#refleksi"
        }
    ];

    if (searchForm && conceptSearch) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const query = conceptSearch.value.trim().toLowerCase();

            if (!query) {
                conceptSearch.focus();
                return;
            }

            const result = searchableSections.find(function (section) {
                return section.keywords.some(function (keyword) {
                    return keyword.includes(query) ||
                        query.includes(keyword);
                });
            });

            if (result) {
                const target = document.querySelector(result.target);

                if (target) {
                    window.location.hash = result.target;
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    searchForm.hidden = true;

                    if (materiSubmenu && materiToggle) {
                        const isMaterial = [
                            "#bilangan", "#pecahan", "#desimal",
                            "#persen", "#rasio", "#operasi", "#penerapan"
                        ].includes(result.target);

                        if (isMaterial) {
                            materiSubmenu.hidden = false;
                            materiToggle.setAttribute("aria-expanded", "true");
                        }
                    }
                }
            } else {
                alert("Konsep belum ditemukan. Coba kata kunci lain.");
            }
        });
    }

    // ==================================================
    // 7. PETA KONSEP INTERAKTIF
    // ==================================================
    const conceptInfo = document.getElementById("conceptInfo");
    const conceptTitle = document.getElementById("conceptTitle");
    const conceptDescription = document.getElementById("conceptDescription");
    const conceptLink = document.getElementById("conceptLink");
    const closeConceptInfo = document.getElementById("closeConceptInfo");

    const conceptDescriptions = {
        "Bilangan":
            "Bilangan digunakan untuk menyatakan jumlah, ukuran, urutan, dan nilai.",
        "Bilangan Cacah":
            "Bilangan cacah dimulai dari nol dan dilanjutkan dengan bilangan bulat positif.",
        "Bilangan Bulat":
            "Bilangan bulat terdiri atas bilangan negatif, nol, dan bilangan positif.",
        "Bilangan Rasional":
            "Bilangan rasional dapat dinyatakan sebagai a/b dengan a dan b bilangan bulat serta b tidak sama dengan nol.",
        "Pecahan":
            "Pecahan menyatakan bagian dari keseluruhan dan ditulis dalam bentuk pembilang serta penyebut.",
        "Desimal":
            "Desimal menyatakan nilai menggunakan sistem bilangan berbasis sepuluh, misalnya 0,5.",
        "Persen":
            "Persen menyatakan bagian dari seratus. Contohnya, 25% sama dengan 1/4.",
        "Rasio":
            "Rasio adalah perbandingan dua besaran, misalnya 2 : 3.",
        "Penerapan":
            "Konsep bilangan, pecahan, desimal, persen, dan rasio dapat digunakan dalam situasi sehari-hari."
    };

    const conceptTargets = {
        "Bilangan": "#bilangan",
        "Bilangan Cacah": "#bilangan",
        "Bilangan Bulat": "#bilangan",
        "Bilangan Rasional": "#bilangan",
        "Pecahan": "#pecahan",
        "Desimal": "#desimal",
        "Persen": "#persen",
        "Rasio": "#rasio",
        "Penerapan": "#penerapan"
    };

    document.querySelectorAll(".concept-node").forEach(function (node) {
        node.addEventListener("click", function () {
            const concept = node.dataset.concept;

            if (!conceptInfo || !conceptTitle || !conceptDescription) {
                return;
            }

            conceptTitle.textContent = concept;
            conceptDescription.textContent =
                conceptDescriptions[concept] ||
                "Pelajari konsep ini untuk memahami hubungan matematika.";

            conceptLink.href = conceptTargets[concept] || "#bilangan";
            conceptInfo.hidden = false;

            conceptInfo.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        });
    });

    closeConceptInfo?.addEventListener("click", function () {
        conceptInfo.hidden = true;
    });

    
    // ==================================================
    // 8. DESIMAL
    // ==================================================

    const numerator = document.getElementById("numerator");
    const denominator = document.getElementById("denominator");
    const decimal = document.getElementById("decimal");
    const percent = document.getElementById("percent");
    const conversionStatus = document.getElementById("conversion-status");

    // Mengubah koma menjadi titik
    function parseValue(value) {
        return Number(value.trim().replace(",", "."));
    }

    // Mencari FPB
    function gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);

        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }

        return a || 1;
    }

    // Menyederhanakan pecahan
    function toFraction(value) {
        const precision = 100000000;
        let n = Math.round(value * precision);
        let d = precision;

        const divisor = gcd(n, d);

        return {
            numerator: n / divisor,
            denominator: d / divisor
        };
    }

    // Format desimal Indonesia
    function formatDecimal(value) {
        return new Intl.NumberFormat("id-ID", {
            maximumFractionDigits: 10
        }).format(value);
    }

    // Memperbarui semua bentuk bilangan
    function updateConversion(value) {
        if (!Number.isFinite(value)) return;

        const fraction = toFraction(value);

        numerator.value = fraction.numerator;
        denominator.value = fraction.denominator;
        decimal.value = formatDecimal(value);
        percent.value = formatDecimal(value * 100);

        conversionStatus.textContent =
            "Konversi berhasil! Ketiga bentuk bilangan memiliki nilai yang sama.";
    }

    // Konversi dari pecahan
    function convertFraction() {
        const n = Number(numerator.value);
        const d = Number(denominator.value);

        if (numerator.value === "" || denominator.value === "") {
            conversionStatus.textContent = "Silakan isi pembilang dan penyebut.";
            return;
        }

        if (!Number.isFinite(n) || !Number.isFinite(d)) {
            conversionStatus.textContent = "Masukkan angka yang valid.";
            return;
        }

        if (d === 0) {
            conversionStatus.textContent = "Penyebut tidak boleh nol.";
            return;
        }

        updateConversion(n / d);
    }

    // Konversi dari desimal
    function convertDecimal() {
        const value = parseValue(decimal.value);

        if (decimal.value.trim() === "" || !Number.isFinite(value)) {
            conversionStatus.textContent = "Masukkan nilai desimal yang valid.";
            return;
        }

        updateConversion(value);
    }

    // Konversi dari persen
    function convertPercent() {
        const value = parseValue(percent.value);

        if (percent.value.trim() === "" || !Number.isFinite(value)) {
            conversionStatus.textContent = "Masukkan nilai persen yang valid.";
            return;
        }

        updateConversion(value / 100);
    }

    // Event listener
    if (numerator && denominator && decimal && percent && conversionStatus) {
        numerator.addEventListener("input", convertFraction);
        denominator.addEventListener("input", convertFraction);
        decimal.addEventListener("input", convertDecimal);
        percent.addEventListener("input", convertPercent);
    }

// ==================================================
    // 9. TAB OPERASI PECAHAN
    // ==================================================
 const persenNumerator = document.getElementById("persenNumerator");
    const persenDenominator = document.getElementById("persenDenominator");
    const persenDecimal = document.getElementById("persenDecimal");
    const persenValue = document.getElementById("persenValue");
    const persenStatus = document.getElementById("persenStatus");

    // Memastikan elemen HTML tersedia
    if (
        persenNumerator &&
        persenDenominator &&
        persenDecimal &&
        persenValue &&
        persenStatus
    ) {

        // Mengubah koma menjadi titik
        function parsePersenValue(value) {
            return Number(value.trim().replace(",", "."));
        }

        // Mencari FPB
        function gcdPersen(a, b) {
            a = Math.abs(a);
            b = Math.abs(b);

            while (b !== 0) {
                const temp = b;
                b = a % b;
                a = temp;
            }

            return a || 1;
        }

        // Mengubah desimal menjadi pecahan
        function toPersenFraction(value) {
            const precision = 100000000;
            const n = Math.round(value * precision);
            const d = precision;

            const divisor = gcdPersen(n, d);

            return {
                numerator: n / divisor,
                denominator: d / divisor
            };
        }

        // Format angka menggunakan koma
        function formatPersenDecimal(value) {
            return new Intl.NumberFormat("id-ID", {
                maximumFractionDigits: 10
            }).format(value);
        }

        // Memperbarui ketiga bentuk bilangan
        function updatePersenConversion(value) {
            if (!Number.isFinite(value)) return;

            const fraction = toPersenFraction(value);

            persenNumerator.value = fraction.numerator;
            persenDenominator.value = fraction.denominator;

            persenDecimal.value = formatPersenDecimal(value);

            persenValue.value = formatPersenDecimal(value * 100);

            persenStatus.textContent =
                "Konversi berhasil! Ketiga bentuk bilangan memiliki nilai yang sama.";
        }

        // Konversi dari pecahan
        function convertFromPersenFraction() {
            const n = Number(persenNumerator.value);
            const d = Number(persenDenominator.value);

            if (
                persenNumerator.value === "" ||
                persenDenominator.value === ""
            ) {
                persenStatus.textContent =
                    "Silakan isi pembilang dan penyebut.";
                return;
            }

            if (!Number.isFinite(n) || !Number.isFinite(d)) {
                persenStatus.textContent =
                    "Masukkan angka yang valid.";
                return;
            }

            if (d === 0) {
                persenStatus.textContent =
                    "Penyebut tidak boleh bernilai nol.";
                return;
            }

            updatePersenConversion(n / d);
        }

        // Konversi dari desimal
        function convertFromPersenDecimal() {
            const value = parsePersenValue(persenDecimal.value);

            if (
                persenDecimal.value.trim() === "" ||
                !Number.isFinite(value)
            ) {
                persenStatus.textContent =
                    "Masukkan nilai desimal yang valid.";
                return;
            }

            updatePersenConversion(value);
        }

        // Konversi dari persen
        function convertFromPersenValue() {
            const value = parsePersenValue(persenValue.value);

            if (
                persenValue.value.trim() === "" ||
                !Number.isFinite(value)
            ) {
                persenStatus.textContent =
                    "Masukkan nilai persen yang valid.";
                return;
            }

            updatePersenConversion(value / 100);
        }

        // Menghubungkan input dengan fungsi konversi
        persenNumerator.addEventListener(
            "input",
            convertFromPersenFraction
        );

        persenDenominator.addEventListener(
            "input",
            convertFromPersenFraction
        );

        persenDecimal.addEventListener(
            "input",
            convertFromPersenDecimal
        );

        persenValue.addEventListener(
            "input",
            convertFromPersenValue
        );
    }
    
    // ==================================================
    // 11. TAB OPERASI PECAHAN
    // ==================================================
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
    const operationExample = document.getElementById("operationExample");
    const operationExplanation =
        document.getElementById("operationExplanation");

    document.querySelectorAll(".operation-tab").forEach(function (button) {
        button.addEventListener("click", function () {
            const type = button.dataset.operation;
            const data = operationData[type];

            if (!data) return;

            document.querySelectorAll(".operation-tab").forEach(function (tab) {
                tab.classList.remove("active");
            });

            button.classList.add("active");

            operationTitle.textContent = data.title;
            operationExample.textContent = data.example;
            operationExplanation.textContent = data.explanation;
        });
    });

    // ==================================================
    // 12. LATIHAN PERBANDINGAN PECAHAN
    // ==================================================
    const quizFeedback = document.getElementById("quizFeedback");

    document.querySelectorAll(".quiz-options button").forEach(function (button) {
        button.addEventListener("click", function () {
            if (!quizFeedback) return;

            const isCorrect = button.dataset.answer === "benar";

            quizFeedback.textContent = isCorrect
                ? "Benar! 1/2 = 3/6, sedangkan 2/3 = 4/6. Jadi, 1/2 < 2/3."
                : "Belum tepat. Samakan penyebut menjadi 6, lalu bandingkan 3/6 dan 4/6.";

            quizFeedback.style.color = isCorrect ? "#16865f" : "#d97732";
        });
    });

    // ==================================================
    // 13. FORM REFLEKSI
    // ==================================================
    const reflectionForm = document.getElementById("reflectionForm");
    const reflectionAnswer = document.getElementById("reflectionAnswer");
    const reflectionFeedback =
        document.getElementById("reflectionFeedback");

    if (reflectionForm) {
        reflectionForm.addEventListener("submit", function (event) {
            event.preventDefault();

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

    // ==================================================
    // 11. AKHIR INISIALISASI
    // ==================================================
    console.log("Math Connect berhasil diinisialisasi.");
});
