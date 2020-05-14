import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import * as signalR from '@aspnet/signalr';
import { environment } from '../../environments/environment';
import * as actions from '../actions/socket.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class SocketEffects {

  sendOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.curbsideOrderRequest),
      tap(a => this.hubConnection.send('PlaceOrder', a.payload))
    ), { dispatch: false }
  );

  private hubConnection: signalR.HubConnection;

  // actions is an observable stream that has gone through the reducers
  // it's ALL the actions; watching for a particular action and then do something
  constructor(private actions$: Actions, private store: Store<AppState>) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.wsUrl + '/curbsidehub')
      .build();

    this.hubConnection.start()
      .then(() => console.log('Started the Hub Connection'))
      .catch(err => console.error('Error in hub connection', err));

    this.hubConnection.on('OrderPlaced', (data) => this.store.dispatch(actions.orderPlaced({ payload: data })));

    this.hubConnection.on('OrderProcessed', (data) => this.store.dispatch(actions.orderProcessed({ payload: data })));

    this.hubConnection.on('OrderItemProcessed', (data) => this.store.dispatch(actions.orderItemProcessed({ ...data })));
  }
}

// handle a couple actions from the UI
// send order action; placeorder
// recieve a series of messages from the websocket once we connect in
// handle websocket messages coming from the server
// orderplaces - orderplaced
// order processed - orderprocessed
// order item processed - order item processed
// optionally: apiorderplaced
