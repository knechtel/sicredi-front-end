import { Component,OnInit, TemplateRef, ViewChild, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { PautaService } from './services/pauta.service'
import { Pauta } from './models/pauta';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import {  Input } from '@angular/core';
import { AssociadoService } from './services/associado.service';
import { Associado } from './models/associado';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isHidden: boolean = true;
  public isHiddenCadastroPauta: boolean = true;
  public isHiddenCadastroAssociado: boolean = true;
  public isHiddenVoto: boolean = true;
  @Input() public index: number;
  pageOfItems: Array<any>;
  form: FormGroup;
  formAssociado: FormGroup;
  formVota: FormGroup;
  dtOptions: DataTables.Settings = {};
  items:Pauta[];
  pauta = {} as Pauta;
  associado = {} as Associado;
  votaPauta = {} as Pauta;

  constructor(private pautaService: PautaService,private associadoService:AssociadoService) {
    this.form = new FormGroup({
      texto1: new FormControl('')
    })

    this.formAssociado = new FormGroup({
      nome: new FormControl(''),
      cpf: new FormControl('')
    })
    this.formVota = new FormGroup({
      idPauta: new FormControl(''),
      idAssociado: new FormControl('')
    })
  }
  

  ngOnInit() {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    lengthMenu : [5, 10, 25],
    processing: true
  };

  this.pautaService.get().subscribe(res=>{
    this.items=res
  })
  
  }
  
  doForm(data){
      console.log(data);
  }
  
  // nossa função delay com suporte a promisse.
  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }


  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  doLogin(){
    this.isHidden = !this.isHidden;
  }

  doCadastroPauta(){
    this.isHiddenCadastroPauta = !this.isHiddenCadastroPauta;
  }

  doCadastroAssociado(){
    this.isHiddenCadastroAssociado = !this.isHiddenCadastroAssociado;
  }
  doVoto(){
    this.isHiddenVoto = !this.isHiddenVoto;
  }
  savePauta(form:NgForm) {
    this.pautaService.savePauta(this.pauta).subscribe(() => {
    });
    this.pauta.texto='';
  }
  saveAssociado(form:NgForm) {
    this.associadoService.saveAssociado(this.associado).subscribe(()=>{

    });
    this.associado.nome = '';
    this.associado.cpf  = '';
  }

  saveVotoPauta(form:NgForm){

  }

}

