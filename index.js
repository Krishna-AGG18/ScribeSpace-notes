function update(){
    let text = document.getElementById("note").value;
    if(text.trim()==="")
    {
        console.log("Please enter field , field is empty!!");
    }
    else{
        if(localStorage.getItem('noteJson')==null){
            noteJsonArray = [];
            noteJsonArray.push([text]);
            localStorage.setItem('noteJson',JSON.stringify(noteJsonArray));
        }
        else{
            noteJsonArraystr = localStorage.getItem('noteJson');
            noteJsonArray = JSON.parse(noteJsonArraystr);
            noteJsonArray.push([text]);
            localStorage.setItem('noteJson',JSON.stringify(noteJsonArray));
        }
    }
    document.getElementById("note").value = "";
    loadtogrid();
}
function loadtogrid(){
    grid = document.getElementById("datashow");
    if(localStorage.getItem('noteJson')==null){
        noteJsonArray = [];
        localStorage.setItem('noteJson',JSON.stringify(noteJsonArray));
    }
    else{
        noteJsonArraystr = localStorage.getItem('noteJson');
        noteJsonArray = JSON.parse(noteJsonArraystr);
    }
    str = "";
    noteJsonArray.forEach((element,index) => {
        str += `
        <div class="col-sm-4 p-3">
                <label for="note1" class="fw-bold text-info">📓 Note ${index+1} :</label>
                <textarea id="note${index}" class="form-control mt-3" rows="5" disabled>${element}</textarea>
                <button class="btn btn-sm btn-danger mt-3" id="hatao" onclick="hatao(${index})">Remove</button>
                <button class="btn btn-sm btn-warning mt-3" id="modify${index}" onclick="modify(${index})">Modify </button>
                <button class="btn btn-sm btn-success mt-3" id="save${index}" onclick="save(${index})" disabled>Save </button>
        </div>
        `
    });
    grid.innerHTML = str;
}
let add = document.getElementById("add");
add.addEventListener("click",update);
loadtogrid();
//function to remove the item
function hatao(indexarr){
    noteJsonArraystr = localStorage.getItem('noteJson');
    noteJsonArray = JSON.parse(noteJsonArraystr);
    noteJsonArray.splice(indexarr,1);
    localStorage.setItem('noteJson',JSON.stringify(noteJsonArray));
    loadtogrid();
}
function modify(index) {
    let textarea = document.getElementById(`note${index}`);
    textarea.removeAttribute("disabled") ;
    document.getElementById(`modify${index}`).innerText = "ModifyNow";
    document.getElementById(`save${index}`).removeAttribute("disabled");
}
//function to save
function save(index) {
    let textarea = document.getElementById(`note${index}`);
    let noteJsonArray = JSON.parse(localStorage.getItem("noteJson"));

    // Update the note in the array
    noteJsonArray[index] = textarea.value.trim();

    // Save the updated array to localStorage
    localStorage.setItem("noteJson", JSON.stringify(noteJsonArray));

    // Disable the textarea again
    textarea.setAttribute("disabled", "true");

    // Toggle button visibility back to Modify
    document.getElementById(`modify${index}`).innerText = "Modify";
    document.getElementById(`save${index}`).setAttribute("disabled", "true");

    console.log(`Note ${index + 1} updated successfully!`);
}


// function to clear all the notes at once 
function clearall(){
    if(confirm("Are you sure want to clear all your notes ? "))
    {
        localStorage.removeItem('noteJson');
        loadtogrid();
        console.log("Removed all the notes !!");
    }
}