import { Icon } from "./Icon";

export function ItemRow({ item, state, onToggleDone, onSaveNote }) {
  const { done = false, notes = "" } = state || {};
  const icon =
    item.type === "quiz" ? "quiz" :
    item.type === "attachment" ? "attachment" :
    item.type === "note" ? "note" :
    item.type === "video" ? "video" : "page";

  return (
    <div className="border rounded-xl p-3 mb-2 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Icon name={icon} className="w-4 h-4 text-gray-500" />
        <div className="flex-1">
          <div className="font-medium text-gray-800">{item.title}</div>
          <div className="flex gap-2 mt-1 text-xs text-gray-500">
            {item.meta?.timeMin != null && <span className="inline-flex items-center gap-1">
              <Icon name="time" className="w-3.5 h-3.5" />{item.meta.timeMin.toFixed(1)} min
            </span>}
            {item.meta?.points != null && <span className="inline-flex items-center gap-1">
              <Icon name="points" className="w-3.5 h-3.5" />{item.meta.points} pts
            </span>}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="w-4 h-4" checked={!!done} onChange={() => onToggleDone(item.id)} />
          <span className="text-gray-600">Done</span>
        </label>
      </div>

      <textarea
        className="mt-3 w-full rounded-lg border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Write quick notes, bullets, cheats…"
        value={notes}
        onChange={(e) => onSaveNote(item.id, e.target.value)}
        rows={item.type === "note" ? 6 : 3}
      />

      <div className="mt-2 flex gap-2">
        <button onClick={() => navigator.clipboard.writeText(notes || "")}
                className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">Copy notes</button>
        <button onClick={() => onSaveNote(item.id, "")}
                className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">Clear</button>
      </div>
    </div>
  );
}

// compat: provide default export for bundlers
export default ItemRow;
