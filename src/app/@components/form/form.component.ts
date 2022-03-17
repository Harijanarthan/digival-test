import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/utils/userData.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  userForm: any;
  usersData: UserData[] = new Array();
  queryParams:any;
  constructor(private fb: FormBuilder, private router: Router,private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.queryParams = this.activatedRoute.snapshot.queryParamMap.get('userId');
    console.log('QueryParams:',this.queryParams);
    const userData = JSON.parse(localStorage.getItem('User_Data'));
    this.usersData = userData;
    if(this.queryParams === null || this.queryParams === '' || this.queryParams === undefined){
      this.userForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', []],
        email: ['', [Validators.email,Validators.required]],
        phone: ['', []],
        address: ['', []],
      });
    }
    else{
      this.userForm = this.fb.group({
        firstName: [this.usersData[this.queryParams].firstName, [Validators.required]],
        lastName: [this.usersData[this.queryParams].lastName, []],
        email: [this.usersData[this.queryParams].email, [Validators.email,Validators.required]],
        phone: [this.usersData[this.queryParams].phone, []],
        address: [this.usersData[this.queryParams].address, []],
      });
    }
  }
  home() {
    this.router.navigate(['/']);
  }
  view() {
    this.router.navigate(['/list-user']);
  }
  clear() {
    this.ngOnInit();
  }
  submit(values) {
    if(this.queryParams === null || this.queryParams === '' || this.queryParams === undefined){
      try {
        this.usersData.push(values);
      } catch (error) {
        console.log(this.usersData);
        this.usersData = [];
        this.usersData.push(values);
      }
      console.log('this.usersData:', this.usersData);
      localStorage.setItem('User_Data', JSON.stringify(this.usersData));
      this.router.navigate(['/list-user'])
    }
    else{
     this.usersData[this.queryParams].firstName = values.firstName;
     this.usersData[this.queryParams].lastName = values.lastName;
     this.usersData[this.queryParams].email = values.email;
     this.usersData[this.queryParams].phone = values.phone;
     this.usersData[this.queryParams].address = values.address;
     console.log('this.usersData:', this.usersData);
     localStorage.setItem('User_Data', JSON.stringify(this.usersData));
     this.router.navigate(['/list-user'])
    }
  }
}
