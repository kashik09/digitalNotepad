import * as NS from "./ItemRow.jsx";

// Prefer default export, else named { ItemRow }
const Impl = NS.default || NS.ItemRow;

export default function ItemRowCompat(props) {
  if (!Impl) {
    console.error("[ItemRowCompat] No default or named ItemRow export in ItemRow.jsx");
    return null;
  }
  return <Impl {...props} />;
}
