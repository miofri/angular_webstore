import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { User } from './models/user.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	title = 'commerce-app';
	constructor(private localStorageService: LocalStorageService) {}

	loggedInUser: User | null = null;

	ngOnInit() {
		let fetchUserFromLocalStorage =
			this.localStorageService.getItem('loggedinUser');

		if (!fetchUserFromLocalStorage) {
			let fetchUserFromSessionStorage = sessionStorage.getItem('loggedinUser');
			if (fetchUserFromSessionStorage) {
				this.loggedInUser = JSON.parse(fetchUserFromSessionStorage);
			}
		} else {
			this.loggedInUser = fetchUserFromLocalStorage;
		}
	}

	signOut() {
		this.localStorageService.removeItem('loggedinUser');
		sessionStorage.removeItem('loggedinUser');
		setTimeout(() => window.location.reload(), 0);
	}
}
