let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	if (!localStorage.getItem('tasks')) { return items }
	if (localStorage.getItem('tasks')) { return JSON.parse(localStorage.getItem('tasks')) }
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.addEventListener('blur', () => {
		textElement.setAttribute('contenteditable', 'false');
		items = getTasksFromDOM();
		saveTasks(items);
	})

	editButton.addEventListener('click', () => {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus();
	})

	duplicateButton.addEventListener('click', () => {
		itemName = textElement.textContent;
		newItem = createItem(itemName);
		listElement.prepend(newItem);
		items = getTasksFromDOM();
		saveTasks(items);
	})

	deleteButton.addEventListener('click', () => {
		clone.remove();
		items = getTasksFromDOM();
		saveTasks(items);
	})

	textElement.textContent = item;
	return clone;
}

function getTasksFromDOM() {
	itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	let tasks = [];
	itemsNamesElements.forEach( (item) => {
		tasks.push(item.textContent);
	})
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

formElement.addEventListener('submit', (evt) => {
	evt.preventDefault();
	const val = inputElement.value;
	listElement.prepend(createItem(val));
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = '';
})

items = loadTasks();
items.forEach( (item) => {
	listElement.append(createItem(item));
})