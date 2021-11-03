import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { UserAuthService } from "../../../services/users/userauth.service";
import { ProductsService } from "../../../services/products/products.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  query: String;
  items: any = [];
  user: Object;

  constructor(
    private authUser: UserAuthService,
    private flashMsg: FlashMessagesService,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  onClickLogout() {
    this.authUser.logoutUser();
    this.flashMsg.show("You are now Logged out.", {
      cssClass: "alert-success alert",
      timeout: 3000,
    });
    setTimeout(() => {
      this.router.navigate["/"];
    }, 3000);
  }

  onSearchPartial(e) {
    let query: String = e.target.value;
    if (query.length >= 3) {
      this.productService.partialQuery(query).subscribe((res) => {
        this.items = res.products;
      });
    }
    if (query.length == 0) {
      this.items = [];
    }
  }

  onSubmitSearch(e) {
    e.preventDefault();
    if (this.query.length >= 3) {
      this.productService.partialQuery(this.query).subscribe((res) => {
        this.items = res.products;
      });
    }
    if (this.query.length == 0) {
      this.items = [];
    }
  }

  productFind(id) {
    this.router.navigate(["product", id]);
    this.query = "";
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
