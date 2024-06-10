var locationElem = document.getElementById("location");
var modalContainer = document.getElementById("modal-container");

locationElem.addEventListener("click", function () {
    
        modalContainer.style.display = "flex";
        document.body.classList.add("no-scroll"); 
});

function closeModal() {
    modalContainer.style.display = "none";
    document.body.classList.remove("no-scroll");
}
