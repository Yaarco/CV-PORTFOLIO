document.addEventListener("DOMContentLoaded", () => {
  const contactTimers = [];

  function resetContacts() {
    contactTimers.splice(0).forEach(clearTimeout);
    const address = document.querySelector("address");

    address
      .querySelectorAll(".contact-placeholder")
      .forEach((placeholder) => placeholder.remove());
    address.querySelectorAll("button, a").forEach((element) => {
      element.classList.remove("is-hidden", "is-visible", "activatedLink");
      element.style.left = "";
    });
  }

  function toggleContact(contactType) {
    const address = document.querySelector("address");
    const selected = document.getElementById(contactType + "-btn");
    const linkText = document.getElementById(contactType);
    const sectionPosition = document
      .getElementById("profil")
      .getBoundingClientRect();

    const isActive = selected.classList.contains("activatedLink");
    resetContacts();
    if (isActive) return;

    address
      .querySelectorAll("button, address > a:first-child")
      .forEach((element) => {
        if (element !== selected) {
          contactTimers.push(
            setTimeout(() => element.classList.add("is-hidden"), 200),
          );
        }
      });

    const position = selected.getBoundingClientRect();
    const placeholder = document.createElement("span");
    placeholder.className = "contact-placeholder";
    placeholder.style.width = `${selected.offsetWidth}px`;
    placeholder.style.height = `${selected.offsetHeight}px`;
    placeholder.style.visibility = "hidden";
    address.insertBefore(placeholder, selected);
    selected.style.left = `${position.left - sectionPosition.left - placeholder.offsetWidth / 3}px`;
    selected.classList.add("activatedLink");

    contactTimers.push(
      setTimeout(() => {
        selected.style.left = "0";
        linkText.style.left = `${position.width / 1.5}px`;
        linkText.classList.add("is-visible");
      }, 100),
    );
  }

  // random ringing telefon animation

  const phoneButton = document.getElementById("phone-btn");

  document
    .getElementById("mail-btn")
    .addEventListener("click", () => toggleContact("mail"));
  phoneButton.addEventListener("click", () => toggleContact("phone"));

  let phoneTimer;

  function ringPhone() {
    clearTimeout(phoneTimer);
    
    phoneTimer = setTimeout(
      () => {
        if (!phoneButton.classList.contains("activatedLink"))
          phoneButton.classList.add("ringer");
        setTimeout(() => phoneButton.classList.remove("ringer"), 1000);
        ringPhone();
      },
      Math.random() * 5000 + 6000,
    );
  }

  document.addEventListener("visibilitychange", ringPhone);
  ringPhone();

  const projectSlides = document.querySelectorAll("#portfolio-display > li");
  const projectButtons = document.querySelectorAll(".project-select li");

  function showSlide(selectedIndex) {
    projectSlides.forEach((slide, index) => {
      const isSelected = index === selectedIndex;
      const button = projectButtons[index];
      slide.hidden = !isSelected;
      button.querySelector("i").className =
        `bi bi-${index + 1}-circle${isSelected ? "-fill" : ""} project-num`;
    });
  }

  projectButtons.forEach((button, index) => {
    button.addEventListener("click", () => showSlide(index));
  });
});
