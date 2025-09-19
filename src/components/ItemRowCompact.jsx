import * as NS from "./ItemRow.jsx";

/**
 * Works whether ItemRow.jsx exports:
 *   export default function ItemRow(...) {}
 * OR:
 *   export function ItemRow(...) {}
 */
const Impl = NS.default || NS.ItemRow;

export default function ItemRowCompact(props) {
  if (!Impl) {
    console.error("[ItemRowCompact] No default or named export found in ItemRow.jsx");
    return null;
  }
  return <Impl {...props} />;
}
