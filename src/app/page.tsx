import Link from "next/link";
import CLI from "../components/cli";

export default function Home() {
  return (
    <div className="text-gray-300 p-4 w-full flex justify-center">
      <div>
        <div className="mb-4 mt-16 flex flex-col gap-4">
          <div>
            <p>Vishvendra Sangwa</p>
            <p className="text-gray-400 text-sm">Bengaluru, KA</p>
          </div>
          <p>&gt; hi!</p>
          <p>
            &gt; my name is vishvendra, i'm studying computer science and Ai/ML at the school of tech polaris
          </p>
          <p>
            &gt; i like web3 dev, tons of Robotics, and Ai agentic flows
          </p>
          <p>
            &gt; i'm a big believer in authentic, compounding relationships. feel free to reach out to me!
          </p>
          <p>&gt; currently building some BaaS</p>
          <div className="flex sm:flex-row flex-col gap-4 text-indigo-300">
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="https://x.com/sangwaboii"
              target="_blank"
              rel="noopener noreferrer"
            >
              [twitter]
            </Link>
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="https://github.com/sangwaboi"
              target="_blank"
              rel="noopener noreferrer"
            >
              [github]
            </Link>
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="https://www.linkedin.com/in/sangwa-vishvendra/"
              target="_blank"
              rel="noopener noreferrer"
            >
              [linkedin]
            </Link>
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="/thoughts"
            >
              [thoughts]
            </Link>
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="/blogs"
            >
              [blogs]
            </Link>
          </div>
        </div>
        <CLI />
      </div>
    </div>
  );
}
