import Post from "./Post";

const posts = [
{
  id: 1,
  user: { name: "ليلى حسن" },
  content:  "  ما هي أفضل الأدوات التي تستخدمونها لإدارة المهام في الفرق الصغيرة؟  ",
  likes: 12,
  comments: 3,
  createdAt: "منذ ساعة",
},
  {
    id: 2,
    user: { name: "د. سمير صبحي" },
    content: "لقد أكملت للتو مشروعي الخامس في تصميم الهوية البصرية عبر منصة حِرَفِيّ. النصيحة الأهم التي يمكنني تقديمها للمصممين الجدد هي التركيز على بناء بورتفوليو قوي قبل التقديم على المشاريع الكبيرة. الجودة دائماً تسبق الكمية!",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    ],
    likes: 40,
    comments: 8,
    createdAt: "منذ يوم",
  },
  {
    id: 3,
    user: { name: "سامي الحلبي" },
    content: "أنهيت للتو مشروع تركيب نظام ذكي متكامل لأحد العملاء. الجودة والدقة هي مفتاح النجاح في كل حرفة. من يحتاج لاستشارة تقنية؟",
    images: [
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    ],
    likes: 88,
    comments: 20,
    createdAt: "منذ 3 أيام",
  },
];

const CommunityFeed = () => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default CommunityFeed;

