import { Head } from "@inertiajs/react";
import { DesignSystem } from "@/components/design-system/DesignSystem";

export default function AdminDesignSystem() {
  return (
    <>
      <Head title="Design system">
        <meta
          name="description"
          content="Internal shadcn reference for components, theme tokens, aliases, and the CLI workflow used by this app."
        />
        <meta property="og:title" content="Design system" />
        <meta
          property="og:description"
          content="Internal shadcn reference for components, theme tokens, aliases, and the CLI workflow used by this app."
        />
      </Head>
      <DesignSystem />
    </>
  );
}
