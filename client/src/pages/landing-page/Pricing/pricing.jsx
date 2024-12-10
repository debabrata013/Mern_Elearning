import React from "react";
import Nav from "../nav-bar/nav";
import Footer from "../footer/footer";

const plans = [
  {
    name: "Starter",
    price: "$20",
    features: ["10 users", "2GB of storage", "Email support"],
    lacks: ["Help center access", "Phone support", "Community access"],
  },
  {
    name: "Pro",
    price: "$30",
    features: ["20 users", "5GB of storage", "Email support", "Help center access"],
    lacks: ["Phone support", "Community access"],
  },
  {
    name: "Enterprise",
    price: "$100",
    features: ["50 users", "20GB of storage", "Email support", "Help center access", "Phone support"],
    lacks: ["Community access"],
  },
];

const PricingCard = () => {
  return (
    <>
      <nav className="navbar mt-5">
        <Nav />
      </nav>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="transform perspective-1000 transition-transform duration-500 hover:scale-105 hover:rotate-3d rounded-2xl border border-gray-200 shadow-xl"
            >
              <div className="relative h-full transform hover:rotate-y-180 transition-transform duration-500">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h2 className="text-lg font-medium text-gray-900">{plan.name}</h2>
                  <p className="mt-2 text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <p className="mt-2 sm:mt-4">
                    <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                      {plan.price}
                    </strong>
                    <span className="text-sm font-medium text-gray-700">/month</span>
                  </p>
                  <a
                    className="mt-4 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                    href="#"
                  >
                    Get Started
                  </a>
                </div>
                <div className="p-6 bg-gray-100 rounded-2xl">
                  <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>
                  <ul className="mt-2 space-y-2 sm:mt-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5 text-indigo-700"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.lacks.map((lack, i) => (
                      <li key={i} className="flex items-center gap-1 text-red-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-gray-700">{lack}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingCard;
