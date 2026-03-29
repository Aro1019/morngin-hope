/* Layout Sanity Studio */
/* Layout minimal sans header/footer pour l'interface admin */

export const metadata = {
  title: 'Morning Hope Studio',
  description: 'Interface d\'administration Morning Hope',
};

export default function LayoutStudio({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
