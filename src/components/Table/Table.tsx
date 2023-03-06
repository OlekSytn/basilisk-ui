import { ReactNode } from "react"
import { Button } from "components/Button/Button"
import { SortDirection } from "@tanstack/react-table"
import { TableHeader } from "components/Table/Table.styled"
import { ReactComponent as CaretIcon } from "assets/icons/CaretIcon.svg"

export const TableAction = (props: {
  icon: ReactNode
  onClick?: () => void
  children: ReactNode
  disabled?: boolean
  large?: boolean
  className?: string
}) => {
  return (
    <Button
      className={props.className}
      disabled={props.disabled}
      size="small"
      sx={{ p: !props.large ? "9px 12px" : "" }}
      onClick={props.onClick}
    >
      <div sx={{ flex: "row", align: "center" }}>
        {props.icon}
        {props.children}
      </div>
    </Button>
  )
}

export const TableSortHeader = (props: {
  canSort: boolean
  sortDirection?: false | SortDirection
  onSort?: (event: unknown) => void
  className?: string
  children: ReactNode
}) => {
  const { canSort, sortDirection, onSort, className, children } = props
  const isSorting =
    canSort && sortDirection !== undefined && onSort !== undefined
  const asc = sortDirection === "asc" || sortDirection === false ? 1 : 0
  const desc = sortDirection === "desc" || sortDirection === false ? 1 : 0

  return (
    <TableHeader canSort={canSort} onClick={onSort} className={className}>
      <div sx={{ flex: "row", align: "center" }}>
        {children}
        {isSorting && (
          <div sx={{ flex: "column", gap: 2, ml: 6 }}>
            <CaretIcon css={{ rotate: "180deg", opacity: asc }} />
            <CaretIcon css={{ opacity: desc }} />
          </div>
        )}
      </div>
    </TableHeader>
  )
}
