import { Link } from '@/chakra-ui/next-js';
import { VStack } from '@/chakra-ui/react';

import { AppName } from '@/core/components/AppBar';
import { PrimaryButton } from '@/core/components/Button';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <AppName textStyle="h2" />
      </div>

      <VStack width="full" spacing={6}>
        <PrimaryButton as={Link} href="/signin" borderRadius="lg" width={300}>
          Sign in to Continue
        </PrimaryButton>

        <Link href="/signup" colorScheme="brand" color="brand.500">
          or create an account
        </Link>
      </VStack>

      <div className={styles.grid}></div>
    </main>
  );
}
