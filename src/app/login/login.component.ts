import { Component } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
	constructor() {}

	loginInfo: any;

	ngOnInit(): void {
		this.loginInfo = JSON.parse(localStorage.getItem('loggedinUser') as string);
		console.log(this.loginInfo);
	}
}
