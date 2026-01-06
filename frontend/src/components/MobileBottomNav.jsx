import "./MobileBottomNav.css";

function MobileBottomNav({ phoneNumber, onExpressInterest }) {
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    const message = "Hi, I'm interested in your project. Can you provide more information?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = phoneNumber.replace(/[^\d]/g, ""); // Remove non-digit characters
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="mobile-bottom-nav">
      <button className="mobile-nav-btn call-btn" onClick={handleCall} title="Call us">
        <span className="btn-icon">☎️</span>
        <span className="btn-text">Call</span>
      </button>
      <button
        className="mobile-nav-btn express-btn"
        onClick={onExpressInterest}
        title="Express your interest"
      >
        <span className="btn-icon">💬</span>
        <span className="btn-text">Express Interest</span>
      </button>
      <button className="mobile-nav-btn whatsapp-btn" onClick={handleWhatsApp} title="Chat on WhatsApp">
        <span className="btn-icon">💬</span>
        <span className="btn-text">WhatsApp</span>
      </button>
    </div>
  );
}

export default MobileBottomNav;
