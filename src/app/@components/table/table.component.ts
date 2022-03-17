import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/utils/userData.model';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: UserData[] = 

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone','address','actions'];
  dataSource: UserData[] = new Array();
  userData: any[];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('User_Data'));
    this.dataSource = this.userData;
  }
  create(){
    this.router.navigate(['/create-user'])
      }
      home(){
        this.router.navigate(['/'])
      }
      delete(i){
       console.log('row',i)
       this.userData.splice(i,1)
       console.log(this.userData)
       localStorage.setItem('User_Data',JSON.stringify(this.userData))
       this.ngOnInit();
      }
      edit(i){
      this.router.navigate(['/create-user'],
      {queryParams:{userId:i}}
      )
      }
}
