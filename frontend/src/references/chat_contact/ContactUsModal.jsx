import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
// import { emailKeys } from "../keys/key";
import { LottieAlert } from "../components/lottie/LottieAlert";
export const emailKeys = {
  serviceId: "service_7z0t15a",
  templateId: "template_l7lxbhj",
  publicKey: "iCoq00sOLtzfeMuqr",
};
function ContactUsModal({ isOpen, onClose }) {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(emailKeys.serviceId, emailKeys.templateId, form.current, {
        publicKey: emailKeys.publicKey,
      })
      .then(
        () => {
          console.log("Message sent successfully!");
          form.current.reset();
          setLoading(false);
          setShowSuccessAlert(true);
          onClose();
        },
        (error) => {
          setShowFailureAlert(true);
          setLoading(false);
          console.log("Failed to send: " + error.text);
        }
      );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm pt-12 px-4 mt-10">
      <div className="relative w-full max-w-md mx-auto rounded-xl border border-cyan-300 border-[0.2px] shadow-lg p-4 md:p-6 text-white backdrop-blur-md bg-gradient-to-br from-[#67e8f9]/10 via-[#ef0163]/5 to-transparent">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-300 hover:text-white text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-[#67e8f9] text-center">
          Schedule a Call
        </h2>

        <form ref={form} onSubmit={sendEmail} className="space-y-3">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Name</label>
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-300/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-300/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Phone</label>
            <input
              type="tel"
              name="user_phone"
              placeholder="Your Phone Number"
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-300/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Message</label>
            <textarea
              rows="3"
              name="message"
              placeholder="Your Message"
              required
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-300/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 resize-none"
            ></textarea>
          </div>

          {loading ? (
            <div className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#67e8f9]/80 text-white font-semibold shadow-md">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Submitting...</span>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#67e8f9]/80 hover:bg-[#67e8f9]/70 transition-all text-white font-semibold shadow-md"
            >
              Submit
            </button>
          )}
        </form>
        {showSuccessAlert && (
          <LottieAlert
            type="success"
            message="Message submitted successfully 🎉"
            onClose={() => setShowSuccessAlert(false)}
            autoClose={true}
            loop={false}
          />
        )}
        {showFailureAlert && (
          <LottieAlert
            type="failure"
            message="ohh !! Failed to Send Try again 🥹"
            onClose={() => setShowFailureAlert(false)}
            autoClose={true}
            loop={true}
          />
        )}
      </div>
    </div>
  );
}

export default ContactUsModal;
