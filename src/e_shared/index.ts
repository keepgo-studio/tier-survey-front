import Container from "./components/Container";
import Footer from "./components/Footer";
import Input from "./components/Input";
import QRCode from "./components/QRCode";
import Navbar from "./components/Navbar";

const Shared = {
  Container,
  Footer,
  QRCode,
  Input,
  Navbar
}
export default Shared;

import { query, serverQuery } from "./api/query";

export const SharedApi = {
  query,
  serverQuery
}

import useSlider from "./hooks/useSlider";

export const SharedHooks = {
  useSlider
}


import * as utils from "./utils/utils";
import * as vars from "./utils/vars";

export const SharedUtils = {
  ...utils,
  ...vars
}

export type { SupportGameJsonItem } from "./api/nextHandler";
export type { BookReturn } from "./api/firebaseHandler";