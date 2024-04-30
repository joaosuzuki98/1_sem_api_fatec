 var butao=document.getElementById("add-btn");
 var modal=document.getElementById("modal");
 sec=document.getElementById("sec1");
 modal1=document.getElementById("modal1")
 var x=0
 btnx=document.getElementById("x");
 mudcod=document.getElementById('mudcod');
// butao.onclick=function(){
//     modal.style.display="block";
//     section.style.opacity='10%';
// }
butao.addEventListener('click',function() {
    
 
    modal.style.display = 'block';
    sec.style.opacity= '0.1';
    
})
btnx.addEventListener('click',function(){
    
   
    modal.style.display = 'none';
    sec.style.opacity= '1';
})
mudcod.onclick=function(){
    modal1.style.display = 'block';
    sec.style.opacity= '0.1';

}