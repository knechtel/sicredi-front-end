import { Component,OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ContaService } from './services/conta.service';
import { Conta } from './models/conta';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  conta = {} as Conta;
  contas: Conta[];
  modalRef: BsModalRef;
  nomeConta:string;
  constructor(private contaService: ContaService,private modalService: BsModalService ) {}
  
  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl(''),
      valor: new FormControl(''),
      dataVencimento: new FormControl(),
      dataPagamento: new FormControl()
    })
  }

  saveConta(form: NgForm) {
    this.contaService.saveConta(this.conta).subscribe(() => {
    });
    this.conta.nome= '';
    this.conta.valorOriginal = 0;
    this.conta.dataPagamento = '';
    this.conta.dataVencimento = '';
  }
  async openModal(template: TemplateRef<any>,form:NgForm) { this.modalRef = this.modalService.show(template);
    this.contaService.saveConta(this.conta).subscribe(() => {
    });
    this.nomeConta=this.conta.nome;
    this.conta.nome= '';
    this.conta.valorOriginal = 0;
    this.conta.dataPagamento = '';
    this.conta.dataVencimento = '';
    await this.delay(3000);
    this.modalRef.hide();
  }
  // nossa função delay com suporte a promisse.
  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }
}
