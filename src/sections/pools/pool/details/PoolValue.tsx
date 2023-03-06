import { useTranslation } from "react-i18next"
import { Text } from "components/Typography/Text/Text"
import { useTotalInPool } from "../Pool.utils"
import { PoolBase } from "@galacticcouncil/sdk"
import { usePoolDetailsTradeVolume } from "./PoolDetails.utils"

import { InfoTooltip } from "components/InfoTooltip/InfoTooltip"
import { SInfoIcon } from "./PoolValue.styled"

type Props = { pool: PoolBase; className?: string }

export const PoolValue = ({ pool, className }: Props) => {
  const { t } = useTranslation()
  const { data } = useTotalInPool({ pool })
  const volume = usePoolDetailsTradeVolume(pool.address)

  return (
    <div
      sx={{ flex: "row", justify: "space-between", align: "end", mb: 12 }}
      className={className}
    >
      <div>
        <Text fs={14} color="neutralGray400" lh={26}>
          {t("pools.pool.poolDetails.total")}
        </Text>
        <Text lh={22} color="white" fs={18}>
          {t("value.usd", { amount: data })}
        </Text>
      </div>
      <div
        sx={{ flex: "column", width: ["auto", "auto", 120], align: "start" }}
      >
        <div sx={{ flex: "row", align: "center", gap: 6 }}>
          <Text
            fs={14}
            color="neutralGray400"
            lh={26}
            fw={400}
            css={{ display: "inline" }}
          >
            {t("pools.pool.poolDetails.24hours")}
          </Text>
          <InfoTooltip text={t("pools.pool.poolDetails.24hours.tooltip")}>
            <SInfoIcon />
          </InfoTooltip>
        </div>

        <Text
          lh={22}
          color="white"
          tAlign={["right", "right", "left"]}
          sx={{ width: "calc(100% - 20px)" }}
        >
          {t("value.usd", { amount: volume })}
        </Text>
      </div>
    </div>
  )
}
