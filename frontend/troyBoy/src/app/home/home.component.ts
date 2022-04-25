import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: any;
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.getItems().subscribe((res:any) => {
      this.content = res;
    });
  }

  updateContent(content:any) {
    this.content = content;
  }

  itemDetail(id:any, seller:any) {
    this.router.navigate(['/item'], {queryParams: {id: id, seller: seller}});
  }
}
