import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Contact.css";

function ContactForm() {
  const [state, handleSubmit] = useForm("mqaedeby");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    setLoading(true);
    await handleSubmit(event);
    setLoading(false);
  };

  if (state.succeeded) {
    return <div className="alert alert-success text-center">Thanks for joining!</div>;
  }

  return (
    <div className="container contact-form " style={{marginTop:'180px'}}>
    
      <form onSubmit={onSubmit} method="post">
        <h3 className="text-center mb-4">Drop Us a Message</h3>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your Name *"
                required
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>
            <div className="form-group mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email *"
                required
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Your Phone Number *"
                required
              />
              <ValidationError prefix="Phone" field="phone" errors={state.errors} />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-outline-info w-100" disabled={state.submitting || loading}>
                {loading ? (
                  <div className="spinner-border spinner-border-sm text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <textarea
                name="message"
                className="form-control"
                placeholder="Your Message *"
                style={{ width: '100%', height: '150px' }}
                required
              ></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Contact() {
  return (
    <ContactForm />
  );
}

export default Contact;