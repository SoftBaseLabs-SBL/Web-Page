import { Globe, Search, Zap, Palette, type LucideIcon } from "lucide-react"

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  iconName: "globe" | "search" | "zap" | "palette"
  readTime: string
  date: string
  blocks: Block[]
}

export const iconMap: Record<BlogPost["iconName"], LucideIcon> = {
  globe: Globe,
  search: Search,
  zap: Zap,
  palette: Palette,
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-a-website-is-important",
    title: "Why a Website Is Important for Your Business",
    excerpt:
      "Your website is the one piece of marketing you fully own — open 24/7, working for you while you sleep. Here's why it's the foundation everything else is built on.",
    category: "Strategy",
    iconName: "globe",
    readTime: "5 min read",
    date: "2026-05-12",
    blocks: [
      {
        type: "paragraph",
        text: "Before anyone calls you, walks into your shop, or books your service, they do one thing first: they look you up online. In that moment your website is your handshake, your storefront, and your first impression all at once — and you only get one.",
      },
      {
        type: "heading",
        text: "You own it — unlike social media",
      },
      {
        type: "paragraph",
        text: "Social platforms are rented land. Algorithms change, reach drops, accounts get suspended, and you have no control over any of it. Your website is the one channel you truly own. It works on your terms, it can't be taken away overnight, and every visitor you send to it is yours to convert.",
      },
      {
        type: "heading",
        text: "It builds instant credibility",
      },
      {
        type: "paragraph",
        text: "A clean, fast, professional site signals that you're a real business worth trusting. The opposite is also true — a missing or outdated website quietly sends customers to your competitors. Studies consistently show people judge a company's credibility within seconds, largely based on design.",
      },
      {
        type: "list",
        items: [
          "Available 24/7 — answering questions and capturing leads while you sleep",
          "The hub every ad, post, and business card should point back to",
          "A place to showcase your work, reviews, and what makes you different",
          "Measurable — you can see exactly what's working and double down",
        ],
      },
      {
        type: "quote",
        text: "A website isn't a cost — it's the hardest-working, lowest-paid employee you'll ever hire.",
      },
      {
        type: "paragraph",
        text: "The good news? A great website doesn't have to be complicated or expensive. It just has to load fast, look professional, and make it effortless for the right people to take the next step.",
      },
    ],
  },
  {
    slug: "why-seo-matters",
    title: "Why SEO Matters (and How It Actually Works)",
    excerpt:
      "Being on page one isn't luck — it's the result of a site search engines can understand and trust. Here's what SEO really is and why it pays off for years.",
    category: "SEO",
    iconName: "search",
    readTime: "6 min read",
    date: "2026-05-06",
    blocks: [
      {
        type: "paragraph",
        text: "SEO — search engine optimization — is the practice of making your website easy for search engines to find, understand, and recommend. When someone searches for what you offer, SEO is what decides whether they find you or your competitor.",
      },
      {
        type: "heading",
        text: "The traffic that compounds",
      },
      {
        type: "paragraph",
        text: "Ads stop the moment you stop paying. SEO is different — a page that ranks well can bring in customers month after month with no extra spend. It's an asset that compounds over time, which is exactly why it's one of the highest-ROI investments a small business can make.",
      },
      {
        type: "heading",
        text: "What search engines actually reward",
      },
      {
        type: "list",
        items: [
          "Relevant content that genuinely answers what people are searching for",
          "Fast load times and a smooth mobile experience",
          "Clean, well-structured code search engines can read",
          "Local signals — your name, address, and reviews on Google",
          "Trust signals like other reputable sites linking to you",
        ],
      },
      {
        type: "paragraph",
        text: "Notice that most of these overlap with simply having a good website. That's the secret: great SEO and a great user experience are the same thing. Build for your customer first, and search engines follow.",
      },
      {
        type: "quote",
        text: "The best place to hide a dead body is page two of Google. If you're not on page one, you're invisible.",
      },
      {
        type: "paragraph",
        text: "SEO isn't a one-time switch — it's an ongoing edge. But the businesses that start early build a lead that's incredibly hard for latecomers to catch.",
      },
    ],
  },
  {
    slug: "website-speed-and-conversions",
    title: "Why Website Speed Makes or Breaks Conversions",
    excerpt:
      "Every extra second of load time quietly costs you customers. Here's the data behind speed — and why performance is a feature, not a nice-to-have.",
    category: "Performance",
    iconName: "zap",
    readTime: "4 min read",
    date: "2026-04-28",
    blocks: [
      {
        type: "paragraph",
        text: "People decide whether to stay on a website in the time it takes to blink. If your pages are slow, it doesn't matter how good your offer is — most visitors will be gone before they ever see it.",
      },
      {
        type: "heading",
        text: "The numbers are brutal",
      },
      {
        type: "list",
        items: [
          "A 1-second delay can cut conversions by around 7%",
          "Most visitors abandon a page that takes more than 3 seconds to load",
          "Google uses speed as a direct ranking factor — slow sites rank lower",
          "Mobile users are the least patient, and they're most of your traffic",
        ],
      },
      {
        type: "paragraph",
        text: "Speed isn't just about patience, either. A fast site feels trustworthy and premium. A sluggish one feels broken — and that feeling transfers straight onto your brand.",
      },
      {
        type: "heading",
        text: "Fast by design, not by accident",
      },
      {
        type: "paragraph",
        text: "Performance is something you build in from the start: optimized images, modern code, smart loading, and lean design. Bolting it on later is far harder. When we build a site, we treat every second as money on the table — because it is.",
      },
      {
        type: "quote",
        text: "Speed is the one feature every single visitor notices, even when they can't name it.",
      },
    ],
  },
  {
    slug: "web-design-that-converts",
    title: "Web Design That Turns Visitors Into Customers",
    excerpt:
      "Good design isn't about looking pretty — it's about guiding people to act. Here's what separates a website that converts from one that just exists.",
    category: "Design",
    iconName: "palette",
    readTime: "5 min read",
    date: "2026-04-19",
    blocks: [
      {
        type: "paragraph",
        text: "A beautiful website that doesn't convert is just expensive art. The real job of design is to make the right action feel obvious and effortless — to turn a curious visitor into a customer without them even noticing the nudge.",
      },
      {
        type: "heading",
        text: "Clarity beats clever",
      },
      {
        type: "paragraph",
        text: "Within seconds, a visitor should know three things: what you offer, why it matters to them, and what to do next. Confusion is the enemy of conversion. The clearer the path, the more people walk it.",
      },
      {
        type: "list",
        items: [
          "One clear call-to-action per page, repeated where it counts",
          "A strong headline that speaks to the customer, not about you",
          "Visual hierarchy that leads the eye exactly where you want it",
          "Trust builders — reviews, results, and real photos — at the right moments",
          "Zero friction: fewer clicks, fewer fields, faster wins",
        ],
      },
      {
        type: "heading",
        text: "Design for the customer, not the awards",
      },
      {
        type: "paragraph",
        text: "Trends come and go, but human psychology doesn't. The best-performing sites aren't the flashiest — they're the ones that respect the visitor's time and make saying yes easy.",
      },
      {
        type: "quote",
        text: "Design is not just what it looks like and feels like. Design is how it works.",
      },
    ],
  },
]

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug)
