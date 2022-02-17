async function taskFormHandler(event) {
    event.preventDefault();
    const comment_text = document
          .querySelector('textarea[name="comment-body"]')
          .value.trim();
    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    if (task_text) {
        const response  = await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify({
                day_id,
                task_text,
            }),
            headers: {
                "Context-Type": "applictation/json",
            },
        });
        if (response.ok) {
            document.location.reload();
        }else {
            alert(response.statusText);
        }
    }
}

document.querySelector(".task-form").addEventListener("submit", taskFormHandler);


