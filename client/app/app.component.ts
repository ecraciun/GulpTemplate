import {Component}                                              from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS }     from 'angular2/router';


@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES],
    template: '<h1> YAAAY FROM ANGULAR 2 </h1>',
    //templateUrl: '/app/app.component.html',
    //styleUrls: ['app/app.component.css'],
    providers: [ROUTER_PROVIDERS]
})
// @RouteConfig([
//     {
//         path: '/dashboard',
//         name: 'Dashboard',
//         component: DashboardComponent,
//         useAsDefault: true
//     },
// ])
export class AppComponent { 
    public title = 'Tour of Heroes';
}