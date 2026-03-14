import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STAGES = ['Idea', 'Validation', 'MVP', 'Scaling', 'Other'];
const ROLES = ['Developer', 'Designer', 'Student Founder', 'Other'];
const SUPPORT_TYPES = ['Mentorship', 'Co-founder', 'Funding', 'Community', 'Feedback', 'Other'];

const GetSupportModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    xUsername: '',
    fullName: '',
    university: '',
    graduationYear: '',
    location: '',
    role: '',
    building: '',
    problem: '',
    audience: '',
    stage: '',
    support: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleStage = (val) => setForm((prev) => ({ ...prev, stage: val }));
  const handleRole = (val) => setForm((prev) => ({ ...prev, role: val }));

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
    // Here you can integrate API call or Google Sheet submission
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({
      xUsername: '',
      fullName: '',
      university: '',
      graduationYear: '',
      location: '',
      role: '',
      building: '',
      problem: '',
      audience: '',
      stage: '',
      support: '',
    });
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
                  <h2 className="modal-title">Tell us about yourself & your project</h2>
                  <p className="modal-sub">We'll match you with the right people in the circle.</p>
                </div>

                <form className="support-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="xUsername">X (Twitter) username</label>
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
                    <label htmlFor="university">University</label>
                    <input
                      id="university"
                      name="university"
                      type="text"
                      placeholder="University name"
                      value={form.university}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="graduationYear">Graduation Year</label>
                    <input
                      id="graduationYear"
                      name="graduationYear"
                      type="number"
                      placeholder="2026"
                      value={form.graduationYear}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Lagos, Nigeria"
                      value={form.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Role</label>
                    <div className="chip-group">
                      {ROLES.map((r) => (
                        <button
                          key={r}
                          type="button"
                          className={`chip ${form.role === r ? 'chip-active' : ''}`}
                          onClick={() => handleRole(r)}
                        >
                          {r}
                        </button>
                      ))}
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
                    <label htmlFor="problem">Problem it solves</label>
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
                    <label htmlFor="audience">Target Audience</label>
                    <input
                      id="audience"
                      name="audience"
                      type="text"
                      placeholder="e.g., Nigerian students, early-stage founders"
                      value={form.audience}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Stage</label>
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
                    <label>Support Needed</label>
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
                    disabled={
                      !form.fullName ||
                      !form.xUsername ||
                      !form.university ||
                      !form.graduationYear ||
                      !form.location ||
                      !form.role ||
                      !form.building ||
                      !form.problem ||
                      !form.audience ||
                      !form.stage ||
                      !form.support
                    }
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
                <h2>You're in the circle!</h2>
                <p>We'll reach out within 48 hours with the right connection for you.</p>
                <button className="submit-btn" onClick={handleClose}>
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GetSupportModal;
