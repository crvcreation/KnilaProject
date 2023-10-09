import { Component } from '@angular/core';
import { CAjaxservice } from 'src/app/services/ajax.service';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CModalService, ModalSize } from 'src/app/services/modal-popup.service';



export interface IContact{
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  address: String,
  city: Number,
  state: Number,
  country: Number,
  postalCode: Number
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {

contacts!:Array<IContact>;



contactform = new FormGroup({
  firstName:new FormControl ('',Validators.required),
  id:new FormControl (0,Validators.required),
  lastName:new FormControl ('',Validators.required),
  email:new FormControl ('',[Validators.required,Validators.email]),
  address:new FormControl ('',Validators.required),
  phoneNumber:new FormControl ('',Validators.required),
  city:new FormControl ('',Validators.required),
  state:new FormControl ('',Validators.required),
  country:new FormControl ('',Validators.required),
  postalCode:new FormControl ('',Validators.required)

})

contactuser(){
  console.warn(this.contactform.value);
}

get firstName(){
  return this.contactform.get("firstName")
}
get lastName(){
  return this.contactform.get("lastName")
}
get email(){
  return this.contactform.get("email")
}
get phoneNumber(){
  return this.contactform.get("phoneNumber")
}
get address(){
  return this.contactform.get("address")
}
get city(){
  return this.contactform.get("city")
}
get state(){
  return this.contactform.get("state")
}
get country(){
  return this.contactform.get("country")
}
get postalCode(){
  return this.contactform.get("postalCode")
}
get btnText(){
  return this.contactform.get("id")?.getRawValue()>0?"Update":"Add"
}


  constructor(private api:CAjaxservice,private modal : CModalService) {
    
  }
  ngOnInit(): void 
  {
    this.api.getData('contacts/get-contacts').subscribe((res:any)=>{
      this.contacts=res;
    })

  }
  onDeleteContact(){
    var _self=this;
    this.modal.confirm("Delete Contact","Are you sure want to Delete?",
    function(){
      // _self.api.postData();
    },function(){
      
    }
    )
  }
  AddContact(template:any){
    this.modal.open(template,ModalSize.Large);
  }
  onEditContact(template:any,data:any){
    console.log(data)
    this.contactform.setValue(data);
    
    this.modal.open(template,ModalSize.Large);
  }
  onSaveContact(){
    this.api.postData('contacts/save-contacts',this.contactform.value).subscribe((res:any)=>{
      this.modal.closeAll();
    })
  }

}







