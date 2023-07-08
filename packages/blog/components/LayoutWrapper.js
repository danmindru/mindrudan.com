import { Rubik } from '@next/font/google';
import SectionContainer from './SectionContainer';
import Footer from './Footer';
import Header from './Header';
import { BlurBg } from './blurBg';
import { SoftBg } from './softBg';
const rubik = Rubik({
  subsets: ['latin'],
});
const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <BlurBg
        variant="primary"
        className="absolute -left-72 -top-72 w-3/4 opacity-60"
      />
      <SoftBg />

      <div
        className={`${rubik.className} flex h-screen flex-col justify-between font-sans`}
      >
        <Header />

        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  );
};
export default LayoutWrapper;
