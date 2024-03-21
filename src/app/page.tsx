import Shared from "@shared";
import Widget from "@widgets";

export default function Home() {
  return (
    <main className="w-full">
      <Shared.Container>
        Tier Survey
      </Shared.Container>

      <Widget.GameSelect />
    </main>
  );
}
