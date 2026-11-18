"use strict";

/* Profil: identitas dan statistik belajar */

/* =========================================================
   PROFIL PEMBELAJAR â€” IDENTITAS & PERJALANAN BELAJAR
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("profileToggle");
    const dropdown = document.getElementById("profileDropdown");
    if (!toggle || !dropdown) return;

    const PROFILE_KEY = "mathConnectLearnerProfile";
    const VISITED_KEY = "mathConnectVisitedTopics";
    const QUIZ_KEY = "mathConnectQuizResult";
    const REFLECTION_KEY = "mathConnectStudentReflection";

    const nameInput = document.getElementById("profileNameInput");
    const classInput = document.getElementById("profileClassInput");
    const displayName = document.getElementById("profileDisplayName");
    const displayClass = document.getElementById("profileDisplayClass");
    const saveDetails = document.getElementById("saveProfileDetails");
    const inlineFeedback = document.getElementById("profileInlineFeedback");
    const topicsCount = document.getElementById("profileTopicsCount");
    const quizScore = document.getElementById("profileQuizScore");
    const learningTarget = document.getElementById("profileLearningTarget");
    const learningPlan = document.getElementById("profileLearningPlan");
    const journeyButton = document.getElementById("profileJourneyButton");

    const topicIds = [
        "bilangan",
        "pecahan",
        "desimal",
        "perbandingan-pecahan",
        "operasi-pecahan",
        "penerapan"
    ];

    function readJSON(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    function updateIdentity() {
        const profile = readJSON(PROFILE_KEY, {});
        const name = profile.name || "";
        const learnerClass = profile.learnerClass || "";

        if (nameInput && document.activeElement !== nameInput) nameInput.value = name;
        if (classInput) classInput.value = learnerClass;
        if (displayName) displayName.textContent = name || "Pembelajar Math Connect";
        if (displayClass) {
            displayClass.textContent = learnerClass
                ? `Siswa kelas ${learnerClass}`
                : "Pelajar Math Connect";
        }
    }

    function updateLearningStats() {
        const visited = readJSON(VISITED_KEY, []);
        if (topicsCount) {
            const count = Array.isArray(visited)
                ? visited.filter(id => topicIds.includes(id)).length
                : 0;
            topicsCount.textContent = String(count);
        }

        const quiz = readJSON(QUIZ_KEY, null);
        if (quizScore) {
            quizScore.textContent = quiz && typeof quiz.score === "number"
                ? String(quiz.score)
                : "-";
        }

        const reflection = readJSON(REFLECTION_KEY, null);
        const fields = reflection && reflection.fields ? reflection.fields : {};
        if (learningTarget) {
            learningTarget.textContent = fields.reflectionTarget || "Belum ada target";
        }
        if (learningPlan) {
            learningPlan.textContent = fields.reflectionPlan
                ? fields.reflectionPlan
                : "Tentukan target dan rencana melalui halaman Refleksi.";
        }
    }

    function saveIdentity() {
        const name = nameInput ? nameInput.value.trim() : "";
        const learnerClass = classInput ? classInput.value : "";

        if (!name) {
            if (inlineFeedback) inlineFeedback.textContent = "Masukkan nama pembelajar terlebih dahulu.";
            nameInput?.focus();
            return;
        }

        const profile = { name: name, learnerClass: learnerClass };
        try {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
            updateIdentity();
            if (inlineFeedback) inlineFeedback.textContent = "Identitas berhasil disimpan.";
        } catch (error) {
            if (inlineFeedback) inlineFeedback.textContent = "Identitas belum dapat disimpan di browser.";
        }
    }

    function recordVisitedTopic() {
        const currentId = window.location.hash.replace("#", "");
        if (!topicIds.includes(currentId)) return;

        const visited = readJSON(VISITED_KEY, []);
        if (!Array.isArray(visited)) return;
        if (!visited.includes(currentId)) {
            visited.push(currentId);
            try {
                localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
            } catch (error) {
                // Profil tetap dapat digunakan meskipun penyimpanan dibatasi browser.
            }
        }
        updateLearningStats();
    }

    function closeProfile() {
        dropdown.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function (event) {
        event.stopPropagation();
        const willOpen = dropdown.hidden;
        dropdown.hidden = !willOpen;
        toggle.setAttribute("aria-expanded", String(willOpen));
        if (willOpen) {
            updateIdentity();
            updateLearningStats();
        }
    });

    dropdown.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    saveDetails?.addEventListener("click", saveIdentity);

    journeyButton?.addEventListener("click", function () {
        closeProfile();
        const reflectionLink = document.querySelector('a[href="#refleksi"]');
        if (reflectionLink) {
            reflectionLink.click();
        } else {
            window.location.hash = "refleksi";
        }
    });

    document.addEventListener("click", closeProfile);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeProfile();
            toggle.focus();
        }
    });

    window.addEventListener("hashchange", recordVisitedTopic);
    window.addEventListener("storage", updateLearningStats);

    updateIdentity();
    updateLearningStats();
    recordVisitedTopic();
});


