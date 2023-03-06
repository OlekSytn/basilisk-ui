import BigNumber from "bignumber.js"
import BN from "bignumber.js"
import { BLOCK_TIME } from "./constants"
import { addSeconds, subSeconds } from "date-fns"
import { useBestNumber } from "api/chain"
import { useQueryReduce } from "utils/helpers"

export const getExpectedBlockDate = (
  currentBlock: BigNumber,
  blockNumber: BigNumber,
) => {
  const currentDate = new Date()
  const expectedSeconds = blockNumber.minus(currentBlock).div(BLOCK_TIME)
  return addSeconds(currentDate, expectedSeconds.toNumber())
}

export const useEnteredDate = (enteredAtBlock: BN) => {
  const bestNumber = useBestNumber()

  return useQueryReduce([bestNumber] as const, (bestNumber) => {
    const currentBlock = bestNumber.relaychainBlockNumber.toBigNumber()
    const blockRange = currentBlock.minus(enteredAtBlock)
    const blockRangeSeconds = blockRange.times(BLOCK_TIME)

    const currentDateSeconds = new BN(Date.now())
    const enteredAtDateSeconds = currentDateSeconds.minus(blockRangeSeconds)

    const rangeSeconds = currentDateSeconds.minus(enteredAtDateSeconds)
    const enteredAtDate = subSeconds(Date.now(), rangeSeconds.toNumber())

    return enteredAtDate
  })
}
