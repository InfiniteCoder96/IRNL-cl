import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChatChannelInitialization} from '../../models/chat/chatchannelinitialization';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public establish_chat_channel_url: string;
  public retrieve_existing_chat_msg_url: string;
  public retrieve_user_chat_history_url: string;
  public delete_user_chat_url: string;

  constructor(
    public http: HttpClient
  ) {
    this.establish_chat_channel_url = `http://localhost:8090/api/private-chat/channel`;
    this.retrieve_existing_chat_msg_url = `http://localhost:8090/api/private-chat/channel`;
    this.retrieve_user_chat_history_url = `http://localhost:8090/api/private-chat/channel/list`;
    this.delete_user_chat_url = `http://localhost:8090/api/private-chat/channel/delete`;
  }

  establishChatChannelService(chatChannelInitialization: ChatChannelInitialization): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.establish_chat_channel_url}`, chatChannelInitialization).subscribe(
        data => {
          return resolve(data);
        },
        err => {
          return reject(err);
        }
      );
    });
  }

  retrieveExistingChatMessages(channelUuid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.retrieve_existing_chat_msg_url}/` + channelUuid).subscribe(
        data => {
          return resolve(data);
        },
        err => {
          return reject(err);
        }
      );
    });
  }

  deleteExistingChat(channelUuid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.delete_user_chat_url}/` + channelUuid).subscribe(
        data => {
          return resolve(data);
        },
        err => {
          return reject(err);
        }
      );
    });
  }

  retrieveChatHistory(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.retrieve_user_chat_history_url}/` + userId).subscribe(
        data => {
          return resolve(data);
        },
        err => {
          return reject(err);
        }
      );
    });
  }
}
