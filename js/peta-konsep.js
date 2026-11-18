"use strict";

/* =========================================================
   MATH CONNECT — PETA KONSEP INTERAKTIF
   Bagian utama menampilkan tujuan pembelajaran.
   Subbagian menampilkan ringkasan materi singkat.
   ========================================================= */
(function () {
    const conceptInfo = document.getElementById("conceptInfo");
    const conceptCategory = document.getElementById("conceptCategory");
    const conceptTitle = document.getElementById("conceptTitle");
    const conceptDescription = document.getElementById("conceptDescription");
    const conceptLink = document.getElementById("conceptLink");
    const closeConceptInfo = document.getElementById("closeConceptInfo");

    if (!conceptInfo || !conceptTitle || !conceptDescription || !conceptLink) return;

    const conceptContent = {
        "Bilangan": {
            kind: "goal",
            category: "TUJUAN PEMBELAJARAN",
            description: "Setelah mempelajari materi Bilangan, peserta didik diharapkan mampu:\
• Mengidentifikasi berbagai jenis bilangan dan karakteristiknya.\n• Menjelaskan hubungan antarhimpunan bilangan.\
• Menentukan dan menggunakan bilangan sesuai konteks permasalahan.\n• Menyelesaikan masalah sederhana yang melibatkan konsep bilangan.",
            target: "#bilangan",
            action: "Mulai Materi Bilangan"
        },
        "Pecahan": {
            kind: "goal",
            category: "TUJUAN PEMBELAJARAN",
            description: "Setelah mempelajari materi Pecahan, peserta didik diharapkan mampu:\
• Memahami pecahan sebagai bagian dari keseluruhan dan sebagai nilai.\
• Mengubah pecahan ke bentuk desimal dan persen.\n• Menyelesaikan permasalahan perbandingan yang melibatkan pecahan.\n• Melakukan operasi hitung pecahan dalam berbagai konteks.",
            target: "#pecahan",
            action: "Mulai Materi Pecahan"
        },
        "Penerapan": {
            kind: "goal",
            category: "TUJUAN PEMBELAJARAN",
            description: "Setelah mempelajari materi Penerapan, peserta didik diharapkan mampu:\
• Mengidentifikasi penggunaan bilangan dan pecahan dalam kehidupan sehari-hari.\n• Memilih konsep atau operasi matematika yang sesuai untuk menyelesaikan masalah.\n• Menyelesaikan masalah kontekstual seperti belanja, pengukuran, pembagian, dan perbandingan.\n• Menjelaskan alasan dan langkah penyelesaian secara logis.",
            target: "#penerapan",
            action: "Mulai Materi Penerapan"
        },
        "Bilangan Asli": {
            kind: "summary", category: "RINGKASAN MATERI",
            description: "Bilangan asli adalah bilangan yang digunakan untuk menghitung banyak benda, dimulai dari 1, 2, 3, 4, dan seterusnya. Contoh: 1, 2, 3, 4, 5, …",
            target: "#bilangan", action: "Lihat Materi Bilangan"
        },
        "Bilangan Cacah": {
            kind: "summary", category: "RINGKASAN MATERI",
            description: "Bilangan cacah merupakan bilangan asli yang dilengkapi dengan nol. Himpunannya dimulai dari 0, 1, 2, 3, 4, dan seterusnya.",
            target: "#bilangan", action: "Lihat Materi Bilangan"
        },
        "Bilangan Bulat": {
            kind: "summary", category: "RINGKASAN MATERI",
            description: "Bilangan bulat terdiri atas bilangan bulat negatif, nol, dan bilangan bulat positif. Contoh: …, −3, −2, −1, 0, 1, 2, 3, …",
            target: "#bilangan", action: "Lihat Materi Bilangan"
        },
        "Bilangan Rasional dan Irasional": {
            kind: "summary", category: "RINGKASAN MATERI",
            description: "Bilangan rasional dapat ditulis sebagai a/b dengan a dan b bilangan bulat serta b ≠ 0, misalnya 1/2 dan 0,75. Bilangan irasional tidak dapat ditulis sebagai pecahan dua bilangan bulat, misalnya √2 dan π.",
            target: "#bilangan", action: "Lihat Materi Bilangan"
        },
        "Bilangan Real": {
            kind: "summary", category: "RINGKASAN MATERI",
            description: "Bilangan real mencakup seluruh bilangan rasional dan irasional. Bilangan real dapat ditempatkan pada garis bilangan, misalnya −2, 0, 1/2, √2, dan 3.",
            target: "#bilangan", action: "Lihat Materi Bilangan"
        },
        "Desimal": {
            kind: "summary", category: "RINGKASAN MATERI",
            description: "Desimal adalah bentuk bilangan yang menggunakan tanda koma untuk menunjukkan bagian dari satuan. Contoh: 0,5 = 5/10 = 1/2.",
            target: "#desimal", action: "Lihat Materi Desimal"
        },
        "Persen": {
            kind: "summary", category: "RINGKASAN MATERI",
            description: "Persen berarti per seratus dan dilambangkan dengan %. Contoh: 25% = 25/100 = 1/4.",
            target: "#desimal", action: "Lihat Materi Persen"
        },
        "Perbandingan": {
            kind: "summary", category: "RINGKASAN MATERI",
            description: "Perbandingan menyatakan hubungan antara dua besaran sejenis atau yang dapat dibandingkan. Perbandingan dapat ditulis a : b. Contoh: 2 : 3.",
            target: "#perbandingan-pecahan", action: "Lihat Materi Perbandingan"
        },
        "Operasi Pecahan": {
            kind: "summary", category: "RINGKASAN MATERI",
            description: "Operasi pecahan meliputi penjumlahan, pengurangan, perkalian, dan pembagian. Pada penjumlahan atau pengurangan, penyebut perlu disamakan terlebih dahulu jika berbeda.",
            target: "#operasi-pecahan", action: "Lihat Materi Operasi Pecahan"
        }
    };

    function closeInfo() {
        conceptInfo.hidden = true;
    }

    document.querySelectorAll(".concept-node[data-concept]").forEach(function (node) {
        node.addEventListener("click", function () {
            const name = node.dataset.concept;
            const item = conceptContent[name];
            if (!item) return;

            conceptTitle.textContent = name;
            conceptDescription.textContent = item.description;
            if (conceptCategory) conceptCategory.textContent = item.category;
            conceptLink.href = item.target;
            conceptLink.textContent = item.action;
            conceptInfo.hidden = false;

            conceptInfo.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                block: "nearest"
            });
        });
    });

    closeConceptInfo?.addEventListener("click", closeInfo);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !conceptInfo.hidden) closeInfo();
    });
})();
