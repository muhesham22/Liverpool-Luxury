import React from "react";
import WhatsAppIcon from "../../assets/icons/social-media/whatsapp.svg";
import PhoneIcon from "../../assets/icons/social-media/phone.svg";
import TelegramIcon from "../../assets/icons/social-media/telegram.svg";

const ContactUsPage = () => {
  return (
    <div className="py-10 px-20 space-y-8">
      <h1 className="text-4xl text-center font-bold">Contact Us</h1>
      <div className="center">
        <p className="text-center font-semibold text-base max-w-4xl">
          We’re here to assist you with any inquiries or support you may need.
          Reach out to us through your preferred communication channel for quick
          and personalized assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="border col-span-1 bg-white rounded-lg flex flex-col p-5 py-10 justify-start items-center gap-5">
          <img src={WhatsAppIcon} alt="WhatsApp" className="size-16" />
          <h3 className="text-2xl font-bold">WhatsApp</h3>
          <ul className="text-subtitles space-y-3">
            <li>+971 50 123 4567</li>
            <li>+971 50 123 4567</li>
            <li>+971 50 123 4567</li>
          </ul>
        </div>
        <div className="border col-span-1 bg-white rounded-lg flex flex-col p-5 py-10 justify-start items-center gap-5">
          <img src={PhoneIcon} alt="Phone" className="size-16" />
          <h3 className="text-2xl font-bold">Phone</h3>
          <ul className="text-subtitles space-y-3">
            <li>+971 4 567 8900</li>
            <li>+971 4 567 8900</li>
            <li>+971 4 567 8900</li>
          </ul>
        </div>
        <div className="border col-span-1 bg-white rounded-lg flex flex-col p-5 py-10 justify-start items-center gap-5">
          <img src={TelegramIcon} alt="Telegram" className="size-16" />
          <h3 className="text-2xl font-bold">Telegram</h3>
          <ul className="text-subtitles space-y-3">
            <li>+971 50 123 4567</li>
            <li>+971 50 123 4567</li>
            <li>+971 50 123 4567</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
