async function taskIsDone(event) {
    
    let task_name = event.children[1].innerHTML;
    let allinfo = event;
    let idstring = event.children[1].id;
    let id = parseInt(idstring);
    console.log(task_name);
    console.log(allinfo);
    console.log(id);
    const response = await fetch(`/dashboard`, {
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
