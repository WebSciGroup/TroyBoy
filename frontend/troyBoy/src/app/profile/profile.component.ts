import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';
import { HttpService } from '../http.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  first_name: string= '';
  items_ordered: string= '';
  previous_sales: string= '';

  @Output() searchContent = new EventEmitter<any>();
  constructor(private httpService: HttpService, private element: ElementRef) { }
  ngOnInit(): void {

    $('#btn-enter').on("click", (e:any)=>{
      let titles= <string>$('#createFirstName').val()
      let jsonResult: any= {};
      if(titles){
        this.httpService.searchKeyword2(titles).subscribe((res)=>{
          console.log(JSON.stringify(res));
          jsonResult= res;
          console.log(JSON.stringify(res));
          var name= jsonResult[0].firstName;
          var items= jsonResult[0].itemsOrdered;
          var orders= jsonResult[0].itemsSold;
          this.first_name= "Hello, " + name + "!";
          this.items_ordered= "Items Ordered: " +items ;
          this.previous_sales= "Previous Sales: "+ orders;
          console.log(items);
          //this.element.nativeElement.setAttribute()
          //$("#name").html("Hello, " + name + "!" );
          // let myContainer= document.getElementById('name_profile') as HTMLInputElement;
          // myContainer.value= name;
          // document.addEventListener("DOMContentLoaded", function(event){
          //   (document.getElementById('name'))!.innerHTML= "hello";
          // });
          

          this.searchContent.emit(res);
        })
      }else{
         //on click call api here
        this.httpService.getProfile().subscribe((res:any)=>{
          console.log(res);
          this.searchContent.emit(res);
        });
      }
     

      e.preventDefault();
    });

  }
  
}

// export class AppComponent{
//   getAll(){
//     function get(url: any){
//       return new Promise((resolve, reject)=>{
//         const req= new XMLHttpRequest()
//         req.onreadystatechange= function(){
//           if(req.readyState === 4 && req.status === 200){
//             resolve(req.responseText)
//           }
//           req.onerror= function(){
//             reject(Error(req.statusText))
//           }
//         }
//         req.open('GET', url)
//         req.send()
//       })
//     }
  
//     get('http://localhost:3000/create-user')
//     .then(response=> console.log(response))
//     .catch(error=> console.log(error))
//   }
// }

// export async function getAll(){
//   function get(url: any){
//     return new Promise((resolve, reject)=>{
//       const req= new XMLHttpRequest()
//       req.onreadystatechange= function(){
//         if(req.readyState === 4 && req.status === 200){
//           resolve(req.responseText)
//         }
//         req.onerror= function(){
//           reject(Error(req.statusText))
//         }
//       }
//       req.open('GET', url)
//       req.send()
//     })
//   }

//   get('http://localhost:3000/create-user')
//   .then(response=> console.log(response))
//   .catch(error=> console.log(error))
// }



async function sendRequest(e:Event){
  console.log("fetching data from api");
  // const data3= fetch("https://http://localhost:3000/create-user");
  
  function get(url: any){
    return new Promise((resolve, reject)=>{
      const req= new XMLHttpRequest()
      req.onreadystatechange= function(){
        if(req.readyState === 4 && req.status === 200){
          resolve(req.responseText)
        }
        req.onerror= function(){
          reject(Error(req.statusText))
        }
      }
      req.open('GET', url)
      req.send()
    })
  }
  //parse is for string
  //stringify is for object
  get('http://localhost:3000/create-user')
  .then(response=> console.log(JSON.stringify(response)))
  .catch(error=> console.log(error))

  //update document here
  // const app= document.getElementById('list_orders');
  // const p= document.createElement("p");
  // //need to get "numberOrders" & loop through # times to get itemsOrdered
  // //need to get "numberResale" & loop through # times to et itemsSold
  // //if either == 0, msg saying bought none
  // var tempNumOrders= newData.numberOrders;
  // var tempNumSales= newData.numberResale;
  // var numOrders: number= +tempNumOrders;
  // var numSales: number= +tempNumSales;

  // if(numOrders == 0){
  //   p.textContent= "You have no past orders or orders in progress";
  //   app?.appendChild(p);
  // }
  // if(numSales == 0){
  //   p.textContent= "You have never listed items for sale";
  // }

  // data.forEach((stat)=>{

  // })



  // Object.entries(data).forEach(([key, value])=>{
  //   console.log(`${key}: ${value}`);
  // });



  //should use parsed or not parsed?? (data or newData)
  // data.forEach((obj: { [s: string]: unknown; } | ArrayLike<unknown>) =>{
  //   Object.entries(obj).forEach(([key, value])=>{
  //     if(`${key}` == "itemsOrdered"){
  //       //loop through and print out
  //       // for(let i= 0; i< `${key}`.length; i++){
  //       //   const p= document.createElement("p");
  //       //   p.textContent= `${key}`[i];
  //       //   //shouldnt have to use value?? error could be here `${key} ${value} [i] or similar?`
  //       //   app?.appendChild(p);
  //       // }
  //       const p= document.createElement("p");
  //       p.textContent= `${key}: ${value}`;
  //         //shouldnt have to use value?? error could be here `${key} ${value} [i] or similar?`
  //       app?.appendChild(p);

  //     }
  //     if(`${key}` == "itemsSold"){
  //       //loop through and print out
  //       // for(let i= 0; i< `${key}`.length; i++){
  //       //   const p= document.createElement("p");
  //       //   p.textContent= `${key}`[i];
  //       //   //shouldnt have to use value?? error could be here `${key} ${value} [i] or similar?`
  //       //   app?.appendChild(p);
  //       // }
  //       const p= document.createElement("p");
  //       p.textContent= `${key}: ${value}`;
  //         //shouldnt have to use value?? error could be here `${key} ${value} [i] or similar?`
  //       app?.appendChild(p);

  //     }


  //   });
  // });

}


function onRequest(){
  console.log("in req btn function");
  let btnAction= (document.getElementById('btn-enter') as HTMLFormElement);
  btnAction.addEventListener("click", (e: Event)=> sendRequest(e));
  //set flag for if init
}


document.addEventListener("DOMContentLoaded", function(event){
  //onRequest();
});



//nested objects or array