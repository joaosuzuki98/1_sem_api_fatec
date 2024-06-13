// Faz o efeito de fade do título do overview
window.onload = function() {
    setTimeout(function() {
        document.getElementById('overview-title').style.opacity = 0;
    }, 1000);
};
let diavalue = document.getElementById('dia').textContent.trim();
let mesvalue = document.getElementById('mes-timelapse').textContent.trim();
let anovalue = document.getElementById('ano-timelapse').textContent.trim();

 

    $.ajax({ 
        url: '/', 
        type: 'POST', 
        data: JSON.stringify({dia: diavalue, mes: mesvalue, ano: anovalue}),  // Send the variable's value in the request body
        contentType: 'application/json',
        success: function(response) {
         console.log('aaaa');        
        }
    })
