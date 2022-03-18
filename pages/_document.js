import Document, { Html, Head, Main, NextScript } from 'next/document'

class TerraDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href={'https://fonts.googleapis.com/css2?family=Saira&family=Orbitron&display=swap'}
                        rel={'stylesheet'} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default TerraDocument