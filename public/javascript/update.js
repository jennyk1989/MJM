async function updateHandler (event) {
    event.preventDefault();

    const task_name = document.getElementById('updated-task').value;
    //get the id of the task from the url
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            task_name, //send updated task
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (response.ok) {
        document.location.replace('/dashboard/'); //successful update of task? -> redirect to dash
    } else {
        document.location.replace('/dashboard/');
    }
};

document.getElementById('update-btn').addEventListener('click', updateHandler);
