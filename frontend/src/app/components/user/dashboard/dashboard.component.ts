import { Component, OnInit } from "@angular/core";
import { UserAuthService } from "../../../services/users/userauth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  user: Object;
  constructor(private authUser: UserAuthService) {}

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
