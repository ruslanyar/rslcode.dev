import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href='/' aria-label='rslcode.dev homepage'>
      <div className='flex items-baseline gap-x-1.5'>
        <span className='text-logo font-bold text-sky-500 text-shadow-logo'>{'</rsl>'}</span>
        <span
          className={`
            hidden text-logo font-medium text-foreground
            sm:inline
          `}>
          code
        </span>
      </div>
    </Link>
  );
};
