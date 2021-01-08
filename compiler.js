function func()
{
var compile=document.getElementById("compile");  
var load=document.getElementById("Load");  
var text1=document.getElementById("textCode");
var text2=document.getElementById("textOutput");

var langId=document.getElementById("sel").value;
var code=text1.value;

if(code!="")
{
compile.style.display='none';
load.style.display='block';
fetchUser(code,langId);
}
else
{
    alert("Plese type your code");
}
}
function fetchUser(code,langId)
{

    var request=new XMLHttpRequest();
    request.open("POST","https://codequotient.com/api/executeCode");
    var obj=JSON.stringify({code, langId});

    request.setRequestHeader("Content-Type","application/json");
    request.send(obj);

    request.addEventListener("load",function(event)
    {
        var response=JSON.parse(event.currentTarget.responseText);
        if(response.codeId!=null)
        {
            print(response.codeId);
        }
    })
}

function print(codeId)
{
    var text2=document.getElementById("textOutput");
    setTimeout(function(){
        var request=new XMLHttpRequest();
        request.open("GET","https://codequotient.com/api/codeResult/"+codeId);
        request.send();

        request.addEventListener("load",function(event){
            var output=JSON.parse(JSON.parse(event.currentTarget.responseText).data);
            if(output.output != "")
                text2.innerHTML = output.output;
            else
            text2.innerHTML = "error: "+output.errors;
           
        })
        var compile=document.getElementById("compile");  
        var load=document.getElementById("Load");  
        compile.style.display='block';
        load.style.display='none';
    },2000)

}
