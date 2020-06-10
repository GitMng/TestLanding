let preloader
function loadNow(opacity) {
    if (opacity <= 0) {
        displayContent()
    }
    else {
        preloader.style.opacity = opacity
        window.setTimeout(() => loadNow(opacity - 0.05), 200)   }
}

function displayContent() {
    preloader.style.display = 'none'
    document.querySelector('.content').style.display = 'block'
}

document.addEventListener("DOMContentLoaded", function() {
    preloader = document.querySelector('#loader')
    loadNow(1)
})


$(function () {

})