var bookmarkName=document.getElementById("bookmarkName");
var bookmarkURL=document.getElementById("bookmarkURL");
var tableContent=document.getElementById("tableContent");
var submitBtn=document.getElementById("submitBtn")
var urlContainer=sessionStorage.getItem("urls")?JSON.parse(sessionStorage.getItem("urls")):[];
var nameRegex=/^[a-zA-Z]{3,50}$/;
var urlrgex=/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
var allInputs=document.querySelectorAll("input");
for(var i=0; i<allInputs.length;i++){
    allInputs[i].addEventListener("input",function(){
        switch(this){
            case bookmarkName:
                validInputs(nameRegex,bookmarkName);
                break;
            case bookmarkURL:
                validInputs(urlrgex,bookmarkURL);
                break;

            default:
                break;
        }
    })
}
function validInputs(inputregex,inputValue){
if( inputregex.test(inputValue.value)){
    inputValue.classList.add('is-valid');
    inputValue.classList.remove('is-invalid');
    return true
}else{
    inputValue.classList.remove('is-valid');
    inputValue.classList.add('is-invalid');
    return false
}
}
function confirmInputs(){
    return(
        validInputs(nameRegex,bookmarkName)||
        validInputs(urlrgex,bookmarkURL)
    )
}
function addUrl(){
    if(confirmInputs()){
        var oneUrl={
            urlName:bookmarkName.value ,
            urlLink:bookmarkURL.value
        }
        urlContainer.push(oneUrl);
        sessionStorage.setItem("urls",JSON.stringify(urlContainer));
        clearInputs();
        displayUrls();
    }
    else{
        var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
                modal.show();
    }

}
function clearInputs(){
    bookmarkName.value=null;
    bookmarkURL.value=null;
}
function displayUrls(){
    var content=``;
    for(var i=0;i<urlContainer.length;i++){
        content+=` <tr>
          <td>${i+1}</td>
          <td>${urlContainer[i].urlName}</td>              
          <td>
            <button class="btn btn-success" data-index="0"  onclick="visitUrl(${i})">
              <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
          </td>
          <td>
            <button class="btn btn-danger pe-2" data-index="0" onclick="deleteUrl(${i})">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button>
          </td>
      </tr>`
    }
    document.getElementById("tableContent").innerHTML=content
}
function deleteUrl(i){
urlContainer.splice(i,1);
sessionStorage.setItem("urls",JSON.stringify(urlContainer));
displayUrls();
}
function visitUrl(i){
    window.open("https://"+urlContainer[i].urlLink, "_blank");
}