import { connectMongo } from '@/lib/mongodb';
import { Todo } from '@/models/Todo';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectMongo();
    const todos = await Todo.find();
    return NextResponse.json(todos);
}

export async function POST(req: Request) {
    const body = await req.json();
    await connectMongo();
    const newTodo = await Todo.create(body);
    return NextResponse.json(newTodo);
}

export async function PUT(req: Request) {
    const body = await req.json();
    const { id, completed } = body;
    await connectMongo();
    const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
    return NextResponse.json(updatedTodo);
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await connectMongo();
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Todo deleted' });
}
