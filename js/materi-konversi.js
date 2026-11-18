"use strict";

/* Materi: konversi pecahan, desimal, dan persen */

    // ==================================================
    // 8. KONVERSI PECAHAN, DESIMAL, DAN PERSEN
    // ==================================================

    const numerator = document.getElementById("numerator");
    const denominator = document.getElementById("denominator");
    const decimal = document.getElementById("decimal");
    const percent = document.getElementById("percent");
    const conversionStatus =
        document.getElementById("conversion-status");

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

        if (
            numerator.value.trim() === "" ||
            denominator.value.trim() === ""
        ) {
            conversionStatus.textContent =
                "Silakan isi pembilang dan penyebut.";
            return;
        }

        if (!Number.isFinite(n) || !Number.isFinite(d)) {
            conversionStatus.textContent =
                "Masukkan angka yang valid.";
            return;
        }

        if (d === 0) {
            conversionStatus.textContent =
                "Penyebut tidak boleh nol.";
            return;
        }

        updateConversion(n / d);
    }

    // Konversi dari desimal
    function convertDecimal() {
        const value = parseValue(decimal.value);

        if (
            decimal.value.trim() === "" ||
            !Number.isFinite(value)
        ) {
            conversionStatus.textContent =
                "Masukkan nilai desimal yang valid.";
            return;
        }

        updateConversion(value);
    }

    // Konversi dari persen
    function convertPercent() {
        const value = parseValue(percent.value);

        if (
            percent.value.trim() === "" ||
            !Number.isFinite(value)
        ) {
            conversionStatus.textContent =
                "Masukkan nilai persen yang valid.";
            return;
        }

        updateConversion(value / 100);
    }

    // Event listener
    if (
        numerator &&
        denominator &&
        decimal &&
        percent &&
        conversionStatus
    ) {
        numerator.addEventListener("input", convertFraction);
        denominator.addEventListener("input", convertFraction);
        decimal.addEventListener("input", convertDecimal);
        percent.addEventListener("input", convertPercent);
    }


