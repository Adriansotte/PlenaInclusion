import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string | null = "";

  constructor(private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.role$.subscribe(role => {
      this.role = role;
    });
  }

  navigateToListSchedules() {
    this.router.navigate(['/schedules']);
  }

  navigateToUserSchedules() {
    this.router.navigate(['/userSchedules']);
  }
}
