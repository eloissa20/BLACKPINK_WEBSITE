import { useEffect, useState } from 'react';
import bgImage from '../assets/bpdolls.jpg';
import blackpinkImage from '../assets/blackpink-group.jpg';

interface NewsPost {
  id: string;
  content: string;
  timestamp: string;
  author: string;
}

export function NewsFeed() {
  const [post, setPost] = useState<NewsPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData: NewsPost = {
          id: '1',
          content: 'Blackpink made history as the first K-pop girl band to headline Wembley Stadium with an epic show!',
          timestamp: new Date().toISOString(),
          author: 'Mark Savage, BBC Music Correspondent',
        };
        setPost(newsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-white animate-pulse bg-cover bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        Loading news...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-cover bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50"></div>
      <div className="relative z-10 h-full overflow-y-auto p-6">
        <header className="flex items-center justify-between mb-8 border-b-4 border-pink-500/50 pb-4">
          <h2 className="text-5xl font-extrabold text-pink-500 bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent animate-pulse-slow">
            Latest News
          </h2>
          <div className="text-gray-300 text-lg">Updated: {new Date().toLocaleDateString()}</div>
        </header>
        {post && (
          <div className="bg-gray-900/60 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-pink-500/30 transition-all duration-500 hover:shadow-pink-500/20">
            <a href="https://www.bbc.com/news/articles/c36jz730114o" target="_blank" rel="noopener noreferrer" className="block w-full">
              <img
                src={blackpinkImage}
                alt="BLACKPINK at Wembley"
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </a>
            <div className="mt-6 prose prose-xl max-w-none text-white">
              <a href="https://www.bbc.com/news/articles/c36jz730114o" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors duration-300">
                {post.content}
              </a>
            </div>
            <div className="mt-6 text-gray-300 text-lg flex justify-between items-center border-t border-pink-500/30 pt-4">
              <span>{post.author}</span>
              <span>{new Date(post.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}