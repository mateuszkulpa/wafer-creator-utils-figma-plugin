import { render } from "@create-figma-plugin/ui";
import { h } from "preact";

import CreateWaferDialog from "./ui/CreateWaferDialog";

function Plugin() {
  return <CreateWaferDialog />;
}

export default render(Plugin);
