import React, { useState } from "react";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "At Liverpool Car Rental, we understand that plans can change. You can cancel or modify your booking up to 48 hours before the rental start time without any charge. After that, a fee may apply.",
  },
  {
    question: "How do I track my rental booking?",
    answer:
      "Once your booking is confirmed, we'll send you a confirmation email with all the details, including a link to track your booking status and vehicle availability.",
  },
  {
    question: "Can I rent a luxury car again?",
    answer:
      "Absolutely! Liverpool Car Rental welcomes repeat customers. Simply log into your account and select from our range of luxury vehicles to make your next booking.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Our customer support team is available 24/7. You can reach us at support@liverpoolcarrental.ae or call us at +971 4 123 4567.",
  },
  // Add more FAQs as needed
];

const FAQsection = ({ isModal, onClose }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-10 text-white rounded-2xl bg-headlines text-center center flex-col space-y-8 overflow-y-scroll hide-scrollbar">
      <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>

      <p className="font-semibold text-base max-w-6xl">
        At Liverpool Car Rental, we strive to offer an unparalleled luxury car rental experience in Dubai. Below, you'll find answers to some of the most common questions we receive from our esteemed clients.
      </p>

      <div className="w-full max-w-2xl mx-auto space-y-3">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              className="w-full text-left py-4 focus:outline-none between"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex gap-2">
                <span className="bg-main p-1 px-3 text-xl rounded-full max-h-10">
                  ?
                </span>
                <h2 className="text-xl font-semibold text-start">
                  {faq.question}
                </h2>
              </div>
              <svg
                width="24"
                height="13"
                viewBox="0 0 24 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-500"
                style={{
                  transform: `${
                    openIndex === index ? "rotate(180deg)" : "rotate(360deg)"
                  }`,
                }}
              >
                <path
                  d="M2.53642e-08 2.127L9.52 11.634C10.1772 12.2881 11.0667 12.6554 11.994 12.6554C12.9213 12.6554 13.8108 12.2881 14.468 11.634L24 2.116L21.879 2.52927e-08L12.348 9.518C12.2542 9.61174 12.1271 9.66439 11.9945 9.66439C11.8619 9.66439 11.7348 9.61174 11.641 9.518L2.121 0.0100005L2.53642e-08 2.127Z"
                  fill="#F7F7F7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="py-2 transition-all duration-300 ease-in-out">
                <p className="text-start">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {isModal && (
        <button
          className="text-white bg-main px-5 py-2 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      )}
    </section>
  );
};

export default FAQsection;
