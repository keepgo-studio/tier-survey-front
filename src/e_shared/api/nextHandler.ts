import { NEXT_API_URL } from "@shared-inner/utils/vars";

export type SupportGameJsonItem = {
  "game-name": SupportGame;
  "logo-img": string;
  "available": boolean;
};

const nextHandler = {
  getAllSupportGames: async (): Promise<SupportGameJsonItem[]> => {
    return await fetch(NEXT_API_URL + "/data/support-games.json").then((res) =>
      res.json()
    );
  },
};

export default nextHandler;