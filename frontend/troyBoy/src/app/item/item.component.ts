import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  private id: any;
  content:any;
  sellerID:any;
  seller:any;
  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.sellerID = params['seller'];
    });
    
    this.httpService.getItemDetail(this.id).subscribe((res)=>{
      this.content = res;
    });

    this.httpService.sellerBasic(this.sellerID).subscribe((res)=>{
      this.seller = res;
      console.log(res);
    })
  }

}
