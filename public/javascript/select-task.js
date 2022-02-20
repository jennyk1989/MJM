async function selectTask () {
    let selected = this.value; 

    switch(selected) {
        case "workout": 
            //add the workout task
            const task_name = 'Work Out';
            addSelectedTask (task_name);
            break;
        case "clean": 
            //add the workout task
            const task_name = 'Clean';
            addSelectedTask (task_name);
            break;
        case "study": 
            //add the workout task
            const task_name = 'Study';
            addSelectedTask (task_name);
            break;
        case "walkpet": 
            //add the workout task
            const task_name = 'Walk Pet';
            addSelectedTask (task_name);
            break;
        case "shop": 
            //add the workout task
            let task_name = 'Shop';
            addSelectedTask (task_name);
            break;
        case "games": 
            //add the workout task
            let task_name = 'Play Games';
            addSelectedTask (task_name);
            break;
        case "watchgame": 
            //add the workout task
            let task_name = 'Watch Game';
            addSelectedTask (task_name);
            break;
        case "watchshow": 
            //add the workout task
            let task_name = 'Watch Show';
            addSelectedTask (task_name);
            break;
        case "cook": 
            //add the workout task
            let task_name = 'Cook';
            addSelectedTask (task_name);
            break; 
    }

    function addSelectedTask(task_name) {
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
    
}
document.getElementById('task-panel').addEventListener('click', selectTask);