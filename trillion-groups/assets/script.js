(() => {
  const finishLoading = () => {
    document.body.classList.add("loaded");
    const loader = document.querySelector(".preloader");
    if (loader) window.setTimeout(() => loader.remove(), 700);
  };
  if (document.readyState === "complete") finishLoading();
  else window.addEventListener("load", finishLoading, { once: true });

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
      const nav = document.querySelector(".navbar-collapse.show");
      if (nav && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(nav).hide();
    });
  });

  const topButton = document.querySelector(".back-to-top");
  const updateTopButton = () => {
    if (topButton) topButton.classList.toggle("show", window.scrollY > 420);
  };
  window.addEventListener("scroll", updateTopButton, { passive: true });
  updateTopButton();
  if (topButton) topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const form = document.querySelector("#leadForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const division = form.querySelector('[name="division"]');
      const to = (division && division.value) || form.dataset.recipient || "info@trillion-groups.com";
      const subject = encodeURIComponent(data.get("subject") || "Website enquiry");
      const body = encodeURIComponent(
        "Name: " + data.get("name") + "\n" +
        "Email: " + data.get("email") + "\n" +
        "Company: " + (data.get("company") || "Not provided") + "\n\n" +
        "Message:\n" + data.get("message")
      );
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
      const modalEl = document.getElementById("leadModal");
      if (modalEl && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    });
  }
})();