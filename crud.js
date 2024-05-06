let title = document.getElementById('title'),
     price = document.getElementById('price'),
     quantity = document.getElementById('quantity'),
     taxes = document.getElementById('taxes'),
     discount = document.getElementById('discount'),
     count = document.getElementById('count'),
     category = document.getElementById('category'),
     total = document.getElementById('total'),
     create = document.getElementById('create'),
     tbody = document.getElementById('tbody'),
     updateBtn = document.getElementById('update'),
     titleBtn = document.getElementById('title'),
     categoryBtn = document.getElementById('category'),
     search = document.getElementById('search'),
     button = document.getElementById('delete-all');

let indexNum;
let change = 'create';
// Get Total
function getTotal() {

     if(price.value != ''){
          let result = (+price.value * +quantity.value + +taxes.value) - +discount.value
          total.innerHTML = `${result} E.G`;
          total.style.background = '#040';
     }
     else{
          total.innerHTML = '';
          total.style.background = '#a00d02';
     }
};

// Create Product
let arrayPro;

if(localStorage.product != null) {
     arrayPro = JSON.parse(localStorage.product);
}
else{
     arrayPro = [];
}

create.onclick = function() {
     let dataPro = {
          title: title.value.toLowerCase(),
          price: price.value,
          taxes: taxes.value,
          discount: discount.value,
          quantity: quantity.value,
          total: total.innerHTML,
          count: count.value,
          category: category.value.toLowerCase(),
     }

if(title.value != ''
&& price.value != ''
&& dataPro.count < 101) {

     if(change === 'create'){
          if(dataPro.count > 1) {
               for(let i = 0; i < dataPro.count; i++){
                    arrayPro.push(dataPro);
               }
          }
          else{
               arrayPro.push(dataPro);
          }
     }
     else{
          arrayPro [ indexNum ] = dataPro;
          create.innerHTML = 'Create';
          count.style.display = 'block';
     }
     clearData();
}


     localStorage.setItem('product', JSON.stringify(arrayPro));
     showData();
     total.style.background = '#a00d02';

};

// Clear Inputs
function clearData() {
     title.value = '';
     quantity.value = '';
     price.value = '';
     taxes.value = '';
     discount.value = '';
     total.innerHTML = '';
     count.value = '';
     category.value = '';
}

// Show Data
function showData() {
     let table = '';
     for(let i = 0; i < arrayPro.length; i++){
          table += `
               <tr>
                    <td>${i+1}</td>
                    <td>${arrayPro[i].title}</td>
                    <td>${arrayPro[i].price}</td>
                    <td>${arrayPro[i].quantity}</td>
                    <td>${arrayPro[i].discount}%</td>
                    <td>${arrayPro[i].taxes}</td>
                    <td>${arrayPro[i].category}</td>
                    <td>${arrayPro[i].total}</td>
                    <td>
                         <button class="button">
                                   <span class="button-content" onclick = 'updateData(${i})'> update</span>
                              </button>
                         </td>
                    <td>
                         <button class="button">
                                   <span class="button-content" onclick='removeData(${i})'> Delete</span>
                              </button>
                         </td>
               </tr>
          `;
     }
     document.getElementById('tbody').innerHTML= table;

     if (arrayPro.length > 0) {
          button.style.display = 'block';
          button.innerHTML = `
               <span class="button-content" onclick='deleteAll()'> Delete All (${arrayPro.length})</span>
          `
     }
     else{
          button.style.display = 'none';

     }
};
showData();

// Remove Data
function removeData(i) {
     arrayPro.splice(i , 1);
     localStorage.product = JSON.stringify(arrayPro);
     showData();
};

function deleteAll() {
     localStorage.clear();
     arrayPro.splice(0);
     showData();
};

// Update Data
function updateData(i) {
     title.value = arrayPro[i].title;
     price.value = arrayPro[i].price;
     quantity.value = arrayPro[i].quantity;
     taxes.value = arrayPro[i].taxes;
     discount.value = arrayPro[i].discount;
     getTotal();
     count.style.display = 'none';
     category.value = arrayPro[i].category;
     create.innerHTML = 'Update';
     change = 'update';
     indexNum = i;
     scroll({
          top:0,
          behavior:'smooth'
     })
};

// Search Mood
let defaultSearch = 'title';

// function Search Mood
function searchMood(id) {
     if(id == 'search title') {
          defaultSearch = 'title';
          search.placeholder = 'Search By Title';
          
     }
     else{
          defaultSearch = 'category';
          search.placeholder = 'Search By Category';
     }
     search.focus();
     search.value = '';
     showData();
};

//Search Data Function
function searchData(value) {
     let table = '';
     for(let i = 0; i < arrayPro.length; i++) {

          if(defaultSearch == 'title') {
               if(arrayPro[i].title.includes(value.toLowerCase())){
                    
                    table += `
                         <tr>
                              <td>${i+1}</td>
                              <td>${arrayPro[i].title}</td>
                              <td>${arrayPro[i].price}</td>
                              <td>${arrayPro[i].quantity}</td>
                              <td>${arrayPro[i].discount}%</td>
                              <td>${arrayPro[i].taxes}</td>
                              <td>${arrayPro[i].category}</td>
                              <td>${arrayPro[i].total}</td>
                              <td>
                                   <button class="button">
                                             <span class="button-content" onclick = 'updateData(${i})'> update</span>
                                        </button>
                                   </td>
                              <td>
                                   <button class="button">
                                             <span class="button-content" onclick='removeData(${i})'> Delete</span>
                                        </button>
                                   </td>
                         </tr>
                    `;
               }
          }
          else{
               if(arrayPro[i].category.includes(value.toLowerCase())){
                    
                    table += `
                         <tr>
                              <td>${i+1}</td>
                              <td>${arrayPro[i].title}</td>
                              <td>${arrayPro[i].price}</td>
                              <td>${arrayPro[i].quantity}</td>
                              <td>${arrayPro[i].discount}%</td>
                              <td>${arrayPro[i].taxes}</td>
                              <td>${arrayPro[i].category}</td>
                              <td>${arrayPro[i].total}</td>
                              <td>
                                   <button class="button">
                                             <span class="button-content" onclick = 'updateData(${i})'> update</span>
                                        </button>
                                   </td>
                              <td>
                                   <button class="button">
                                             <span class="button-content" onclick='removeData(${i})'> Delete</span>
                                        </button>
                                   </td>
                         </tr>
                    `;
               }
          }    
     }
     document.getElementById('tbody').innerHTML= table;
};


