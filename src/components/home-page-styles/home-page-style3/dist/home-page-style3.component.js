"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomePageStyle3Component = void 0;
var core_1 = require("@angular/core");
var HomePageStyle3Component = /** @class */ (function () {
    function HomePageStyle3Component(config, nav, shared, appCategoriesService) {
        this.config = config;
        this.nav = nav;
        this.shared = shared;
        this.appCategoriesService = appCategoriesService;
    }
    HomePageStyle3Component.prototype.onClickCategory = function (c) {
        this.nav.navigateForward("/products/" + c.id + "/newest");
    };
    HomePageStyle3Component.prototype.ngOnInit = function () { };
    HomePageStyle3Component = __decorate([
        core_1.Component({
            selector: 'app-home-page-style3',
            templateUrl: './home-page-style3.component.html',
            styleUrls: ['./home-page-style3.component.scss']
        })
    ], HomePageStyle3Component);
    return HomePageStyle3Component;
}());
exports.HomePageStyle3Component = HomePageStyle3Component;
