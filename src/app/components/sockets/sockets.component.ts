import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import {
  AppState,
  selectAllSocket,
  selectSocketMessage,
} from 'src/app/reducers';
import * as actions from '../../actions/socket.actions';
import { Observable } from 'rxjs';
import { SocketEntity } from 'src/app/reducers/socket.reducer';

@Component({
  selector: 'app-sockets',
  templateUrl: './sockets.component.html',
  styleUrls: ['./sockets.component.scss'],
})

// "@aspnet/signalr": "^1.1.4", in the package.json is what allows for sockets
export class SocketsComponent implements OnInit {
  theForm: FormGroup;
  orders$: Observable<SocketEntity[]>;
  message$: Observable<string>;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.theForm = this.getForm();
  }

  getForm() {
    return this.formBuilder.group({
      for: ['', [Validators.required]],
      items: this.formBuilder.array([this.formBuilder.control('')]),
    });
  }
  get for() {
    return this.theForm.get('for');
  }

  get items() {
    return this.theForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.formBuilder.control(''));
  }

  ngOnInit(): void {
    this.orders$ = this.store.pipe(select(selectAllSocket));
    this.message$ = this.store.pipe(select(selectSocketMessage));
  }

  submit() {
    if (this.theForm.valid && this.items.length >= 1) {
      this.store.dispatch(
        actions.curbsideOrderRequest({ payload: this.theForm.value })
      );
      this.theForm = this.getForm();
    }
  }
}
