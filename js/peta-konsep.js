"use strict";

/* =========================================================
   MATH CONNECT — PETA KONSEP INTERAKTIF
   Simpan sebagai: js/peta-konsep.js
   Urutan simpul HTML tidak diubah.
   ========================================================= */

(function () {
    const conceptInfo = document.getElementById("conceptInfo");
    const conceptTitle = document.getElementById("conceptTitle");
    const conceptDescription = document.getElementById("conceptDescription");
    const conceptLink = document.getElementById("conceptLink");
    const closeConceptInfo = document.getElementById("closeConceptInfo");

    const conceptDescriptions = {
        "Bilangan": "Bilangan digunakan untuk menyatakan jumlah, ukuran, urutan, dan nilai.",
        "Bilangan Cacah": "Bilangan cacah dimulai dari nol dan dilanjutkan dengan bilangan bulat positif.",
        "Bilangan Bulat": "Bilangan bulat terdiri atas bilangan negatif, nol, dan bilangan positif.",
        "Bilangan Rasional": "Bilangan rasional dapat dinyatakan sebagai a/b dengan a dan b bilangan bulat serta b tidak sama dengan nol.",
        "Pecahan": "Pecahan menyatakan bagian dari keseluruhan dan ditulis dalam bentuk pembilang serta penyebut.",
        "Desimal": "Desimal menyatakan nilai menggunakan sistem bilangan berbasis sepuluh, misalnya 0,5.",
        "Persen": "Persen menyatakan bagian dari seratus. Contohnya, 25% sama dengan 1/4.",
        "Rasio": "Rasio adalah perbandingan dua besaran, misalnya 2 : 3.",
        "Penerapan": "Konsep bilangan, pecahan, desimal, persen, dan rasio dapat digunakan dalam situasi sehari-hari."
    };

    const conceptTargets = {
        "Bilangan": "#bilangan",
        "Bilangan Cacah": "#bilangan",
        "Bilangan Bulat": "#bilangan",
        "Bilangan Rasional": "#bilangan",
        "Pecahan": "#pecahan",
        "Desimal": "#desimal",
        "Persen": "#desimal",
        "Rasio": "#perbandingan-pecahan",
        "Penerapan": "#penerapan"
    };

    function closeInfo() {
        if (conceptInfo) conceptInfo.hidden = true;
    }

    document.querySelectorAll(".concept-node[data-concept]").forEach(function (node) {
        node.addEventListener("click", function () {
            const concept = node.dataset.concept;

            if (!conceptInfo || !conceptTitle || !conceptDescription || !conceptLink) {
                return;
            }

            conceptTitle.textContent = concept;
            conceptDescription.textContent =
                conceptDescriptions[concept] ||
                "Pelajari konsep ini untuk memahami hubungan matematika.";
            conceptLink.href = conceptTargets[concept] || "#bilangan";
            conceptInfo.hidden = false;

            conceptInfo.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto"
                    : "smooth",
                block: "nearest"
            });
        });
    });

    closeConceptInfo?.addEventListener("click", closeInfo);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && conceptInfo && !conceptInfo.hidden) {
            closeInfo();
        }
    });
})();
