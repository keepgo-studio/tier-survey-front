import Container from "./components/Container";
import Footer from "./components/Footer";
import QRCode from "./components/QRCode";
import Navbar from "./components/Navbar";
import Input from "./components/Input";
import Timer from "./components/Timer";
import LoadingBar from "./components/LoadingBar";
import Spinner from "./components/Spinner";

const Shared = {
  Container,
  Footer,
  QRCode,
  Navbar,
  LoadingBar,
  Spinner,
  Input,
  Timer,
}
export default Shared;

import Text from "./components/Anim/Text";

export const Anim = {
  Text
}


// --------------------------------------------------------
import { query, serverQuery } from "./api/query";

export const SharedApi = {
  query,
  serverQuery
}


// --------------------------------------------------------
import useSlider from "./hooks/useSlider";
import useModal from "./hooks/useModal";
import useFetch from "./hooks/useFetch";

export const SharedHooks = {
  useSlider,
  useModal,
  useFetch
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

import * as nodeUtils from "./utils/node-utils";

export const SharedNodeUtils = {
  ...nodeUtils
}


// --------------------------------------------------------
export * as SharedFonts from "./fonts/fonts";


// --------------------------------------------------------
export type { SupportGameJsonItem } from "./api/nextHandler";
export type { 
  LeagueOfLegendsChampionInfo,
  LeagueOfLegendsChart
} from "./api/firebaseHandler";

