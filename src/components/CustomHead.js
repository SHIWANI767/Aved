import Head from "next/head";

const CustomHead = ({ title, description, image, video, isVideo, url }) => {
  const fullUrl = `${process.env.REDIRECT_URI}${url}`;
  const fullImage = `${process.env.REDIRECT_URI}${image}`;
  const fullVideo = `${process.env.REDIRECT_URI}${video}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      {/* <meta property="og:description" content={description} /> */}
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:video" content={isVideo ? fullVideo : ""} />
      <meta property="og:video:type" content={isVideo ? "video/mp4" : ""} />
      <meta property="og:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="follow, index" />
      <link rel="canonical" href={fullUrl} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@200..800&family=Outfit:wght@100..900&display=swap"
        rel="stylesheet"
      ></link>
      <meta
        name="keywords"
        // content={
        //   "Marlogics, Coin, QuantumFlow, QuantumLoop, QuantumBridge, Exchange, Kraken, Binance, Mexc, Gemini, TradingView chart, ETH, BTC, USDT, Sniper Trade, Smart Limit Orders, Auto Trade, Arbitrage, Direct Arbitrage, Intra Arbitrage, Triangular Arbitrage"
        // }
        content={"Aved"}
      />
    </Head>
  );
};

export default CustomHead;
