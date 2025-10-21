import { messageEmitter } from '@/lib/events';

export async function GET() {
  // SSEのレスポンスを作成
  const stream = new ReadableStream({
    start(controller) {
      // 新しいメッセージが通知されたときの処理
      const onMessage = (data: any) => {
        // SSEのデータフォーマットに従って文字列をエンコードし、ストリームに流す
        const eventString = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(new TextEncoder().encode(eventString));
      };

      // イベントリスナーを登録
      messageEmitter.on('newMessage', onMessage);

      // クライアントとの接続が切れたときの処理
      return () => {
        // メモリリークを防ぐためにリスナーを解除
        messageEmitter.off('newMessage', onMessage);
        console.log('SSE connection closed.');
      };
    },
  });

  // SSEに必要なヘッダーを設定してレスポンスを返す
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}