 const acceptBtn = document.getElementById("accept-btn");
 const modal = document.getElementById("modal");
 const btnx2 = document.getElementById('x2');
 const sec = document.getElementById("delete-container");
 const modal1 = document.getElementById("modal1");
 const btnx = document.getElementById("x");
 const mudcod = document.getElementById('mudcod');

 const homeBtn = document.getElementById('home-btn');
 const logo = document.getElementById('logo');
 const textoInicial = document.getElementsByClassName('texto-inicial');


acceptBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'flex';
    sec.style.opacity = '0.1';
    homeBtn.style.opacity = '0.1';
    textoInicial[0].style.opacity = '0.1';
    logo.style.opacity = '0.1';

})

btnx.addEventListener('click', function(){
    modal.style.display = 'none';
    sec.style.opacity = '1';
    homeBtn.style.opacity = '1';
    textoInicial[0].style.opacity = '1';
    logo.style.opacity = '1';
})

mudcod.onclick=function(e){
    e.preventDefault();
    modal1.style.display = 'flex';
    sec.style.opacity = '0.1';
    homeBtn.style.opacity = '0.1';
    textoInicial[0].style.opacity = '0.1';
    logo.style.opacity = '0.1';
}

btnx2.onclick=function(){
    modal1.style.display = "none";
    sec.style.opacity =" 1";
    homeBtn.style.opacity = '1';
    textoInicial[0].style.opacity = '1';
    logo.style.opacity = '1';
}

// Function to show message in the card
function showMessage(message, type) {
    var messageCard = document.getElementById('message-card');
    var messageText = document.getElementById('message-text');

    // Set the message and style based on type
    messageText.innerText = message;
    if (type === 'success') {
        messageCard.classList.remove('error');
        messageCard.classList.add('success');
    } else {
        messageCard.classList.remove('success');
        messageCard.classList.add('error');
    }

    // Show the message card
    messageCard.classList.remove('hidden');

    // Hide the message card after 5 seconds
    setTimeout(function() {
        messageCard.classList.add('hidden');
    }, 5000);
}


function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}