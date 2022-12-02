import { Cliente } from './../models/cliente';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Evento } from '../models/evento';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private eventos : Evento[];
  private cliente: Cliente[];
  constructor(private firestore:AngularFirestore) {
    this.eventos= [
      {
        fecha: "05/12/2022",
        total: 1000,
        cliente: "ana castillo",
        telefono: "3111073571"
      },
    ]
    this.cliente=[{
      nombre: "andres zurita",
      telefono: "3111234567",
      domicilio: "Mexico 123"
    }]
   }

  public addEvento(evento: Evento){ //para que agregue el evento desde el cliente
    return this.firestore.collection('evento').add(evento);
  }

  public getEventos(): Observable<Evento[]>{ //que muestre todos los eventos desde admin
    return this.firestore.collection('evento').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{
          //console.log(a);
          const data = a.payload.doc.data() as Evento;
          //console.log(data);
          const id = a.payload.doc.id;
          return {id,...data};
        });
      })
    );
  }

  public getCliente(): Observable<Cliente[]>{ //que muestre todos los eventos desde admin
    return this.firestore.collection('cliente').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{
          //console.log(a);
          const data = a.payload.doc.data() as Cliente;
          //console.log(data);
          const id = a.payload.doc.id;
          return {id,...data};
        });
      })
    );
  }

  public getEventoById(id: string){ //ver evento, si es necesario
    let result= this.firestore.collection('evento').doc(id).valueChanges();
    return result;
  }

  public getClientByTelefono(tel: string){ //para consultar desde el login si existe el cliente, si sí lo lleve a su pagina
    let result= this.firestore.collection('cliente').doc(tel).valueChanges();
    return result;
  }



}



