
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
    // 8. TAB OPERASI PECAHAN
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
    // 9. LATIHAN PERBANDINGAN PECAHAN
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
    // 10. FORM REFLEKSI
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
