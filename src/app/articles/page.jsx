import Link from 'next/link';
import Image from 'next/image';
import styles from './articles.module.css';

export const metadata = {
  title: 'Haem.io Articles | Insights & Engineering',
  description: 'Deep dives into the engineering and medical logic behind Haem.io.',
};

const articles = [
  {
    id: 'version-control-of-medicine',
    category: 'Clinical Systems',
    categoryColor: '#10b981',
    title: 'The Version Control of Medicine',
    excerpt: 'The Complexity Crisis in Haematological Classification and the Case for Executable Diagnostic Logic.',
    author: 'Robert Lee',
    authorImage: '/profile-pics/robbie.png',
    date: 'November 25, 2025',
    readTime: '12 min read',
    slug: '/articles/version-control-of-medicine'
  },
  {
    id: 'signal-vs-execution',
    category: 'Engineering Architecture',
    categoryColor: '#3b82f6',
    title: 'The Architecture of Certainty',
    excerpt: 'What Clinical AI can learn from Algorithmic Trading. Why probability is excellent for discovery, but dangerous for execution.',
    author: 'Robert Lee',
    authorImage: '/profile-pics/robbie.png',
    date: 'November 24, 2025',
    readTime: '10 min read',
    slug: '/articles/signal-vs-execution'
  },
  {
    id: 'expansion-thesis',
    category: 'Strategy',
    categoryColor: '#8b5cf6',
    title: 'The Expansion Thesis',
    excerpt: 'Structural Validation of the Diagnostic Complexity Crisis in Oncology. Why haematology is the beachhead, and where the logic goes next.',
    author: 'Robert Lee',
    authorImage: '/profile-pics/robbie.png',
    date: 'November 20, 2025',
    readTime: '15 min read',
    slug: '/expansion-thesis'
  }
];

export default function ArticlesPage() {
  const [featured, ...rest] = articles;

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.header}>
        <p className={styles.headerEyebrow}>From the team at Haem.io</p>
        <h1 className={styles.headerTitle}>Writing</h1>
        <p className={styles.headerSubtitle}>
          Essays on clinical systems, engineering architecture, and the future of diagnostic medicine.
        </p>
      </div>

      <div className={styles.container}>
        {/* Featured Article */}
        <Link href={featured.slug} className={styles.featuredLink}>
          <article className={styles.featuredCard}>
            <div className={styles.featuredMeta}>
              <span
                className={styles.tag}
                style={{ '--tag-color': featured.categoryColor }}
              >
                {featured.category}
              </span>
              <span className={styles.metaDivider} />
              <span className={styles.metaText}>{featured.date}</span>
              <span className={styles.metaDivider} />
              <span className={styles.metaText}>{featured.readTime}</span>
            </div>
            <h2 className={styles.featuredTitle}>{featured.title}</h2>
            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
            <div className={styles.featuredFooter}>
              <div className={styles.author}>
                <Image
                  src={featured.authorImage}
                  alt={featured.author}
                  width={32}
                  height={32}
                  className={styles.avatar}
                />
                <span className={styles.authorName}>{featured.author}</span>
              </div>
              <span className={styles.readMoreArrow}>Read →</span>
            </div>
          </article>
        </Link>

        {/* Divider */}
        <div className={styles.sectionDivider}>
          <span className={styles.sectionLabel}>More articles</span>
        </div>

        {/* Article List */}
        <div className={styles.list}>
          {rest.map((article, i) => (
            <Link key={article.id} href={article.slug} className={styles.listLink}>
              <article className={styles.listItem}>
                <div className={styles.listItemLeft}>
                  <div className={styles.listMeta}>
                    <span
                      className={styles.tag}
                      style={{ '--tag-color': article.categoryColor }}
                    >
                      {article.category}
                    </span>
                    <span className={styles.metaDivider} />
                    <span className={styles.metaText}>{article.date}</span>
                    <span className={styles.metaDivider} />
                    <span className={styles.metaText}>{article.readTime}</span>
                  </div>
                  <h2 className={styles.listTitle}>{article.title}</h2>
                  <p className={styles.listExcerpt}>{article.excerpt}</p>
                  <div className={styles.author}>
                    <Image
                      src={article.authorImage}
                      alt={article.author}
                      width={28}
                      height={28}
                      className={styles.avatar}
                    />
                    <span className={styles.authorName}>{article.author}</span>
                  </div>
                </div>
                <div className={styles.listItemRight}>
                  <span className={styles.listArrow}>→</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
