import { backend } from 'declarations/backend';

let items = [];

async function loadItems() {
    items = await backend.getItems();
    renderItems();
}

function renderItems() {
    const itemsList = document.getElementById('items');
    itemsList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.text}
            <div>
                <button class="complete-btn" onclick="toggleComplete(${item.id})">
                    <i class="fas ${item.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
                </button>
                <button class="delete-btn" onclick="deleteItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        if (item.completed) {
            li.classList.add('completed');
        }
        itemsList.appendChild(li);
    });
}

async function addItem() {
    const input = document.getElementById('item-input');
    const text = input.value.trim();
    if (text) {
        await backend.addItem(text);
        input.value = '';
        await loadItems();
    }
}

async function toggleComplete(id) {
    await backend.toggleComplete(id);
    await loadItems();
}

async function deleteItem(id) {
    await backend.deleteItem(id);
    await loadItems();
}

document.getElementById('add-item').addEventListener('click', addItem);
document.getElementById('item-input').addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        await addItem();
    }
});

window.toggleComplete = toggleComplete;
window.deleteItem = deleteItem;

loadItems();