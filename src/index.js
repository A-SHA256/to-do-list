const data = [];

//Creation of main container and header
const container = document.querySelector('.main-container');
const header = document.querySelector('.main-header');

//Creation of main user input for the text and button for submitting the text
const inputContainer = document.querySelector('.input-container');
const userInput = document.querySelector('.main-input');
const inputButton = document.querySelector('.submit-button');

//Creation of list
const list = document.querySelector('.main-list');

//Function for adding item to the list
let inputText = '';

function addItemToList() {
  if (userInput.value !== '') {
    inputText = userInput.value;
    data.push(inputText);
    showingInput();
  }
  userInput.value = '';
}


//Function for showing the output
function showingInput() {
  //Event div
  const task = document.createElement('div');
  list.append(task);
  task.classList.add('event-container');

  //For text
  let taskText = document.createElement('div');
  taskText.classList.add('event-text');
  taskText.innerText = inputText;

  //For buttons
  const taskBtnsCont = document.createElement('div');
  taskBtnsCont.classList.add('btns-container')
  const editButton = document.createElement('button');
  editButton.classList.add('event-button');
  editButton.innerText = 'Edit';
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('event-button');
  deleteButton.innerText = 'Delete';

  task.append(taskText);
  task.append(taskBtnsCont);
  taskBtnsCont.append(editButton);
  taskBtnsCont.append(deleteButton);


  //Event listener for removal of the item from the list
  deleteButton.addEventListener('click', () => {
    let delTask = deleteButton.closest('.event-container').querySelector('.event-text').innerText;
    const indexForRemoval = data.indexOf(delTask);
    data.splice(indexForRemoval, 1);
    task.remove();
  });


  let temp;
  //Event listener for editing of the item from the list
  editButton.addEventListener('click', () => {
    
    if (taskText.querySelector('input')) {
      //let textForReplace = editButton.closest('.event-container').querySelector('.event-text').innerText;
      const editedText = taskText.querySelector('input').value;
      const indexForEdit = data.indexOf(temp);
      data[indexForEdit] = editedText;
      taskText.innerText = editedText; 
      editButton.innerText = 'Edit'; 
    } else {
      temp = taskText.innerText;
      const inputField = document.createElement('input');
      inputField.classList.add('main-input');
      inputField.setAttribute('type', 'text');
      inputField.value = taskText.innerText;
      taskText.innerHTML = ''; 
      taskText.append(inputField); 
      editButton.innerText = 'Save';
    }
  });
  
}

//Creation of event with mouse click
inputButton.addEventListener('click', () => {
  addItemToList();
});

//Creation of event with press Enter key
userInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addItemToList();
  }
});


//Clear all button
const clearAllBtn = document.createElement('button');
clearAllBtn.innerText = 'Clear All';
clearAllBtn.classList.add('clear-button');

clearAllBtn.addEventListener('click', () => {
  if (list.children.length !== 0) {
    data.length = 0;
    list.innerText = '';
  }
})

container.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON'){
    if (data.length > 0) {
      container.append(clearAllBtn);
    } else {
      clearAllBtn.remove();
    }
  }
})

container.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (data.length > 0) {
      container.append(clearAllBtn);
    } else {
      clearAllBtn.remove();
    }
  }
})
