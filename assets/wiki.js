// Teru's Addon Wiki — Interactive Helpers
(function () {
  const cfg = window.TERU_WIKI_CONFIG || { addons: [], curseforgeProfileUrl: "https://www.curseforge.com/members/terutherabbit/projects" };

  // Bind CurseForge links
  document.querySelectorAll("[data-cf-profile]").forEach((el) => { el.href = cfg.curseforgeProfileUrl; });
  document.querySelectorAll("[data-cf-addon]").forEach((el) => {
    const slug = el.getAttribute("data-cf-addon");
    const found = (cfg.addons || []).find((a) => a.slug === slug);
    el.href = (found && found.curseforgeUrl) || cfg.curseforgeProfileUrl;
  });

  // Mobile menu drawer toggle
  const menuBtn = document.getElementById("mobile-menu-btn");
  const drawer = document.getElementById("mobile-drawer");
  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", () => {
      const open = drawer.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "Close" : "Menu";
    });
  }

  // Home page catalog rendering + search/filter
  const grid = document.getElementById("addon-catalog-grid");
  if (grid) {
    const searchEl = document.getElementById("catalog-search");
    const filterBtns = document.querySelectorAll("[data-cat-filter]");
    let activeCat = "All";

    function renderCatalog() {
      const q = (searchEl ? searchEl.value : "").trim().toLowerCase();
      const filtered = cfg.addons.filter((addon) => {
        const matchCat = activeCat === "All" || addon.category === activeCat || addon.tags.includes(activeCat);
        const hay = `${addon.title} ${addon.summary} ${addon.tags.join(" ")} ${addon.mcVersion}`.toLowerCase();
        return matchCat && (!q || hay.includes(q));
      });

      if (!filtered.length) {
        grid.innerHTML = `<div class="card" style="grid-column:1/-1;text-align:center;padding:28px;"><h3>No add-ons matched your search</h3><p>Try another word or tap "All" to see everything.</p></div>`;
        return;
      }

      grid.innerHTML = filtered.map((a) => `
        <article class="card">
          <div class="card-header">
            <img class="card-icon pixel-art" src="${a.icon}" alt="${a.title}" />
            <div>
              <h3>${a.title}</h3>
              <div style="display:flex;gap:6px;flex-wrap:wrap;">
                <span class="badge">Version ${a.version}</span>
                <span class="badge badge-emerald">${a.mcVersion}</span>
              </div>
            </div>
          </div>
          <p>${a.summary}</p>
          <div class="tag-row">
            ${a.tags.map((t) => `<span class="badge badge-purple">${t}</span>`).join("")}
          </div>
          <div class="hero-actions">
            <a class="btn btn-primary" href="${a.wikiUrl}">Open Full Guide</a>
            <a class="btn btn-cf" href="${a.curseforgeUrl}" target="_blank" rel="noopener noreferrer">Download on CurseForge</a>
          </div>
        </article>
      `).join("") + `
        <article class="card" style="border-style:dashed;">
          <div class="card-header">
            <div class="card-icon" style="display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:800;color:var(--cyan-bright);">+</div>
            <div>
              <h3>More Add-ons Coming Soon</h3>
              <span class="badge badge-amber">Growing Collection</span>
            </div>
          </div>
          <p>More Minecraft Bedrock worlds, bosses, and custom gear guides by <strong>${cfg.author}</strong> are on the way! Follow on CurseForge to catch new releases first.</p>
          <div class="hero-actions">
            <a class="btn btn-ghost" href="${cfg.curseforgeProfileUrl}" target="_blank" rel="noopener noreferrer">Follow on CurseForge</a>
          </div>
        </article>
      `;
    }

    if (searchEl) searchEl.addEventListener("input", renderCatalog);
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeCat = btn.getAttribute("data-cat-filter");
        renderCatalog();
      });
    });
    renderCatalog();
  }

  // Mob filter
  const mobBtns = document.querySelectorAll("[data-mob-filter]");
  if (mobBtns.length) {
    const mobCards = document.querySelectorAll("[data-mob-type]");
    mobBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        mobBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.getAttribute("data-mob-filter");
        mobCards.forEach((card) => {
          const types = (card.getAttribute("data-mob-type") || "").split(" ");
          card.style.display = (mode === "all" || types.includes(mode)) ? "" : "none";
        });
      });
    });
  }

  // Gear tabs
  const tabBtns = document.querySelectorAll("[data-gear-tab]");
  if (tabBtns.length) {
    const tabPanels = document.querySelectorAll("[data-gear-panel]");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const target = btn.getAttribute("data-gear-tab");
        tabPanels.forEach((panel) => {
          panel.style.display = panel.getAttribute("data-gear-panel") === target ? "" : "none";
        });
      });
    });
  }

  // Active TOC highlight
  const tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
        }
      });
    }, { rootMargin: "-20% 0px -65% 0px" });
    document.querySelectorAll(".wiki-section[id]").forEach((sec) => observer.observe(sec));
  }
})();
