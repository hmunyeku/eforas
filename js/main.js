/* EFORAS — main.js
   Mega-menu, mobile nav, privacy modal, contact form qualifié 18 types,
   newsletter, footer year, smooth interactions.
*/
(() => {
  "use strict";

  // ============================================================
  // MEGA-MENU DATA
  // ============================================================
  const servicesColumns = [
    {
      title: "Cabinet d'études",
      color: "#1F3864",
      items: [
        ["Études B2B", "cabinet-etudes.html"],
        ["Santé publique / DHIS2", "cabinet-etudes.html"],
        ["Évaluations OECD-DAC", "cabinet-etudes.html"]
      ]
    },
    {
      title: "Sondages d'opinion",
      color: "#00A6A6",
      items: [
        ["Sondages politiques", "sondages.html"],
        ["Baromètres d'abonnement", "sondages.html"],
        ["Baromètre démocratique", "etudes.html"],
        ["Sondages flash", "sondages.html"]
      ]
    },
    {
      title: "Académie EFORAS",
      color: "#D4A017",
      ink: "#142847",
      items: [
        ["Sessions courtes", "academie.html"],
        ["Parcours certifiants", "academie.html"],
        ["Intra-entreprise", "academie.html"]
      ]
    },
    {
      title: "ML / IA appliquée",
      color: "#142847",
      items: [
        ["Banque & financier", "ml-ia.html"],
        ["Télécoms", "ml-ia.html"],
        ["Mines & industrie", "ml-ia.html"],
        ["Santé & bailleurs", "ml-ia.html"]
      ]
    },
    {
      title: "EFORAS Tech",
      color: "#008080",
      items: [
        ["Odoo", "eforas-tech.html"],
        ["Dolibarr", "eforas-tech.html"],
        ["ERPNext", "eforas-tech.html"],
        ["Hébergement souverain", "eforas-tech.html"]
      ]
    },
    {
      title: "Location",
      color: "#A87E11",
      items: [
        ["Kits enquête (tablettes)", "location.html"],
        ["Événementiel professionnel", "location.html"]
      ]
    }
  ];

  const institutionalColumns = [
    {
      title: "Charte d'indépendance",
      color: "#2D3748",
      items: [
        ["6 articles opposables", "charte-independance.html"],
        ["Mécanisme de saisine", "charte-independance.html"]
      ]
    },
    {
      title: "Comité scientifique",
      color: "#1F3864",
      items: [
        ["Composition (7 membres)", "comite-scientifique.html"],
        ["Règles de fonctionnement", "comite-scientifique.html"],
        ["Postuler", "contact.html?type=candidature-comite"]
      ]
    },
    {
      title: "Équipe & valeurs",
      color: "#00A6A6",
      items: [
        ["Le fondateur", "equipe.html"],
        ["Notre équipe", "equipe.html"],
        ["Carrières", "contact.html?type=carrieres"]
      ]
    },
    {
      title: "Études & publications",
      color: "#D4A017",
      ink: "#142847",
      items: [
        ["Baromètre démocratique", "etudes.html"],
        ["Méthodologies publiques", "etudes.html"],
        ["Rapports d'audit", "etudes.html"]
      ]
    }
  ];

  // ============================================================
  // BUILD HEADER MEGA-MENUS
  // ============================================================
  const header = document.querySelector(".site-header");
  const desktopNav = document.querySelector(".desktop-nav");
  const menuButton = document.querySelector(".mobile-menu");

  function buildMegaMenu(id, columns) {
    const menu = document.createElement("div");
    menu.className = "mega-menu";
    menu.id = id;
    menu.setAttribute("role", "menu");
    const grid = document.createElement("div");
    grid.className = "mega-grid";
    columns.forEach((column) => {
      const card = document.createElement("div");
      card.className = "mega-card";
      card.style.setProperty("--mega-bg", column.color);
      card.style.setProperty("--mega-ink", column.ink || "#fff");
      card.innerHTML = `<strong>${column.title}</strong>` +
        column.items.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
      grid.append(card);
    });
    menu.append(grid);
    return menu;
  }

  function setupMenus() {
    if (!desktopNav || !header) return;

    const triggers = [...desktopNav.querySelectorAll("[data-menu-trigger]")];
    triggers.forEach((trigger) => {
      trigger.setAttribute("aria-haspopup", "true");
      trigger.setAttribute("aria-expanded", "false");
      if (!trigger.querySelector(".caret")) {
        const caret = document.createElement("span");
        caret.className = "caret";
        caret.setAttribute("aria-hidden", "true");
        trigger.appendChild(caret);
      }
    });

    if (!document.getElementById("services-menu")) {
      desktopNav.append(buildMegaMenu("services-menu", servicesColumns));
    }
    if (!document.getElementById("institutional-menu")) {
      desktopNav.append(buildMegaMenu("institutional-menu", institutionalColumns));
    }

    const menus = [...desktopNav.querySelectorAll(".mega-menu")];

    function closeAll() {
      triggers.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-expanded", "false");
      });
      menus.forEach((m) => m.classList.remove("is-open"));
    }

    function openMenu(trigger) {
      const target = document.getElementById(`${trigger.dataset.menuTrigger}-menu`);
      if (!target) return;
      closeAll();
      trigger.classList.add("is-active");
      trigger.setAttribute("aria-expanded", "true");
      target.classList.add("is-open");
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener("mouseenter", () => {
        if (window.innerWidth > 1024) openMenu(trigger);
      });
      trigger.addEventListener("focus", () => openMenu(trigger));
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        const target = document.getElementById(`${trigger.dataset.menuTrigger}-menu`);
        if (target?.classList.contains("is-open")) closeAll();
        else openMenu(trigger);
      });
    });

    menus.forEach((m) => m.addEventListener("mouseleave", () => {
      if (window.innerWidth > 1024) closeAll();
    }));
    header.addEventListener("mouseleave", () => {
      if (window.innerWidth > 1024) closeAll();
    });

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) closeAll();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeAll();
        if (menuButton?.classList.contains("is-open")) {
          menuButton.classList.remove("is-open");
          desktopNav?.classList.remove("is-open");
          menuButton.setAttribute("aria-expanded", "false");
        }
      }
    });

    if (menuButton) {
      menuButton.addEventListener("click", () => {
        const isOpen = menuButton.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        desktopNav?.classList.toggle("is-open", isOpen);
        if (!isOpen) closeAll();
      });
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get("menu") === "services") {
      window.setTimeout(() => {
        const t = triggers.find((x) => x.dataset.menuTrigger === "services");
        if (t) openMenu(t);
      }, 200);
    }
    if (params.get("menu") === "institutional") {
      window.setTimeout(() => {
        const t = triggers.find((x) => x.dataset.menuTrigger === "institutional");
        if (t) openMenu(t);
      }, 200);
    }
  }

  // ============================================================
  // PRIVACY MODAL
  // ============================================================
  function initPrivacyModal() {
    const triggers = document.querySelectorAll("[data-privacy-open]");
    if (!triggers.length) return;

    const modal = document.createElement("section");
    modal.className = "privacy-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="privacy-dialog" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
        <button class="privacy-close" type="button" aria-label="Fermer la politique de confidentialité"></button>
        <aside class="privacy-side">
          <span class="privacy-mark">EF</span>
          <strong>Politique de<br>confidentialité</strong>
          <small>Mise à jour&nbsp;: 1er juin 2026</small>
        </aside>
        <article class="privacy-copy">
          <h2 id="privacy-title">Vos données chez EFORAS</h2>
          <p>EFORAS respecte votre vie privée. Nous collectons uniquement les données nécessaires pour traiter vos demandes (devis, candidatures, abonnements, saisines). Aucune revente, aucun partage à des fins publicitaires.</p>
          <div class="privacy-grid">
            <section>
              <h3>Données collectées</h3>
              <p>Coordonnées professionnelles, contenu de votre demande, documents transmis (CV, brief). Conservées 5 ans après dernier contact (3 ans pour les candidatures non retenues).</p>
            </section>
            <section>
              <h3>Utilisation</h3>
              <p>Exécution précontractuelle ou intérêt légitime pour les demandes B2B. Consentement explicite pour la newsletter, retirable en 1 clic.</p>
            </section>
            <section>
              <h3>Vos droits</h3>
              <p>Accès, rectification, effacement, opposition, portabilité. Demande à <a href="mailto:donnees-personnelles@eforas.cd">donnees-personnelles@eforas.cd</a>, réponse sous 30 jours.</p>
            </section>
            <section>
              <h3>Sécurité</h3>
              <p>Chiffrement TLS 1.3, sauvegardes chiffrées, hébergement RDC ou UE selon préférence client. Notification sous 72h en cas d'incident.</p>
            </section>
          </div>
          <div class="privacy-actions">
            <a class="btn btn-outline" href="mentions-legales.html#confidentialite">Politique complète</a>
            <a class="btn btn-secondary" href="contact.html?type=autre">Nous contacter</a>
          </div>
        </article>
      </div>`;
    document.body.append(modal);

    const close = () => {
      modal.classList.remove("is-open");
      window.setTimeout(() => { modal.hidden = true; }, 180);
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
      window.setTimeout(open, 200);
    }
  }

  // ============================================================
  // FOOTER YEAR + NEWSLETTER
  // ============================================================
  function initFooter() {
    document.querySelectorAll("[data-current-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
    document.querySelectorAll(".footer-newsletter form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = form.querySelector("input[type='email']")?.value?.trim();
        if (!email) return;
        const status = form.querySelector(".newsletter-status") || (() => {
          const s = document.createElement("small");
          s.className = "newsletter-status";
          form.appendChild(s);
          return s;
        })();
        status.textContent = "Merci ! Vous recevrez bientôt la confirmation de votre inscription.";
        status.style.color = "#E8B92A";
        form.querySelector("input[type='email']").value = "";
      });
    });
  }

  // ============================================================
  // CONTACT FORM — 18 TYPES ADAPTATIVE
  // ============================================================
  const demandTypes = {
    "sondage": {
      label: "Devis pour un sondage politique ou thématique",
      icon: "📊",
      fields: [
        { name: "sondage_type", label: "Type de sondage", type: "select", required: true,
          options: ["Politique national", "Politique provincial", "Thématique", "Flash"] },
        { name: "sondage_sample", label: "Échantillon souhaité", type: "select", required: false,
          options: ["1 000", "1 500", "2 000", "2 500", "> 2 500", "Je ne sais pas"] },
        { name: "sondage_provinces", label: "Province(s) ciblée(s)", type: "text", required: true,
          placeholder: "ex. Kinshasa, Haut-Katanga ou « National »" },
        { name: "sondage_date", label: "Date de besoin", type: "date", required: false },
        { name: "sondage_budget", label: "Budget indicatif (USD)", type: "select", required: false,
          options: ["< 10 k$", "10–25 k$", "25–50 k$", "50–100 k$", "> 100 k$", "Je ne sais pas"] },
        { name: "sondage_publication", label: "Publication dans un média ?", type: "select", required: false,
          options: ["Oui", "Non", "Pas décidé"] }
      ]
    },
    "etude-sante": {
      label: "Devis pour une étude santé / DHIS2",
      icon: "🔬",
      fields: [
        { name: "sante_org", label: "Type d'organisation", type: "select", required: true,
          options: ["Récipient Principal Fonds Mondial", "Récipient Gavi", "ONG", "Bailleur direct", "Ministère", "Autre"] },
        { name: "sante_etude", label: "Type d'étude", type: "select", required: true,
          options: ["Analyse SNIS / DHIS2", "Modélisation épidémiologique", "Évaluation de programme", "Autre"] },
        { name: "sante_zone", label: "Périmètre géographique", type: "text", required: false,
          placeholder: "Zones de santé concernées" },
        { name: "sante_date", label: "Date de besoin", type: "date", required: false },
        { name: "sante_budget", label: "Budget indicatif (USD)", type: "select", required: false,
          options: ["< 20 k$", "20–50 k$", "50–150 k$", "> 150 k$", "Je ne sais pas"] }
      ]
    },
    "ml-ia": {
      label: "Atelier d'idéation ou POC ML/IA",
      icon: "🧠",
      fields: [
        { name: "ml_usecase", label: "Cas d'usage envisagé", type: "select", required: true,
          options: ["Scoring crédit", "Détection de fraude", "Churn / fidélisation", "Segmentation client", "Prévision de demande", "Maintenance prédictive", "Optimisation supply chain", "Autre"] },
        { name: "ml_data", label: "Disponibilité des données", type: "select", required: true,
          options: ["Oui, complètes", "Oui, partielles", "Non disponibles", "À clarifier"] },
        { name: "ml_volume", label: "Volume de données estimé", type: "select", required: false,
          options: ["< 100 k lignes", "100 k – 1 M", "1 M – 10 M", "> 10 M", "Je ne sais pas"] },
        { name: "ml_date", label: "Date de besoin", type: "date", required: false }
      ]
    },
    "etude-b2b": {
      label: "Étude B2B / marché / image",
      icon: "📈",
      fields: [
        { name: "b2b_type", label: "Type d'étude", type: "select", required: true,
          options: ["Étude marché", "Satisfaction", "Audience", "Image de marque", "Segmentation", "Parcours client"] },
        { name: "b2b_cible", label: "Cible étudiée", type: "select", required: true,
          options: ["B2C consommateurs", "B2B professionnels", "Collaborateurs internes", "Autre"] },
        { name: "b2b_sample", label: "Échantillon souhaité", type: "text", required: false },
        { name: "b2b_date", label: "Date de besoin", type: "date", required: false }
      ]
    },
    "academie": {
      label: "Inscription à une formation Académie",
      icon: "🎓",
      fields: [
        { name: "acad_formation", label: "Formation visée", type: "select", required: true,
          options: ["Python pour la data science (5j)", "Statistiques appliquées avec R (4j)", "SQL et bases de données (3j)", "Power BI / Tableau (3j)", "Introduction à DHIS2 (4j)", "Modélisation épidémiologique (5j)", "Journalisme-data niveau 1 (3j)", "Certificat Data Scientist Junior (6 mois)", "Certificat Épidémiologiste DHIS2 (4 mois)", "Certificat Journaliste-data (3 mois)", "Liste d'attente — autre"] },
        { name: "acad_level", label: "Niveau actuel", type: "select", required: false,
          options: ["Débutant", "Intermédiaire", "Avancé", "Autodidacte"] },
        { name: "acad_profession", label: "Profession actuelle", type: "text", required: false },
        { name: "acad_bourse", label: "Demande de bourse ?", type: "select", required: false,
          options: ["Non", "Oui — étudiant·e", "Oui — demandeur d'emploi", "Oui — journaliste indépendant·e"] }
      ]
    },
    "academie-intra": {
      label: "Formation intra-entreprise",
      icon: "🏢",
      fields: [
        { name: "intra_theme", label: "Thématique souhaitée", type: "text", required: true },
        { name: "intra_n", label: "Nombre de participants", type: "number", required: true },
        { name: "intra_duree", label: "Durée souhaitée (jours)", type: "number", required: false },
        { name: "intra_lieu", label: "Lieu", type: "select", required: false,
          options: ["Chez vous", "Chez EFORAS", "En ligne", "Hybride"] },
        { name: "intra_date", label: "Date envisagée", type: "date", required: false }
      ]
    },
    "abonnement-barometre": {
      label: "Abonnement au Baromètre démocratique RDC",
      icon: "📰",
      fields: [
        { name: "abo_type", label: "Type d'abonnement", type: "select", required: true,
          options: ["Synthèse gratuite (newsletter)", "Rapport complet trimestriel", "Rapport complet + fichier de données"] },
        { name: "abo_engagement", label: "Engagement", type: "select", required: false,
          options: ["Annuel", "Pluriannuel"] },
        { name: "abo_users", label: "Nombre d'utilisateurs internes", type: "number", required: false }
      ]
    },
    "eforas-tech": {
      label: "EFORAS Tech (ERP SaaS)",
      icon: "🛠️",
      fields: [
        { name: "tech_taille", label: "Taille de l'entreprise", type: "select", required: true,
          options: ["TPE (<10)", "PME (10–50)", "Moyenne (50–250)", "Grande (>250)"] },
        { name: "tech_actuel", label: "ERP actuel", type: "select", required: false,
          options: ["Aucun", "Excel", "Sage", "SAP", "Autre", "Je ne sais pas"] },
        { name: "tech_modules", label: "Modules souhaités", type: "text", required: false,
          placeholder: "CRM, Ventes, Stocks, Compta, RH, Projets…" },
        { name: "tech_users", label: "Nombre d'utilisateurs prévus", type: "number", required: false },
        { name: "tech_date", label: "Date go-live envisagée", type: "date", required: false }
      ]
    },
    "location-enquete": {
      label: "Location de kit enquête (tablettes)",
      icon: "📦",
      fields: [
        { name: "loc_n", label: "Nombre de tablettes", type: "number", required: true },
        { name: "loc_duree", label: "Durée de location", type: "text", required: true,
          placeholder: "ex. 14 jours" },
        { name: "loc_app", label: "Application préférée", type: "select", required: false,
          options: ["KoboCollect", "ODK Collect", "SurveyCTO", "Je ne sais pas"] },
        { name: "loc_date", label: "Date de besoin", type: "date", required: false }
      ]
    },
    "location-evenement": {
      label: "Location événementiel",
      icon: "🎤",
      fields: [
        { name: "ev_type", label: "Type d'événement", type: "select", required: true,
          options: ["Mariage", "Corporate", "Cérémonie", "Conférence", "Autre"] },
        { name: "ev_n", label: "Nombre de personnes attendues", type: "number", required: true },
        { name: "ev_lieu", label: "Lieu", type: "text", required: true },
        { name: "ev_date", label: "Date de l'événement", type: "date", required: true },
        { name: "ev_pack", label: "Pack envisagé", type: "select", required: false,
          options: ["Basique (50–150 pers.)", "Intermédiaire (150–400)", "Premium (400+)", "Sur mesure"] }
      ]
    },
    "carrieres": {
      label: "Candidature à un poste EFORAS",
      icon: "👩‍💼",
      fields: [
        { name: "carr_poste", label: "Poste visé", type: "select", required: true,
          options: ["Lead Sondages & Études", "Lead Santé / DHIS2", "Lead Data Science / ML", "Lead Académie / Formation", "Lead Plateforme techno / BI", "Analyste junior", "Commercial", "Support administratif", "Candidature spontanée"] },
        { name: "carr_disp", label: "Disponibilité", type: "select", required: false,
          options: ["Immédiate", "Sous 1 mois", "Sous 3 mois", "Plus tard"] },
        { name: "carr_pret", label: "Prétentions salariales (USD/mois brut)", type: "text", required: false }
      ]
    },
    "candidature-comite": {
      label: "Candidature au Comité scientifique externe",
      icon: "🎓",
      fields: [
        { name: "com_profil", label: "Profil visé", type: "select", required: true,
          options: ["Statisticien académique", "Épidémiologiste / méthodologie quantitative", "Juriste droits humains", "Économiste", "Sociologue", "Spécialiste DHIS2 / données de santé", "Spécialiste data privée"] },
        { name: "com_refs", label: "Références académiques ou professionnelles (2 minimum)", type: "textarea", required: true }
      ]
    },
    "saisine": {
      label: "Saisine du Comité scientifique (signalement)",
      icon: "⚖️",
      fields: [
        { name: "sais_etude", label: "Quelle étude / sondage EFORAS ?", type: "text", required: false,
          placeholder: "Titre ou « préoccupation générale »" },
        { name: "sais_manquement", label: "Description du manquement allégué", type: "textarea", required: true,
          placeholder: "Décrivez le manquement à la Charte d'indépendance (500–3000 caractères)" },
        { name: "sais_anonyme", label: "Souhaitez-vous une protection d'identité ?", type: "select", required: false,
          options: ["Non", "Oui"] }
      ]
    },
    "partenariat": {
      label: "Partenariat (académique, bailleur, média)",
      icon: "🤝",
      fields: [
        { name: "part_type", label: "Type de partenariat", type: "select", required: true,
          options: ["Académique", "Bailleur", "Média", "Technologique", "Autre"] }
      ]
    },
    "presse": {
      label: "Demande presse",
      icon: "🎤",
      fields: [
        { name: "presse_media", label: "Média", type: "text", required: true },
        { name: "presse_type", label: "Type de demande", type: "select", required: true,
          options: ["Interview", "Commentaire", "Accès à un rapport", "Autre"] },
        { name: "presse_delai", label: "Délai souhaité", type: "select", required: false,
          options: ["Urgent (<24h)", "Sous 3 jours", "Sous 7 jours", "Pas urgent"] }
      ]
    },
    "blog-invite": {
      label: "Proposition d'article invité (blog)",
      icon: "✍️",
      fields: [
        { name: "blog_titre", label: "Titre proposé", type: "text", required: true },
        { name: "blog_cat", label: "Catégorie", type: "select", required: true,
          options: ["Décryptages data", "Méthodologies", "Académie", "Vie du cabinet"] },
        { name: "blog_resume", label: "Résumé (200–400 mots)", type: "textarea", required: true }
      ]
    },
    "newsletter": {
      label: "Inscription newsletter « Insights EFORAS »",
      icon: "📧",
      fields: []
    },
    "enqueteurs": {
      label: "Candidature comme enquêteur·trice",
      icon: "👥",
      fields: [
        { name: "enq_prov", label: "Province de résidence", type: "text", required: true },
        { name: "enq_langues", label: "Langues parlées", type: "text", required: false,
          placeholder: "ex. français, lingala, swahili" },
        { name: "enq_exp", label: "Expérience d'enquête", type: "select", required: false,
          options: ["Aucune", "<1 an", "1–3 ans", "3+ ans"] }
      ]
    },
    "autre": { label: "Autre demande", icon: "💬", fields: [] }
  };

  function buildContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const typeSelect = form.querySelector("[name='type']");
    const specificContainer = form.querySelector(".form-specific");
    if (!typeSelect || !specificContainer) return;

    Object.entries(demandTypes).forEach(([key, def]) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = `${def.icon} ${def.label}`;
      typeSelect.append(opt);
    });

    function renderSpecific(typeKey) {
      specificContainer.innerHTML = "";
      const def = demandTypes[typeKey];
      if (!def || !def.fields.length) return;

      const wrap = document.createElement("div");
      wrap.className = "form-specific-fields";
      wrap.innerHTML = `<h3 style="margin: 18px 0 4px; font-size: 1.05rem; color: var(--eforas-navy);">Détails spécifiques à votre demande</h3>`;

      def.fields.forEach((f) => {
        const wrapper = document.createElement("label");
        if (f.required) wrapper.classList.add("required");
        wrapper.innerHTML = `<span>${f.label}</span>`;

        let input;
        if (f.type === "select") {
          input = document.createElement("select");
          input.name = f.name;
          if (f.required) input.required = true;
          const placeholder = document.createElement("option");
          placeholder.value = "";
          placeholder.textContent = "— choisir —";
          input.append(placeholder);
          f.options.forEach((o) => {
            const opt = document.createElement("option");
            opt.value = o;
            opt.textContent = o;
            input.append(opt);
          });
        } else if (f.type === "textarea") {
          input = document.createElement("textarea");
          input.name = f.name;
          if (f.required) input.required = true;
          if (f.placeholder) input.placeholder = f.placeholder;
        } else {
          input = document.createElement("input");
          input.type = f.type || "text";
          input.name = f.name;
          if (f.required) input.required = true;
          if (f.placeholder) input.placeholder = f.placeholder;
        }
        wrapper.append(input);
        wrap.append(wrapper);
      });

      specificContainer.append(wrap);
    }

    typeSelect.addEventListener("change", () => renderSpecific(typeSelect.value));

    const params = new URLSearchParams(window.location.search);
    const initialType = params.get("type");
    if (initialType && demandTypes[initialType]) {
      typeSelect.value = initialType;
      renderSpecific(initialType);
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const success = form.querySelector(".contact-form-success");
      if (success) {
        success.classList.add("is-shown");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
      specificContainer.innerHTML = "";
    });
  }

  // ============================================================
  // INIT
  // ============================================================
  document.addEventListener("DOMContentLoaded", () => {
    setupMenus();
    initPrivacyModal();
    initFooter();
    buildContactForm();
  });

  if (document.readyState === "interactive" || document.readyState === "complete") {
    setupMenus();
    initPrivacyModal();
    initFooter();
    buildContactForm();
  }
})();
