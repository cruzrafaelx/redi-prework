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
                        <button type="buttony" class="delete-btn">delete</button>
                    </div>
        `

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
        console.log("Editing")
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
    }, 3000)

}

//set back to default
const setBackToDefault = () => console.log('Setback to default!')


//EVENT LISTENERS
//Submit Form
form.addEventListener('submit', addItem)


//LOCAL STORAGE
const addToLocalStorage = (id, value) => {
    console.log("Add to local storage")
}
