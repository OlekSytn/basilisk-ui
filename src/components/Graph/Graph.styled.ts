import styled from "@emotion/styled"
import { LineChart } from "recharts"

export const SChart = styled(LineChart)`
  // remove cartesian grid lines on borders
  .recharts-cartesian-grid-horizontal line:nth-last-of-type(-n + 2),
  .recharts-cartesian-grid-vertical line:nth-last-of-type(-n + 2) {
    stroke-opacity: 0;
  }
`
