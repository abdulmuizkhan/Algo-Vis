////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var arr=[];


function createbar(lent=60){
    const bar = document.querySelector("#bars");
    bar.innerHTML = '';

    for(var i=0;i<lent;i++){
        arr[i]=Math.floor((Math.random()*150)+10);
    }

    for(var i=1;i<=lent;i++){
        var ele=document.createElement("DIV");
        ele.setAttribute("id","height"+i);
        document.getElementById("bars").appendChild(ele);
        ele.classList.add("heights");
    }
    for(var i=1;i<=lent;i++){
        var xx=document.getElementById("height"+i);
        xx.style.height=2*arr[i-1]+"px";
        
    }
}


createbar();

var no_bars=60;

var size=document.querySelector("#Size");
size.addEventListener('input',function(){
    no_bars=parseInt(size.value);
    createbar(no_bars)
});

function change(){
    createbar(no_bars);
}

delay=200;

var eve=document.getElementById("newarray");
eve.addEventListener("click",change);





var speed=document.querySelector("#speed");
speed.addEventListener('input',function(){
    
          delay=320-parseInt(speed.value);
          
         
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function swap(el1,el2)
    {
 
      const style1 = window.getComputedStyle(el1);
      const style2 = window.getComputedStyle(el2);
 
 
      const transform1 = style1.getPropertyValue("height");
      const transform2 = style2.getPropertyValue("height");
 
      el1.style.height = transform2;
      el2.style.height = transform1;

    }

    function waitforme(milisec) { 
        return new Promise(resolve => { 
            setTimeout(() => { resolve('') }, milisec); 
        }) 
    }
///////////////////////////////////////////////////////////////////////////////////
function disable(){
    document.getElementById("newarray").disabled=true;
    document.getElementById("bubsort").disabled=true;
    document.getElementById("sesort").disabled=true;
    document.getElementById("insort").disabled=true;
    document.getElementById("qsort").disabled=true;
    document.getElementById("msort").disabled=true;
    document.getElementById("Size").disabled=true;

}
function enable(){
    document.getElementById("newarray").disabled=false;
    document.getElementById("bubsort").disabled=false;
    document.getElementById("sesort").disabled=false;
    document.getElementById("insort").disabled=false;
    document.getElementById("qsort").disabled=false;
    document.getElementById("msort").disabled=false;
    document.getElementById("Size").disabled=false;
}
/////////////////////////////////////////////////////////////////////////////////////////
   async function bubble(){
       var ele=document.querySelectorAll(".heights");
        for(var i=0;i<ele.length;i++){
            for(var j=0;j<ele.length-1-i;j++){
                
                
                    ele[j+1].style.backgroundColor="blue";
                    ele[j].style.backgroundColor="blue";

                if(parseInt(ele[j].style.height)>parseInt(ele[j+1].style.height)){
                    await waitforme(delay)
                    swap(ele[j],ele[j+1]);
                }
                ele[j+1].style.backgroundColor="white";
                ele[j].style.backgroundColor="white";
            }
        }
    }

var bsort=document.getElementById("bubsort");
bsort.addEventListener("click",async function(){
    disable();
    await bubble();
    enable();
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function selection(){
    const arry=document.querySelectorAll('.heights');

    for(var i=0;i<arry.length-1;i++){
       let minind=i;
       arry[i].style.backgroundColor="red";
        for(var j=i+1;j<arry.length;j++){
            arry[j].style.backgroundColor="blue";

            await waitforme(delay);

             if(parseInt(arry[j].style.height) < parseInt(arry[minind].style.height)){
                if(minind!=i){
                    arry[minind].style.backgroundColor="white";
                }
                minind=j;
             }
             else{
                arry[j].style.backgroundColor="white";
             }
             
        }
        await waitforme(delay);
             swap(arry[i],arry[minind]);
             var k=arr[i];
             arr[i]=arr[minind];
             arr[minind]=k;
            arry[minind].style.backgroundColor="white";
            arry[i].style.backgroundColor="white";
    }
}


var sesort=document.getElementById("sesort");
sesort.addEventListener('click',async function(){
   disable();
    await selection();
    enable();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function insert(){
    const v=document.querySelectorAll('.heights');
    for(var i=1;i<v.length;i++){
        var key=parseInt(v[i].style.height);
        v[i].style.backgroundColor="red";
        var j=i-1;
        while(j>=0 && parseInt(v[j].style.height)>key){
            v[j].style.backgroundColor="blue";
            await waitforme(delay);
            v[j+1].style.height=v[j].style.height;
            v[j].style.backgroundColor="white";
            j=j-1;
           
        }
        await waitforme(delay);
        v[i].style.backgroundColor="white";
        v[j+1].style.height=key+"px";
    }
}

var insort=document.getElementById("insort");
insort.addEventListener('click',async function(){
    disable();
    await insert();
    enable();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function patrition(ele,l,r){
       
        ele[r].style.backgroundColor="red";
        var i=l-1;
        for(var j=l;j<=r-1;j++){
            ele[j].style.background = 'yellow';
            await waitforme(delay);
            if(parseInt(ele[j].style.height)<parseInt(ele[r].style.height)){
                i++;
                swap(ele[i],ele[j]);
             ele[i].style.backgroundColor="gray";
             if(i != j) ele[j].style.backgroundColor = 'gray';
             
             await waitforme(delay);
            }
            else{
                ele[j].style.backgroundColor = 'pink';
            }

        }
        i++;
        ele[r].style.backgroundColor="pink";
        ele[i].style.backgroundColor="green";
        await waitforme(delay);
        swap(ele[i],ele[r]);
        for(let k = 0; k < ele.length; k++){
            if(ele[k].style.backgroundColor != 'green')
                ele[k].style.backgroundColor = 'white';
        }
        return i;
}

async function qsort(ele,l,r){
       if(l < r){
           var pi=await patrition(ele,l,r);
           await qsort(ele,l,pi-1);
           await qsort(ele,pi+1,r);
       }
       else{
        if(l >= 0 && r >= 0 && l <ele.length && r <ele.length){
            ele[r].style.background = 'green';
            ele[l].style.background = 'green';
        }
} 
}


var quisort=document.getElementById("qsort");
quisort.addEventListener('click',async function(){
    var ele=document.querySelectorAll('.heights');
    var l=0;
    var r=ele.length-1;
    disable();
    await qsort(ele,l,r);
    enable();
   
});



////////////////////////////////////////////////////////////////////////////////////////////////

async function merge(ele,l,m,r){
    var n1=m-l+1;
    var n2=r-m;
    var left=new Array(n1);
    var right=new Array(n2);
    for(var i=0;i<n1;i++){
        left[i]=ele[l+i].style.height;
    }
    for(var j=0;j<n2;j++){
        right[j]=ele[(j+1+m)].style.height;
    }
    var i=0,j=0,k=l;
    while(i<n1 && j<n2){
        await waitforme(delay);
       if(parseInt(left[i])<=parseInt(right[j])){
           ele[k].style.height=left[i];
           i++;
       }
       else{
        ele[k].style.height=right[j];
        j++;
       }
       k++;
    }
    while(i<n1){
        await waitforme(delay);
        ele[k].style.height=left[i];
           i++;
           k++;
    }
    while(j<n2){
        await waitforme(delay);
        ele[k].style.height=right[j];
        j++;
        k++;
    }
}

async function msort(ele,l,r){
    if(l>=r){
        return;
    }
    var m=l+Math.floor((r-l)/2);
    await msort(ele,l,m);
    await msort(ele,m+1,r);
    await merge(ele,l,m,r);
}


var mrsort=document.getElementById("msort");
mrsort.addEventListener('click',async function(){
    var ele=document.querySelectorAll('.heights');
    var l=0;
    var r=parseInt(ele.length-1);
    disable();
    await msort(ele,l,r);
    enable();
});