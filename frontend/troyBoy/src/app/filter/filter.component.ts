import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from '../http.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() getFilterContent = new EventEmitter<any>();

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {

    $('#filter').on('submit', (e)=>{
      var condition = document.getElementsByName('condition[]');
      var checkedCon = this.getChecked(condition);
      var category = document.getElementsByName('category[]');
      var checkedCat = this.getChecked(category);

      var all = [];
      all.push(checkedCon);
      all.push(checkedCat);
      if (all[0].length == 0 && all[1].length == 0) {
        this.httpService.getItems().subscribe((res:any) => {
          this.getFilterContent.emit(res);
        });
      } else {
        this.httpService.filterItem(JSON.stringify(all)).subscribe((res:any)=> {
          this.getFilterContent.emit(res);
        });
      }
      e.preventDefault();
    })
  }

  getChecked(array:any) {
    var res = [];
    for (var i=0; i<array.length; i++) {
      if ((<HTMLInputElement><any>array[i]).checked) {
        res.push(<string>$(array[i]).val());
      }
    }
    return res;
  } 
}

