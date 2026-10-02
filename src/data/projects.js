import c2Video from '../assets/c2.mp4';
import cinematicVideo from '../assets/cinematic.mp4';
import ssVideo from '../assets/SS enterprises Final.mp4';
import gskPodcastVideo from '../assets/GSK SCHOOL  PODCAST.mov';
import techVideo from '../assets/Tech.mp4';
import ipVideo from '../assets/ip.mp4';

// 3 Unique Long Form / Commercial Projects
export const projects = [
  {
    id: 1,
    title: "SS Enterprises Commercial",
    client: "SS Enterprises",
    category: "Brand Film",
    duration: "0:45",
    views: "2.4M",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80",
    video: ssVideo,
    aspect: "landscape",
    featured: true,
  },
  {
    id: 2,
    title: "GSK School Podcast",
    client: "GSK School",
    category: "Podcast",
    duration: "45:12",
    views: "1.8M",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80",
    video: gskPodcastVideo,
    aspect: "landscape",
    featured: false,
  },
  {
    id: 3,
    title: "Tech Showcase & Motion",
    client: "Tech Brand",
    category: "Brands",
    duration: "1:30",
    views: "980K",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
    video: techVideo,
    aspect: "landscape",
    featured: false,
  },
];

// 3 Unique Short Form / Reels Videos
export const shorts = [
  {
    id: 4,
    title: "Cinematic Visual Storytelling",
    client: "Brand Showcase",
    category: "Shorts",
    views: "4.2M",
    thumbnail: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=600&q=80",
    video: cinematicVideo,
  },
  {
    id: 5,
    title: "Fast-Paced Motion Edit",
    client: "Reels Cut",
    category: "Shorts",
    views: "2.1M",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    video: c2Video,
  },
  {
    id: 6,
    title: "IP & Brand Motion Short",
    client: "Brand Campaign",
    category: "Shorts",
    views: "1.9M",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    video: ipVideo,
  },
];
