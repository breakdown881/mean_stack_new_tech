import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { UserAuthService } from "../../../services/users/userauth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  user: Object;

  constructor(
    private flashMsg: FlashMessagesService,
    private authUser: UserAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  onLoginSubmit() {
    let user = {
      username: this.username,
      password: this.password,
    };

    if (!this.validateLogin(user)) {
      this.authUser.authenticateUser(user).subscribe(
        (res) => {
          if (res.success) {
            // Load token
            this.authUser.storeUserData(res.token, res.user);
            this.flashMsg.show("Hurray! You are now Logged in.", {
              cssClass: "alert-success alert",
              timeout: 3000,
            });
            setTimeout(() => {
              this.router.navigate(["user/dashboard"]);
            }, 3000);
          } else {
            // Error
            this.flashMsg.show(res.msg, {
              cssClass: "alert-danger alert",
              timeout: 5000,
            });
          }
        },
        (err) => {
          this.flashMsg.show("Unable to Login User", {
            cssClass: "alert-danger alert",
            timeout: 5000,
          });
        }
      );
    }
  }

  validateLogin(credentials) {
    let { username, password } = credentials;
    if (username != undefined || password != undefined) {
      if (username.lenght < 5) {
        this.flashMsg.show("Username should contain atleast 5 characters.", {
          cssClass: "alert-danger alert",
          timeout: 5000,
        });
        return false;
      } else if (password.lenght < 5) {
        this.flashMsg.show("Password should contain atleast 5 characters.", {
          cssClass: "alert-danger alert",
          timeout: 5000,
        });
        return false;
      }
    } else {
      this.flashMsg.show("Please fill in all the details.", {
        cssClass: "alert-danger alert",
        timeout: 5000,
      });
    }
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
