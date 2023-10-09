import { ChangeDetectionStrategy, Component, Injectable, Input, OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';




@Component({
    standalone: true,
    changeDetection:ChangeDetectionStrategy.OnPush,
    template: `
    <div class="modal-header modal-fade" data-backdrop="static">
      <h4 class="modal-title" id="modal-title">{{title}}</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="dismiss()"
      ></button>
    </div>
    <div class="modal-body">
      <span class="text-danger">{{message}}</span>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="decline()"
      >
        {{btnCancelText}}
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-success"
        (click)="accept()"
      >
        {{btnOkText}}
      </button>
    </div>
  `,  
})
class CModalComponent implements OnInit {

    @Input() title!: string;
    @Input() message!: string;
    @Input() btnOkText!: string;
    @Input() btnCancelText!: string;
    @Input() okFn!: Function;
    @Input() cancelFn!: Function;

    constructor(private activeModal: NgbActiveModal) { }

    ngOnInit() {
       
    }

    public decline() {
        this.activeModal.close(false);

    }

    public accept() {
        this.activeModal.close(true);
    }

    public dismiss() {
        this.activeModal.dismiss();

    }
    ngOnDestroy(){        
    }
}


export enum ModalSize{
    Small = 'sm',
    Medium = 'md',
    Large = 'lg',
    ExtraLarge = 'xl'
}


@Injectable({
  providedIn: 'root'
})
export class CModalService {
    modalRef!:NgbModalRef;


    constructor(private modalService: NgbModal) { }
    public confirm(
        title: string = "",
        message: string,
        okFN: Function,
        cancelFn: Function,
        btnOkText: string = 'OK',
        btnCancelText: string = 'Cancel',
        dialogSize: 'sm' | 'lg' | 'md' | '' = ''
    ){


        // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CModalComponent);
        // const componentRef = this.viewContainerRef.createComponent(componentFactory);
   

        const modalRef = this.modalService.open(CModalComponent, {
            size: dialogSize,
            backdrop:'static'
            
        });
        modalRef.result.then(
            (result) => {
                result ? okFN() : cancelFn();
            },
            (reason) => {
                cancelFn();
            }
        );

        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.btnOkText = btnOkText;
        modalRef.componentInstance.btnCancelText = btnCancelText;
        modalRef.componentInstance.okFn = okFN;
        modalRef.componentInstance.cancelFn = cancelFn;
        return;
    }

    public open(content:any,size:ModalSize=ModalSize.Medium,backdropClose:boolean=true){
        this.modalRef= this.modalService.open(content,{size:size,backdrop:(!backdropClose)?'static':backdropClose});
        return this.modalRef;
    }
    public closeAll(){
        this.modalService.dismissAll();
    }
    ngOnDestry(){
        
    }
}
