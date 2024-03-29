import Shared from "@shared";
import Widget from "@widgets";

export default function Home() {
  return (
    <>
      <Shared.Container>
        Tier Survey,
        {'\n'}
        Choose your role
      </Shared.Container>

      <Widget.RoleSelect />
    </>
  );
}
