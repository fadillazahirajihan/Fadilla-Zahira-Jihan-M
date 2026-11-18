"use strict";

/* Notifikasi: panel dan pemberitahuan aktivitas belajar */

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