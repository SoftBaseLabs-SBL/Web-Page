import type { Metadata } from "next"
import { blogPosts, getPost } from "@/lib/blog-posts"
import { ArticleContent } from "@/components/article-content"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: "Article not found — SoftBaseLabs" }
  return {
    title: `${post.title} — SoftBaseLabs`,
    description: post.excerpt,
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <ArticleContent slug={slug} />
}
