import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ChatService} from '../../../services/chat/chat.service';
import {ChatChannelInitialization} from '../../../models/chat/chatchannelinitialization';
import {ChatMessage} from '../../../models/chat/chatmessage';
import {Chat} from '../../../models/chat/chat';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('popupUserPost', null) private popupUserPost: TemplateRef<object>;

  public userdata: any = [];
  public chatlist: any;
  public userId: string;
  public emptyState: boolean;

  public chat_post_id: string;
  public chat_loggedin_user_id: string;
  public chat_post_user_id: string;
  public chat_post_title: string;

  // client: any;

  chatuuid: string;

  public messageList: any = [];

  public chatInitializationModel = new ChatChannelInitialization('', '', '', '');

  public chatMessageModel1 = new ChatMessage('', '', '', '');
  public chatMessageModel2 = new ChatMessage('', '', '', '');
  public chatModel = new Chat('', '', '', '');

  public previousMessageList: any;
  public previousData: boolean;

  public textMessage: string;

  public selectedMenu: any;
  public deleteChatId: string;

  public selectChatImageUrl: string;
  public selectChatTitle: string;

  public socket: WebSocketSubject<any>;

  public categoryName: string;

  constructor(
    private modalService: NgbModal,
    public chatService: ChatService
  ) {
    this.emptyState = true;
    this.previousData = false;
    this.selectChatTitle = '';
    this.selectChatImageUrl = '';
    this.previousMessageList = null;
    this.messageList = [];
  }

  ngOnInit() {
    this.userdata = JSON.parse(localStorage.getItem('userobject'));
    if (this.userdata !== null) {
      this.userId = this.userdata['user_id'];
      this.chat_loggedin_user_id = this.userdata['user_id'];
      this.retrieveUserChatList(this.userId);
    } else {
      this.userId = "1";
      this.chat_loggedin_user_id = "2";
      this.retrieveUserChatList(this.userId);
    }
  }

  retrieveUserChatList(userid: any) {
    this.chatService.retrieveChatHistory(userid).then(
      data => {
        if (JSON.stringify(data) !== '[]') {
          this.chatlist = data;
          this.emptyState = false;
          if (this.chatlist.length > 0) {
            this.selectChat(this.chatlist[0], 0);
          } else {
            this.chatlist = [];
            this.emptyState = true;
          }
        } else {
          this.chatlist = [];
          this.emptyState = true;
        }
      }
    );
  }

  openPopupMessage(chat: any) {
    this.deleteChatId = chat.uuid;
    this.modalService.open(this.popupUserPost, {ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static'});
  }

  deleteChat() {
    this.chatService.deleteExistingChat(this.deleteChatId).then(
      data => {
        this.retrieveUserChatList(this.userId);
        this.modalService.dismissAll();
      }
    )
  }

  closeMessage() {
    this.deleteChatId = '';
    this.modalService.dismissAll();
  }

  selectChat(chat: any, chatNo: any) {
    if (this.socket !== undefined) {
      this.socket.unsubscribe();
    }
    this.previousMessageList = null;
    this.messageList = [];
    this.selectChatTitle = chat.postTitle;
    this.selectChatImageUrl = chat.imageUrl;
    this.selectedMenu = chatNo;
    this.chatInitializationModel.userIdOne = this.chat_loggedin_user_id;
    this.chatInitializationModel.postId = chat.postId;
    this.chat_post_id = chat.postId;
    if (chat.fromUserId === Number(this.chat_loggedin_user_id) && chat.toUserId !== Number(this.chat_loggedin_user_id)) {
      this.chatInitializationModel.userIdTwo = chat.toUserId;
      this.chat_post_user_id = chat.toUserId;
    } else {
      this.chatInitializationModel.userIdTwo = chat.fromUserId;
      this.chat_post_user_id = chat.fromUserId;
    }
    this.chatMessagenger(this.chatInitializationModel);
  }

  chatMessagenger(model) {
    this.previousMessageList = null;
    this.chatService.establishChatChannelService(model).then(
      data => {
        localStorage.setItem('channel', JSON.stringify(data));
        const channeldata = JSON.parse(localStorage.getItem('channel'));
        this.chatuuid = channeldata['channelUuid'];
        this.chatService.retrieveExistingChatMessages(this.chatuuid).then(
          data => {
            if (JSON.stringify(data) !== '[]') {
              this.previousData = true;
              this.previousMessageList = data;
            } else {
              this.previousMessageList = null;
            }
            this.connect(this.chatuuid);
          }
        );
      }
    );
  }

  // asObservable
  connect(id: any) {
    const chatId = id;
    this.messageList = [];
    this.socket = webSocket('wss://ulpatha.lk/chat-1.0/chat/' + chatId);
    this.socket.subscribe(data => {
      this.handleMessage(data)
    });
  }

  handleMessage(msgContent: any) {
    this.chatModel = msgContent;
    // recieved
    if (this.chatModel.fromUserId === this.chat_post_user_id) {
      this.chatMessageModel2.received = this.chatModel.contents;
      this.chatMessageModel2.receivedDate = this.chatModel.timesent;
      this.chatMessageModel2.sent = null;
      this.messageList.push(this.chatMessageModel2);
      this.chatMessageModel2 = new ChatMessage('', '', '', '');
    }
    // sent
    if (this.chatModel.fromUserId === this.chat_loggedin_user_id) {
      this.chatMessageModel1.received = null;
      this.chatMessageModel1.sent = this.chatModel.contents;
      this.chatMessageModel1.sentDate = this.chatModel.timesent;
      this.messageList.push(this.chatMessageModel1);
      this.chatMessageModel1 = new ChatMessage('', '', '', '');
    }
    this.chatModel = new Chat('', '', '', '');
  }

  sendMessage() {
    let data = ({
      'contents': this.textMessage,
      'fromUserId': this.chat_loggedin_user_id.toString(),
      'toUserId': this.chat_post_user_id.toString(),
      'postId': this.chat_post_id.toString(),
      'chatuuid': this.chatuuid
    });
    this.socket.next(data);
    this.textMessage = '';
  }

  keyUpsendMessage() {
    let data = ({
      'contents': this.textMessage,
      'fromUserId': this.chat_loggedin_user_id.toString(),
      'toUserId': this.chat_post_user_id.toString(),
      'postId': this.chat_post_id.toString(),
      'chatuuid': this.chatuuid
    });
    this.socket.next(data);
    this.textMessage = '';
  }

}
