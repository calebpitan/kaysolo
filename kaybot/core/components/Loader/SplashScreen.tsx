import { VStack } from '@/chakra-ui/react';

import { AppName } from '@/core/components/AppBar';

import styles from './splash-screen.module.css';

export const SplashScreen = () => {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <AppName textStyle="h2" />
      </div>

      <VStack width="full" spacing={6}></VStack>

      <div className={styles.grid}></div>
    </main>
  );
};
