import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GetSupportModal = ({ isOpen, onClose }) => {
  const handleClose = () => onClose();

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

            <div className="modal-content">
              <h2 className="modal-title">Launch Circle — Membership by Nomination Only</h2>
              <p className="modal-sub">
                Launch Circle is an elite, merit-based network for final-year students and recent graduates building
                real products in the Monad ecosystem.
              </p>
              <p className="modal-sub">
                To maintain the quality and impact of our community, all new members must be nominated by a current
                member.
              </p>
              <p className="modal-sub">
                If you know a member, reach out and request a nomination. Once nominated, you&apos;ll receive
                instructions on how to complete your application and join the circle.
              </p>
              <p className="modal-sub">
                Being nominated is your first step to joining a network of serious builders, shipping products, and
                creating impact before graduation.
              </p>
            </div>
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

        .modal-content {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 18px;
        }

        .modal-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
          line-height: 1.2;
        }

        .modal-sub {
          color: #9a9a9a;
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default GetSupportModal;
