import Footer from "@/app/ui/Footer";
import Header from "@/app/ui/Header";
import styles from "@/app/layout.module.css";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
