import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
	constructor() {}

	loginInfo: any;

	ngOnInit(): void {
		// move the following code to profile component
		// this.loginInfo = JSON.parse(localStorage.getItem('loggedinUser') as string);
		// console.log(this.loginInfo);

		google.accounts.id.initialize({
			client_id:
				'109682536093-2dfgc3ta5nokvhn5cmtf5mqn06ohftee.apps.googleusercontent.com',
			callback: (resp: any) => {
				this.loginInfo = resp.credential;
				const decodeJWTToken = (token: any) => {
					return JSON.parse(atob(token.split('.')[1]));
				};
				this.loginInfo = decodeJWTToken(this.loginInfo);
				console.log(JSON.stringify(this.loginInfo));
				localStorage.setItem('loggedinUser', JSON.stringify(this.loginInfo));
				setTimeout(() => window.location.replace('/'), 1);
			},
		});

		google.accounts.id.renderButton(document.getElementById('googleBtn'), {
			theme: 'filled_black',
			size: 'large',
			type: 'standard',
			text: 'continue_with',
			shape: 'rectangular',
			width: '240',
		});
	}
}
