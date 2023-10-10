const inputItem = document.querySelector("#item");
const todoBox = document.querySelector("#todoBox");

inputItem.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        addTodo(this.value);
        this.value = "";
    }
});

const addTodo = (todoItem) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    ${todoItem}
    <i class="fa-regular fa-circle-xmark"></i>
`;
    listItem.addEventListener("click", function () {
        this.classList.toggle("done");
    });
    listItem.querySelector("i").addEventListener("click", function () {
        const confirmed = confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            listItem.remove();
            saveTodos();
        }
    });

    todoBox.appendChild(listItem);
    saveTodos();
};

const saveTodos = () => {
    const todoItems = [...todoBox.querySelectorAll("li")];
    const todos = todoItems.map((item) => ({
        text: item.textContent.trim(),
        done: item.classList.contains("done"),
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodos = () => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.forEach((todo) => {
        const listItem = document.createElement("li");
        listItem.textContent = todo.text;
        if (todo.done) {
            listItem.classList.add("done");
        }
        listItem.innerHTML += `<i class="fa-regular fa-circle-xmark"></i>`;
        listItem.addEventListener("click", function () {
            this.classList.toggle("done");
            saveTodos();
        });
        listItem.querySelector("i").addEventListener("click", function () {
            const confirmed = confirm(
                "Are you sure you want to delete this item?"
            );
            if (confirmed) {
                listItem.remove();
                saveTodos();
            }
        });

        todoBox.appendChild(listItem);
    });
};

loadTodos();
