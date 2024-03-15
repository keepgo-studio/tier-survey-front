import Widget from "@/b_widgets";
import Shared from "@/e_shared";

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
