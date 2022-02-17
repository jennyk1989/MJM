function dashy() {
    //event.target.closest('tr').remove();
    document.location.replace('/dashboard/');
}
document.querySelector('#delete-btn').addEventListener('click', dashy);