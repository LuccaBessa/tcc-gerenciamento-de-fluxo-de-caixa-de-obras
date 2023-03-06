import { type ReactElement } from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'

interface IPorps {
  leading?: ReactElement
  title: string
  onClick?: () => void
}

export const HeaderListTile = ({ leading, title, onClick }: IPorps): ReactElement => {
  return (
    <Button variant='ghost' colorScheme='whiteAlpha' width='100%'>
      <Flex direction='row' justifyContent='start' alignItems='center' gap={4} padding={2}>
        {leading != null && leading}
        <Text flexGrow={1} textAlign='start'>
          {title}
        </Text>
      </Flex>
    </Button>
  )
}
