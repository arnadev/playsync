document.addEventListener("DOMContentLoaded", () => {
    const locationLogos = document.querySelectorAll(".location-logo");

    locationLogos.forEach(logo => {
        logo.addEventListener("click", function () {
            const dropdownContent = this.nextElementSibling;
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content !== dropdownContent) {
                    content.classList.remove("active");
                }
            });

            // Toggle the clicked dropdown
            dropdownContent.classList.toggle("active");
        });
    });
});
