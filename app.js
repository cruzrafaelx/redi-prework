//SELECT ITEMS

const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

//EDIT OPTION
let editElement
let editFlag = false
let editID = ''

//FUNCTIONS
//Add item
const addItem = e => {
    e.preventDefault()

    //Get value of grocery input 
    const value = grocery.value

    //Create unique ID hack
    const id = new Date().getTime().toString()
    
    if(value && !editFlag){
        const element = document.createElement('article')

        //add class
        element.classList.add('grocery-item')

        //add id
        const attr = document.createAttribute('data-id')
        attr.value = id
        element.setAttributeNode(attr)

        //add HTML
        element.innerHTML = `<p class="title">${value}</p>
                    <div class="btn-container">
                        <button type="button" class="edit-btn">edit</button>
                        <button type="button" class="delete-btn">delete</button>
                    </div>
        `
        //Access deleteBtn and editBtn from the dynamic iten
        const deleteBtn = element.querySelector('.delete-btn')
        const editBtn = element.querySelector('.edit-btn')
        deleteBtn.addEventListener('click', deleteItem)
        editBtn.addEventListener('click', editItem)

        //append child to list
        list.appendChild(element)
        //display alert
        displayAlert('item added to the list', 'success')
        //show container
        container.classList.add('show-container')
        //add to local storage
        addToLocalStorage(id, value)
        //setback to default
        setBackToDefault()
    }
    else if (value && editFlag){
        console.log(editElement)
        displayAlert('value change', 'success')
        editElement.innerText = value
        //edit local stroage
        editLocalStorage(editID, value)
        setBackToDefault()
    }
    else {
        displayAlert('please enter value', 'danger')
    }
}

//Display Alert
const displayAlert = (text, action) => {
    alert.textContent = text
    alert.classList.add(`alert-${action}`)
    
    //Remove alert
    setTimeout(()=>{
        alert.textContent = ''
        alert.classList.remove(`alert-${action}`)
    }, 1000)

}

//Clear items
const clearItems = () => {

    //Select all your grocery items in the list
    const items = document.querySelectorAll('.grocery-item')
    
    //If node is not empty, grab each child and remove from list
    if(items.length > 0){
        items.forEach(item => list.removeChild(item))
    }

    //hide container
    container.classList.remove('show-container')
    displayAlert('empty list', 'danger')
    setBackToDefault()
}

//Set back to default
const setBackToDefault = () => {
     grocery.value = ''
     editFlag = false
     editID = ''
     submitBtn.textContent = 'submit'
}


//EVENT LISTENERS

//Submit Form
form.addEventListener('submit', addItem)

//Clear Items
clearBtn.addEventListener('click', clearItems)

//Edit Item
const editItem = (e) => {
    console.log('Item edited')
    const element = e.currentTarget.parentElement.parentElement
    //Set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling
    console.log(editElement.innerHTML)
    //Set form value
    grocery.value = editElement.innerHTML
    editFlag = true
    editID = element.dataset.id
    submitBtn.textContent = 'edit'
}

//Delete Item
const deleteItem = (e) => {
    const element = e.currentTarget.parentElement.parentElement
    const id = element.dataset.id
    list.removeChild(element)
   

    if(list.children.length === 0){
        container.classList.remove('show-container')
    }

    displayAlert('item removed', 'danger')
    setBackToDefault()
    removeFromLocalStorage()

    //remove from local storage
    removeFromLocalStorage(id)
}


//LOCAL STORAGE
const addToLocalStorage = (id, value) => {
    //const grocery = {id:id, value:value} 
    const grocery = { id, value } //ES6 shorthand for same names
    console.log(grocery)
    let items = localStorage.getItem('list') 
                ? JSON.parse(localStorage.getItem('list')) 
                : []

    console.log(items)
    items.push(grocery)
    localStorage.setItem('list', JSON.stringify(items))


}

const editLocalStorage = (id, value) => {

}

const removeFromLocalStorage = id => {
    console.log(id)
}

//setItem
//localStorage.setItem('orange', JSON.stringify(['item1', 'item2']))

//getItem
//const oranges = JSON.parse(localStorage.getItem('oranges'))

//removeItem
//localStorage.removeItem('orange')