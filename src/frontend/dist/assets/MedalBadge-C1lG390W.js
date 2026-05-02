import { c as createLucideIcon } from "./useAuth-BamQ2yKg.js";
import { j as jsxRuntimeExports } from "./index-Ci83zjMo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode);
const medalLabels = { 1: "1st", 2: "2nd", 3: "3rd" };
const medalClasses = {
  1: "medal-gold",
  2: "medal-silver",
  3: "medal-bronze"
};
const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base"
};
function MedalBadge({ rank, size = "md" }) {
  const medalClass = medalClasses[rank] ?? "bg-muted";
  const label = medalLabels[rank] ?? `#${rank}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `${sizeClasses[size]} ${medalClass} rounded-full flex items-center justify-center font-display font-bold text-foreground`,
      "aria-label": `Rank ${rank}`,
      children: label
    }
  );
}
export {
  ChartNoAxesColumn as C,
  MedalBadge as M
};
