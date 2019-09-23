import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        // this exposes the query to the user
        pageProps.query = ctx.query;
        // this entire getInitialProps function fires off the queries it needs to get the info of anything it needs to display on the page everytime it loads, before the rest of the page is rendered.
        // (e.g if it needs to load specific items of clothing, card details, user info etc...)
        return { pageProps };
    }
    render() {
        const { Component, apollo, pageProps } = this.props;

        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <Page>
                        {/* the component bellow loads all the pageProps queried above in order to render the relevant info in each area of the App it is requested by.
                        (e.g the page will query an 'item' such as a pair of shoes, gather all the returned values and then render them where they're called in the App.) */}
                        <Component {...pageProps} />
                    </Page>
                </ApolloProvider>
            </Container>
        );
    }
}

export default withData(MyApp);