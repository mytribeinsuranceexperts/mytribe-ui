
document.addEventListener("DOMContentLoaded", function () {
  const triggers = document.querySelectorAll(".custom-accordion_trigger1");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
  triggers.forEach((trigger, index) => {
    const accordionItem = trigger.closest(".accordion_basic1");
    const content = accordionItem.querySelector(".custom-accordion_content1");
 
    const buttonId = `accordion-button-${index + 1}`;
    const panelId = `accordion-panel-${index + 1}`;
 
    trigger.id = buttonId;
    trigger.setAttribute("aria-controls", panelId);
 
    content.id = panelId;
    content.setAttribute("aria-labelledby", buttonId);
 
    // 👇 Respect existing 'is-open' class set via Webflow Designer
    if (content.classList.contains("is-open")) {
      trigger.setAttribute("aria-expanded", "true");
      content.setAttribute("aria-hidden", "false");
    } else {
      trigger.setAttribute("aria-expanded", "false");
      content.setAttribute("aria-hidden", "true");
    }
 
    trigger.addEventListener("click", () => toggleAccordion(trigger, content));
    trigger.addEventListener("keydown", (event) => handleKeyboard(event, trigger, triggers));
  });
 
  function toggleAccordion(trigger, content) {
    const isExpanded = trigger.getAttribute("aria-expanded") === "true";
 
    if (isExpanded) {
      collapse(content, trigger);
    } else {
      expand(content, trigger);
    }
  }
 
  function expand(content, trigger) {
    content.classList.add("is-open");
    content.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
  }
 
  function collapse(content, trigger) {
    content.classList.remove("is-open");
    content.setAttribute("aria-hidden", "true");
    trigger.setAttribute("aria-expanded", "false");
  }
 
  function handleKeyboard(event, trigger, allTriggers) {
    const currentIndex = Array.from(allTriggers).indexOf(trigger);
    let newIndex;
 
    switch (event.key) {
      case "ArrowDown":
        newIndex = (currentIndex + 1) % allTriggers.length;
        allTriggers[newIndex].focus();
        event.preventDefault();
        break;
      case "ArrowUp":
        newIndex = (currentIndex - 1 + allTriggers.length) % allTriggers.length;
        allTriggers[newIndex].focus();
        event.preventDefault();
        break;
      case "Home":
        allTriggers[0].focus();
        event.preventDefault();
        break;
      case "End":
        allTriggers[allTriggers.length - 1].focus();
        event.preventDefault();
        break;
      case "Escape":
        toggleAccordion(trigger, trigger.closest(".accordion_basic1").querySelector(".custom-accordion_content1"));
        trigger.focus();
        event.preventDefault();
        break;
    }
  }
});
