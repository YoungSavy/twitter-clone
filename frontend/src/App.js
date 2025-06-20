import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import './App.css';
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  Bookmark, 
  User, 
  MoreHorizontal, 
  Heart, 
  MessageCircle, 
  Repeat2, 
  Share, 
  Settings,
  Moon,
  Sun,
  X,
  Plus,
  Image as ImageIcon,
  Smile,
  Calendar,
  MapPin,
  Hash,
  TrendingUp,
  Users,
  Verified
} from 'lucide-react';

// Mock Data
const mockUsers = [
  {
    id: 1,
    username: 'elonmusk',
    displayName: 'Elon Musk',
    avatar: 'https://images.pexels.com/photos/32553414/pexels-photo-32553414.png',
    verified: true,
    followers: '165.2M',
    following: '342'
  },
  {
    id: 2,
    username: 'oprah',
    displayName: 'Oprah Winfrey',
    avatar: 'https://images.pexels.com/photos/16233575/pexels-photo-16233575.jpeg',
    verified: true,
    followers: '45.8M',
    following: '289'
  },
  {
    id: 3,
    username: 'rihanna',
    displayName: 'Rihanna',
    avatar: 'https://images.pexels.com/photos/19245172/pexels-photo-19245172.jpeg',
    verified: true,
    followers: '107.3M',
    following: '1,210'
  },
  {
    id: 4,
    username: 'johnsmith',
    displayName: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1530785896884-7929f3dd1954',
    verified: false,
    followers: '1.2K',
    following: '567'
  },
  {
    id: 5,
    username: 'sarahwilson',
    displayName: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1618780179533-870736eaea58',
    verified: false,
    followers: '892',
    following: '234'
  }
];

const mockPosts = [
  {
    id: 1,
    user: mockUsers[0],
    content: "Just launched another rocket! 🚀 The future of space travel is looking bright. Mars, here we come! #SpaceX #Mars",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    likes: 45678,
    retweets: 12345,
    replies: 3456,
    image: null,
    liked: false,
    retweeted: false
  },
  {
    id: 2,
    user: mockUsers[1],
    content: "Remember, the greatest gift you can give yourself is the gift of possibility. What are you making possible today? ✨",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 23456,
    retweets: 5678,
    replies: 1234,
    image: null,
    liked: true,
    retweeted: false
  },
  {
    id: 3,
    user: mockUsers[2],
    content: "New music dropping soon! Can't wait to share what I've been working on 🎵✨ #NewMusic #ComingSoon",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    likes: 67890,
    retweets: 15432,
    replies: 4567,
    image: 'https://images.pexels.com/photos/5081930/pexels-photo-5081930.jpeg',
    liked: false,
    retweeted: true
  },
  {
    id: 4,
    user: mockUsers[3],
    content: "Beautiful sunset today! Sometimes you just need to stop and appreciate the simple moments 🌅",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    likes: 234,
    retweets: 45,
    replies: 12,
    image: 'https://images.pexels.com/photos/2818118/pexels-photo-2818118.jpeg',
    liked: true,
    retweeted: false
  },
  {
    id: 5,
    user: mockUsers[4],
    content: "Just finished reading an amazing book about productivity. The key insight: focus on systems, not goals. Game changer! 📚",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    likes: 156,
    retweets: 67,
    replies: 23,
    image: null,
    liked: false,
    retweeted: false
  }
];

const mockTrends = [
  { tag: '#SpaceX', posts: '125K posts' },
  { tag: '#NewMusic', posts: '89K posts' },
  { tag: '#Productivity', posts: '67K posts' },
  { tag: '#AI', posts: '156K posts' },
  { tag: '#ClimateChange', posts: '203K posts' }
];

const mockSuggestions = [
  {
    user: mockUsers[2],
    reason: 'Suggested for you'
  },
  {
    user: mockUsers[4],
    reason: 'Popular in your area'
  }
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState('For you');
  const [posts, setPosts] = useState(mockPosts);
  const [showCompose, setShowCompose] = useState(false);
  const [composeText, setComposeText] = useState('');
  const [currentUser] = useState(mockUsers[3]); // John Smith as current user
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-generate random tweets
  useEffect(() => {
    const generateRandomTweet = () => {
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const randomTweets = [
        "Just had the most amazing coffee this morning! ☕ Starting the day right! #MondayMotivation",
        "Working on some exciting new projects. Can't wait to share what I've been building! 🚀",
        "Beautiful day outside! Perfect weather for a walk in the park 🌞",
        "Learning something new every day. Knowledge is power! 📚 #NeverStopLearning",
        "Grateful for all the amazing people in my life. Feeling blessed today! 🙏",
        "Just finished a great workout! Feeling energized and ready to tackle the day 💪",
        "Trying out a new recipe today. Cooking is my new hobby! 👨‍🍳 #FoodLover",
        "Reading an incredible book about productivity. So many great insights! 📖",
        "Weekend vibes are hitting different today. Time to relax and recharge! 🌅",
        "Technology is advancing so fast. Exciting times to be alive! 🤖 #TechLife",
        "Music has the power to change everything. What's your favorite song right now? 🎵",
        "Small steps every day lead to big changes. Keep pushing forward! 💫"
      ];
      
      const randomContent = randomTweets[Math.floor(Math.random() * randomTweets.length)];
      const randomImages = [
        'https://images.pexels.com/photos/5081402/pexels-photo-5081402.jpeg',
        'https://images.unsplash.com/photo-1562646329-0d0f4d3bf503',
        'https://images.unsplash.com/photo-1698331383094-603aa3df9a14',
        null, null, null // More likely to have no image
      ];
      
      const newTweet = {
        id: Date.now(),
        user: randomUser,
        content: randomContent,
        timestamp: new Date(),
        likes: Math.floor(Math.random() * 1000),
        retweets: Math.floor(Math.random() * 200),
        replies: Math.floor(Math.random() * 50),
        image: randomImages[Math.floor(Math.random() * randomImages.length)],
        liked: false,
        retweeted: false
      };
      
      setPosts(prevPosts => [newTweet, ...prevPosts.slice(0, 19)]); // Keep only 20 posts
    };

    const interval = setInterval(generateRandomTweet, 15000); // New tweet every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleRetweet = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, retweeted: !post.retweeted, retweets: post.retweeted ? post.retweets - 1 : post.retweets + 1 }
        : post
    ));
  };

  const handlePost = () => {
    if (composeText.trim()) {
      const newPost = {
        id: posts.length + 1,
        user: currentUser,
        content: composeText,
        timestamp: new Date(),
        likes: 0,
        retweets: 0,
        replies: 0,
        image: null,
        liked: false,
        retweeted: false
      };
      setPosts([newPost, ...posts]);
      setComposeText('');
      setShowCompose(false);
    }
  };

  const Sidebar = () => (
    <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out' : 'fixed left-0 top-0 h-full w-64'} ${isMobile && !showMobileMenu ? '-translate-x-full' : 'translate-x-0'} border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4`}>
      {isMobile && (
        <button
          onClick={() => setShowMobileMenu(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      
      <div className="mb-8">
        <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
          <X className="w-5 h-5 text-white dark:text-black" />
        </div>
      </div>
      
      <nav className="space-y-2">
        {[
          { icon: Home, label: 'Home', active: true },
          { icon: Search, label: 'Explore' },
          { icon: Bell, label: 'Notifications' },
          { icon: Mail, label: 'Messages' },
          { icon: Bookmark, label: 'Bookmarks' },
          { icon: User, label: 'Profile' },
          { icon: MoreHorizontal, label: 'More' }
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-4 p-3 rounded-full cursor-pointer transition-colors ${
              item.active 
                ? 'bg-gray-100 dark:bg-gray-900 font-bold' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-900'
            }`}
          >
            <item.icon className={`w-6 h-6 ${isMobile ? 'w-5 h-5' : ''}`} />
            <span className={`${isMobile ? 'text-lg' : 'text-xl'}`}>{item.label}</span>
          </motion.div>
        ))}
      </nav>

      <motion.button
        onClick={() => setShowCompose(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full mt-8 transition-colors"
      >
        {isMobile ? 'Post' : 'Post'}
      </motion.button>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
          <img src={currentUser.avatar} alt={currentUser.displayName} className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <div className="font-bold text-sm">{currentUser.displayName}</div>
            <div className="text-gray-500 text-xs">@{currentUser.username}</div>
          </div>
          <MoreHorizontal className="w-5 h-5" />
        </div>
      </div>
    </div>
  );

  const RightSidebar = () => (
    <div className={`${isMobile ? 'hidden' : 'fixed right-0 top-0 h-full w-80'} p-4`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">What's happening</h2>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDarkMode(!darkMode);
            }} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4">
          <h3 className="text-xl font-bold mb-3">Trends for you</h3>
          <div className="space-y-3">
            {mockTrends.map((trend, index) => (
              <motion.div
                key={index}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                className="cursor-pointer p-2 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">{trend.tag}</div>
                    <div className="text-gray-500 text-sm">{trend.posts}</div>
                  </div>
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4">
          <h3 className="text-xl font-bold mb-3">Who to follow</h3>
          <div className="space-y-3">
            {mockSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={suggestion.user.avatar} alt={suggestion.user.displayName} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold">{suggestion.user.displayName}</span>
                      {suggestion.user.verified && <Verified className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div className="text-gray-500 text-sm">@{suggestion.user.username}</div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black dark:bg-white text-white dark:text-black px-4 py-1 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Follow
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Post = ({ post }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors"
    >
      <div className="flex space-x-3">
        <img src={post.user.avatar} alt={post.user.displayName} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-bold hover:underline cursor-pointer">{post.user.displayName}</span>
            {post.user.verified && <Verified className="w-4 h-4 text-blue-500" />}
            <span className="text-gray-500">@{post.user.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{formatDistanceToNow(post.timestamp)} ago</span>
          </div>
          
          <div className="mb-3">
            <p className="text-gray-900 dark:text-gray-100 leading-relaxed">{post.content}</p>
            {post.image && (
              <img src={post.image} alt="Post content" className="mt-3 rounded-2xl max-w-full h-auto border border-gray-200 dark:border-gray-700" />
            )}
          </div>

          <div className="flex items-center justify-between max-w-md">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Reply clicked for post:', post.id);
              }}
            >
              <div className="p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-sm">{post.replies}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Retweet clicked for post:', post.id);
                handleRetweet(post.id);
              }}
              className={`flex items-center space-x-2 transition-colors group ${
                post.retweeted ? 'text-green-500' : 'text-gray-500 hover:text-green-500'
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-green-100 dark:group-hover:bg-green-900">
                <Repeat2 className="w-5 h-5" />
              </div>
              <span className="text-sm">{post.retweets}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Like clicked for post:', post.id);
                handleLike(post.id);
              }}
              className={`flex items-center space-x-2 transition-colors group ${
                post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-red-100 dark:group-hover:bg-red-900">
                <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-sm">{post.likes}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Share clicked for post:', post.id);
              }}
            >
              <div className="p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900">
                <Share className="w-5 h-5" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ComposeModal = () => (
    <AnimatePresence>
      {showCompose && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowCompose(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-black rounded-2xl w-full max-w-2xl mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowCompose(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePost}
                disabled={!composeText.trim()}
                className={`px-6 py-2 rounded-full font-bold transition-colors ${
                  composeText.trim()
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Post
              </motion.button>
            </div>

            <div className="flex space-x-4">
              <img src={currentUser.avatar} alt={currentUser.displayName} className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <textarea
                  value={composeText}
                  onChange={(e) => setComposeText(e.target.value)}
                  placeholder="What's happening?"
                  className="w-full resize-none border-none outline-none text-xl placeholder-gray-500 bg-transparent"
                  rows="4"
                  autoFocus
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 p-2 rounded-full">
                      <ImageIcon className="w-5 h-5" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 p-2 rounded-full">
                      <Smile className="w-5 h-5" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 p-2 rounded-full">
                      <Calendar className="w-5 h-5" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 p-2 rounded-full">
                      <MapPin className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <div className="text-gray-500 text-sm">{280 - composeText.length}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const Timeline = () => (
    <div className="ml-64 mr-80 min-h-screen border-x border-gray-200 dark:border-gray-800">
      <div className="sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 z-10">
        <div className="p-4">
          <h1 className="text-xl font-bold">Home</h1>
        </div>
        <div className="flex">
          {['For you', 'Following'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 py-4 px-4 font-semibold transition-colors relative ${
                selectedTab === tab
                  ? 'text-black dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab}
              {selectedTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex space-x-4">
          <img src={currentUser.avatar} alt={currentUser.displayName} className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <button
              onClick={() => setShowCompose(true)}
              className="w-full text-left text-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              What's happening?
            </button>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 p-2 rounded-full">
                  <ImageIcon className="w-5 h-5" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 p-2 rounded-full">
                  <Smile className="w-5 h-5" />
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCompose(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Post
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                <Sidebar />
                <Timeline />
                <RightSidebar />
                <ComposeModal />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;