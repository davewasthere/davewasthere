import Layout from '../../components/layout'
import { getAllTravelIds, getTravelData } from '../../lib/travel'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({ params }) {
  const postData = await getTravelData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllTravelIds()
  return {
    paths,
    fallback: false
  }
}

export default function Travel({ postData }) {

// console.log(postData);

    return (
        <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            { postData.date && <Date dateString={postData.date} /> }
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    )
  }
