async function taskIsDone(event) {
    
    let parent = event.parentElement;
    let grandpa = parent.parentElement;
    let idstring = grandpa.children[1].id;
    let id = parseInt(idstring);
    let task_name = grandpa.children[1].innerHTML;
    
    const response = await fetch(`/api/tasks`, {
        method: 'DELETE',
        body: JSON.stringify({
            id,
            task_name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}