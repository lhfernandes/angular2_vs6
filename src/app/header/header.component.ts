import { AuthService } from './../auth/auth.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() tabSelected = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onSelect(tab: string) {
    this.tabSelected.emit(tab);
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: Response) => { console.log(response); });
  }

  onUpdateData() {
    this.dataStorageService.getRecipes();
  }

  onLogOut() {
    this.authService.logOut();
  }

}
