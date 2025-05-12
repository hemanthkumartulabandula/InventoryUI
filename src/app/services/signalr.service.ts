import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection | null = null; 

  productAdded$ = new Subject<any>();
  productUpdated$ = new Subject<any>();
  productDeleted$ = new Subject<number>();

  categoryAdded$ = new Subject<any>();
  categoryUpdated$ = new Subject<any>();
  categoryDeleted$ = new Subject<number>();

  supplierAdded$ = new Subject<any>();
  supplierUpdated$ = new Subject<any>();
  supplierDeleted$ = new Subject<number>();

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl.replace('/api', '')}/hubs/inventory`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(err => console.error('SignalR error:', err));

    this.hubConnection.on('TestConnection', (message: string) => {
      console.log('💬 Received from server:', message);
    });

    this.hubConnection.on('ProductAdded', (data) => this.productAdded$.next(data));
    this.hubConnection.on('ProductUpdated', (data) => this.productUpdated$.next(data));
    this.hubConnection.on('ProductDeleted', (id) => this.productDeleted$.next(id));

    this.hubConnection.on('CategoryAdded', (data) => this.categoryAdded$.next(data));
    this.hubConnection.on('CategoryUpdated', (data) => this.categoryUpdated$.next(data));
    this.hubConnection.on('CategoryDeleted', (id) => this.categoryDeleted$.next(id));

    this.hubConnection.on('SupplierAdded', (data) => this.supplierAdded$.next(data));
    this.hubConnection.on('SupplierUpdated', (data) => this.supplierUpdated$.next(data));
    this.hubConnection.on('SupplierDeleted', (id) => this.supplierDeleted$.next(id));
  }
}
