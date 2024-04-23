import Container from "./components/Container";
import Footer from "./components/Footer";
import Input from "./components/Input";
import QRCode from "./components/QRCode";
import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import Button from "./components/Button";
import Loading from "./components/Loading";

const Shared = {
  Container,
  Footer,
  QRCode,
  Input,
  Navbar,
  Loading,
  Timer,
  Button,
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

import * as nodeUtils from "./utils/node-utils";

export const SharedNodeUtils = {
  ...nodeUtils
}


// --------------------------------------------------------
export type { SupportGameJsonItem } from "./api/nextHandler";
export type { 
  LeagueOfLegendsChampionInfo,
  LeagueOfLegendsChart
} from "./api/firebaseHandler";