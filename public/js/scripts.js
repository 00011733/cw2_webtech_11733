
const btnEl = document.querySelector('.close');

btnEl.addEventListener('click', function() {
    document.querySelector('.alert').classList.add('display-none');
});

function closeNotification() {
    setTimeout(() => {
        document.querySelector('.alert').classList.add('display-none');
    }, 3000)
}
