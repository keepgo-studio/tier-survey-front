import Shared from "@shared";
import Widget from "@widgets";

export default function Home() {
  return (
    <div className="fcenter flex-col">
      <h1 className="text-4xl font-bold my-10">
        Tier Survey,
        {'\n'}
        Choose your role
      </h1>

      <Widget.RoleSelect />
    </div>
  );
}
