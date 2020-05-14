import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PollingComponent } from './components/polling/polling.component';
import { NavComponent } from './components/nav/nav.component';
import { SocketsComponent } from './components/sockets/sockets.component';
import { reducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PollingEffects } from './effects/polling.effects';
import { SyncComponent } from './components/sync/sync.component';
import { SyncEffects } from './effects/sync.effects';
import { SocketEffects } from './effects/socket.effects';
@NgModule({
  declarations: [
    AppComponent,
    PollingComponent,
    NavComponent,
    SocketsComponent,
    SyncComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([PollingEffects, SyncEffects, SocketEffects]),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
