import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { WalletAssetsTableBalance } from "sections/wallet/assets/table/data/WalletAssetsTableData"
import { useMedia } from "react-use"
import { theme } from "theme"
import { WalletLiquidityPositionsTableName } from "./data/WalletLiquidityPositionsData"
import BigNumber from "bignumber.js"
import { WalletLiquidityPositionsTableActions } from "./actions/WalletLiquidityPositionsTableActions"

export const useLiquidityPositionsTable = (
  data: LiquidityPositionsTableData[],
  actions: {
    onTransfer: (poolAddress: string) => void
  },
) => {
  const { t } = useTranslation()
  const { accessor, display } =
    createColumnHelper<LiquidityPositionsTableData>()
  const [sorting, setSorting] = useState<SortingState>([])

  const isDesktop = useMedia(theme.viewport.gte.sm)
  const columnVisibility: VisibilityState = {
    name: true,
    transferable: isDesktop,
    total: true,
    actions: true,
  }

  const columns = [
    accessor("name", {
      id: "name",
      header: t("wallet.assets.table.header.name"),
      cell: ({ row }) => (
        <WalletLiquidityPositionsTableName
          assetA={row.original.assetA}
          assetB={row.original.assetB}
        />
      ),
    }),
    accessor("transferable", {
      id: "transferable",
      header: t("wallet.assets.table.header.transferable"),
      sortingFn: (a, b) =>
        a.original.transferable.gt(b.original.transferable) ? 1 : -1,
      cell: ({ row }) => (
        <WalletAssetsTableBalance
          balance={row.original.transferable}
          balanceUSD={row.original.transferableUsd}
        />
      ),
    }),
    accessor("total", {
      id: "total",
      header: t("wallet.assets.table.header.total"),
      sortingFn: (a, b) => (a.original.total.gt(b.original.total) ? 1 : -1),
      cell: ({ row }) => (
        <WalletAssetsTableBalance
          balance={row.original.total}
          balanceUSD={row.original.totalUsd}
        />
      ),
    }),
    display({
      id: "actions",
      cell: ({ row }) => (
        <WalletLiquidityPositionsTableActions
          address={row.original.poolAddress}
          toggleExpanded={() => row.toggleExpanded()}
          onTransferClick={() => actions.onTransfer(row.original.poolAddress)}
        />
      ),
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return table
}

export type LiquidityPositionsTableData = {
  name?: string
  poolAddress: string
  assetA: {
    id: string
    name: string
    symbol: string
    balance?: BigNumber
    balanceUsd?: BigNumber
    chain: string
  }
  assetB: {
    id: string
    name: string
    symbol: string
    balance?: BigNumber
    balanceUsd?: BigNumber
    chain: string
  }
  total: BigNumber
  totalUsd: BigNumber
  transferable: BigNumber
  transferableUsd: BigNumber
}
