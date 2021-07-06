import * as React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const CollapseCardContext = React.createContext<{show: boolean; toggle: () => void}>(undefined)

export function useCollapseCardContext() {
  const context = React.useContext(CollapseCardContext)

  if (!context) {
    throw new Error('useCollapseCardContext cannot be used outside of Accordion component')
  }
  return context
}

export const Accordion = props => {
  const {children} = props

  const [show, setShow] = React.useState(false)

  const toggle = React.useCallback(() => setShow(oldShow => !oldShow), [])

  const value = React.useMemo(() => ({toggle, show}), [show, toggle])

  return <CollapseCardContext.Provider value={value}>{children}</CollapseCardContext.Provider>
}

function On({children}) {
  const {show} = useCollapseCardContext()

  if (typeof children === 'function') {
    return show ? children(show) : null
  }

  return show ? children : null
}

function Header({children}) {
  const {toggle, show} = useCollapseCardContext()

  let customChildren = children

  if (typeof children === 'function') {
    customChildren = children(show)
  }

  const modifiedChildren = React.Children.map(customChildren, child => {
    return React.cloneElement(child, {onPress: toggle})
  })

  return modifiedChildren
}

export const ToggleIcon = ({color}) => {
  const {show} = useCollapseCardContext()

  const iconColor = color ? color : 'grey'

  return (
    <MaterialIcon
      name={show ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
      size={25}
      color={iconColor}
    />
  )
}

Accordion.On = On
Accordion.Header = Header
