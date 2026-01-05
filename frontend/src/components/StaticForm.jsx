import { useState } from 'react';
import './StaticForm.css';

const StaticForm = ({ onScheduleVisit, phoneNumber }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name field is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Mobile field is required';
        } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit mobile number';
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

        // Simulate API call
        setTimeout(() => {
            console.log('Static form submitted:', formData);
            alert('Thank you! We will contact you soon.');
            setFormData({ name: '', phone: '' });
            setIsSubmitting(false);
        }, 1000);
    };

    const handleContactClick = () => {
        window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
    };

    return (
        <div className="static-form-container">
            <div className="static-form-top-buttons">
                <button className="static-top-btn schedule-btn" onClick={onScheduleVisit}>
                    <span className="btn-icon">📅</span>
                    Schedule Visit
                </button>
                <a 
                    href={`tel:${phoneNumber.replace(/\D/g, '')}`} 
                    className="static-top-btn contact-btn" 
                    onClick={handleContactClick}
                >
                    <span className="btn-icon">📞</span>
                    {phoneNumber}
                </a>
            </div>
            
            <div className="static-form-header">
                <h3>Pre-Register here for Best Offers</h3>
            </div>

            <form onSubmit={handleSubmit} className="static-form">
                <div className="static-form-group">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Your Name here..."
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && (
                        <div className="static-error-icon">⚠️</div>
                    )}
                    {errors.name && <span className="static-error-message">{errors.name}</span>}
                </div>

                <div className="static-form-group">
                    <div className="phone-input-wrapper">
                        <select className="country-code" defaultValue="+91">
                            <option value="+91">🇮🇳 +91</option>
                        </select>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className={`phone-input ${errors.phone ? 'error' : ''}`}
                        />
                    </div>
                    {errors.phone && (
                        <div className="static-error-icon">⚠️</div>
                    )}
                    {errors.phone && <span className="static-error-message">{errors.phone}</span>}
                </div>

                <div className="static-form-group checkbox-group">
                    <label className="static-checkbox-label">
                        <input type="checkbox" required />
                        <span>Please be informed that this website is not intended to facilitate any sales transactions. I understand and acknowledge that the project I am interested in hasn't yet secured RERA clearance. The primary purpose of this website is to generate interest and gather information. By providing my data, I consent to its use in accordance with the <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms & Conditions</a></span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="static-submit-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Express Your Interest'}
                </button>
            </form>

            <div className="static-form-features">
                <div className="static-feature-item">
                    <span className="static-feature-icon">📞</span>
                    <span>Instant Call Back</span>
                </div>
                <div className="static-feature-item">
                    <span className="static-feature-icon">🚗</span>
                    <span>Free Site Visit</span>
                </div>
                <div className="static-feature-item">
                    <span className="static-feature-icon">⭐</span>
                    <span>Best Price</span>
                </div>
            </div>
        </div>
    );
};

export default StaticForm;

