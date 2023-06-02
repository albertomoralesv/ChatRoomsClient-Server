import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestsService } from '../http-requests.service';
import { Subject, Subscription, combineLatest, of, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = '';
  password: string = '';

  loading: boolean = false;
  incorrectMessage: string = '';

  constructor(private router: Router, private httpRequestsService: HttpRequestsService) {
    setTimeout(() => {
      if (!this.httpRequestsService.nodeServerActive || !this.httpRequestsService.socketServerActive) {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      }else if(this.httpRequestsService.getLoggedUsername() != ''){
        this.router.navigateByUrl('/main', { replaceUrl: true });
      }
    }, 1000); // 1000 milliseconds = 1 second
  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

  onUsernameChange(username: string){
    this.username = username;
    this.incorrectMessage = '';
  }

  onPasswordChange(password: string){
    this.password = password;
    this.incorrectMessage = '';
  }

  register(){
    this.incorrectMessage = '';
    this.loading = true;
    this.httpRequestsService.makeTest().subscribe(() => {
      if(!this.httpRequestsService.nodeServerActive || !this.httpRequestsService.socketServerActive){
        this.loading = false;
        this.incorrectMessage = 'Server Offline';
      }else{
        if(this.username== '' || this.password == ''){
          this.loading = false;
          this.incorrectMessage = 'Enter both username and password';
        }else{
          this.incorrectMessage = '';
          console.log(this.username, this.password);
          // Call the register function
          this.httpRequestsService.register(this.username, this.password).subscribe(
            (result) => {
              this.loading = false;
              // Successful login
              console.log('Register:', result);
              if(result){
                this.httpRequestsService.setLoggedUsername(this.username);
                this.httpRequestsService.loggedUsername = this.username;
                this.router.navigateByUrl('/main', { replaceUrl: true });
              }else{
                this.incorrectMessage = 'Username Already Exists';
              }
            },
            (error) => {
              this.loading = false;
              // Error during login
              console.log('Login error:', error);
            }
          );
        }
      }
    });
  }

}
