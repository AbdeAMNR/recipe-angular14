import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isLogedIn!: boolean;
    constructor(private authService: AuthService) {

    }
    ngOnInit(): void {
        this.authService.signInEventEmitter.subscribe(
            (auth: boolean) => {
                this.isLogedIn = auth;
                //console.log("Login status: " + this.isLogedIn);
            }
        );

    }



}