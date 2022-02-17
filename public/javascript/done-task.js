// id for todo take = "todo-task"
async function markDone(event) {
    event.preventDefault();
    //get the id of the task 
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/task/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            task_name,
            category_id
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

document.getElementById('todo-task').onclick(markDone);

// id for done = "done-task"