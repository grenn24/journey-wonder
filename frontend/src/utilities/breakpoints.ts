import { Breakpoint, Grid } from "antd";

type Key = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
interface Breakpoints extends Partial<Record<Breakpoint, boolean>> {

	largerThan: (key: Key) => boolean;
	smallerThan: (key: Key) => boolean;
}
const useBreakpoints = () => {
	const { useBreakpoint } = Grid;
	let breakpoints = useBreakpoint();
	// Matches screen widths greater than or equal to the screen size given by the breakpoint key
	const largerThan = (key:Key) => {
		switch (key) {
			case "xs":
				if (
					breakpoints.xs ||
					breakpoints.sm ||
					breakpoints.md ||
					breakpoints.lg ||
					breakpoints.xl ||
					breakpoints.xxl
				) {
					return true;
				}
				break;
			case "sm":
				if (
					breakpoints.sm ||
					breakpoints.md ||
					breakpoints.lg ||
					breakpoints.xl ||
					breakpoints.xxl
				) {
					return true;
				}
				break;
			case "md":
				if (
					breakpoints.md ||
					breakpoints.lg ||
					breakpoints.xl ||
					breakpoints.xxl
				) {
					return true;
				}
				break;
			case "lg":
				if (breakpoints.lg || breakpoints.xl || breakpoints.xxl) {
					return true;
				}
				break;
			case "xl":
				if (breakpoints.xl || breakpoints.xxl) {
					return true;
				}
				break;
			case "xxl":
				if (breakpoints.xxl) {
					return true;
				}
				break;
			default:
				return false;
		}
		return false;
	};

	// Matches screen widths smaller than the screen size given by the breakpoint key (exclusive)
	const smallerThan = (key:Key) => {
		switch (key) {
			case "xs":
				if (
					!breakpoints.xs &&
					!breakpoints.sm &&
					!breakpoints.md &&
					!breakpoints.lg &&
					!breakpoints.xl &&
					!breakpoints.xxl
				) {
					return true;
				}
				break;
			case "sm":
				if (
					!breakpoints.sm &&
					!breakpoints.md &&
					!breakpoints.lg &&
					!breakpoints.xl &&
					!breakpoints.xxl
				) {
					return true;
				}
				break;
			case "md":
				if (
					!breakpoints.md &&
					!breakpoints.lg &&
					!breakpoints.xl &&
					!breakpoints.xxl
				) {
					return true;
				}
				break;
			case "lg":
				if (!breakpoints.lg && !breakpoints.xl && !breakpoints.xxl) {
					return true;
				}
				break;
			case "xl":
				if (!breakpoints.xl && !breakpoints.xxl) {
					return true;
				}
				break;
			case "xxl":
				if (!breakpoints.xxl) {
					return true;
				}
				break;
			default:
				return false;
		}
		return false;
	};

	const breakpointsNew : Breakpoints = { ...breakpoints, largerThan, smallerThan };
	return breakpointsNew;
};

export default useBreakpoints;
