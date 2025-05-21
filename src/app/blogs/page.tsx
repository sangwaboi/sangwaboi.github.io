import Link from 'next/link';

// Placeholder data - replace with your actual blog posts
const blogs = [
  { id: '1', title: 'My First Blog Post', date: '2024-07-28', excerpt: 'A short summary of what this blog post is about...' },
  { id: '2', title: 'Tech Insights Weekly', date: '2024-07-21', excerpt: 'My weekly dose of technology musings and discoveries...' },
];

export default function BlogsPage() {
  return (
    <div className="text-gray-300 p-4 w-full flex justify-center min-h-screen">
      <div className="max-w-2xl w-full mt-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Blogs</h1>
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="p-4 border border-gray-700 rounded-lg hover:border-gray-500">
              <h2 className="text-xl font-semibold text-indigo-400 hover:text-indigo-300">
                <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              </h2>
              <p className="text-xs text-gray-500 mt-1">{blog.date}</p>
              <p className="text-gray-400 mt-1">{blog.excerpt}</p>
              <Link href={`/blogs/${blog.id}`} className="text-sm text-green-500 hover:underline mt-2 inline-block">
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