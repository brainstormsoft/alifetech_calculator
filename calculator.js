const Calculator=document.querySelectorAll(".calculator");
const numbers =document.querySelectorAll(".number");
const operators =document.querySelectorAll(".operator");
const functionalities =document.querySelectorAll(".functionality");
const equalTo =document.querySelectorAll(".calculate");
const Theme= document.querySelector(".theme");
const dotMenu=document.querySelector(".dotMenu");
const Keyboard =document.querySelectorAll(".keyboard");
const themeModeDropdown=document.querySelectorAll(".dot-dd");

// clickEffect() takes care of the click effect...
function clickEffect(keys,effectColor,restColor){

    for(let i=0; i < keys.length; i++){
        let key=keys[i];
        
        key.addEventListener("click",function(){
            key.style.backgroundColor=effectColor;
            key.style.transition="2s";

            setTimeout(function(){
            key.style.backgroundColor=restColor;
            key.style.transition="2s";
            },300)
        })
    }

}

// reusing the function for four different instances...
clickEffect(numbers,"grey","transparent");
clickEffect(functionalities,"grey","transparent");
clickEffect(equalTo,"white","rgb(255,30,0)");
clickEffect(operators,"grey","rgb(221,221,221)");
//click effect module stops here...

let themeMode= false;
function reuseTheme(nodes,bgColor,textColor){
  for(i=0; i < nodes.length; i++){
    let node= nodes[i];

    node.style.backgroundColor=bgColor;
    node.style.color=textColor;
    node.style.transition="2s";
  }
}

Theme.addEventListener("click",function(){
 dropDownEffect(themeModeDropdown,"none");

  if(themeMode==false){
   reuseTheme(Calculator,"rgb(38, 46, 41)","white");
   reuseTheme(Keyboard,"#121212","white");
   reuseTheme(numbers,"transparent","white");
   reuseTheme(functionalities,"transparent","white");
   reuseTheme(dotMenu,"transparent","white");

   Theme.innerHTML="Light mode";

   return themeMode=true;
  }else{
   reuseTheme(Calculator,"#fff","#121212");
   reuseTheme(Keyboard,"rgb(236, 240, 236)","#121212");
   reuseTheme(numbers,"transparent","#121212");
   reuseTheme(functionalities,"transparent","#121212");
   reuseTheme(dotMenu,"transparent","#121212")
  
   Theme.innerHTML="Dark mode";

   return themeMode=false;
  }
})


function dropDownEffect(nodes,state){
  nodes.forEach((val,i,arr)=> {
     let node= nodes[i];

     node.style.display=state;
  });
}

let dropdownStateMode=false;

dotMenu.addEventListener("click",function(){
  
  if(dropdownStateMode==false){
   dropDownEffect(themeModeDropdown,"flex")

   return dropdownStateMode=true;
  }else{
    dropDownEffect(themeModeDropdown,"none")

   return dropdownStateMode=false;
  }
})

