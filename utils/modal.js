const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".modal-button");
const modalText = document.querySelector("p");

const showModal = (text) => {
    modalText.innerText = text;
    modal.style.display = "flex";
}

const removeModal = () => {
    modal.style.display = "none";
}

modalButton.addEventListener("click" ,removeModal)

export {showModal}