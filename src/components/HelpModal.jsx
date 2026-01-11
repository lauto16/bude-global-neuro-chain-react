import React, { useState } from 'react';
import styles from '../styles/components/HelpModal.module.css';

const HelpModal = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT') {
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button 
        className={styles.helpButton} 
        onClick={toggleOpen}
        title="Help & Shortcuts (?)"
      >
        ?
      </button>
    );
  }

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Neuro-Chain Guide</h2>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
        </div>
        
        <div className={styles.content}>
          <section className={styles.section}>
            <h3>Navigation</h3>
            <ul className={styles.list}>
              <li><span className={styles.key}>Drag</span> Pan View</li>
              <li><span className={styles.key}>Scroll</span> Zoom In/Out</li>
              <li><span className={styles.key}>Click Node</span> Focus & Details</li>
              <li><span className={styles.key}>Double Click</span> Reset View</li>
            </ul>
          </section>
          
          <section className={styles.section}>
            <h3>Shortcuts</h3>
            <ul className={styles.list}>
              <li><span className={styles.key}>Ctrl</span> + <span className={styles.key}>K</span> Search</li>
              <li><span className={styles.key}>Space</span> Pause Animation</li>
              <li><span className={styles.key}>R</span> Reset Camera</li>
              <li><span className={styles.key}>?</span> Toggle Help</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h3>Metrics Legend</h3>
            <div className={styles.metricItem}>
                <strong>Density</strong>
                <p>Average connections per node. Higher means a more interconnected, mature network.</p>
            </div>
            <div className={styles.metricItem}>
                <strong>Clusters</strong>
                <p>Distinct fields of innovation. Nodes are color-coded by their primary cluster.</p>
            </div>
          </section>

          <section className={styles.section}>
             <h3>Visuals</h3>
             <ul className={styles.visualList}>
                 <li><span className={styles.dot} style={{background: '#ff6b35'}}></span> Fire / Energy</li>
                 <li><span className={styles.dot} style={{background: '#00ffff'}}></span> Information / Computing</li>
                 <li><span className={styles.dot} style={{background: '#4caf50'}}></span> Biology / Life</li>
             </ul>
             <p className={styles.note}>
                 Larger nodes represent highly connected "Hub" innovations foundational to many others.
             </p>
          </section>
        </div>
      </div>
    </div>
  );
});

HelpModal.displayName = 'HelpModal';

export default HelpModal;
