import Head from 'next/head'

export default function Home() {
  return (
    <div className={'container'}>
      <Head>
        <title>Terragrids DApp</title>
        <link rel={'icon'} href={'/favicon.ico'} />
      </Head>

      <main>
        <h1>
          Welcome to the Terragrids dApp
        </h1>
      </main>
    </div>
  )
}
