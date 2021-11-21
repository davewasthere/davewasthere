import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { getSortedTravelsData } from '../lib/travel'
import Link from 'next/link'
import Date from '../components/date'

export async function getStaticProps() {

  const allPostsData = getSortedPostsData()
  const allTravelData = getSortedTravelsData()

  return {
    props: {
      allPostsData,
      allTravelData
    }
  }
}

export default function Home({ allPostsData, allTravelData }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>The new(ish) posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.filter(p => typeof(p.published) === 'undefined' || p.published ).map(({ id, date, title, description, published }) => (
            <li className={utilStyles.listItem} key={id}>
              { date && <>
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
              {` - `}</>
              }
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              {description && <><br /><small>{description}</small></> }
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Older Travels</h2>
        <ul className={utilStyles.list}>
          {allTravelData.map(({ id, date, title, description }) => (
            <li className={utilStyles.listItem} key={id}>
              { date && <>
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
              {` - `}</>
              }
              <Link href={`/travel/${id}`}>
                <a>{title}</a>
              </Link>
              {description && <><br /><small>{description}</small></> }
            </li>
          ))}
        </ul>
      </section>

    </Layout>
  )
}