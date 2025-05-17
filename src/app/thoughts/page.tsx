import Link from "next/link";

function Page() {
  return (
    <div className="md:w-3/5 w-4/5 flex flex-col gap-8">
      <div className="relative mb-4">
        <h1 className="absolute -left-5">
          <Link className="hover:underline" href="/">
            home
          </Link>{" "}
          / <span className="text-orange-300">thoughts</span>
        </h1>
      </div>
      <Link href="/thoughts/1" className="hover:underline max-w-fit">
        <span className="text-indigo-300">1.</span> Wearable AI that remembers
        everything I see and hear{" "}
        <span className="text-sm text-gray-400">(04/24/2025)</span>
      </Link>
    </div>
  );
}

export default Page;
