// script.js - Advanced JavaScript for LightPlus Website
document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const hamburger = document.getElementById("hamburger");
    const navRight = document.querySelector(".nav-right");
    const servicesBtn = document.getElementById("servicesBtn");
    const dropdown = document.getElementById("dropdown");
    const showMoreBtn = document.getElementById("showMoreBtn");
    const hiddenServices = document.getElementById("hiddenServices");
    const quoteForm = document.getElementById("quoteForm");
    const header = document.querySelector("header");

    // Mobile Menu Toggle
    hamburger.addEventListener("click", () => {
        navRight.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    // Services Dropdown
    servicesBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
        dropdown.classList.remove("active");
    });

    // Show More / Show Less Services
    showMoreBtn.addEventListener("click", () => {
        hiddenServices.classList.toggle("show");
        showMoreBtn.innerHTML = hiddenServices.classList.contains("show")
            ? 'Show Less <i class="fas fa-chevron-up"></i>'
            : 'Show More Services <i class="fas fa-chevron-down"></i>';
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 90,
                    behavior: "smooth"
                });
            }
            // Close mobile menu
            navRight.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });

    // Form Validation & Submission
    quoteForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = this.name.value.trim();
        const email = this.email.value.trim();
        const phone = this.phone.value.trim();
        const service = this.service.value;

        if (!name || !email || !phone || !service) {
            showAlert("Please fill in all required fields.", "error");
            return;
        }

        if (!/^\d{10,15}$/.test(phone.replace(/\D/g, ""))) {
            showAlert("Please enter a valid phone number.", "error");
            return;
        }

        // Success!
        showAlert("Thank you, " + name.split(" ")[0] + "! Your quote request has been sent. We'll call you within 1 hour!", "success");
        this.reset();
    });

    // Alert System
    function showAlert(message, type) {
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            ${message}
            <span class="close">&times;</span>
        `;
        document.body.appendChild(alert);

        // Auto-remove
        setTimeout(() => alert.remove(), 6000);

        // Close button
        alert.querySelector(".close").onclick = () => alert.remove();
    }

    // Sticky Header Glow on Scroll
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });

    // WhatsApp Pre-filled Message
    document.querySelectorAll("[href*='wa.me']").forEach(link => {
        link.addEventListener("click", () => {
            const service = document.getElementById("service")?.value || "General Cleaning";
            link.href = link.href.replace("quote!", `quote for ${service}`);
        });
    });
});