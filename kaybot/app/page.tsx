import { getApplicationInfo } from '@/core/services/_app';
import { HomeScaffold } from './home';

export default async function Home() {
  const res = await getApplicationInfo();

  const data = res.data;

  return <HomeScaffold appDesc={data.description} appName={data.title} />;
}
