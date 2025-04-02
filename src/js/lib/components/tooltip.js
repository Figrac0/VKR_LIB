import $ from "../core";

$.prototype.tooltip = function () {
    for (let i = 0; i < this.length; i++) {
        const tooltipText = this[i].getAttribute("data-tooltip");
        if (!tooltipText) continue;

        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);

        const positionTooltip = (event) => {
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;
            const offset = 10;

            let left = event.pageX + offset;
            let top = event.pageY - tooltipHeight - offset;

            if (left + tooltipWidth > window.innerWidth) {
                left = window.innerWidth - tooltipWidth - offset;
            }

            if (top < 0) {
                top = event.pageY + offset;
            }

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        };

        $(this[i]).on("mouseenter", (event) => {
            tooltip.classList.add("tooltip-visible");
            positionTooltip(event);
        });

        $(this[i]).on("mousemove", positionTooltip);

        $(this[i]).on("mouseleave", () => {
            tooltip.classList.remove("tooltip-visible");
        });
    }
};

$("[data-tooltip]").tooltip();
