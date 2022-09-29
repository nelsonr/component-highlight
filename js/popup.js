const env = chrome || browser;

function main() {
    env.runtime.sendMessage({ action: "get" });

    env.runtime.onMessage.addListener((message) => {
        if (message.action == "list") {
            if (message.payload) {
                setList(message.payload);
            }
        }
    });
}

function setList(list) {
    const listEl = document.getElementById("list");
    const frag = document.createDocumentFragment();

    list.forEach((item) => {
        frag.appendChild(createListItem(item));
    });

    listEl.innerHTML = null;
    listEl.appendChild(frag);
}

function createListItem({ name, selector }) {
    const li = document.createElement("li");

    li.textContent = name;

    li.addEventListener("click", () => {
        env.runtime.sendMessage({
            action: "highlight",
            selector: selector,
        });
    });

    return li;
}

window.addEventListener("load", main);
