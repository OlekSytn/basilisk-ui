import { Text } from "../../../components/Typography/Text/Text"
import { Heading } from "../../../components/Typography/Heading/Heading"
import { Separator } from "../../../components/Separator/Separator"
import { Trans, useTranslation } from "react-i18next"
import { AssetsTableData } from "./table/WalletAssetsTable.utils"
import { FC, useMemo } from "react"
import { BN_0 } from "../../../utils/constants"
import { separateBalance } from "../../../utils/balance"
import { css } from "@emotion/react"
import { theme } from "../../../theme"
import Skeleton from "react-loading-skeleton"
import BN from "bignumber.js"
import { LiquidityPositionsTableData } from "./table/WalletLiquidityPositionsTable.utils"

interface WalletAssetsHeaderProps {
  assetsData?: AssetsTableData[]
  lpData?: LiquidityPositionsTableData[]
  isLoading?: boolean
}

export const WalletAssetsHeader: FC<WalletAssetsHeaderProps> = ({
  assetsData,
  lpData,
  isLoading,
}) => {
  const { t } = useTranslation()

  const totalUsd = useMemo(() => {
    if (assetsData) {
      return assetsData.reduce((acc, cur) => {
        if (!cur.totalUSD.isNaN()) {
          return acc.plus(cur.totalUSD)
        }
        return acc
      }, BN_0)
    }
    return null
  }, [assetsData])

  const transferableUsd = useMemo(() => {
    if (assetsData) {
      return assetsData.reduce((acc, cur) => {
        if (!cur.transferableUSD.isNaN()) {
          return acc.plus(cur.transferableUSD)
        }
        return acc
      }, BN_0)
    }
  }, [assetsData])

  const totalInPools = useMemo(() => {
    if (!lpData) return BN_0

    return lpData.reduce((acc, { totalUsd }) => acc.plus(BN(totalUsd)), BN_0)
  }, [lpData])

  return (
    <div
      sx={{ flex: ["column", "row"], mb: [29, 57], gap: [0, 16] }}
      css={{ flexWrap: "wrap" }}
    >
      <div
        sx={{
          flexGrow: 1,
          flex: ["row", "column"],
          justify: "space-between",
          align: ["center", "start"],
          mb: [15, 0],
        }}
      >
        <Text color="neutralGray300" sx={{ fontSize: [14, 16], mb: [0, 14] }}>
          {t("wallet.assets.header.total")}
        </Text>

        {isLoading ? (
          <Skeleton
            sx={{
              width: [97, 208],
              height: [27, 42],
            }}
          />
        ) : (
          totalUsd && (
            <Heading as="h3" sx={{ fontSize: [16, 52], fontWeight: 900 }}>
              <Trans
                t={t}
                i18nKey="wallet.assets.header.value"
                tOptions={{
                  ...separateBalance(totalUsd, {
                    numberPrefix: "$",
                    type: "dollar",
                  }),
                }}
              >
                <span
                  sx={{
                    fontSize: [16, 26],
                  }}
                  css={css`
                    color: rgba(${theme.rgbColors.white}, 0.4);
                  `}
                />
              </Trans>
            </Heading>
          )
        )}
      </div>
      <Separator
        sx={{ mb: 15, display: ["inherit", "none"] }}
        css={{ background: `rgba(${theme.rgbColors.white}, 0.06)` }}
      />

      <div
        sx={{
          flexGrow: 1,
          flex: ["row", "column"],
          justify: "space-between",
          align: ["center", "start"],
          mb: [15, 0],
        }}
      >
        <Text color="neutralGray300" sx={{ fontSize: [14, 16], mb: [0, 14] }}>
          {t("wallet.assets.header.transferable")}
        </Text>

        {isLoading ? (
          <Skeleton
            sx={{
              width: [97, 168],
              height: [27, 42],
            }}
          />
        ) : (
          transferableUsd && (
            <Heading as="h3" sx={{ fontSize: [16, 52], fontWeight: 900 }}>
              <Trans
                t={t}
                i18nKey="wallet.assets.header.value"
                tOptions={{
                  ...separateBalance(transferableUsd, {
                    numberPrefix: "$",
                    type: "dollar",
                  }),
                }}
              >
                <span
                  sx={{
                    fontSize: [16, 26],
                  }}
                  css={css`
                    color: rgba(${theme.rgbColors.white}, 0.4);
                  `}
                />
              </Trans>
            </Heading>
          )
        )}
      </div>
      <Separator
        sx={{ mb: 15, display: ["inherit", "none"] }}
        css={{ background: `rgba(${theme.rgbColors.white}, 0.06)` }}
      />

      <div
        sx={{
          flexGrow: 1,
          flex: ["row", "column"],
          justify: "space-between",
          align: ["center", "start"],
          mb: [15, 0],
        }}
      >
        <Text color="neutralGray300" sx={{ fontSize: [14, 16], mb: [0, 14] }}>
          {t("wallet.assets.header.totalInPools")}
        </Text>

        {isLoading ? (
          <Skeleton
            sx={{
              width: [97, 168],
              height: [27, 42],
            }}
          />
        ) : (
          transferableUsd && (
            <Heading as="h3" sx={{ fontSize: [16, 52], fontWeight: 900 }}>
              <Trans
                t={t}
                i18nKey="wallet.assets.header.value"
                tOptions={{
                  ...separateBalance(totalInPools, {
                    numberPrefix: "$",
                    type: "dollar",
                  }),
                }}
              >
                <span
                  sx={{
                    fontSize: [16, 26],
                  }}
                  css={css`
                    color: rgba(${theme.rgbColors.white}, 0.4);
                  `}
                />
              </Trans>
            </Heading>
          )
        )}
      </div>
    </div>
  )
}
