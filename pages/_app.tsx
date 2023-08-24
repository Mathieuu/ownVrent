import "../styles/tailwind.css";

import { ConfigProvider, Layout } from "antd";
import { AppProps } from "next/app";

const { Header, Footer } = Layout;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        components: {},
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="!bg-transparent" />
        <div className="mx-auto flex w-full max-w-screen-lg grow">
          <div className="p-4" />
          <div className="grow">
            <Component {...pageProps} />
          </div>
        </div>
        <Footer className="!bg-transparent" />
      </Layout>
    </ConfigProvider>
  );
}

export default MyApp;
