import { type ReactElement } from 'react'
import { Card, CardBody, Stack, Text } from '@chakra-ui/react'

interface IProps {
  firstName: string
  lastName: string
  email: string
  permission: number
}

export const UserCard = ({ firstName, lastName, email, permission }: IProps): ReactElement => {
  return (
    <Card>
      <CardBody sx={{ padding: 3 }}>
        <Stack direction='row' alignItems='center'>
        <Stack flexGrow={1}>
          <Text>{`${firstName} ${lastName}`}</Text>
          <Text>{email}</Text>
        </Stack>
        <Text>{permission}</Text>
        </Stack>
      </CardBody>
    </Card>
  )
}
