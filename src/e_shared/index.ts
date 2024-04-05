import Container from "./components/Container";
import Footer from "./components/Footer";
import Input from "./components/Input";
import QRCode from "./components/QRCode";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Timer from "./components/Timer";
import Button from "./components/Button";

const Shared = {
  Container,
  Footer,
  QRCode,
  Input,
  Navbar,
  Loading,
  Timer,
  Button
}
export default Shared;


// --------------------------------------------------------
import { query, serverQuery } from "./api/query";

export const SharedApi = {
  query,
  serverQuery
}


// --------------------------------------------------------
import useSlider from "./hooks/useSlider";
import useModal from "./hooks/useModal";

export const SharedHooks = {
  useSlider,
  useModal
}


// --------------------------------------------------------
import * as utils from "./utils/utils";
import * as vars from "./utils/vars";
import * as urls from "./utils/urls";

export const SharedUtils = {
  ...urls,
  ...utils,
  ...vars
}


// --------------------------------------------------------
export type { SupportGameJsonItem } from "./api/nextHandler";
export type { 
  LeagueOfLegendsChampionInfo,
  LeagueOfLegendsChart
} from "./api/firebaseHandler";