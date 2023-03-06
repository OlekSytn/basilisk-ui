import { useQueries, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "utils/queryKeys"
import { useApiPromise, useTradeRouter } from "utils/api"
import { ApiPromise } from "@polkadot/api"
import { PoolBase, TradeRouter } from "@galacticcouncil/sdk"
import { AccountId32 } from "@polkadot/types/interfaces"
import { useMemo } from "react"
import { u32 } from "@polkadot/types"
import { useTotalIssuances } from "./totalIssuance"
import { useTokensBalances } from "./balances"
import { useAccountStore } from "../state/store"
import { useQueryReduce } from "utils/helpers"

export const usePools = () => {
  const tradeRouter = useTradeRouter()
  return useQuery(QUERY_KEYS.pools, getPools(tradeRouter))
}

export const usePoolShareToken = (poolId: string) => {
  const api = useApiPromise()

  return useQuery(
    QUERY_KEYS.poolShareToken(poolId),
    getPoolShareToken(api, poolId),
  )
}

export interface PoolShareToken extends PoolBase {
  shareToken?: {
    poolId: string | AccountId32
    token: u32
  } | null
}

export const usePoolsWithShareTokens = () => {
  const pools = usePools()
  const shareTokens = usePoolShareTokens(
    pools.data?.map((pool) => pool.address) ?? [],
  )

  return useQueryReduce(
    [pools, ...shareTokens] as const,
    (pools, ...shareTokens) => {
      if (shareTokens.every((query) => query)) {
        return pools.map((pool) => ({
          ...pool,
          shareToken: shareTokens.find((shareToken) => {
            if (shareToken) {
              return shareToken.poolId === pool.address
            }
            return null
          }),
        }))
      }

      return []
    },
  )
}

export const usePoolShareTokens = (poolIds: (string | AccountId32)[]) => {
  const api = useApiPromise()

  return useQueries({
    queries: poolIds.map((id) => ({
      queryKey: QUERY_KEYS.poolShareToken(id),
      queryFn: getPoolShareToken(api, id),
      enabled: !!id,
    })),
  })
}

export const getPools = (tradeRouter: TradeRouter) => async () =>
  tradeRouter.getPools()

const getPoolShareToken =
  (api: ApiPromise, poolId: string | AccountId32) => async () => {
    const token = await api.query.xyk.shareToken(poolId)
    return { poolId, token }
  }

export const useShareOfPools = (assets: (u32 | string)[]) => {
  const { account } = useAccountStore()

  const totalIssuances = useTotalIssuances(assets)
  const totalBalances = useTokensBalances(assets, account?.address)

  const queries = [...totalIssuances, ...totalBalances]
  const isLoading = queries.some((query) => query.isLoading)

  const data = useMemo(() => {
    if (!!totalIssuances.length && !!totalBalances.length) {
      return assets.map((asset) => {
        const totalBalance = totalBalances.find(
          (balance) => balance.data?.assetId.toString() === asset.toString(),
        )
        const totalIssuance = totalIssuances.find(
          (issuance) => issuance.data?.token.toString() === asset.toString(),
        )

        const calculateTotalShare = () => {
          if (totalBalance?.data && totalIssuance?.data) {
            return totalBalance.data.total
              .div(totalIssuance.data.total)
              .multipliedBy(100)
          }
          return null
        }

        const calculateTransferableShare = () => {
          if (totalBalance?.data && totalIssuance?.data) {
            return totalBalance.data.balance
              .div(totalIssuance.data.total)
              .multipliedBy(100)
          }
          return null
        }

        return {
          asset,
          totalShare: calculateTotalShare(),
          transferableShare: calculateTransferableShare(),
        }
      })
    }

    return null
  }, [assets, totalIssuances, totalBalances])

  return { isLoading, data }
}
