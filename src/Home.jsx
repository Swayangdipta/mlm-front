
import vision from "./asset/vision.jpg";
import value from "./asset/value.jpeg";
import mission from "./asset/mission.jpg";
import md from "./asset/md.jpeg";
import result from "./asset/Result.jpg";
import em from "./asset/em.jpg";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

function Home() {


  const sciFiBg =
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1600&h=900&fit=crop";
  const sciFiBg2 =
    "https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=1600&h=900&fit=crop";
  const sciFiBg3 =
    "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?w=1600&h=900&fit=crop";

  return (
    <div className="min-h-screen h-max bg-gradient-to-b from-blue-600 to-blue-900 text-white">
      {/* Header Section navbar*/}
      <NavBar/>

    

      {/* trading page started */}
      <section
        id="home"
        className="relative  h-screen flex flex-col items-center justify-center text-center py-16 px-4 text-white bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sciFiBg3})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#00000080] z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-orange-600">
            AI Powered Forex Trading
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl">
            At International Holding, we are revolutionizing the Forex trading
            experience with cutting-edge Artificial Intelligence (AI)
            technology. Our mission is to empower traders with intelligent,
            automated trading solutions that drive success.
          </p>
          <div className="log-button space-x-4 flex flex-row items-center justify-center w-full">
            <Link to="/login">
              <button className="px-6 py-3 bg-orange-500 h-12 w-24 sm:w-28 md:w-32 lg:w-36 rounded-3xl hover:bg-orange-600 flex justify-center items-center sm:mb-0 md:mb-0 text-lg sm:text-base font-semibold">
                Login <span className="text-xl ml-2">+</span>
              </button>
            </Link>
            <Link to="/register">
              <button className="px-6 py-3 bg-orange-500 h-12 w-32 sm:w-36 md:w-40 lg:w-44 rounded-3xl hover:bg-orange-600 flex justify-center items-center text-lg sm:text-base font-semibold">
                Register <span className="text-xl ml-2">+</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* trading page ended */}

      {/* new content started */}
      <div className="bg-zinc-800 h-[100rem] flex flex-col items-stretch justify-evenly mt-1">
        {/* 3-box-layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-800 mt-4">
          {/* box-1 */}
          <div className="box1 h-[10rem] sm:h-[10rem] md:h-[8rem] border-[1.5px] border-slate-500 mr-2 ml-2 rounded-lg flex justify-between items-center sm:w-full md:w-auto mx-auto">
            <div className="h-[80px] w-[70px] border rounded-md bg-orange-500 text-4xl text-center flex items-center justify-center ml-4">
              01
            </div>
            <div className="ml-6">
              <p className="text-2xl text-orange-400">CREATE ACCOUNT</p>
              <p className="text-slate-400">
                Trade with ease using our intuitive platform.
              </p>
            </div>
          </div>

          {/* box-2 */}
          <div className="box2 h-[10rem] sm:h-[10rem] md:h-[8rem] border-[1.5px] border-slate-500 mr-2 ml-2 rounded-lg flex justify-between items-center sm:w-full md:w-auto mx-auto">
            <div className="h-[80px] w-[90px] border rounded-md bg-orange-500 text-4xl text-center flex items-center justify-center ml-4">
              02
            </div>
            <div className="ml-6">
              <p className="text-2xl text-orange-400">DEPOSIT AMOUNT</p>
              <p className="text-slate-400">
                We protect your data and funds with top-notch encryption.
              </p>
            </div>
          </div>

          {/* box-3 */}
          <div className="box3 h-[10rem] sm:h-[10rem] md:h-[8rem] border-[1.5px] border-slate-500 mr-2 ml-2 rounded-lg flex justify-between items-center sm:w-full md:w-auto mx-auto">
            <div className="h-[80px] w-[70px] border rounded-md bg-orange-500 text-4xl text-center flex items-center justify-center ml-4">
              03
            </div>
            <div className="ml-6">
              <p className="text-2xl text-orange-400">START TRADING</p>
              <p className="text-slate-400">
                Trade with ease using our intuitive platform.
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-center text-5xl sm:mt-10 mt-6 font-bold py-4">
          {" "}
          Trade Smart, Trade Safe.{" "}
        </h1>

        {/* 6-box-layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto px-6 max-w-full">
          {/* Column 1 - Box 1 and Box 2 stacked */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#0D1B2A] text-white p-6 rounded-md shadow-lg">
              <h3 className="text-lg font-bold">FLEXIBILITY DEVICE</h3>
              <p>EURO/USD</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-md shadow-lg">
              <h3 className="text-lg font-bold">Safe and Secure</h3>
              <p>
                In today interconnected world, ensuring safety and security has
                become more important than ever.
              </p>
            </div>
          </div>

          {/* Column 2 - Box 3 */}
          <div className="flex flex-col">
            <div className="bg-green-700 text-white p-6 rounded-md shadow-lg">
              <h3 className="text-lg font-bold">INSTANT EXCHANGE</h3>
              <p>
                In a fast-paced world, the demand for instant exchange of goods,
                services, and currencies has grown exponentially.
              </p>
            </div>
          </div>

          {/* Column 3 - Box 4 */}
          <div className="flex flex-col">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-md shadow-lg">
              <h3 className="text-lg font-bold">Tier 1 Liquidity</h3>
              <p>
                Tier 1 liquidity refers to the highest quality liquid assets a
                financial institution holds.
              </p>
            </div>
          </div>

          {/* Column 4 - Box 5 and Box 6 stacked */}
          <div className="flex flex-col gap-6">
            <div className="bg-blue-500 text-white p-6 rounded-md shadow-lg">
              <h3 className="text-lg font-bold">Innovative Platform</h3>
              <p>
                An innovative platform offers groundbreaking solutions that
                change how we interact with technology, work, and communicate.
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white p-6 rounded-md shadow-lg">
              <h3 className="text-lg font-bold">Low Commissions</h3>
              <p>
                At our company, we believe in keeping costs low for our clients.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-zinc-900 h-[80rem] flex flex-col items-stretch justify-evenly px-4 sm:px-8 lg:px-16">
        <h1 className="text-center text-5xl sm:text-4xl md:text-5xl font-bold py-4">
          {" "}
          Why Choose Us for Trading?{" "}
        </h1>

        <h1 className="text-start text-6xl sm:text-5xl md:text-6xl font-semibold mt-12 py-10">
          {" "}
          Unlock Advanced Tools
          <br />
          and Insights for Success
        </h1>
      </div>
      {/* new content ended */}

      {/* project overview ends */}
      <section
        id="company"
        className="relative py-32 text-white bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sciFiBg})` }}
      >
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-4xl mx-auto bg-black bg-opacity-60 p-8 rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-400 uppercase">
                Project Overview
              </h2>
            </div>
            <p className="text-lg text-gray-300 font-medium mb-4">
              Principal Grow is all about modern digital technologies, Web3, and
              the latest applications, cultivating value exchange trends on a
              global scale.
            </p>
            <h3 className="text-xl md:text-2xl text-yellow-400 font-semibold mt-6">
              Strategic Vision
            </h3>
            <p className="text-gray-300">
              Our success is driven by precise calculation, predictive
              analytics, and strategic decision-making. Our analysts closely
              monitor market fluctuations to optimize trading outcomes.
            </p>
            <h3 className="text-xl md:text-2xl text-yellow-400 font-semibold mt-6">
              Forex Market Insights
            </h3>
            <p className="text-gray-300">
              The Forex market, with a daily turnover of around $7.5 trillion,
              attracts global traders. With the right strategies, any determined
              trader can achieve remarkable success. Forex trading involves
              purchasing one currency and selling it at the right time through
              brokers. New traders should seek guidance from experts.
            </p>
            <h3 className="text-xl md:text-2xl text-yellow-400 font-semibold mt-6">
              Company Origins
            </h3>
            <p className="text-gray-300">
              Founded in 2018 by a team of experienced traders, developers, and
              AI experts, Principal Grow emerged from a passion for innovation
              and a commitment to excellence. We strive to leverage AI to make
              Forex trading more accessible, efficient, and profitable.
            </p>
            <h3 className="text-xl md:text-2xl text-yellow-400 font-semibold mt-6">
              AI-Powered Governance
            </h3>
            <p className="text-gray-300">
              AI-powered Aiden Insight is guiding Principal Grow towards
              strategic growth and governance. Following the Q3 2024 board
              meeting, Aiden’s insights are shaping the company’s future with
              refined strategies and operational excellence.
            </p>
            <div className="text-center mt-6">
              <a
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
                href="/"
              >
                Read More{" "}
                <span className="ml-2">
                  <i className="fa-regular fa-plus"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* project overview ends */}

      {/* methodology starts*/}
      <section
        className="relative py-32 text-white bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sciFiBg2})` }}
      >
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-4xl mx-auto bg-black bg-opacity-60 p-8 rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <span className="text-lg text-blue-400 font-semibold uppercase">
                Core Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-400 uppercase">
                Methodology
              </h2>
            </div>
            <div className="flex justify-between items-center mb-6">
              <button className="text-blue-400 hover:text-blue-500 text-2xl">
                &#8592;
              </button>
              <button className="text-blue-400 hover:text-blue-500 text-2xl">
                &#8594;
              </button>
            </div>
            <div className="space-y-8">
              <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-md flex items-center">
                <span className="mr-4">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <text
                      x="15"
                      y="25"
                      fill="yellow"
                      fontSize="24"
                      fontWeight="bold"
                    >
                      1
                    </text>
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-yellow-400">
                    Integrity
                  </h3>
                  <p className="text-gray-300">
                    We prioritize honesty and ethical conduct in all aspects of
                    our business.
                  </p>
                </div>
              </div>
              <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-md flex items-center">
                <span className="mr-4">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <text
                      x="15"
                      y="25"
                      fill="yellow"
                      fontSize="24"
                      fontWeight="bold"
                    >
                      2
                    </text>
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-yellow-400">
                    Shared Prosperity
                  </h3>
                  <p className="text-gray-300">
                    Our success is shared equitably with our marketing partners,
                    ensuring collective growth.
                  </p>
                </div>
              </div>
              <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-md flex items-center">
                <span className="mr-4">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <text
                      x="15"
                      y="25"
                      fill="yellow"
                      fontSize="24"
                      fontWeight="bold"
                    >
                      3
                    </text>
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-yellow-400">
                    Quality Excellence
                  </h3>
                  <p className="text-gray-300">
                    Our unwavering commitment is to deliver the highest quality
                    products and services.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <a
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
                href="/"
              >
                Read More{" "}
                <span className="ml-2">
                  <i className="fa-regular fa-plus"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* methodology starts*/}

      {/* feature starts */}
      <section
        id="features"
        className="relative py-32 text-white bg-black bg-opacity-80"
      >
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-5xl mx-auto bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <span className="text-lg text-blue-400 font-semibold uppercase">
                Core Development
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-400 uppercase">
                Our Features
              </h2>
            </div>
            <div className="space-y-8">
              {[
                "Model Development",
                "Evaluation Metrics",
                "Result and Impact",
              ].map((title, index) => (
                <div
                  key={index}
                  className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-md flex items-center"
                >
                  <span className="mr-4">
                    <img
                      src={index === 0 ? md : index === 1 ? em : result}
                      alt="Feature Icon"
                      className="w-12 h-12"
                    />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-400">
                      {title}
                    </h3>
                    <p className="text-gray-300">
                      {index === 0 &&
                        "We design and implement machine learning models tailored to the Forex industry, supporting Meta Trader 5 for mobile & web."}
                      {index === 1 &&
                        "We define and track key performance metrics like accuracy, precision, recall, and AUC for effective AI trading solutions."}
                      {index === 2 &&
                        "Our AI-powered trades generate steady growth, ensuring stable and profitable investments with impressive results."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* feature ends */}

      {/* opportunities starts */}
      <section
        id="opportunities"
        className="tp-blog-area pt-32 pb-20 text-white bg-gray-900"
      >
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-10">
            <span className="text-lg text-blue-400 font-semibold uppercase">
              Understanding Forex
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-400 uppercase">
              Forex Markets & Opportunity
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {["Vision", "Values", "Our Mission"].map((title, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
                <img
                  src={index === 0 ? vision : index === 1 ? value : mission}
                  alt={title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  {title}
                </h3>
                <p className="text-gray-300">
                  {index === 0 &&
                    "It is our Vision to bring some order and respectability to this industry by sharing our experiences and knowledge to make a success of Forex Trading."}
                  {index === 1 &&
                    "Principal Grow is committed to core values - Integrity, Customer Focused Culture, Trust, Respect and Care for the Individual, Passion for Excellence, Teamwork."}
                  {index === 2 &&
                    "To provide innovative and responsive services for older people, which support Customer Focused Culture and help them have the best quality of life."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* opportunities ends */}

      <footer className="tp-footer-area p-8 text-gray-400 text-center bg-gray-900 mt-1">
        <div className="container mx-auto px-6">
          <p>© Principal Grow 2024-25 | All Rights Reserved</p>
          <div className="mt-4">
            <a href="#" className="mr-4 hover:text-white">
              About us
            </a>
            <a href="#" className="mr-4 hover:text-white">
              Company
            </a>
            <a href="#" className="hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
