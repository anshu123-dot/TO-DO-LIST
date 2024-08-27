document.addEventListener("DOMContentLoaded", () => {
    const newItemInput = document.getElementById("new-item");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");
    const searchInput = document.getElementById("search");

    let items = JSON.parse(localStorage.getItem('todoItems')) || [];

    function renderItems() {
        todoList.innerHTML = "";
        items.forEach((item, index) => {
            const li = document.createElement("li");
            li.classList.toggle("done", item.done);

            const textSpan = document.createElement("span");
            textSpan.textContent = item.text;
            textSpan.contentEditable = true;
            textSpan.addEventListener("blur", () => {
                item.text = textSpan.textContent;
                saveItems();
            });

            const doneButton = createButton("check-circle", () => {
                item.done = !item.done;
                saveItems();
                renderItems();
            });

            const deleteButton = createButton("trash", () => {
                items.splice(index, 1);
                saveItems();
                renderItems();
            });

            const upButton = createButton("arrow-up", () => {
                if (index > 0) {
                    [items[index], items[index - 1]] = [items[index - 1], items[index]];
                    saveItems();
                    renderItems();
                }
            });

            const downButton = createButton("arrow-down", () => {
                if (index < items.length - 1) {
                    [items[index], items[index + 1]] = [items[index + 1], items[index]];
                    saveItems();
                    renderItems();
                }
            });

            li.appendChild(textSpan);
            li.appendChild(doneButton);
            li.appendChild(upButton);
            li.appendChild(downButton);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }

    function createButton(iconName, onClick) {
        const button = document.createElement("button");
        button.innerHTML = `<svg><use href="#${iconName}"></use></svg>`;
        button.addEventListener("click", onClick);
        return button;
    }

    function addItem() {
        const text = newItemInput.value.trim();
        if (text !== "") {
            items.push({ text, done: false });
            saveItems();
            renderItems();
            newItemInput.value = "";
        }
    }

    function saveItems() {
        localStorage.setItem('todoItems', JSON.stringify(items));
    }

    addButton.addEventListener("click", addItem);
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        items = items.filter(item => item.text.toLowerCase().includes(searchTerm));
        renderItems();
    });

    renderItems();
});
