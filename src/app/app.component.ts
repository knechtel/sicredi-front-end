import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ContaService } from './services/conta.service';
import { Conta } from './models/conta';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  conta = {} as Conta;
  contas: Conta[];

  constructor(private contaService: ContaService) {}

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
    
}
