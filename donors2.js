let number = document.getElementById('#');
let name = document.getElementById('name');
let BloodGroup = document.getElementById('Blood Group');
let Information = document.getElementById('Information');
let previousdonation = document.getElementById('previous donation');
let submit = document.getElementById('submit');

//console.log(number,name,BloodGroup,Information,previousdonation,submit)


function get(){
    //  console.log('done')
    if(number.value != ''){
        console.log('error')
    }
}
 
let datacreate = [];

submit.onclick = function(){

    let newcreate = {
        number : number.value,
        name : name.value,
        BloodGroup : BloodGroup.value,
        Information : Information.value,
        previousdonation : previousdonation.value,
        submit : submit.value
        }
      //  console.log('newcreate ')
}
datacreate.push(newcreate);
//save
localStorage.setItem('create', JSON.stringify(datacreate))


function cleardata(){
    number.value = '';
    name.value = '';
    BloodGroup.value = '';
    Information.value = '';
    previousdonation = '';
    submit.value = '';
}

//read
function showdata(){
    let table = '';
    for(let i=0; i < datacreate.length; i++){
        table += 
        <tr>
        <td>${i}</td>
       <td>${datacreate[i].name}</td>
       <td>${datacreate[i].BloodGroup}</td>     
       <td>${datacreate[i].Information}</td>  
       <td>${datacreate[i].previousdonation}</td>
       <td><button id="update">update</button></td> 
       <td><button onclick="deleteData(${i} )" id="delete">delete</button></td> 
   
   </tr> 
        console.log(table)
    }

   document.getElementById('tbody').innerHTML = table;
}
showdata();

//delete
function deleteData(i){
   // console.log(i)
   datacreate.splice(i,1);
   localStorage.product = JSON.stringify(datacreate);
   showdata();
}
