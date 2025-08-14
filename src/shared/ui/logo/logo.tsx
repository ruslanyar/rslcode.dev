import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href='/' aria-label='rslcode.dev homepage'>
      <Image src='/logo_animated.svg' alt='rslcode.dev logo' width={140} height={45} priority />
    </Link>
  );
};
