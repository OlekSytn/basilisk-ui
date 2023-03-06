import { Maybe } from "utils/helpers"
import { SButton, SButtonBackground, SSwitch } from "./PillSwitch.styled"

export function PillSwitch<T>(props: {
  options: { label: string; value: T }[]
  value: Maybe<T>
  onChange: (value: T) => void
  className?: string
}) {
  return (
    <SSwitch className={props.className}>
      {props.options.map((option, i) => (
        <SButton
          key={i}
          onClick={() => props.onChange(option.value)}
          isActive={props.value === option.value}
          type="button"
        >
          {option.label}
          {props.value === option.value && <SButtonBackground />}
        </SButton>
      ))}
    </SSwitch>
  )
}
