import Flexbox, { FlexboxProps } from '..'

export default function Inline(props: Omit<FlexboxProps, "direction">) {
    return <Flexbox direction="row" {...props} />
}
