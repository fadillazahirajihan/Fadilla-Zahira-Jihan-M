/*
 * MATH CONNECT — NAVIGASI TAMPILAN PER MENU
 * Perbaikan: section aktif harus diberi display:block.
 * Sebelumnya display:"" membuat aturan CSS display:none tetap berlaku,
 * sehingga hanya footer yang terlihat.
 */
document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector(".main-content");
    if (!main) return;

    const sections = Array.from(
        main.querySelectorAll(":scope > .page-section")
    );

    const homeExtras = Array.from(
        main.querySelectorAll(
            ":scope > .quick-access-section, :scope > .home-materials-section"
        )
    );

    const materialIds = new Set([
        "bilangan",
        "pecahan",
        "desimal",
        "perbandingan-pecahan",
        "operasi-pecahan",
        "penerapan"
    ]);

    function getValidSection(id) {
        return sections.find(section => section.id === id) || null;
    }

    function updateActiveNavigation(selectedId) {
        const isMaterial = materialIds.has(selectedId);

        document.querySelectorAll(
            ".main-navigation a, .main-navigation button, .top-link"
        ).forEach(function (item) {
            const href = item.getAttribute("href") || "";
            const linkId = href.startsWith("#") ? href.slice(1) : "";
            const active =
                linkId === selectedId ||
                (isMaterial && (
                    item.id === "materiToggle" ||
                    item.classList.contains("materi-toggle") ||
                    linkId === "bilangan"
                ));

            item.classList.toggle("active", active);

            if (active && item.tagName.toLowerCase() === "a") {
                item.setAttribute("aria-current", "page");
            } else {
                item.removeAttribute("aria-current");
            }
        });

        const materiToggle = document.getElementById("materiToggle");
        if (materiToggle) {
            materiToggle.classList.toggle("active", isMaterial);
        }
    }

    function showSection(id) {
        const selected = getValidSection(id);
        const selectedId = selected ? selected.id : "beranda";
        const isHome = selectedId === "beranda";

        sections.forEach(function (section) {
            const active = section.id === selectedId;
            section.hidden = !active;
            section.style.display = active ? "block" : "none";
        });

        homeExtras.forEach(function (element) {
            element.hidden = !isHome;
            element.style.display = isHome ? "block" : "none";
        });

        updateActiveNavigation(selectedId);
        window.scrollTo({ top: 0, behavior: "auto" });
    }

    function readRoute() {
        let id = "";
        try {
            id = decodeURIComponent(window.location.hash.slice(1));
        } catch (error) {
            id = window.location.hash.slice(1);
        }

        if (!id || id === "materi") return id === "materi" ? "bilangan" : "beranda";
        return getValidSection(id) ? id : "beranda";
    }

    document.addEventListener("click", function (event) {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;

        let id = link.getAttribute("href").slice(1);
        try {
            id = decodeURIComponent(id);
        } catch (error) {
            // Gunakan hash apa adanya jika tidak dapat didekode.
        }

        if (id === "materi") id = "bilangan";
        if (!getValidSection(id)) return;

        event.preventDefault();

        if (window.location.hash === "#" + id) {
            showSection(id);
        } else {
            window.location.hash = id;
        }
    });

    window.addEventListener("hashchange", function () {
        showSection(readRoute());
    });

    showSection(readRoute());
});
