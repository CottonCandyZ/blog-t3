export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center bg-primary-light">
      {children}
    </main>
  );
}
