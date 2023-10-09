import { Component } from '@angular/core';
import { CAjaxservice } from 'src/app/services/ajax.service';
import { CAuthService } from 'src/app/services/auth.service';
import { CModalService } from 'src/app/services/modal-popup.service';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {

constructor(private auth:CAuthService,private modal : CModalService) {

  
}
ngOnInIt(){
  
}
onLogout(){
  var _self=this;
  this.modal.confirm("Logout","Are you sure want to logout?",
  function(){
    _self.auth.logout();
  },function(){
    
  }
  )
}

}
