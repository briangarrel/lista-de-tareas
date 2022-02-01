// Select the elements
const clear         = document.querySelector(".clear");
const dateElement   = document.getElementById("date");
const list          = document.getElementById("list");
const input         = document.getElementById("input");

// Classes names
const CHECK         = "fa-check-circle";
const UNCHECK       = "fa-circle-thin";
const LINE_THROUGH   = "lineThrough";

// Variables 
let LIST = [], id = 0;

// get item from local storage
const data = localStorage.getItem("TODO")

// check if data is not empty
if ( data ) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

// load item to the user's interface
function loadList (array) {
    array.forEach( function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}

// clear the local storage
clear.addEventListener( "click", function () {
    localStorage.clear();
    location.reload();
})

// Show todays date
const today     = new Date();
const options   = {weekday : "long", month : "short", day : "numeric" };

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Add to do function
function addToDo (toDo, id, done, trash) {
    
    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id=${id}></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                    </li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);

}

// Add an item to the list user the enter key 
document.addEventListener ("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value.trim();

        // if the input is not empty 
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id,
                done: false,
                trash: false,
            });

            // add item to localstorage 
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

function comlpeteToDO (element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}


function removeToDo (element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}


list.addEventListener ( "click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if ( elementJob == "complete" ) {
        comlpeteToDO(element) 
    } else if ( elementJob == "delete" ) {
         removeToDo(element);
    }

    // add item to localstorage 
    localStorage.setItem("TODO", JSON.stringify(LIST));
});