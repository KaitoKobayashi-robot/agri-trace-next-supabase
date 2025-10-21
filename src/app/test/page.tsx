"use client"; // ブラウザAPI (EventSource) を使うためクライアントコンポーネントにする

import { useState, useEffect } from "react";

export default function Home() {
  // 表示するメッセージを保持するState
  const [message, setMessage] = useState<string>("No Message...");

  useEffect(() => {
    // SSEエンドポイントに接続
    const eventSource = new EventSource("/api/events");

    // 'message' イベントをリッスン
    eventSource.onmessage = event => {
      // event.data はJSON文字列なのでパースする
      const data = JSON.parse(event.data);
      console.log("data:", data);
      setMessage(data.mac_address || "空のメッセージを受信しました");
    };

    // エラーハンドリング
    eventSource.onerror = err => {
      console.error("EventSource failed:", err);
      // 必要に応じて接続を閉じる
      eventSource.close();
    };

    // コンポーネントがアンマウントされたときに接続を閉じる
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-400 mb-6">
          POSTed message is here!
        </h1>
        <div className="min-h-[20rem] w-full p-8 bg-gray-800 border border-gray-600 rounded-xl flex items-center justify-center shadow-2xl">
          <p className="text-4xl sm:text-7xl font-extrabold break-words">
            {message}
          </p>
        </div>
      </div>
    </main>
  );
}
