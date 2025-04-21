import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "./asset/logo.png";
import { getAuthFromSessionStorage } from "./utils/ls.util";
import { getUserFullname, register } from "./helper/baseApiCalls";
import { toast } from "react-toastify";

function Register({from = 'home'}) {
  const navigate = useNavigate();
  const [sortedCountries, setSortedCountries] = useState([]);

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const handleSignUpButtonClick = () => {
    navigate("/signup");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const { sponsorId } = useParams();
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputs, setInputs] = useState({
    sponsor: sponsorId || null,
    fullname: "",
    username: "",
    country: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    email: "",
    otp: "",
  });
  const [userFullname, setUserFullname] = useState(undefined)

  const {
    sponsor,
    fullname,
    country,
    mobile,
    password,
    confirmPassword,
    email,
    username,
  } = inputs;

  const auth = getAuthFromSessionStorage();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    if(!sponsor) {
      toast("Sponsor ID is required");
      return;
    }

    console.log(inputs);

    try {
      const response = await register({
        sponsorId: sponsor,
        fullname,
        country,
        mobile,
        email,
        password,
        rank: null,
      });

      if (response.status === 200 || response.status === 201) {
        toast(response.data.message);
        navigate("/login");
      }
    } catch (error) {

      return toast(error.response.data.message);
    }
  };

  useEffect(() => {
    if (auth && from === 'home') {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

    useEffect(()=>{
        setUserFullname({fullname: ''})

        if(sponsor){
          if(sponsor.length > 4){
            (async () => {
                const res = await getUserFullname(sponsor)
                console.log(res);
                
                if(res.status !== 200){
                    return
                }

                setUserFullname(res.data)
            })()
        }
        }
    },[sponsor])

    useEffect(() => {
      const countries = [
        { name: { common: "Afghanistan" } },
        { name: { common: "Albania" } },
        { name: { common: "Algeria" } },
        { name: { common: "Andorra" } },
        { name: { common: "Angola" } },
        { name: { common: "Argentina" } },
        { name: { common: "Armenia" } },
        { name: { common: "Australia" } },
        { name: { common: "Austria" } },
        { name: { common: "Azerbaijan" } },
        { name: { common: "Bahamas" } },
        { name: { common: "Bahrain" } },
        { name: { common: "Bangladesh" } },
        { name: { common: "Belarus" } },
        { name: { common: "Belgium" } },
        { name: { common: "Bhutan" } },
        { name: { common: "Bolivia" } },
        { name: { common: "Bosnia and Herzegovina" } },
        { name: { common: "Botswana" } },
        { name: { common: "Brazil" } },
        { name: { common: "Bulgaria" } },
        { name: { common: "Cambodia" } },
        { name: { common: "Cameroon" } },
        { name: { common: "Canada" } },
        { name: { common: "Chile" } },
        { name: { common: "China" } },
        { name: { common: "Colombia" } },
        { name: { common: "Costa Rica" } },
        { name: { common: "Croatia" } },
        { name: { common: "Cuba" } },
        { name: { common: "Cyprus" } },
        { name: { common: "Czech Republic" } },
        { name: { common: "Denmark" } },
        { name: { common: "Dominican Republic" } },
        { name: { common: "Ecuador" } },
        { name: { common: "Egypt" } },
        { name: { common: "Estonia" } },
        { name: { common: "Ethiopia" } },
        { name: { common: "Fiji" } },
        { name: { common: "Finland" } },
        { name: { common: "France" } },
        { name: { common: "Georgia" } },
        { name: { common: "Germany" } },
        { name: { common: "Ghana" } },
        { name: { common: "Greece" } },
        { name: { common: "Guatemala" } },
        { name: { common: "Honduras" } },
        { name: { common: "Hungary" } },
        { name: { common: "Iceland" } },
        { name: { common: "India" } },
        { name: { common: "Indonesia" } },
        { name: { common: "Iran" } },
        { name: { common: "Iraq" } },
        { name: { common: "Ireland" } },
        { name: { common: "Israel" } },
        { name: { common: "Italy" } },
        { name: { common: "Jamaica" } },
        { name: { common: "Japan" } },
        { name: { common: "Jordan" } },
        { name: { common: "Kazakhstan" } },
        { name: { common: "Kenya" } },
        { name: { common: "Kuwait" } },
        { name: { common: "Kyrgyzstan" } },
        { name: { common: "Laos" } },
        { name: { common: "Latvia" } },
        { name: { common: "Lebanon" } },
        { name: { common: "Liberia" } },
        { name: { common: "Libya" } },
        { name: { common: "Lithuania" } },
        { name: { common: "Luxembourg" } },
        { name: { common: "Madagascar" } },
        { name: { common: "Malaysia" } },
        { name: { common: "Maldives" } },
        { name: { common: "Mali" } },
        { name: { common: "Malta" } },
        { name: { common: "Mexico" } },
        { name: { common: "Moldova" } },
        { name: { common: "Monaco" } },
        { name: { common: "Mongolia" } },
        { name: { common: "Morocco" } },
        { name: { common: "Mozambique" } },
        { name: { common: "Myanmar" } },
        { name: { common: "Namibia" } },
        { name: { common: "Nepal" } },
        { name: { common: "Netherlands" } },
        { name: { common: "New Zealand" } },
        { name: { common: "Nicaragua" } },
        { name: { common: "Nigeria" } },
        { name: { common: "North Korea" } },
        { name: { common: "Norway" } },
        { name: { common: "Oman" } },
        { name: { common: "Pakistan" } },
        { name: { common: "Palestine" } },
        { name: { common: "Panama" } },
        { name: { common: "Paraguay" } },
        { name: { common: "Peru" } },
        { name: { common: "Philippines" } },
        { name: { common: "Poland" } },
        { name: { common: "Portugal" } },
        { name: { common: "Qatar" } },
        { name: { common: "Romania" } },
        { name: { common: "Russia" } },
        { name: { common: "Rwanda" } },
        { name: { common: "Saudi Arabia" } },
        { name: { common: "Senegal" } },
        { name: { common: "Serbia" } },
        { name: { common: "Singapore" } },
        { name: { common: "Slovakia" } },
        { name: { common: "Slovenia" } },
        { name: { common: "Somalia" } },
        { name: { common: "South Africa" } },
        { name: { common: "South Korea" } },
        { name: { common: "Spain" } },
        { name: { common: "Sri Lanka" } },
        { name: { common: "Sudan" } },
        { name: { common: "Sweden" } },
        { name: { common: "Switzerland" } },
        { name: { common: "Syria" } },
        { name: { common: "Taiwan" } },
        { name: { common: "Tajikistan" } },
        { name: { common: "Tanzania" } },
        { name: { common: "Thailand" } },
        { name: { common: "Tunisia" } },
        { name: { common: "Turkey" } },
        { name: { common: "Turkmenistan" } },
        { name: { common: "Uganda" } },
        { name: { common: "Ukraine" } },
        { name: { common: "United Arab Emirates" } },
        { name: { common: "United Kingdom" } },
        { name: { common: "United States" } },
        { name: { common: "Uruguay" } },
        { name: { common: "Uzbekistan" } },
        { name: { common: "Venezuela" } },
        { name: { common: "Vietnam" } },
        { name: { common: "Yemen" } },
        { name: { common: "Zambia" } },
        { name: { common: "Zimbabwe" } },
      ];
    
      setSortedCountries(countries);
    }, []);

    

  return (
    <div className="flex justify-center items-center flex-col min-h-screen overflow-y-auto bg-center bg-cover bg-no-repeat bg-[url(https://png.pngtree.com/background/20210717/original/pngtree-sci-fi-city-light-dot-luminous-building-street-purple-technology-background-picture-image_1446716.jpg)]">
      {/* Header Section navbar starts*/}

      {
        from === 'home' && (
        <header className="flex justify-between items-center w-full py-4 px-8 bg-[#013a63]">
          <div className="logo-section">
            <img
              src={logo}
              alt="logo"
              className="w-[6rem] h-[2.5rem] bg-slate-100 rounded-3xl sm:w-[7rem] sm:h-[3rem] md:w-[9.5rem] md:h-[4rem] lg:w-[12rem] lg:h-[5rem]"
              onClick={handleLogoClick}
            />
          </div>

          {/* Sign In / Sign Up Buttons */}
          <div className="sign-buttons space-x-4 ml-4 flex items-center">
            <Link to="/login">
              <button
                className="relative px-2 py-2 h-10 sm:h-12 w-24 sm:w-32 md:w-40 text-[12px] sm:text-lg font-semibold bg-black border-4 border-t-blue-700 border-l-blue-700 border-b-blue-500 border-r-blue-500 rounded-3xl flex justify-center items-center transition-all duration-300
            before:absolute before:inset-0 before:rounded-3xl before:border-4 before:border-t-blue-500 before:border-l-blue-500 before:border-b-blue-700 before:border-r-blue-700 before:content-[''] hover:bg-blue-500 text-white"
                onClick={handleLoginButtonClick}
              >
                Sign In
              </button>
            </Link>

            <Link to="/register">
              <button
                className="relative px-2 py-2 h-10 sm:h-12 w-24 sm:w-32 md:w-40 text-[12px] sm:text-lg font-semibold bg-black border-4 border-t-green-700 border-l-green-700 border-b-green-500 border-r-green-500 rounded-3xl flex justify-center items-center transition-all duration-300 text-white
            before:absolute before:inset-0 before:rounded-3xl before:border-4 before:border-t-green-500 before:border-l-green-500 before:border-b-green-700 before:border-r-green-700 before:content-[''] hover:bg-green-500"
                onClick={handleSignUpButtonClick}
              >
                Sign Up
              </button>
            </Link>
          </div>
        </header>
        )
      }

      {/* navbar ends */}

      <div className="bg-zinc-800 pt-14 mt-12 mb-12 p-4 rounded-md shadow-lg w-full max-w-[28rem] sm:w-full">
        {/* Logo Section */}
        <div className="logo-section rounded-3xl flex justify-center mb-6">
          <img
            src={logo}
            alt="logo"
            className="w-40 h-20 bg-slate-100 rounded-3xl"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 mt-10 text-center text-white">
          Sign Up
        </h2>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          {/* Sponsor Id */}
          <div className="">
            <input
              type="text"
              id="sponsor-id"
              name="sponsor"
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
              placeholder="Sponsor ID *"
              value={sponsor}
              onChange={handleChange}
            />
          </div>
          <p className='w-full h-[20px] p-2 my-2 flex items-center text-white'>{userFullname && userFullname.fullname}</p>

          {/* Account Name */}
          {/* <div className="mb-4">
            <input
              type="text"
              id="name"
              name="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
              placeholder="Account Username"
              value={username}
              onChange={handleChange}
              required
            />
          </div> */}

          {/* Applicant Name */}
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="fullname"
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
              placeholder="Applicant Name"
              value={fullname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
              placeholder="Email Address"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Country Selector */}
          <div className="mb-4">
            <select
              id="country"
              name="country"
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
              required
              value={country}
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Select Country
              </option>
              {
                sortedCountries.length > 0  && sortedCountries.map((country, index) => (
                  <option key={index} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))
              }
            </select>
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <input
              type="tel"
              id="mobile"
              name="mobile"
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
              placeholder="Mobile"
              value={mobile}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />
            <button type="button" className="absolute right-3 top-3"></button>
          </div>

          {/* Confirm Password */}
          <div className="mb-4 relative">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="button" className="absolute right-3 top-3"></button>
          </div>

          {/* OTP Section */}
          {/* <div className="mb-4">
            <div className="flex justify-between items-center">
              <input
                type="text"
                id="otp"
                name="otp"
                className="w-[15rem] px-4 py-2 border border-gray-300 rounded-3xl"
                placeholder="Enter OTP"
                required
              />
              <button
                type="button"
                className="ml-3 bg-blue-500 w-24 mr-10 h-9 rounded text-white font-medium"
              >
                Send OTP
              </button>
            </div>
          </div> */}

          {/* Checkbox for Terms & Conditions */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms"
              className="h-8 w-8 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
              onChange={() => setIsDisabled(!isDisabled)}
            />
            <label htmlFor="terms" className="ml-2 text-base text-gray-400">
              By clicking the button you have confirmed accept the International
              Holdding Terms & Conditions and Privacy Policy
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isDisabled}
            className="w-28 bg-orange-700 text-white py-2 rounded-md transition duration-200"
          >
            Submit
          </button>

          {/*Login Link*/}
          <div className="flex justify-center mt-4 text-sky-500">
            <a href="/login">Login Here</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
