import { useState } from "react";
import axios from "axios";
import "./ContactPopup.css";

const ContactPopup = ({ isOpen, onClose, title = "Get in Touch" }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name field is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile field is required";
    } else if (!/^[6-9][0-9]{9}$/.test(formData.mobile.replace(/\D/g, ""))) {
      newErrors.mobile = "Please enter a valid 10-digit Indian mobile number starting with 6-9";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email field is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    console.log("=== CONTACT POPUP SUBMISSION STARTED ===");
    console.log("Form data:", formData);

    try {
      console.log("Sending request to: http://localhost:5000/api/users/create");
      const response = await axios.post(
        "http://localhost:5000/api/users/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Response received:", response.data);
      setSuccessMessage("✅ Thank you! We will contact you soon.");
      setFormData({ name: "", mobile: "", email: "" });
      setErrors({});
      console.log("✅ FORM SUBMISSION COMPLETED SUCCESSFULLY");

      // Close popup after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("❌ ERROR in form submission:");
      console.error("Error message:", error.message);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      const errorMsg =
        error.response?.data?.message || error.message || "Something went wrong";
      setSuccessMessage(`❌ Error: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="popup-header">
          <h2>{title}</h2>
          <p>Fill in your details and we'll get back to you</p>
        </div>

        {successMessage && (
          <div
            className={`form-message ${
              successMessage.includes("❌") ? "error" : "success"
            }`}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={errors.name ? "error" : ""}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number *</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              pattern="[6-9][0-9]{9}"
              maxLength="10"
              className={errors.mobile ? "error" : ""}
            />
            {errors.mobile && (
              <span className="error-message">{errors.mobile}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span>
                I consent to the processing of provided data according to
                Privacy Policy | Terms & Conditions
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPopup;
