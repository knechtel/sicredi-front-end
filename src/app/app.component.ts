import { Component,OnInit, TemplateRef, ViewChild, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Pauta } from './models/pauta';
import { Voto } from './models/voto';
import { NgForm } from '@angular/forms';
import {  Input } from '@angular/core';
import { PautaService } from './services/pauta.service'
import { VotoService } from './services/voto.service';
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
  public isHiddenListaAssociado: boolean = true;
  public isHiddenVoto: boolean = true;
  @Input() public index: number;
  pageOfItems: Array<any>;
  pageOfAssociado: Array<any>;
  form: FormGroup;
  formAssociado: FormGroup;
  formVoto: FormGroup;
  formIdPauta: FormGroup;
  dtOptions: DataTables.Settings = {};
  pautaId= {} as Pauta;
  items:Pauta[];
  listaAssociado:Associado[];
  pauta = {} as Pauta;
  associado = {} as Associado;
  votaPauta = {} as Pauta;
  voto = {} as Voto;

  constructor(private pautaService: PautaService,private associadoService:AssociadoService,private votoService:VotoService) {
    this.form = new FormGroup({
      texto1: new FormControl('')
    })

    this.formAssociado = new FormGroup({
      nome: new FormControl(''),
      cpf: new FormControl('')
    })
    this.formVoto = new FormGroup({
      idPauta: new FormControl(''),
      idAssociado: new FormControl(''),
      voto: new FormControl('')
    })

    this.formIdPauta = new FormGroup({
      pautaId:new FormControl()
    })
  }
  

  ngOnInit() {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    lengthMenu : [5, 10, 25],
    processing: true
  };
  this.associadoService.get().subscribe(res=>{
    this.listaAssociado=res
    console.log(res)
  })
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
  onChangePage1(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfAssociado = this.pageOfAssociado;
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
  doListaAssociado(){
    this.isHiddenListaAssociado = !this.isHiddenListaAssociado;
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

  saveVoto(form:NgForm){
    this.votoService.saveVoto(this.voto).subscribe(() => {
    });
    this.voto.idAssociado = 0;
    this.voto.idPauta = 0;
    this.voto.votoEnum= 0;
  }

  iniciaVotacao(form:NgForm){
    this.pautaService.iniciaVotacao(this.pautaId).subscribe(() => {
    });
    this.pautaId.id = 0;
    
  }
}

