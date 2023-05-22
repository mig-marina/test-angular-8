import { Message } from '../interfaces/message.interface';
import { USER_MESSAGES } from '../mocks/user-messages.mock';
import { MessageActions, ConversationActionTypes } from './conversation.actions';

const initialState : Message[] = [...USER_MESSAGES];

export function ConversationReducer(state: Message[] = initialState, action: MessageActions) {
  switch(action.type) {
    case ConversationActionTypes.ADD_MESSAGE:
      return [...state, action.payload];
    case ConversationActionTypes.DELETE_MESSAGE:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};