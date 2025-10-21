import { NextResponse } from 'next/server';
import { messageEmitter } from '@/lib/events'; 

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 'newMessage'というイベント名で、受信したデータを通知する
    messageEmitter.emit('newMessage', data);

    return NextResponse.json({ success: true, message: 'Message broadcasted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'リクエストボディが不正です。' },
      { status: 400 }
    );
  }
}