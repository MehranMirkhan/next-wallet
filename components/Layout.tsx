export function Layout({ children }) {
  return <div className="relative h-screen p-8">{children}</div>;
}

export function Footer({ children }) {
  return (
    <footer className="absolute bottom-0 w-full text-center">{children}</footer>
  );
}

export function Gap() {
  return <div className="h-4" />;
}

export default Layout;
