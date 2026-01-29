const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <svg
      className={`animate-spin text-blue-500 ${sizes[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

const Skeleton = ({ className = '', count = 1 }) => {
  const items = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`
        skeleton-shimmer rounded
        ${className}
      `}
    />
  ));

  return <>{items}</>;
};

const Dots = ({ className = '' }) => (
  <div className={`flex items-center gap-1 ${className}`}>
    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);

const Progress = ({ value = 0, className = '' }) => (
  <div className={`w-full h-2 bg-slate-700/50 rounded-full overflow-hidden ${className}`}>
    <div 
      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full skeleton-shimmer"
      style={{ width: `${value}%` }}
    />
  </div>
);

const Loading = ({ type = 'spinner', text = 'Loading...', className = '' }) => {
  if (type === 'spinner') {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 py-12 ${className}`}>
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-slate-700/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        </div>
        {text && (
          <div className="flex items-center gap-2 text-slate-400">
            <Dots />
            <span className="text-sm">{text}</span>
          </div>
        )}
      </div>
    );
  }

  if (type === 'skeleton') {
    return (
      <div className={`space-y-4 ${className}`}>
        <Skeleton className="h-6 w-32 mb-6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="space-y-3 mt-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="space-y-3">
        {/* Table header */}
        <div className="flex gap-4 pb-3 border-b border-slate-700/50">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
        </div>
        {/* Table rows */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex gap-4 py-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'stats') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex justify-between mb-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    );
  }

  return null;
};

Loading.Spinner = Spinner;
Loading.Skeleton = Skeleton;
Loading.Dots = Dots;
Loading.Progress = Progress;

export default Loading;

