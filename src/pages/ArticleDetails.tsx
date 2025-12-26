import { useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar, Share2, Twitter, Linkedin, Facebook, Copy } from "lucide-react";
import { getArticleById, getRelatedArticles, articles } from "@/data/articles";
import { useLenis } from "@/hooks/useLenis";
import { toast } from "@/hooks/use-toast";

const ArticleDetails = () => {
  useLenis();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = getArticleById(id || "");
  const relatedArticles = getRelatedArticles(id || "", 3);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: contentProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(heroProgress, [0, 1], [0, 300]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const smoothHeroY = useSpring(heroY, { stiffness: 100, damping: 30 });

  const progressWidth = useSpring(contentProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link to="/articles" className="text-primary hover:underline">
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = articles.findIndex(a => a.id === id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article.title;
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast({ title: "Link copied!", description: "Article link copied to clipboard" });
      return;
    }

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <motion.div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: progressWidth }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: smoothHeroY, scale: heroScale }}
        >
          <motion.img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </motion.div>

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/60"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Back Button */}
        <motion.div
          className="absolute top-8 left-8 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            to="/articles"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
          style={{ opacity: heroOpacity }}
        >
          <div className="container mx-auto max-w-4xl">
            <motion.span
              className="inline-block px-4 py-2 rounded-full border border-primary/30 text-primary text-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {article.category}
            </motion.span>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {article.title}
            </motion.h1>

            <motion.div
              className="flex flex-wrap items-center gap-6 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <p className="font-medium text-foreground">{article.author.name}</p>
                  <p className="text-sm">{article.author.role}</p>
                </div>
              </div>
              <span className="w-px h-8 bg-border" />
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Article Content */}
      <section ref={contentRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-6xl mx-auto">
            {/* Main Content */}
            <motion.article
              className="prose prose-lg dark:prose-invert max-w-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div 
                className="article-content space-y-6"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              <motion.div
                className="flex flex-wrap gap-3 pt-8 mt-12 border-t border-border"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {article.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    #{tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-8">
              {/* Share */}
              <motion.div
                className="p-6 rounded-2xl bg-muted/50 border border-border"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Article
                </h3>
                <div className="flex gap-3">
                  {[
                    { icon: Twitter, platform: 'twitter', color: 'hover:bg-[#1DA1F2]' },
                    { icon: Linkedin, platform: 'linkedin', color: 'hover:bg-[#0A66C2]' },
                    { icon: Facebook, platform: 'facebook', color: 'hover:bg-[#1877F2]' },
                    { icon: Copy, platform: 'copy', color: 'hover:bg-primary' },
                  ].map(({ icon: Icon, platform, color }) => (
                    <motion.button
                      key={platform}
                      onClick={() => handleShare(platform)}
                      className={`w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center transition-colors ${color} hover:text-white hover:border-transparent`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Author Card */}
              <motion.div
                className="p-6 rounded-2xl bg-muted/50 border border-border"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="font-semibold mb-4">About the Author</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{article.author.name}</p>
                    <p className="text-sm text-muted-foreground">{article.author.role}</p>
                  </div>
                </div>
              </motion.div>

              {/* Table of Contents Placeholder */}
              <motion.div
                className="p-6 rounded-2xl bg-muted/50 border border-border"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h3 className="font-semibold mb-4">In This Article</h3>
                <nav className="space-y-2 text-sm">
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Introduction
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Key Concepts
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Best Practices
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Conclusion
                  </a>
                </nav>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            {prevArticle && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={`/articles/${prevArticle.id}`}
                  className="group block p-6 rounded-2xl border border-border hover:border-primary transition-colors"
                >
                  <span className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Previous Article
                  </span>
                  <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {prevArticle.title}
                  </h4>
                </Link>
              </motion.div>
            )}
            {nextArticle && (
              <motion.div
                className={prevArticle ? "" : "md:col-start-2"}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={`/articles/${nextArticle.id}`}
                  className="group block p-6 rounded-2xl border border-border hover:border-primary transition-colors text-right"
                >
                  <span className="text-sm text-muted-foreground flex items-center gap-2 justify-end mb-2">
                    Next Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {nextArticle.title}
                  </h4>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Related Articles</h2>
            <p className="text-muted-foreground">Continue exploring similar topics</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {relatedArticles.map((related, index) => (
              <RelatedArticleCard key={related.id} article={related} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const RelatedArticleCard = ({ article, index }: { article: typeof articles[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <Link to={`/articles/${article.id}`} className="group block">
        <motion.div
          className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm">
            {article.category}
          </span>
        </motion.div>

        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {article.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{article.date}</span>
          <span>{article.readTime}</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleDetails;
