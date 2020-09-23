import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { FormsModule } from '@angular/forms';
import { ChatRelativeTime } from '../../../directives/chatrelativetime.directive';
import { GetFirstWord } from '../../../directives/firstletter.directive';
import { ChatSafePipe } from '../../../pipes/safepipe/chatsafepipe';
import { SearchPipe } from '../../../pipes/safepipe/searchpipe';

@NgModule({
  declarations: [
    ChatComponent,
    ChatRelativeTime,
    GetFirstWord,
    ChatSafePipe,
    SearchPipe
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ],
  entryComponents: [
    ChatComponent
  ]
})
export class ChatModule { }
