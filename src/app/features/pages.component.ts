import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NadvarComponent } from '../layouts/main-layout/nadvar/nadvar.component';
import { FooterComponent } from '../layouts/main-layout/footer/footer.component';
import { LeftMenuComponent } from "../layouts/main-layout/left-menu/left-menu.component";
@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NadvarComponent, FooterComponent, MatSidenavModule, MatButtonModule, MatIconModule, LeftMenuComponent],
  providers: [BreakpointObserver],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {
  drawerOpened: boolean = true;
  drawerRightOpened: boolean = false;
  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    // Detecta el tamaño de la pantalla y cambia el valor de isMobile
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches; // Si la pantalla es un dispositivo móvil, isMobile será true
    });
  }

  // Función para alternar el estado del drawer
  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }
  toggleRightDrawer() {
    this.drawerRightOpened = !this.drawerRightOpened;
  }
}