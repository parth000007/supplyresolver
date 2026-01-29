import { forwardRef } from 'react';

const Card = forwardRef(({
  children,
  variant = 'default',
  padding = 'md',
  hover = 'none',
  glow = false,
  className = '',
  ...props
}, ref) => {
  const variants = {
    default: 'bg-slate-800/80 border border-slate-700/50',
    elevated: 'bg-slate-800/90 border border-slate-700/50 shadow-soft-lg',
    bordered: 'bg-slate-800/60 border border-slate-600',
    glass: 'bg-slate-800/40 border border-slate-700/30 backdrop-blur-sm',
  };

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
    xl: 'p-8',
  };

  const hoverEffects = {
    none: '',
    lift: 'card-lift cursor-pointer',
    glow: 'card-hover cursor-pointer',
  };

  return (
    <div
      ref={ref}
      className={`
        rounded-xl
        relative overflow-hidden
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverEffects[hover]}
        ${glow ? 'border-glow' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 inner-glow pointer-events-none" />
      {/* Shimmer effect on hover for certain variants */}
      {variant === 'elevated' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
      )}
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;

