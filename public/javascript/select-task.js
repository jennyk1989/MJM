async function addSelectedTask(event) {
    
    let task_name = event.innerText;
    const response = await fetch(`/dashboard`, {
        method: 'POST',
        body: JSON.stringify({
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
