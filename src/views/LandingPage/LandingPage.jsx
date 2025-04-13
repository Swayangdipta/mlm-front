import React from "react";
import LNavbar from "./LNavbar";
import frontPic from "../../assets/front-pic.jpg";
import img2 from "../../assets/img2.png";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  IconChefHat,
  IconDeviceIpadHorizontal,
  IconDeviceTablet,
  IconLayout,
} from "@tabler/icons-react";
import Logo from "../../assets/logo.svg";
import { subscriptionPrice } from "../../config/config";

export default function LadingPage() {
  const navigate = useNavigate();
  const handlegetStartedButtonClick = () => {
    navigate("/register");
  };  

  return (
    <div className="w-full overflow-y-auto min-h-screen">
      {/* navbar */}
      <LNavbar />
      {/* navbar */}

      {/* hero */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="max-w-lg">
          <span className="bg-gray-200 text-sm px-3 py-1 rounded-full">
            All-in-one Restaurant Software
          </span>
          <h1 className="text-4xl font-bold mt-4">
            Next-level restaurant management
          </h1>
          <p className="text-gray-600 mt-4">
            Seamlessly connect front and back-of-house operations, make
            supply-chain efficient, optimize costs, and grow your business with
            native direct-ordering and marketing.
          </p>
          <button
            className="bg-restro-green text-white px-6 py-3 mt-6 rounded-md hover:bg-restro-green-dark"
            onClick={() => handlegetStartedButtonClick("/register")}
          >
            Get Started
          </button>
          <div className="mt-4 text-sm text-gray-500">
            <p>⭐ Top 20 Technology Startups LinkedIn, 2023</p>
            <p>⭐ India’s Best POS ET Hospitality World, 2022</p>
          </div>
        </div>
        <img
          src={frontPic}
          alt="Restaurant management software"
          className="w-full md:w-1/2 rounded-lg shadow-lg mt-10 md:mt-0"
        />
      </div>
      <div className="text-center py-20 px-6">
        <h4 className="text-lg uppercase tracking-wide text-gray-700">
          Elevate Every Dining Experience
        </h4>
        <h2 className="text-3xl text-black font-bold mt-2">
          <span className="block">Happy guests,</span>
          <span className="block">Thriving business.</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mt-4">
          From cozy cafes to bustling bars, Rista empowers restaurants of all
          sizes to create exceptional dining experience. By streamlining
          back-of-house operations, Rista frees staff to focus on what matters
          most - your guests. Your diners enjoy faster service, accurate orders,
          and a more attentive staff, leaving them happy and eager to return.
        </p>
        <button
          className="bg-restro-green text-white px-6 py-3 mt-6 rounded-md hover:bg-restro-green-dark"
          onClick={() => handlegetStartedButtonClick("/register")}
        >
          Get Started
        </button>
      </div>
      {/* Why Rista Section */}
      <div className="text-center py-20 px-6">
        <h4 className="text-lg uppercase tracking-wide text-gray-700">
          WHY RISTA?
        </h4>
        <h2 className="text-3xl font-bold mt-2">
          Streamline, optimize, and grow with Rista.
        </h2>
        {/* 1st block */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-10">
          <div className="text-center max-w-sm">
            <span className="text-4xl">🚀</span>
            <h3 className="text-xl font-semibold mt-4">Faster service</h3>
            <p className="text-gray-600 mt-2">
              Reduce wait times and streamline operations with lightning-fast
              order processing and digital ordering, kitchen communication, and
              secure payment options. Keep your customers happy and your staff
              efficient.
            </p>
          </div>
          <div className="text-center max-w-sm">
            <span className="text-4xl">📦</span>
            <h3 className="text-xl font-semibold mt-4">Eliminate stockouts</h3>
            <p className="text-gray-600 mt-2">
              Gain complete inventory control with automated reordering based on
              real-time usage. Ensure menu availability and maximize customer
              satisfaction.
            </p>
          </div>
          <div className="text-center max-w-sm">
            <span className="text-4xl">🍽️</span>
            <h3 className="text-xl font-semibold mt-4">Minimize food waste</h3>
            <p className="text-gray-600 mt-2">
              Optimize recipe management and enhance profitability with precise
              ingredient tracking. Rely on data-driven insights to optimize
              purchasing based on actual consumption.
            </p>
          </div>
        </div>

        {/* 2nd block */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-10">
          <div className="text-center max-w-sm">
            <span className="text-4xl">📈</span>
            <h3 className="text-xl font-semibold mt-4">Drive revenue growth</h3>
            <p className="text-gray-600 mt-2">
              Increase your average order value by 20%* with Rista's upselling
              recommendations and targeted promotions with native WhatsApp
              Marketing. Unlock improved top and bottom line performance.
            </p>
          </div>
          <div className="text-center max-w-sm">
            <span className="text-4xl">🤝</span>
            <h3 className="text-xl font-semibold mt-4">
              Strengthen customer loyalty
            </h3>
            <p className="text-gray-600 mt-2">
              Develop deeper customer relationships by personalising your
              offerings. With advanced analytics, understand your customers'
              preferences and buying habits, and cultivate lasting loyalty.
            </p>
          </div>
          <div className="text-center max-w-sm">
            <span className="text-4xl">🤖</span>
            <h3 className="text-xl font-semibold mt-4">
              Effortless integrations
            </h3>
            <p className="text-gray-600 mt-2">
              Achieve unparalled efficiency through seamless integrations with
              industry-leading marketing, accounting and payment tools.
              Experience a truly unified platform.
            </p>
          </div>
        </div>

        {/* 3rd block */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-10">
          <div className="text-center max-w-sm">
            <span className="text-4xl">⏱️</span>
            <h3 className="text-xl font-semibold mt-4">
              Quickest setup and training
            </h3>
            <p className="text-gray-600 mt-2">
              Get up and running quickly with our intuitive system. Minimize training time for your staff and maximize guest time, from day one.
            </p>
          </div>
          <div className="text-center max-w-sm">
            <span className="text-4xl">🎧</span>
            <h3 className="text-xl font-semibold mt-4">Unparalleled 24x7 support</h3>
            <p className="text-gray-600 mt-2">
              Receive exceptional support anytime. Our team of experts is passionate about your success, and help you get the most out of Rista.
            </p>
          </div>
          <div className="text-center max-w-sm">
            <span className="text-4xl">🔐</span>
            <h3 className="text-xl font-semibold mt-4">Enterprise-grade security</h3>
            <p className="text-gray-600 mt-2">
              Rest assured, your data is safe. Rista utilizes industry-leading security protocols and data encryption to protect your sensitive information.
            </p>
          </div>
        </div>

        {/* 4th block */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-10">
          <div className="text-center max-w-sm">
            <span className="text-4xl">🖥️</span>
            <h3 className="text-xl font-semibold mt-4">Scalability, built-in</h3>
            <p className="text-gray-600 mt-2">
              Rista's robust architecture effortlessly grows with your business. Manage your operations with confidence - from a single location to a nationwide chain.
            </p>
          </div>
          <div className="text-center max-w-sm">
            <span className="text-4xl">🧠</span>
            <h3 className="text-xl font-semibold mt-4">Continuous innovation</h3>
            <p className="text-gray-600 mt-2">
              Rista is constantly evolving. Expect exciting new features and updates rolled out frequently, ensuring you always have access to the latest.
            </p>
          </div>
          <div className="text-center max-w-sm">
            <span className="text-4xl">⬆️</span>
            <h3 className="text-xl font-semibold mt-4">Accessible​ on-the-go</h3>
            <p className="text-gray-600 mt-2">
              Manage your restaurant from anywhere, anytime. Access Rista from any device, keeping you in control and connected at all times.
            </p>
          </div>
        </div>

        {/* product suite section */}
        <section className="text-center py-20 px-6">
          <div className="container mx-auto px-4">
            <h2 className="text-lg uppercase tracking-wide text-gray-700">Our Product Suite</h2>
            <p className="text-3xl font-bold mt-2">Fuelling success for every restaurant, <br />
              all types, every size.</p>

             {/* buttons */}
             <button>Point of Sale System</button>
                  <button>Inventory Management</button>
                  <button>Direct ordering</button>
                  <button>Marketing</button>
                  
            <div class="flex flex-col md:flex-row items-center justify-between mt-12">
              <div class="md:w-1/2">
                <h2 class="text-3xl font-bold">Efficiency beyond Billing</h2>
                <p class="mt-4 text-gray-600">
                  Go beyond traditional billing software, with Rista's holistic solution that streamlines every aspect of your restaurant operation.
                  Experience lightning-fast billing, an intuitive interface, and seamless integration with online ordering platforms.
                  Actionable insights from comprehensive reporting help you make data-driven decisions for menu optimization, inventory control, and growth.
                </p>

                <ul class="mt-4 list-disc list-inside text-gray-600">
                  <li>Lightning-fast billing</li>
                  <li>Actionable insights</li>
                  <li>Seamless online ordering integration</li>
                </ul>
              </div>

              <div class="md:w-1/2 flex justify-end">
                <img src={img2} alt="POS System Interface" class="max-w-full rounded-lg shadow-lg"/>
              </div>
            </div>

          </div>
        </section>

      </div>
      {/* hero */}

      {/* features */}
      <h3 className="text-4xl font-bold text-center container mx-auto mt-40">
        Features
      </h3>
      <div
        id="features"
        className="w-full container mx-auto grid grid-cols-1 lg:grid-cols-3 my-20 gap-10 px-6 lg:px-0"
      >
        <div className="rounded-2xl px-8 py-6 border flex flex-col items-center justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full text-restro-green bg-green-100">
            <IconLayout />
          </div>
          <h3 className="mt-4 font-bold text-2xl text-center">Minimal UI</h3>
          <p className="text-gray-700 mt-2 text-center">
            Effortless Interface, RestroPRO POS boasts a clean and intuitive
            design. No cluttered screens, just the essentials you need to manage
            your business with ease.
          </p>
        </div>

        <div className="rounded-2xl px-8 py-6 border flex flex-col items-center justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full text-restro-green bg-green-100">
            <IconDeviceIpadHorizontal />
          </div>
          <h3 className="mt-4 font-bold text-2xl text-center">POS</h3>
          <p className="text-gray-700 mt-2 text-center">
            RestroPRO POS simplifies sales. Manage orders, categories & variants
            with ease. Send to kitchen instantly & accept payments securely.
            All-in-one for a smooth flow.
          </p>
        </div>

        <div className="rounded-2xl px-8 py-6 border flex flex-col items-center justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full text-restro-green bg-green-100">
            <IconChefHat />
          </div>
          <h3 className="mt-4 font-bold text-2xl text-center">Live Updates</h3>
          <p className="text-gray-700 mt-2 text-center">
            Kitchen in Sync, Never miss a beat. Live order updates send details
            directly to your kitchen, ensuring accuracy and minimizing prep
            time.
          </p>
        </div>
      </div>
      {/* features */}

      {/* pricing */}
      <h3 className="text-4xl font-bold text-center container mx-auto mt-40">
        Pricing
      </h3>
      <div
        id="pricing"
        className="w-full container mx-auto grid grid-cols-1 my-20 gap-10 place-items-center px-6 lg:px-0"
      >
        <div className="rounded-2xl px-8 py-6 border flex flex-col w-full lg:w-96">
          <h3 className="text-4xl text-green-700 font-bold text-center">
            {subscriptionPrice}
          </h3>
          <h3 className=" font-bold text-2xl text-center">per month</h3>
          <ul className="text-gray-700 mt-6 flex flex-col gap-2 text-start">
            <li>✅ Unlimited Orders</li>
            <li>✅ Monthly Renewls</li>
            <li>✅ Unlimited Devices</li>
            <li>✅ Live Kitchen Orders</li>
          </ul>
        </div>
      </div>
      {/* pricing */}

      {/* contact */}
      <div id="contact" className="container mx-auto my-40 px-6 lg:px-0">
        <div className="lg:h-24 px-10 py-6 flex gap-4 flex-col md:flex-row lg:items-center rounded-3xl bg-restro-green-dark text-restro-green shadow-2xl shadow-green-700/40">
          <h3 className="flex-1 font-bold text-3xl text-white">
            Have any queries?
          </h3>
          <a
            className="bg-white text-lg text-restro-green-dark rounded-full px-5 py-2 transition active:scale-95 block"
            href="mailto:hi@uiflow.in"
          >
            <span className="mr-2">📧</span>
            Contact us via Email
          </a>
          <a
            className="bg-white text-lg text-restro-green-dark rounded-full px-5 py-2 transition active:scale-95 block mt-4 md:mt-0"
            href="https://wa.me/917533078931"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandWhatsapp size={24} className="mr-2" />{" "}
          </a>
        </div>
      </div>
      {/* contact */}

      {/* footer */}
      <div className="w-full border-t">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 container mx-auto px-4 py-3">
          <div>
            <img src={Logo} alt="logo" className="h-12" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center">
            <a
              className="hover:bg-gray-100 text-gray-700 rounded-full px-4 py-2 transition active:scale-95"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="hover:bg-gray-100 text-gray-700 rounded-full px-4 py-2 transition active:scale-95"
              href="#"
            >
              Refund Policy
            </a>
            <a
              className="hover:bg-gray-100 text-gray-700 rounded-full px-4 py-2 transition active:scale-95"
              href="#"
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
      {/* footer */}
    </div>
  );
}
