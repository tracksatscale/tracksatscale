import { BlogHeader } from "@/components/BlogHeader";
import { BlogHero } from "@/components/BlogHero";
import { ArticleList } from "@/components/ArticleList";
import { BlogFooter } from "@/components/BlogFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <BlogHeader />
      <main>
        <BlogHero />
        <ArticleList />
      </main>
      <BlogFooter />
    </div>
  );
}
