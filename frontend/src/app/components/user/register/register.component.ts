import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { UserAuthService } from "../../../services/users/userauth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  confirm_password: String;
  user: Object;

  constructor(
    private flashMsg: FlashMessagesService,
    private authUser: UserAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  onRegisterSubmit() {
    if (this.confirm_password === this.password) {
      const user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
      };

      if (this.validateData(user) != false) {
        // Register User by Register Service
        this.authUser.register(user).subscribe(
          (res) => {
            if (res.success) {
              this.name = "";
              this.username = "";
              this.email = "";
              this.password = "";
              this.confirm_password = "";
              this.flashMsg.show(res.msg + ". Now you can Login.", {
                cssClass: "alert-success alert",
                timeout: 3000,
              });
              setTimeout(() => {
                this.router.navigate(["/user/login"]);
              }, 3000);
            } else {
              this.flashMsg.show(res.msg, {
                cssClass: "alert-danger alert",
                timeout: 5000,
              });
            }
          },
          (err) => {
            this.flashMsg.show("Unable to Register User", {
              cssClass: "alert-danger alert",
              timeout: 5000,
            });
          }
        );
      }
    } else {
      this.flashMsg.show("Password and Confirm Password should be same.", {
        cssClass: "alert-danger alert",
        timeout: 5000,
      });
    }
  }

  // Validate Form Data
  validateData(user) {
    let { name, username, email, password } = user;
    if (
      name != undefined ||
      username != undefined ||
      email != undefined ||
      password != undefined
    ) {
      if (name.length < 5) {
        this.flashMsg.show("Name should contain atleast 5 characters.", {
          cssClass: "alert-danger alert",
          timeout: 5000,
        });
        return false;
      } else if (username.length < 5) {
        this.flashMsg.show("Username should contain atleast 5 characters.", {
          cssClass: "alert-danger alert",
          timeout: 5000,
        });
        return false;
      } else if (password.length < 5) {
        this.flashMsg.show("Password should contain atleast 5 characters.", {
          cssClass: "alert-danger alert",
          timeout: 5000,
        });
        return false;
      } else if (
        !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
          email
        )
      ) {
        this.flashMsg.show("Please fill in a Valid Email", {
          cssClass: "alert-danger",
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
