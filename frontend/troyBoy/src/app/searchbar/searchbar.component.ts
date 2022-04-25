import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  @Output() searchContent = new EventEmitter<any>();
  
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {

    $('#search-bar').on("submit",(e) => {
      let titles = <string>$('#searchBar').val();

      if (titles) {
        this.httpService.searchKeyword(titles).subscribe((res)=>{
          this.searchContent.emit(res);
        })
      } else {
        this.httpService.getItems().subscribe((res:any) => {
          this.searchContent.emit(res);
        });
      }
      
      e.preventDefault();
  });
  }

}
