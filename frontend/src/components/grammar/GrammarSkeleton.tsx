export function GrammarSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 flex flex-col gap-2">
        <div className="h-2.5 w-14 rounded-full bg-gray-100 animate-pulse mb-1" />
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-full" />
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-4/5" />
      </div>
      <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-4 flex flex-col gap-2">
        <div className="h-2.5 w-20 rounded-full bg-blue-100 animate-pulse mb-1" />
        <div className="h-3 rounded-full bg-blue-100 animate-pulse w-full" />
        <div className="h-3 rounded-full bg-blue-100 animate-pulse w-3/4" />
      </div>
      <div className="rounded-2xl border-2 border-gray-100 bg-white p-4 flex flex-col gap-2">
        <div className="h-2.5 w-24 rounded-full bg-gray-100 animate-pulse mb-1" />
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-2/3" />
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-1/2" />
      </div>
    </div>
  );
}
