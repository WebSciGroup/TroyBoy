import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class NavbarComponent implements OnInit {
  // public isMenuCollapsed = true;
  imgURL:any = "../../assets/placeholder-image.png";
  private uploadedFiles:any;

  private currentUser:any = "";
  private title:any;
  private price:any;
  private condition:any;
  private category:any;
  private description:any;
  private imgExt: any;
  constructor(private httpService: HttpService, config: NgbModalConfig, private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }
 
  open(content:any) {
    this.modalService.open(content);
  }
  fileChange(event:any) {
    this.uploadedFiles = event.target.files[0];
  }
  preview(file:any) {
    if (file.length === 0)
      return;
    
    var reader = new FileReader();
    this.imgExt = file[0].name.split('.').pop();
    reader.readAsDataURL(file[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  conditionChange (event: any) {
    this.condition = event.target.value;
  }

  categoryChange (event: any) {
    this.category = event.target.value;
  }
  // need current login userid for seller column; 
  newListing() {
    $('#newListing').on("submit",(e)=>{
      
      this.title = $('#title').val();
      this.price = <number>$('#price').val();
      this.description = $('#description').val();
      console.log(this.imgExt);
      this.httpService.postNewListing(this.currentUser, this.title, this.price, this.condition, this.category, this.description, this.imgExt).subscribe((res)=>{
       
      });
      
      e.preventDefault();
      e.stopPropagation();
    })
    alert("Your listing is created!");
  }
}
