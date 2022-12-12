export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-base-100 dark:text-white text-3xl font-bold mb-4">
      {children}
    </h1>
  );
}
