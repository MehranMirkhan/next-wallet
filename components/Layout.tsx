export function Layout({ children }) {
  return <div className="relative h-screen">{children}</div>;
}

export function Footer({ children }) {
  return (
    <footer className="absolute bottom-0 w-full text-center">{children}</footer>
  );
}

export default Layout;
