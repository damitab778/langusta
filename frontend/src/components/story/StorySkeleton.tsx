export function StorySkeleton({ testId, label }: { testId: string; label: string }) {
  return (
    <div data-testid={testId} className="flex flex-col items-center gap-4 py-8">
      <div className="flex flex-col gap-3 w-full max-w-md">
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-full" />
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-5/6" />
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-4/6" />
      </div>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}
