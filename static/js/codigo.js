 var butao=document.getElementById("add-btn");
 var modal=document.getElementById("modal");
 modal2=document.getElementById("modal2");
 btnx2=document.getElementById('x2');
 sec=document.getElementById("sec1");
 modal1=document.getElementById("modal1");
 rmvbtn=document.getElementById("remove-btn");
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
rmvbtn.onclick=function(){
    modal2.style.display="block";
    sec.style.opacity="0.1";

}
btnx2.onclick=function(){
    modal1.style.display="none";
    sec.style.opacity="1";


}
btnx.addEventListener('click',function(){
    
   
    modal.style.display = 'none';
    sec.style.opacity= '1';
})
mudcod.onclick=function(){
    modal1.style.display = 'block';
    sec.style.opacity= '0.1';

}