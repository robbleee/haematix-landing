export default function FullFlowLayout({ children }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#fafaf9',
      zIndex: 9999,
      overflow: 'auto',
    }}>
      {children}
    </div>
  );
}
