document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const talkCards = document.querySelectorAll(".talk-card");
    const noResults = document.getElementById("noResults");

    // Filter state
    let currentFilter = "all";
    let searchQuery = "";

    const filterTalks = () => {
        let visibleCount = 0;

        talkCards.forEach(card => {
            const category = card.getAttribute("data-category");
            const title = card.querySelector(".talk-title").innerText.toLowerCase();
            const speakers = Array.from(card.querySelectorAll(".speaker-pill span")).map(s => s.innerText.toLowerCase()).join(" ");
            
            const matchesFilter = currentFilter === "all" || category === currentFilter;
            const matchesSearch = title.includes(searchQuery) || speakers.includes(searchQuery) || category.toLowerCase().includes(searchQuery);

            if (matchesFilter && matchesSearch) {
                card.classList.remove("hidden");
                visibleCount++;
            } else {
                card.classList.add("hidden");
            }
        });

        if (visibleCount === 0) {
            noResults.classList.remove("hidden");
        } else {
            noResults.classList.add("hidden");
        }
    };

    // Search input event
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterTalks();
    });

    // Filter button event
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentFilter = btn.getAttribute("data-filter");
            filterTalks();
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add colors to specific tags
    document.querySelectorAll(".talk-tag").forEach(tag => {
        if(tag.textContent === "Break") {
            tag.style.background = "rgba(250, 204, 21, 0.1)";
            tag.style.color = "#facc15";
        } else if(tag.textContent === "Keynote") {
            tag.style.background = "rgba(234, 67, 53, 0.1)";
            tag.style.color = "var(--google-red)";
        } else if(tag.textContent === "Security") {
            tag.style.background = "rgba(52, 168, 83, 0.1)";
            tag.style.color = "var(--google-green)";
        }
    });
});
