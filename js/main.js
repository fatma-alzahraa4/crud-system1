var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var tableBody = document.getElementById("tableBody");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var warningName=document.getElementById('warningName');
var warningPrice=document.getElementById('warningPrice')

var currentIndex;

var productList;
if(localStorage.getItem('productStore')!= null){
    productList =JSON.parse(localStorage.getItem('productStore'));
    display(productList);
}
else{
    productList=[]; 
}


function addProduct(){
    if(validateProductName() == true && validateProductPrice() == true){
        var product ={
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            desc:productDescInput.value
        }
        productList.push(product);
        clearForm();
        display(productList);
        localStorage.setItem('productStore',JSON.stringify(productList));
        productNameInput.classList.remove('is-valid');
        productPriceInput.classList.remove('is-valid');
        warningName.classList.add('d-none');
        warningPrice.classList.add('d-none');

    
    }
    else{
        if(validateProductName() == false && validateProductPrice() == false){
            warningName.classList.replace('d-none' , 'd-block');
            warningPrice.classList.replace('d-none' , 'd-block');



        }
        else if(validateProductName() == false){
            warningName.classList.replace('d-none' , 'd-block');
            warningPrice.classList.add('d-none');


        }
        else if(validateProductPrice() == false){
            warningPrice.classList.replace('d-none' , 'd-block');
            warningName.classList.add('d-none');


        }
        


    }
    

    

}
function clearForm(){
    productNameInput.value='';
    productPriceInput.value='';
    productCategoryInput.value='';
    productDescInput.value='';
}
function display(list){
    var temp = '';
    for(var i =0;i<list.length;i++){
        temp+=`<tr>
    <td>${i+1}</td>
    <td>${list[i].name}</td>
    <td>${list[i].price}</td>
    <td>${list[i].category}</td>
    <td>${list[i].desc}</td>
    <td><button class="btn btn-outline-success" onclick=setUpdateForm(${i})>Update</button></td>
    <td><button class="btn btn-outline-success" onclick=deleteProduct(${i})>Delete</button></td>
  </tr>`

    }
    tableBody.innerHTML=temp;

    
}

function search(searchTerm){
    var temp =''
    

    for(var j = 0; j<productList.length;j++){
        if(productList[j].name.toLowerCase().includes(searchTerm.toLowerCase())
        ||productList[j].category.toLowerCase().includes(searchTerm.toLowerCase())){
            
            temp+=`<tr>

            <td>${j+1}</td>
            <td><p>${productList[j].name.replace(searchTerm,`<span class="text-danger">${searchTerm}</span>`)}</td>
            <td>${productList[j].price}</td>
            <td> <p>${productList[j].category.replace(searchTerm,`<span class="text-danger">${searchTerm}</span>`)}</td>
            <td>${productList[j].desc}</td>
            <td><button class="btn btn-outline-success" onclick=setUpdateForm(${j})>Update</button></td>
            <td><button class="btn btn-outline-success" onclick=deleteProduct(${j})>Delete</button></td>
            </tr>` 
    
        }
    }
    tableBody.innerHTML=temp;
}

function deleteProduct(deletedIndex){
    productList.splice(deletedIndex,1);
    localStorage.setItem('productStore',JSON.stringify(productList));
    display(productList);

}

function setUpdateForm(updatedIndex){
     currentIndex = updatedIndex;
    productNameInput.value=productList[updatedIndex].name;
    productPriceInput.value=productList[updatedIndex].price;
    productCategoryInput.value=productList[updatedIndex].category;
    productDescInput.value=productList[updatedIndex].desc;
    addBtn.classList.add('d-none');
    updateBtn.classList.replace('d-none','d-inline-block');

}

function update(){
    var product ={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value
    }
    productList[currentIndex]=product;
    addBtn.classList.replace('d-none','d-inline-block');
    updateBtn.classList.replace('d-inline-block', 'd-none')
    localStorage.setItem('productStore',JSON.stringify(productList));
    display(productList);
    clearForm();


}
function validateProductName(){
    var regex = /^[A-Za-z][a-z]{3,8}$/;
    if(regex.test(productNameInput.value)==true){
        productNameInput.classList.replace('is-invalid', 'is-valid');
        return true;
    }
    else{
        productNameInput.classList.add('is-invalid');
        warningName.innerHTML= 'Product Name must be 4-9 characters';

        return false;
    }
    
}



function validateProductPrice(){
    var regex = /^([1-9][0-9]{3,5}|1000000)$/;
    if(regex.test(productPriceInput.value)==true){
        productPriceInput.classList.replace('is-invalid', 'is-valid');
        return true;
    }
    else{
        productPriceInput.classList.add('is-invalid');
        warningPrice.innerHTML= 'Product Price must be a number between 1000 to 1000000';
        return false;
    }
}
