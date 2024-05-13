let ToDoListContainerEl=document.getElementById("ToDoListContainer");
let userinputEl=document.getElementById("userinput");

// let userinputVal=userinputEl.value;
// console.log(userinputVal);

// ### added in the function
// let mystoredTodo=localStorage.getItem("mytodo");
// let parsedtodolist=JSON.parse(mystoredTodo);
// let todolits = parsedtodolist;// todo parsist rahegi

function getparsedtodolist(){
  let mystoredTodo=localStorage.getItem("mytodo");
  let parsedtodolist=JSON.parse(mystoredTodo);

  if(parsedtodolist===null){
    return [];
  }
  else{
    return parsedtodolist;
  }
}

 let todolits = getparsedtodolist();
 console.log(todolits);

// let todolits=[
//     {
//         title:"HTML",
//         uniqeId:1
//     },
//     {
//         title:"CSS",
//         uniqeId:2

//     },
//     {
//         title:"Bootstrap",
//         uniqeId:3

//     },
// ];


 function onSaveTodo(){
  let locallystoredlist=JSON.stringify(todolits);// we converting todo object into string
  localStorage.setItem("mytodo",locallystoredlist);
 }
// let lengthfotodo=todolits.length;
// console.log(lengthfotodo);


function todostatuschanage(labelId,chekboxId,todoId){
  let mychecboxEl=document.getElementById(chekboxId);
  let mylabelEl=document.getElementById(labelId);

  // console.log(mychecboxEl.checked);

  if(mychecboxEl.checked===true){
    mylabelEl.classList.add("checked");
  }
  else{
    mylabelEl.classList.remove("checked");
  }

  let Statustodoindex = todolits.findIndex(function(each){
    let eachTodoId = "todo"+each.uniqeId;

    if(eachTodoId===todoId){
      return true;
    }
    else{
      return false;
    }
  })

  // todolits[Statustodoindex].isChecked = true;

  //check kar rahe he to true ho raha our uncheck kar rahe he to false nahi ho raha he variable me store kiya
  //todolits[Statustodoindex].isChecked = true;
  let chekedTodo = todolits[Statustodoindex];
  if(chekedTodo.isChecked===true){
    chekedTodo.isChecked=false;
  }
  else{
    chekedTodo.isChecked=true;
  }
  
}

function OnDeletetodoEl(todoId){
  let deletetodo = document.getElementById(todoId);
  ToDoListContainerEl.removeChild(deletetodo);
  
  let deletetodoindex = todolits.findIndex(function(each){
    let eachTodoId = "todo"+each.uniqeId;

    if(eachTodoId===todoId){
      return true;
    }
    else{
      return false;
    }
  })

  // console.log(deletetodoindex);
   todolits.splice(deletetodoindex,1);

   console.log(todolits);


}

function createandApendtodo(todo){
  let todoId ="todo" + todo.uniqeId;
  let chekboxId="mychecbox" + todo.uniqeId;
  let labelId="mylabel" + todo.uniqeId;


let boxEl=document.createElement("div");
boxEl.classList.add("card1");
boxEl.id=todoId;
ToDoListContainerEl.appendChild(boxEl);

//with the help of this line I create checkbox

let chekboxEl=document.createElement("input");
chekboxEl.type="checkbox";
chekboxEl.id=chekboxId;
chekboxEl.checked=todo.isChecked;//refresh karne ke bad bhi blue tic rahe
boxEl.appendChild(chekboxEl);
chekboxEl.onclick=function(){
  //function ke andar function ko call kiya jo function for loop ke bahar likha he
  todostatuschanage(labelId,chekboxId,todoId);
}

let lablecontainerEl=document.createElement("label");
lablecontainerEl.classList.add("label-container");
lablecontainerEl.htmlFor=chekboxId;
boxEl.appendChild(lablecontainerEl);


//with the help of this I add text like html
  let titletodoEl=document.createElement("p");
  titletodoEl.textContent=todo.title;
  titletodoEl.id=labelId;
  if(todo.isChecked===true){
    titletodoEl.classList.add("checked");
  }
  lablecontainerEl.appendChild(titletodoEl);
  

// for icon
  let deleteEl = document.createElement("i");
  deleteEl.classList.add("fa-solid","fa-trash");
  lablecontainerEl.appendChild(deleteEl);
  deleteEl.onclick= function(){
    OnDeletetodoEl(todoId);
  }


}
let lengthfotodo=todolits.length;
function ontodoadd(){
  let userinputVal=userinputEl.value;

  lengthfotodo = lengthfotodo+1

  
  
  

  //  console.log(userinputVal);
  if(userinputVal===""){
    alert("enter a valid input");

  }

  else{
    let newtodo={
      title:userinputVal,
      uniqeId:lengthfotodo,
      isChecked:false
    }

    todolits.push(newtodo);
    createandApendtodo(newtodo);
    console.log(todolits);

  }
  //for clear the textbox
  userinputEl.value="";


}

for(let todo of todolits){
  createandApendtodo(todo);

}

