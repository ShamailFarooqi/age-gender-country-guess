"use client"
import Guess from "@/component/guess/Guess";


export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Guess />
    </main>
  );
}
