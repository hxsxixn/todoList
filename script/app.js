let add = document.querySelector(".add_btn");
let section = document.querySelector("section");
add.addEventListener("click", e => {
    e.preventDefault();

    //get the input values
    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoDate = form.children[1].value;
    let todoDone = false;
    // console.log(todoText, todoDate);

    if(todoText === ""){
        alert("Please Enter Some Text.");
        return;
    }

    if(todoDate === ""){
        alert("Date Error");
        return;
    }

    //create a todo
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoDate;
    
    todo.appendChild(text);
    todo.appendChild(time);

    //create button
    let check_btn = document.createElement("button");
    check_btn.classList.add("check_btn");
    check_btn.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
    check_btn.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");

        //store done boolean
        let listIndex = [...todoItem.parentElement.children].indexOf(todoItem);
        console.log(listIndex);
        let myList_array = JSON.parse(localStorage.getItem("list"));
        myList_array.forEach((item,index) => {
        if(index == listIndex){
            item.todoDone = !item.todoDone
        }
        })
        localStorage.setItem("list",JSON.stringify(myList_array));

        console.log(myList_array);
    })
    let trash_btn = document.createElement("button");
    trash_btn.classList.add("trash_btn");
    trash_btn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';  
    trash_btn.addEventListener("click", e => {
        let deleteItem = e.target.parentElement;
        deleteItem.addEventListener("animationend", () => {
            // let deletetext = deleteItem.children[0].innerText;
            let listIndex = [...deleteItem.parentElement.children].indexOf(deleteItem);
            console.log(listIndex);
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item, index) => {
                if(index == listIndex){
                myListArray.splice(index, 1);
                localStorage.setItem("list", JSON.stringify(myListArray));}
            })
            deleteItem.remove(); 
        })
        deleteItem.style.animation = "scaleDown 0.3s forwards";
    })
    todo.appendChild(check_btn);
    todo.appendChild(trash_btn);

    todo.style.animation = "scaleUp 0.3s forwards";

    //create an object
    let myTodo = {
        todoText: todoText,
        todoTime: todoDate,
        todoDone: todoDone,
    };

    //store data
    let myList = localStorage.getItem("list");
    if(myList == null){
        localStorage.setItem("list", JSON.stringify([myTodo]));
    }else{
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list",JSON.stringify(myListArray));
    }

    console.log(JSON.parse(localStorage.getItem("list")));


    //clear input
    form.children[0].value = "";
    form.children[1].value = "";



    section.appendChild(todo);
})

function loadData(){
    let myList = localStorage.getItem("list");

if(myList !== null){
    let myListArray = JSON.parse(myList);
    myListArray.forEach((item) => {
        //create a todo
        let todo = document.createElement("div");
        todo.classList.add("todo");
        let text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerText = item.todoText;
        let time = document.createElement("p");
        time.classList.add("todo-time");
        time.innerText = item.todoTime;
        if (item.todoDone == true){
            todo.classList.add("done");
        }
        
        //create button
        let check_btn = document.createElement("button");
        check_btn.classList.add("check_btn");
        check_btn.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
        check_btn.addEventListener("click", e => {
            let todoItem = e.target.parentElement;
            todoItem.classList.toggle("done");

            //ES5
            // let listIndex = Array.prototype.slice.call(todoItem.parentElement.children).indexOf(todoItem);
            //ES6
            let listIndex = [...todoItem.parentElement.children].indexOf(todoItem);
            console.log(listIndex);
            let myList_array = JSON.parse(localStorage.getItem("list"));
            myList_array.forEach((item,index) => {
            if(index == listIndex){
                item.todoDone = !item.todoDone
            }
        })
        localStorage.setItem("list",JSON.stringify(myList_array));

        console.log(myList_array);
        })
        
        let trash_btn = document.createElement("button");
        trash_btn.classList.add("trash_btn");
        trash_btn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';  
        trash_btn.addEventListener("click", e => {
            let deleteItem = e.target.parentElement;
            deleteItem.addEventListener("animationend", () => {
                let listIndex = [...deleteItem.parentElement.children].indexOf(deleteItem);
                console.log(listIndex);
                let myListArray = JSON.parse(localStorage.getItem("list"));
                myListArray.forEach((item, index) => {
                    if(index == listIndex){
                    myListArray.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArray));}
                })
                deleteItem.remove(); 
            })
            deleteItem.style.animation = "scaleDown 0.3s forwards";
        })

        todo.appendChild(text);
        todo.appendChild(time);
        todo.appendChild(check_btn);
        todo.appendChild(trash_btn);

        

        section.appendChild(todo);
    })
}

}

loadData();

function mergeTime(arr1,arr2){
    let result = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (Number(new Date(arr1[i].todoTime)) > Number(new Date(arr2[j].todoTime))){
            result.push(arr2[j]);
            j++;
        }else if(Number(new Date(arr1[i].todoTime)) < Number(new Date(arr2[j].todoTime))){
            result.push(arr1[i]);
            i++;
        }else if(Number(new Date(arr1[i].todoTime)) == Number(new Date(arr2[j].todoTime))){
            result.push(arr1[i]);
            i++;
        }
    }
    while (i< arr1.length){
        result.push(arr1[i]);
        i++;
    }
    while (j < arr2.length){
        result.push(arr2[j]);
        j++;
    }
    return result;
}

function mergeSort(arr){
    if(arr.length === 1){
        return arr;
    }else{
        let middle = Math.floor(arr.length / 2);
        let left = arr.slice(0, middle);
        let right = arr.slice(middle);
        return mergeTime(mergeSort(left),mergeSort(right));
    }
}

document.querySelector("#sort_btn").addEventListener("click", () => {
    //sort data
    let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list",JSON.stringify(sortedArray));

    //remove data
    let len = section.children.length;
    for (let i = 0; i <len; i++){
        section.children[0].remove();
    }

    console.log(JSON.parse(localStorage.getItem("list")));

    loadData();
})