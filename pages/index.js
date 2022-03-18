import Head from 'next/head'
import { strings } from '../strings/en'
import Content from './components/content'
import Layout from './components/layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{strings.siteTitle}</title>
      </Head>
      <Content />
    </Layout>
  )
}
