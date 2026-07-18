import Flexbox, { FlexboxProps } from '..'

export default function Stack(props: Omit<FlexboxProps, "direction">) {
    return <Flexbox align="stretch" direction="column" {...props} />
}
