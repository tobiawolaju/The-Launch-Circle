import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STAGES = ['Idea', 'Validation', 'MVP', 'Scaling', 'Other'];
const SUPPORT_TYPES = ['Mentorship', 'Co-founder', 'Funding', 'Community', 'Feedback', 'Other'];

const GetSupportModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    xUsername: '',
    building: '',
    problem: '',
    audience: '',
    stage: '',
    support: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStage = (val) => setForm((prev) => ({ ...prev, stage: val }));
  const handleSupport = (val) => {
    setForm((prev) => {
      const current = prev.support.split(',').filter(Boolean);
      const exists = current.includes(val);
      const next = exists ? current.filter((v) => v !== val) : [...current, val];
      return { ...prev, support: next.join(',') };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ xUsername: '', building: '', problem: '', audience: '', stage: '', support: '' });
    onClose();
  };

  const selectedSupport = form.support.split(',').filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            className="support-modal"
            style={{ x: '-50%', y: '-50%' }}
            initial={{ opacity: 0, y: 'calc(-50% + 40px)', scale: 0.96 }}
            animate={{ opacity: 1, y: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 'calc(-50% + 40px)', scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="modal-close" onClick={handleClose} aria-label="Close">
              ✕
            </button>

            {!submitted ? (
              <>
                <div className="modal-header">
                  <span className="modal-eyebrow">Join Launch Circle</span>
                  <h2 className="modal-title">Tell us what you're building</h2>
                  <p className="modal-sub">We'll connect you with the right people in the circle.</p>
                </div>

                <form className="support-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="xUsername">Your X (Twitter) username</label>
                    <div className="input-with-prefix">
                      <span className="input-prefix">@</span>
                      <input
                        id="xUsername"
                        name="xUsername"
                        type="text"
                        placeholder="yourhandle"
                        value={form.xUsername}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="building">What are you building?</label>
                    <textarea
                      id="building"
                      name="building"
                      placeholder="Describe your product or idea..."
                      value={form.building}
                      onChange={handleChange}
                      required
                      rows={3}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="problem">What problem does it solve?</label>
                    <textarea
                      id="problem"
                      name="problem"
                      placeholder="What pain point are you addressing?"
                      value={form.problem}
                      onChange={handleChange}
                      required
                      rows={2}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="audience">Who is it for?</label>
                    <input
                      id="audience"
                      name="audience"
                      type="text"
                      placeholder="e.g. Nigerian students, early-stage founders..."
                      value={form.audience}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>What stage are you at?</label>
                    <div className="chip-group">
                      {STAGES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`chip ${form.stage === s ? 'chip-active' : ''}`}
                          onClick={() => handleStage(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>What kind of support are you looking for?</label>
                    <div className="chip-group">
                      {SUPPORT_TYPES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`chip ${selectedSupport.includes(s) ? 'chip-active' : ''}`}
                          onClick={() => handleSupport(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={!form.xUsername || !form.building || !form.problem || !form.audience || !form.stage || !form.support}
                  >
                    Submit →
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                className="success-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="success-icon">✦</div>
                <h2>You're in the circle.</h2>
                <p>We'll reach out within 48 hours with the right connection for you.</p>
                <button className="submit-btn" onClick={handleClose}>
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          z-index: 999;
        }

        .support-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          width: min(540px, 94vw);
          max-height: 90vh;
          overflow-y: auto;
          background: #0e0e0e;
          border: 1px solid rgba(172, 47, 255, 0.2);
          border-radius: 20px;
          padding: 40px;
          z-index: 1000;
          scrollbar-width: thin;
          scrollbar-color: rgba(172, 47, 255, 0.3) transparent;
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 20px;
          background: rgba(255,255,255,0.07);
          border: none;
          color: #999;
          font-size: 0.85rem;
          cursor: pointer;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .modal-close:hover { background: rgba(172,47,255,0.15); color: #fff; }

        .modal-eyebrow {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(148, 148, 148, 0.8);
          font-weight: 600;
        }

        .modal-title {
          font-size: 1.7rem;
          font-weight: 800;
          color: #fff;
          margin: 8px 0 6px;
          line-height: 1.2;
        }

        .modal-sub {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 28px;
        }

        .support-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #aaa;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .form-group input,
        .form-group textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 14px;
          color: #fff;
          font-size: 0.95rem;
          font-family: inherit;
          resize: none;
          transition: border-color 0.2s;
          outline: none;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: rgba(172, 47, 255, 0.5);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #444;
        }

        .input-with-prefix {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .input-with-prefix:focus-within {
          border-color: rgba(172, 47, 255, 0.5);
        }

        .input-prefix {
          padding: 12px 10px 12px 14px;
          color: #555;
          font-size: 0.95rem;
          font-weight: 600;
          user-select: none;
          pointer-events: none;
        }

        .input-with-prefix input {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 12px 14px 12px 0;
          flex: 1;
        }

        .input-with-prefix input:focus {
          border-color: transparent;
        }

        .chip-group {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          padding: 7px 16px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
          color: #888;
          font-size: 0.83rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }

        .chip:hover {
          border-color: rgba(172, 47, 255, 0.5);
          color: #fff;
        }

        .chip-active {
          background: rgba(172, 47, 255, 0.2);
          border-color: rgba(172, 47, 255, 0.7);
          color: #d08aff;
        }

        .submit-btn {
          margin-top: 8px;
          background: rgba(172, 47, 255, 1);
          color: #fff;
          border: none;
          border-radius: 100px;
          padding: 13px 28px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: opacity 0.2s, transform 0.2s;
          align-self: flex-start;
        }

        .submit-btn:hover:not(:disabled) {
          opacity: 0.85;
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 0;
          gap: 12px;
        }

        .success-icon {
          font-size: 2.5rem;
          color: rgba(172, 47, 255, 0.9);
          animation: pulse-icon 1.5s ease infinite;
        }

        @keyframes pulse-icon {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }

        .success-state h2 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
        }

        .success-state p {
          color: #666;
          font-size: 0.95rem;
          max-width: 340px;
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default GetSupportModal;
