import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { RandomNumbersComponent } from './components/random-numbers/random-numbers.component';
import { SearchMessagesComponent } from './components/search-messages/search-messages.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { StoreModule } from '@ngrx/store';
import { ConversationReducer } from './state/conversation.reducer';

@NgModule({
  declarations: [
    AppComponent,
    RandomNumbersComponent,
    SearchMessagesComponent,
    ToolBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot({
      conversation: ConversationReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
