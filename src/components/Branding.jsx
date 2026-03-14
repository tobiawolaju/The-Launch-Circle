import React from 'react';
import { motion } from 'framer-motion';

const Branding = () => {
  return (
    <section className="branding-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">The Signal</h2>
          <p className="cta-subtitle">
            Weekly insights and opportunities for students building before graduation.
          </p>
          <p className="cta-description">
            You don’t need to be a member to catch up on exciting opportunities,
            updates, and energy coming from the Launch Circle.
          </p>

          <a
            href="https://x.com/TheLaunchCircle"
            target="_blank"
            rel="noopener noreferrer"
            className="x-btn"
          >
            Follow us on X Articles and turn on notifications to stay updated.
            <span className="x-btn-arrow">Follow on X →</span>
          </a>
        </div>
      </div>

      <div className="large-branding-wrapper">
        <div className="massive-text">
          {"-.. --- -. .----. -   --. .-. .- -.. ..- .- - .   ..- -. .--. --- ... .. - .. --- -. . -.."}
        </div>
      </div>

      <style jsx>{`
        .branding-section {
          background-color: #fff;
          color: #000;
          padding: 80px 0 0;
          position: relative;
          overflow: hidden;
        }

        .cta-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15vh;
        }

        .cta-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 10px;
        }

        .cta-subtitle {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 16px;
        }

        .cta-description {
          font-size: 1rem;
          color: #4a4a4a;
          margin-bottom: 30px;
          max-width: 780px;
          line-height: 1.6;
        }

        .x-btn {
          display: inline-block;
          background-color: #7700ffff; /* Substack orange */
          color: #000000ff;
          padding: 18px 36px;
          border-radius: 40px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          line-height: 1.5;
          max-width: 880px;
        }

        .x-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .x-btn-arrow {
          display: inline-block;
          margin-left: 8px;
        }

        .large-branding-wrapper {
          background-color: #e4d3ff;
          width: 100%;
          padding: 40px 0;
          display: flex;
          white-space: wrap;
          height: auto;
        }

        .massive-text {
          font-size: 15vw;
          font-weight: 900;
          color: #7700ff;
          line-height: 0.8;
          letter-spacing: -0.05em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .cta-container {
            flex-direction: column;
            gap: 40px;
          }
          .cta-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Branding;
