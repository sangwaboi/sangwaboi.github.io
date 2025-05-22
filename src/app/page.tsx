import Link from "next/link";
import CLI from "../components/cli";

export default function Home() {
  return (
    <div className="text-white p-8 w-full flex justify-center">
      <div className="max-w-3xl w-full flex flex-col">
        <div className="mb-8">
          <p className="text-2xl mb-1">Vishvendra Sangwa</p>
          <p className="text-gray-400 mb-6">Bengaluru, KA</p>
          
          <p className="text-xl mb-3">&gt; hi!</p>
          <p className="mb-3">&gt; my name is vishvendra, i'm studying computer science and Ai/ML at the school of tech polaris</p>
          <p className="mb-3">&gt; i like web3 dev, tons of Robotics, and Ai agentic flows</p>
          <p className="mb-3">&gt; i'm a big believer in authentic, compounding relationships. feel free to reach out to me!</p>
          <p className="mb-6">&gt; currently building some BaaS</p>
          
          <div className="flex flex-wrap gap-6 mb-6 text-blue-400">
            <Link className="hover:text-orange-400" href="https://x.com/sangwaboii" target="_blank" rel="noopener noreferrer">[twitter]</Link>
            <Link className="hover:text-orange-400" href="https://github.com/sangwaboi" target="_blank" rel="noopener noreferrer">[github]</Link>
            <Link className="hover:text-orange-400" href="https://www.linkedin.com/in/sangwa-vishvendra/" target="_blank" rel="noopener noreferrer">[linkedin]</Link>
            <Link className="hover:text-orange-400" href="/thoughts">[thoughts]</Link>
            <Link className="hover:text-orange-400" href="/blogs">[blogs]</Link>
          </div>
        </div>
        
        <CLI hidePrefilledBio={true} />
      </div>
    </div>
  );
}
