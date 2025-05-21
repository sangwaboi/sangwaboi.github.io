import Link from "next/link";

// Placeholder data - replace with your actual thoughts
const thoughts = [
  { id: '1', title: 'My First Thought', excerpt: 'This is a brief summary of my first thought...' },
  { id: '2', title: 'Another Interesting Idea', excerpt: 'Exploring another concept that fascinates me...' },
];

export default function ThoughtsPage() {
  return (
    <div className="text-gray-300 p-4 w-full flex justify-center min-h-screen">
      <div className="max-w-2xl w-full mt-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Thoughts</h1>
        <div className="space-y-6">
          {thoughts.map((thought) => (
            <div key={thought.id} className="p-4 border border-gray-700 rounded-lg hover:border-gray-500">
              <h2 className="text-xl font-semibold text-indigo-400 hover:text-indigo-300">
                <Link href={`/thoughts/${thought.id}`}>{thought.title}</Link>
              </h2>
              <p className="text-gray-400 mt-1">{thought.excerpt}</p>
              <Link href={`/thoughts/${thought.id}`} className="text-sm text-green-500 hover:underline mt-2 inline-block">
                Read more &rarr;
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/" className="text-indigo-400 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
