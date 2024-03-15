import { NEXT_API_URL } from "../utils/vars";

import type { SupportGameJsonItem } from "../types/api";


export default {
  getAllSupportGames: async (): Promise<SupportGameJsonItem[]> => {
    return await fetch(NEXT_API_URL + "/data/support-games.json").then((res) =>
      res.json()
    );
  },
};
