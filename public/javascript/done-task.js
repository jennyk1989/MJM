// id for todo take = "todo-task"
function remove(donetask) {
    //event.target.closest('tr').remove();
    let yourdone = donetask;
    yourdone.remove();
}

document.getElementById('done-btn').addEventListener('click', remove);
