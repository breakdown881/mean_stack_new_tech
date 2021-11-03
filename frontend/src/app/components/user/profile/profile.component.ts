import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserAuthService } from "../../../services/users/userauth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(private authUser: UserAuthService, private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.authUser.getProfile().subscribe((profile) => {
      if (profile.user) {
        this.shareUser(profile.user);
      }
    });
  }

  shareUser(user) {
    this.user = user;
  }
}
