
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
        });

        // Jika yang aktif adalah salah satu materi,
        // tandai juga tombol Materi.
        const isMaterial = [
            "#bilangan",
            "#pecahan",
            "#desimal",
            "#perbandingan-pecahan",
            "#operasi-pecahan",
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
                ![
                    "#bilangan",
                    "#pecahan",
                    "#desimal",
                    "#perbandingan-pecahan",
                    "#operasi-pecahan",
                    "#penerapan"
                ].includes(target)
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
            keywords: ["bilangan", "bilangan asli", "bilangan cacah", "bilangan bulat",
                "bilangan rasional", "bilangan irasional", "bilangan real",
                "himpunan bilangan", "garis bilangan"],
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
            target: "#desimal"
        },
        {
            keywords: ["rasio", "perbandingan"],
            target: "#perbandingan-pecahan"
        },
        {
            keywords: [
                "operasi",
                "penjumlahan",
                "pengurangan",
                "perkalian",
                "pembagian"
            ],
            target: "#operasi-pecahan"
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
                            "#bilangan",
                            "#pecahan",
                            "#desimal",
                            "#perbandingan-pecahan",
                            "#operasi-pecahan",
                            "#penerapan"
                        ].includes(result.target);

                        if (isMaterial) {
                            materiSubmenu.hidden = false;
                            materiToggle.setAttribute(
                                "aria-expanded",
                                "true"
                            );
                        }
                    }
                }
            } else {
                alert("Konsep belum ditemukan. Coba kata kunci lain.");
            }
        });
    }

    // ==================================================
    // ==================================================
    // 12. AKHIR INISIALISASI
    // ==================================================
    console.log("Math Connect berhasil diinisialisasi.");
});


