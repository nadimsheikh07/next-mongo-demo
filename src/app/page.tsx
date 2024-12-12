import TodoList from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <TodoList />
    </main>
  );
}
