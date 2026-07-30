import Footer from "@/app/ui/Footer";
import Header from "@/app/ui/Header";
import styles from "@/app/layout.module.css";

export default function PainelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header variant="auth" />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
