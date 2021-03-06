import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private apiserver = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  //get profile

  public getProfile(){
      return this.httpClient.get(this.apiserver + `/create-user`)
  }

  public searchKeyword2(word: any){
      return this.httpClient.get(this.apiserver +`/create-user/${word}`);
  }

  // Load all items
  public getItems() {
    return this.httpClient.get(this.apiserver + `/db`);
  }
  
  // Filter
  public filterItem(all:any) {
    return this.httpClient.get(this.apiserver + `/filter/${all}`);
  }

  // Search
  public searchKeyword(word:any) {
    return this.httpClient.get(this.apiserver + `/search/${word}`);
  }

  // Item detail
  public getItemDetail(id:any) {
    return this.httpClient.get(this.apiserver + `/item/${id}`);
  }

  // Seller basic info
  public sellerBasic(id:any) {
    return this.httpClient.get(this.apiserver + `/sellerBasic/${id}`);
  }

  // Post a new listion
  public postNewListing(user:any, title:any, price:any, condition:any, category:any, description:any, imgExt:any) {
    var body = {
      "title": title, 
      "price": price, 
      "condition": condition,
      "category": category, 
      "description": description, 
      "imageFormat": imgExt,
      "seller": user, 
      "buyer":"", 
      "status":"available"
      
    };
    return this.httpClient.post(this.apiserver + `/newListing`, body);
  }
}