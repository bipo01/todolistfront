async function collectAll() {
    document.querySelector(".lista").innerHTML = "";

    const response = await fetch("https://todolist-api-theta.vercel.app/all");
    const data = await response.json();

    data.forEach((dado) => {
        const html = `<li id="${dado.id}"><span class="atividadeDelete">${dado.atividade}</span><span class="editBtn">✏️</span> </li>`;

        document.querySelector(".lista").insertAdjacentHTML("afterbegin", html);
    });

    console.log(data);

    for (
        let i = 0;
        i < document.querySelectorAll(".atividadeDelete").length;
        i++
    ) {
        document
            .querySelectorAll(".atividadeDelete")
            [i].addEventListener("click", apagar);
    }

    for (let i = 0; i < document.querySelectorAll(".editBtn").length; i++) {
        document
            .querySelectorAll(".editBtn")
            [i].addEventListener("click", editar);
    }
}

async function add() {
    let input = document.querySelector("#activity");

    console.log(input.value);
    const response = await fetch(
        `https://todolist-api-theta.vercel.app/add?atividade=${input.value}`
    );

    const data = await response.json();
    console.log(data);

    input.value = "";

    collectAll();
}

async function apagar() {
    console.log(this.parentElement.id);

    const response = await fetch(
        `https://todolist-api-theta.vercel.app/apagar?id=${this.parentElement.id}`
    );
    const data = await response.json();

    console.log(data);

    collectAll();
}

async function editar() {
    console.log(this);
    this.textContent = "";
    console.log(this.parentElement.id);
    console.log(this.parentElement.textContent);
    const id = this.parentElement.id;
    const atividadeAnterior = this.parentElement.textContent;

    this.parentElement.innerHTML = `<input
    type="text"
    name="atividadeEditada"
    id="atividadeEditada"
    autocomplete="off"
    placeholder="${atividadeAnterior}"
/>
<button class="salvar">✅</button>`;

    document.querySelector(".salvar").addEventListener("click", async () => {
        console.log(id);
        console.log(atividadeAnterior);
        const atividadeAtual =
            document.querySelector("#atividadeEditada").value.trim() ||
            atividadeAnterior;

        console.log(atividadeAtual);

        const response = await fetch(
            `https://todolist-api-theta.vercel.app/editar?atividade=${atividadeAtual}&id=${id}`
        );
        const data = await response.json();

        console.log(data);

        collectAll();
    });
}

collectAll();

document.querySelector(".btnAdd").addEventListener("click", add);
