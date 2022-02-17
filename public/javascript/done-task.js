// id for todo take = "todo-task"
async function markDone(event) {
    event.preventDefault();
    //get the id of the task 
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/dashboard/`, {
        method: 'DELETE',
        body: JSON.stringify({
            id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard'); //go to dash once post successfully deleted
    } else {
        alert(response.statusText);
    }
};

document.getElementById('done-btn').addEventListener('click', markDone);
