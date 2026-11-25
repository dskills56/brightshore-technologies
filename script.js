document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const quoteForm = document.getElementById("quoteForm");
  const serviceSelect = document.getElementById("service");
  const budgetSelect = document.getElementById("budget");
  const formStatus = document.getElementById("formStatus");
  const yearElement = document.getElementById("year");

  const businessEmail = "brightshoretechnologies@gmail.com";

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });
  }

  const packageButtons = document.querySelectorAll(
    ".package-button"
  );

  const packageBudgets = {
    "Starter Website - $399": "Under $500",
    "Business Website - $699": "$500-$999",
    "Professional Website - $1499+": "$1000-$2499",
    "Custom Development - $2500 to $5000+": "$2500-$5000"
  };

  packageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedPackage = button.dataset.package;

      if (serviceSelect && selectedPackage) {
        const matchingOption = Array.from(
          serviceSelect.options
        ).find((option) => option.value === selectedPackage);

        if (matchingOption) {
          serviceSelect.value = selectedPackage;
        }
      }

      if (budgetSelect && packageBudgets[selectedPackage]) {
        budgetSelect.value = packageBudgets[selectedPackage];
      }

      if (formStatus) {
        formStatus.textContent = "";
      }

      document.getElementById("contact").scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth"
      });

      setTimeout(() => {
        document.getElementById("fullName")?.focus({
          preventScroll: true
        });
      }, 400);
    });
  });

  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!quoteForm.reportValidity()) {
        return;
      }

      const formData = new FormData(quoteForm);

      const fullName = String(
        formData.get("fullName") || ""
      ).trim();

      const businessName = String(
        formData.get("businessName") || ""
      ).trim();

      const email = String(
        formData.get("email") || ""
      ).trim();

      const phone = String(
        formData.get("phone") || "Not provided"
      ).trim();

      const service = String(
        formData.get("service") || ""
      ).trim();

      const budget = String(
        formData.get("budget") || "Not specified"
      ).trim();

      const launchDate = String(
        formData.get("launchDate") || "Flexible"
      ).trim();

      const website = String(
        formData.get("website") || "Not provided"
      ).trim();

      const projectDetails = String(
        formData.get("projectDetails") || ""
      ).trim();

      const subject =
        `New Brightshore Project Inquiry - ${businessName}`;

      const body = [
        "NEW PROJECT INQUIRY",
        "Brightshore Technologies",
        "",
        `Full Name: ${fullName}`,
        `Business Name: ${businessName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        `Requested Service: ${service}`,
        `Estimated Budget: ${budget}`,
        `Desired Launch Date: ${launchDate}`,
        `Current Website: ${website}`,
        "",
        "PROJECT DETAILS:",
        projectDetails,
        "",
        "Submitted through the website email preparation form.",
        "The visitor must send this message from their email application."
      ].join("\n");

      const mailtoURL =
        `mailto:${businessEmail}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      if (formStatus) {
        formStatus.textContent =
          "Your email application should open with the inquiry prepared. Please send the email there to complete your request. If nothing opens, email us directly at " +
          businessEmail + ".";
      }

      window.location.href = mailtoURL;
    });
  }
});