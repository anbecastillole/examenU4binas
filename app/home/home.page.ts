import { Evento } from './../models/evento';
import { Cliente } from './../models/cliente';
import { Component } from '@angular/core';
import { EventoService } from '../services/evento.service';


import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lastEmittedValue: RangeValue;
  public cliente:Cliente[];
  public total: number;
  public evento:Evento[];
  constructor(private servicio: EventoService) {
    this.servicio.getCliente().subscribe(res=>{
      this.cliente = res;
      console.log(this.cliente);
    })
    this.total = 1000
  }
  ngOnInit() {

  }
  onIonChange(ev: Event) {
    
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
  }
  public getTotal():number{
    return this.total;

  }
  public nuevoEvento(){
    this.evento
  }

}
