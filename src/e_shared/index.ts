import Container from "./components/Container";
import Footer from "./components/Footer";
import QRCode from "./components/QRCode";

const Shared = {
  Container,
  Footer,
  QRCode,
}
export default Shared;


import useQuery from "./hooks/useQuery";
import useSlider from "./hooks/useSlider/useSlider";

export const SharedHooks = {
  useQuery,
  useSlider
}