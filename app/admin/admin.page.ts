import { Component, OnInit } from '@angular/core';
import { Evento } from '../models/evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  public evento: Evento[];

  constructor(private servicio:EventoService) {
    this.servicio.getEventos().subscribe(res=>{
      this.evento = res;
      console.log(this.evento);
    })
   }

  ngOnInit() {
  }

}
