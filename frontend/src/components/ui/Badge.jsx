const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const variants = {
    default: 'bg-slate-700 text-slate-300',
    primary: 'bg-blue-600/20 text-blue-400 border border-blue-600/30',
    success: 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30',
    warning: 'bg-amber-600/20 text-amber-400 border border-amber-600/30',
    error: 'bg-red-600/20 text-red-400 border border-red-600/30',
    info: 'bg-cyan-600/20 text-cyan-400 border border-cyan-600/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;

