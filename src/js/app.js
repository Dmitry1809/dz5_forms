import "../css/style.css"; // Импортируем стили, чтобы Webpack их подцепил

export class PopoverWidget {
  constructor() {
    this.popovers = new Map();
    this.init();
  }

  init() {
    document.querySelectorAll('[data-toggle="popover"]').forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        this.togglePopover(trigger);
      });
    });
  }

  createPopoverElement(title, content) {
    const popover = document.createElement("div");
    popover.classList.add("popover");
    popover.innerHTML = `<div class="arrow"></div><h3 class="popover-header">${title}</h3><div class="popover-body">${content}</div>`;
    document.body.appendChild(popover);
    return popover;
  }

  togglePopover(trigger) {
    if (this.popovers.has(trigger)) {
      const popover = this.popovers.get(trigger);
      popover.classList.toggle("show");
      if (popover.classList.contains("show"))
        this.positionPopover(trigger, popover);
      return;
    }
    const popover = this.createPopoverElement(
      trigger.getAttribute("title"),
      trigger.getAttribute("data-content"),
    );
    this.popovers.set(trigger, popover);
    popover.classList.add("show");
    this.positionPopover(trigger, popover);
  }

  positionPopover(trigger, popover) {
    const triggerCoords = trigger.getBoundingClientRect();
    const top = triggerCoords.top + window.scrollY - popover.offsetHeight - 8;
    const left =
      triggerCoords.left +
      window.scrollX +
      triggerCoords.width / 2 -
      popover.offsetWidth / 2;
    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
  }
}

// Инициализируем виджет напрямую без ожидания события
if (typeof window !== "undefined") {
  new PopoverWidget();
}
