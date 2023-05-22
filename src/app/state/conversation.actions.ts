import { Action } from '@ngrx/store';
import { Message } from '../interfaces/message.interface';

export enum ConversationActionTypes {
  ADD_MESSAGE = '[MESSAGE] ADD',
  DELETE_MESSAGE = '[MESSAGE] DELETE',
  GET_MESSAGES = '[MESSAGES] GET',
}

export class AddMessageAction implements Action {
  readonly type = ConversationActionTypes.ADD_MESSAGE;

  constructor(public payload : Message) {}
}

export class DeleteMessageAction implements Action {
  readonly type = ConversationActionTypes.DELETE_MESSAGE;

  constructor(public payload : string) {}
}


export type MessageActions = AddMessageAction | DeleteMessageAction;