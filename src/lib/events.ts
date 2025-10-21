import { EventEmitter } from 'events';

// globalThisにシングルトンとしてEventEmitterを保持するための型定義
declare global {
  var eventEmitter: EventEmitter;
}

// 既存のインスタンスがあればそれを使い、なければ新しく作成する
const messageEmitter = globalThis.eventEmitter || new EventEmitter();

// 開発環境でホットリロードが走った際に、インスタンスが重複して作られるのを防ぐ
if (process.env.NODE_ENV !== 'production') {
  globalThis.eventEmitter = messageEmitter;
}

export { messageEmitter };