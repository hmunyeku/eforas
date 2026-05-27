(() => {
  const menuButton = document.querySelector(".mobile-menu");
  const desktopNav = document.querySelector(".desktop-nav");
  const header = document.querySelector(".site-header");
  const categoryGrid = document.querySelector(".category-grid");
  const activeHero = document.querySelector(".active-hero");

  const columns = [
    { title: "Web Hosting", color: "#0bb43f", items: [["Linux Shared Hosting", "hosting.html"], ["VPS Hosting", "vps.html"], ["Managed VPS Hosting", "hosting.html"], ["WordPress Hosting", "hosting.html"], ["Email Only Hosting", "hosting.html"], ["Register / Park Domain", "hosting.html"]] },
    { title: "Home Internet", color: "#ff7b00", items: [["MTN Home Internet", "home-internet.html"], ["Vodacom Home Internet", "home-internet.html"], ["Telkom Home Internet", "home-internet.html"], ["5G Devices", "shop.html"]] },
    { title: "Home Fibre", color: "#850078", items: [["Monthly Fibre", "fibre.html"], ["Prepaid Fibre", "fibre.html"], ["Fibre Routers", "shop.html"]] },
    { title: "Mobile Data", color: "#ff641f", items: [["MTN Capped", "mobile-data.html"], ["Telkom Capped", "mobile-data.html"], ["Telkom Uncapped", "mobile-data.html"], ["Mobile Devices", "shop.html"]] },
    { title: "Internet Calling", color: "#f0f64b", ink: "#343a18", items: [["CallTime", "calling.html"], ["Handsets", "calling.html"], ["Voice App", "calling.html"]] },
    { title: "Online Shop", color: "#7f807d", items: [["5G", "shop.html"], ["Fibre", "shop.html"], ["LTE", "shop.html"], ["VoIP", "calling.html"], ["Back-up Power", "shop.html"], ["Range Extenders", "shop.html"]] }
  ];

  const companyColumns = [
    { title: "Company", color: "#0b74a6", items: [["About Us", "about-us.html"], ["Business Partner", "business-partner.html"], ["Careers", "careers.html"], ["Contact", "contact.html"]] },
    { title: "Support", color: "#ff641f", items: [["Terms & Conditions", "docs.html"], ["Help & Support", "contact.html"], ["Moving House", "contact.html"]] },
    { title: "Popular Services", color: "#850078", items: [["VPS Hosting", "vps.html"], ["Home Fibre", "fibre.html"], ["Mobile Data", "mobile-data.html"]] }
  ];

  const serviceData = {
    hosting: {
      title: "Web Hosting",
      pill: "Secure & Reliable",
      description: "Explore web hosting packages designed to host, publish and manage files for one or multiple websites.",
      color: "#009325",
      tint: "rgba(0,147,37,.78)",
      accent: "#007b1f",
      image: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80')",
      position: "40% 28%",
      promoA: "rgba(0,147,37,.9)",
      promoB: "rgba(0,110,32,.9)",
      promoTitle: "Free domains",
      promoText: "Selected hosting services",
      needs: [["Fast Web", "screen"], ["Security", "shield"], ["No Contracts", "edit"]],
      cards: [
        ["Linux Shared Hosting", "Reliable shared hosting for local needs", "#049444", "server"],
        ["VPS Hosting", "Powerful servers for growing websites", "#05bd62", "plug"],
        ["Managed VPS Hosting", "Stress-free hosting managed by EFORAS", "#08c56e", "check"],
        ["WordPress Hosting", "Turbocharged web hosting for WordPress", "#07935c", "globe"]
      ]
    },
    internet: {
      title: "Home Internet",
      pill: "Super-fast Uncapped 5G/LTE",
      description: "Home internet packages for streaming, work and everyday browsing, with quick address checks.",
      color: "#f25b09",
      tint: "rgba(252,101,0,.8)",
      accent: "#f25b09",
      image: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80')",
      position: "22% 15%",
      promoA: "rgba(255,255,255,.92)",
      promoB: "rgba(255,228,200,.92)",
      promoTitle: "Free-to-use 5G router",
      promoText: "On selected home internet packages",
      needs: [["Coverage Check", "pin"], ["5G/LTE Router", "wifi"], ["EFORAS Data", "sim"]],
      cards: [
        ["MTN Home Internet", "Reliable uncapped 5G/LTE internet", "#e76500", "wifi"],
        ["Vodacom Home Internet", "Uncapped 5G/LTE with fast speeds", "#ff7900", "wifi"],
        ["Telkom Home Internet", "Affordable LTE connectivity", "#728879", "router"],
        ["5G Devices", "High-performance devices for 5G", "#a36d3c", "device"]
      ]
    },
    fibre: {
      title: "Home Fibre",
      pill: "Ultra-fast Fibre Internet",
      description: "Fibre-to-the-home provides super-fast broadband connectivity. Check availability and get connected.",
      color: "#660066",
      tint: "rgba(155,0,155,.78)",
      accent: "#660066",
      image: "url('https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1600&q=80')",
      position: "65% 30%",
      promoA: "rgba(102,18,101,.9)",
      promoB: "rgba(72,8,75,.9)",
      promoTitle: "EFORAS Fibre",
      promoText: "Free installation / unshaped / unthrottled",
      needs: [["Fibre Line", "fibre"], ["Fibre Router", "router"], ["Active Service", "sim"]],
      cards: [
        ["Monthly Fibre", "Unlimited monthly fibre with no data limits", "rgba(60,16,70,.78)", "home"],
        ["Prepaid Fibre", "Uncapped fibre with flexible payments", "rgba(90,0,85,.78)", "home"],
        ["Routers", "Get your router from EFORAS and save", "rgba(100,0,100,.72)", "router"]
      ]
    },
    mobile: {
      title: "Mobile Data",
      pill: "Connect on-the-go",
      description: "Mobile services offer a quick and easy way to get connected outside home coverage or as a reliable backup connection.",
      color: "#f25b09",
      tint: "rgba(245,88,0,.82)",
      accent: "#f25b09",
      image: "url('https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1600&q=80')",
      position: "48% 20%",
      promoA: "rgba(255,70,18,.92)",
      promoB: "rgba(247,148,29,.92)",
      promoTitle: "Discounted MiFi router",
      promoText: "With selected capped data orders",
      needs: [["Smart Device", "device"], ["Mobile Router", "wifi"], ["EFORAS Mobile Data", "sim"]],
      cards: [
        ["MTN Capped",      "Get 3G/4G data on-the-go",              "rgba(238,90,0,.82)",   "sim"],
        ["Telkom Capped",   "Get LTE data on-the-go",                "rgba(255,108,18,.82)", "sim"],
        ["Telkom Uncapped", "Go unlimited and take your WiFi with you","rgba(230,75,5,.82)",   "wifi"],
        ["Mobile Devices",  "Portable devices for your SIM",          "rgba(250,120,30,.82)", "router"]
      ]
    },
    calling: {
      title: "Internet Calling",
      pill: "Crystal-clear VoIP",
      description: "Make affordable calls over the internet with calltime, handsets and the EFORAS voice app.",
      color: "#f4ff45",
      tint: "rgba(220,230,25,.78)",
      accent: "#444",
      image: "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80')",
      position: "42% 0",
      promoA: "rgba(200,221,81,.86)",
      promoB: "rgba(139,179,108,.86)",
      promoTitle: "Voice made easy",
      promoText: "Numbers, devices and call bundles",
      needs: [["Calltime", "phone"], ["Handsets", "device"], ["Voice App", "globe"]],
      cards: [
        ["Calltime", "Purchase your VoIP calltime here", "rgba(91,165,150,.78)", "phone"],
        ["Handsets", "Wired and wireless VoIP handsets", "rgba(145,182,111,.78)", "device"],
        ["Voice App", "Get the EFORAS Voice App", "rgba(142,180,109,.78)", "globe"]
      ]
    },
    shop: {
      title: "Online Shop",
      pill: "Click. Shop. Connect.",
      description: "Connectivity and networking devices for home, office and on-the-go.",
      color: "#555",
      tint: "rgba(80,80,80,.78)",
      accent: "#444",
      image: "url('https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80')",
      position: "60% 20%",
      promoA: "rgba(78,78,78,.9)",
      promoB: "rgba(110,110,110,.9)",
      promoTitle: "EFORAS Shop",
      promoText: "Devices configured for our network",
      needs: [["Routers", "router"], ["Range Extenders", "wifi"], ["Backup Power", "device"]],
      cards: [
        ["5G Routers", "Next-gen network connectivity", "rgba(49,87,102,.82)", "router"],
        ["Fibre Routers", "Optimised for high-speed fibre", "rgba(36,116,146,.82)", "router"],
        ["VoIP Devices", "Calls over the internet", "rgba(49,87,102,.82)", "phone"],
        ["Range Extenders", "Boost your WiFi signal", "rgba(36,116,146,.82)", "wifi"]
      ]
    }
  };

  const icons = {
    screen: '<rect x="4" y="5" width="16" height="12"/><path d="M8 21h8M12 17v4"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6z"/>',
    edit: '<path d="M4 5h16v14H4z"/><path d="m7 17 10-10"/>',
    server: '<path d="M4 6h16v12H4z"/><path d="M8 10h8M8 14h6"/>',
    plug: '<path d="M9 2v6M15 2v6M7 8h10v5a5 5 0 0 1-10 0z"/>',
    check: '<path d="M4 7h16v10H4z"/><path d="m9 12 2 2 4-5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    pin: '<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2"/>',
    wifi: '<path d="M5 16a7 7 0 0 1 14 0"/><path d="M8 19a4 4 0 0 1 8 0"/><rect x="7" y="17" width="10" height="4" rx="1"/>',
    sim: '<path d="M7 3h8l2 2v16H7z"/><path d="M10 8h4M10 12h4"/>',
    router: '<rect x="5" y="11" width="14" height="7" rx="2"/><path d="M7 11l-2-5M17 11l2-5"/>',
    device: '<rect x="8" y="3" width="8" height="18" rx="2"/><path d="M10 17h4"/>',
    fibre: '<path d="M12 3C8 7 6 10 6 14a6 6 0 0 0 12 0c0-4-2-7-6-11z"/>',
    home: '<path d="M4 12 12 4l8 8"/><path d="M7 10v9h10v-9"/>',
    phone: '<path d="M6 4h4l2 5-3 2c1 3 3 5 6 6l2-3 5 2"/>'
  };

  if (!desktopNav || !header) return;

  function icon(name) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.globe}</svg>`;
  }

  function initLegalModal() {
    document.querySelectorAll(".legal").forEach((legal) => {
      legal.innerHTML = `<a href="docs.html?tab=terms">* T's &amp; C's</a><span>&middot;</span><a href="docs.html?tab=aup">AUP</a><span>&middot;</span><button class="legal-link" type="button" data-privacy-open>Privacy Policy</button>`;
    });

    const modal = document.createElement("section");
    modal.className = "privacy-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="privacy-dialog" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
        <button class="privacy-close" type="button" aria-label="Close privacy policy"></button>
        <aside class="privacy-side">
          <span class="privacy-mark">EF</span>
          <strong>Privacy<br>Policy</strong>
          <small>Updated 19 May 2026</small>
        </aside>
        <article class="privacy-copy">
          <h2 id="privacy-title">Privacy Policy</h2>
          <p>EFORAS respects your privacy and keeps customer information secure, relevant and limited to the services you request.</p>
          <div class="privacy-grid">
            <section><h3>Information we collect</h3><p>Contact details, service addresses, support messages, billing references and technical service information needed to activate and support your account.</p></section>
            <section><h3>How we use it</h3><p>We use your data to provide connectivity, process orders, improve support, send service notices and keep your account protected.</p></section>
            <section><h3>Your choices</h3><p>You can request corrections, unsubscribe from marketing and ask for account data reviews through EFORAS support.</p></section>
            <section><h3>Security</h3><p>Access is limited to authorised teams and service partners who need the information to deliver or maintain your services.</p></section>
          </div>
        </article>
      </div>
    `;
    document.body.append(modal);

    const close = () => {
      modal.classList.remove("is-open");
      window.setTimeout(() => {
        modal.hidden = true;
      }, 180);
    };
    const open = () => {
      modal.hidden = false;
      void modal.offsetWidth;
      modal.classList.add("is-open");
      modal.querySelector(".privacy-close")?.focus();
    };

    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-privacy-open]")) open();
    });
    modal.addEventListener("click", (event) => {
      if (event.target === modal || event.target.closest(".privacy-close")) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.hidden) close();
    });

    if (new URLSearchParams(window.location.search).get("privacy") === "1") {
      window.setTimeout(open, 180);
    }
  }

  initLegalModal();

  function buildMenu(id, menuColumns) {
    const menu = document.createElement("div");
    menu.className = "mega-menu";
    menu.id = id;
    menu.setAttribute("role", "menu");
    const grid = document.createElement("div");
    grid.className = "mega-grid";

    menuColumns.forEach((column) => {
      const card = document.createElement("div");
      card.className = "mega-card";
      card.style.setProperty("--mega-bg", column.color);
      card.style.setProperty("--mega-ink", column.ink || "#fff");
      card.innerHTML = `<strong>${column.title}</strong>${column.items.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}`;
      grid.append(card);
    });

    menu.append(grid);
    return menu;
  }

  function normalizeNav() {
    [...desktopNav.querySelectorAll("a")].forEach((link) => {
      const text = link.textContent.toLowerCase();
      if (text.includes("purchase")) {
        link.dataset.menuTrigger = "purchase";
        link.setAttribute("aria-haspopup", "true");
        link.setAttribute("aria-expanded", "false");
      }
      if (text.includes("company")) {
        link.dataset.menuTrigger = "company";
        link.setAttribute("aria-haspopup", "true");
        link.setAttribute("aria-expanded", "false");
      }
      link.classList.add("nav-item");
    });
  }

  normalizeNav();
  desktopNav.append(buildMenu("purchase-menu", columns), buildMenu("company-menu", companyColumns));

  const menuPanels = [...desktopNav.querySelectorAll(".mega-menu")];
  const triggers = [...desktopNav.querySelectorAll("[data-menu-trigger]")];

  function closeMenus() {
    triggers.forEach((trigger) => trigger.classList.remove("is-active"));
    triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
    menuPanels.forEach((panel) => panel.classList.remove("is-open"));
  }

  function openMenu(trigger) {
    const target = document.querySelector(`#${trigger.dataset.menuTrigger}-menu`);
    closeMenus();
    trigger.classList.add("is-active");
    trigger.setAttribute("aria-expanded", "true");
    target?.classList.add("is-open");
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", () => openMenu(trigger));
    trigger.addEventListener("focus", () => openMenu(trigger));
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(`#${trigger.dataset.menuTrigger}-menu`);
      target?.classList.contains("is-open") ? closeMenus() : openMenu(trigger);
    });
  });

  menuPanels.forEach((panel) => panel.addEventListener("mouseleave", closeMenus));
  header.addEventListener("mouseleave", closeMenus);

  function renderService(key, sourceCard) {
    const data = serviceData[key];
    if (!data || !activeHero) return;

    const rect = sourceCard.getBoundingClientRect();
    const origin = ((rect.left + rect.width / 2) / Math.max(window.innerWidth, 1)) * 100;
    activeHero.style.setProperty("--origin-x", `${origin}%`);
    activeHero.style.setProperty("--active-color", data.color);
    activeHero.style.setProperty("--active-tint", data.tint);
    activeHero.style.setProperty("--active-accent", data.accent);
    activeHero.style.setProperty("--active-image", data.image);
    activeHero.style.setProperty("--active-position", data.position);
    activeHero.style.setProperty("--promo-a", data.promoA);
    activeHero.style.setProperty("--promo-b", data.promoB);

    activeHero.querySelector(".active-copy h1").textContent = data.title;
    activeHero.querySelector(".active-pill").textContent = data.pill;
    activeHero.querySelector(".active-description").textContent = data.description;
    activeHero.querySelector(".active-promo strong").textContent = data.promoTitle;
    activeHero.querySelector(".active-promo span").textContent = data.promoText;
    activeHero.querySelector(".need-list").innerHTML = data.needs
      .map(([label, iconName]) => `<span class="need-item">${icon(iconName)}${label}</span>`)
      .join("");
    activeHero.querySelector(".active-cards").innerHTML = data.cards
      .map(([title, text, bg, iconName]) => `
        <article class="active-card" style="--card-bg:${bg};--card-icon:${data.accent}">
          <h2>${title}</h2>
          <span class="round-icon">${icon(iconName)}</span>
          <p>${text}</p>
        </article>
      `)
      .join("");

    document.body.classList.add("service-open");
    activeHero.hidden = false;
    activeHero.classList.remove("is-leaving");
    void activeHero.offsetWidth;
    activeHero.classList.add("is-entering");
  }

  function closeService() {
    if (!activeHero || activeHero.hidden) return;
    activeHero.classList.remove("is-entering");
    activeHero.classList.add("is-leaving");
    document.body.classList.remove("service-open");
    window.setTimeout(() => {
      activeHero.hidden = true;
      activeHero.classList.remove("is-leaving");
    }, 340);
  }

  categoryGrid?.querySelectorAll("[data-service]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      renderService(card.dataset.service, card);
    });
  });

  activeHero?.querySelector(".hero-back")?.addEventListener("click", closeService);

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    desktopNav.classList.toggle("is-open", isOpen);
    if (!isOpen) closeMenus();
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeMenus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeService();
      closeMenus();
      menuButton?.classList.remove("is-open");
      desktopNav.classList.remove("is-open");
    }
  });

  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get("open");
  if (requestedService && serviceData[requestedService]) {
    const source = categoryGrid?.querySelector(`[data-service="${requestedService}"]`) || document.body;
    window.setTimeout(() => renderService(requestedService, source), 120);
  }
  if (params.get("menu") === "purchase") {
    window.setTimeout(() => openMenu(triggers.find((trigger) => trigger.dataset.menuTrigger === "purchase") || triggers[0]), 120);
  }
  if (params.get("menu") === "company") {
    window.setTimeout(() => openMenu(triggers.find((trigger) => trigger.dataset.menuTrigger === "company") || triggers[0]), 120);
  }
})();
