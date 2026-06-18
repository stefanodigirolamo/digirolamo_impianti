import I18nProvider from '@/presentation/providers/i18nProvider';
import { Hp } from '@/presentation/blocks/pages/Hp';

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  return (
    <I18nProvider locale={locale}>
      <Hp />
    </I18nProvider>
  );
}
