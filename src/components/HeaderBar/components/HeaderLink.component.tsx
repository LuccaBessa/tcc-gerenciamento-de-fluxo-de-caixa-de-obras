import { type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { type SystemStyleObject, Text } from '@chakra-ui/react'

interface IProps {
  name: string
  link: string
  active?: boolean
}

const defaultStyle: SystemStyleObject = {
  color: 'white',
  fontWeight: 'normal',
  fontSize: 'lg',
  borderBottom: '2px solid transparent',
  transition: 'all 0.2s ease-in-out',
  _hover: {
    borderBottom: '2px solid white'
  }
}

const activeStyle: SystemStyleObject = {
  ...defaultStyle,
  fontWeight: 'bold'
}

const unactiveStyle: SystemStyleObject = {
  ...defaultStyle,
  color: 'gray.100'
}

export const HeaderLink = ({ name, link, active = false }: IProps): ReactElement => {
  return (
    <Link to={link}>
      <Text sx={active ? activeStyle : unactiveStyle}>{name}</Text>
    </Link>
  )
}
