  document.querySelectorAll(".era-header").forEach(header => {
    header.addEventListener("click", () => {
      const era = header.closest(".era");
      const isOpen = era.classList.contains("open");

      era.classList.toggle("open");

      if (!isOpen) {
        setTimeout(() => {
          era.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 200);
      }
    });
  });