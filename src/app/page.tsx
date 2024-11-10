import Link from "next/link";

export default function Home() {
  return (
    <div className="text-gray-300 p-4 w-full flex justify-center">
      <div>
        <div className="mb-4 mt-16 flex flex-col gap-4">
          <p>&gt; hi</p>
          <p>
            &gt; my name is arman, i'm studying computer science and mathematics
            at the university of florida
          </p>
          <p>
            &gt; i like full-stack web dev and typescript
          </p>
          <p>&gt; feel free to reach out to me!</p>
          <div className="flex gap-4 text-indigo-300">
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="https://x.com/ksw_arman"
              target="_blank"
              rel="noopener noreferrer"
            >
              [twitter]
            </Link>
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="https://github.com/armans-code"
              target="_blank"
              rel="noopener noreferrer"
            >
              [github]
            </Link>
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="https://www.linkedin.com/in/armankumaraswamy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              [linkedin]
            </Link>
          </div>
        </div>
        <div className="hidden sm:block">
          <span className="mr-2">$</span>
          <input
            type="text"
            className="bg-transparent border-none outline-none flex-grow"
            autoFocus
          />
        </div>
      </div>
      <Link
        href="/gui"
        className="absolute bottom-0 right-0 mr-4 mb-4 hover:underline"
      >
        prefer a GUI?
      </Link>
    </div>
  );
}
