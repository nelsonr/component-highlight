function highlight(selector) {
    const highlightStyles = `
    ${selector} div {
        outline: 1px dashed hotpink;
    }
    `;

    let style = document.head.querySelector(
        "style[data-type='component-highlight']"
    );

    if (!style) {
        style = document.createElement("style");
        style.setAttribute("data-type", "component-highlight");
        document.head.appendChild(style);
    }

    style.textContent = highlightStyles;
}

function clear() {
    const style = document.querySelector(".component-highlight");

    if (style) {
        style.remove();
    }
}

function getComponents() {
    const blocks = Array.from(document.querySelectorAll("[data-block]"));
    const uniqueBlocks = new Set(
        blocks.map((el) => el.getAttribute("data-block"))
    );

    return Array.from(uniqueBlocks).map((name) => {
        return {
            name: name,
            selector: `[data-block="${name}"]`,
        };
    });
}

function main() {
    const env = chrome || browser;

    env.runtime.sendMessage({ action: "pageLoad" });

    env.runtime.onMessage.addListener((message) => {
        console.log(message);

        if (message.action == "get") {
            env.runtime.sendMessage({
                action: "list",
                payload: getComponents(),
            });
        }

        if (message.action == "highlight") {
            highlight(message.selector);
        }

        if (message.action == "clear") {
            clear();
        }
    });
}

window.addEventListener("load", main);
