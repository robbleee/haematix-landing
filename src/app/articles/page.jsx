import Link from 'next/link';
import Image from 'next/image';
import styles from './articles.module.css';

export const metadata = {
  title: 'Haem.io Articles | Insights & Engineering',
  description: 'Deep dives into the engineering and medical logic behind Haem.io.',
};

const articles = [
  {
    id: 'signal-vs-execution',
    category: 'Engineering Architecture',
    title: 'The Architecture of Certainty',
    excerpt: 'What Clinical AI can learn from Algorithmic Trading. Why probability is excellent for discovery, but dangerous for execution.',
    author: 'Robert Lee',
    authorImage: '/profile-pics/robbie.png',
    date: 'November 24, 2025',
    slug: '/articles/signal-vs-execution'
  }
];

export default function ArticlesPage() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← Back to Home
      </Link>

      <div className={styles.content}>
        <div className={styles.timeline}>
          {articles.map((article) => (
            <Link key={article.id} href={article.slug} className={styles.articleLink}>
              <div className={styles.articleCard}>
                <div className={styles.cardHeader}>
                  <Image 
                    src={article.authorImage} 
                    alt={article.author}
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                  <div className={styles.authorInfo}>
                    <div className={styles.authorName}>{article.author}</div>
                    <div className={styles.date}>{article.date}</div>
                  </div>
                </div>

                <div className={styles.category}>{article.category}</div>
                
                <h2 className={styles.title}>{article.title}</h2>
                
                <p className={styles.excerpt}>{article.excerpt}</p>
                
                <div className={styles.readMore}>Read Article →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
