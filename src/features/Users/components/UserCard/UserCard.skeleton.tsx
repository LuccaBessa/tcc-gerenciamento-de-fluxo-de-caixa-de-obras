import { type ReactElement } from 'react'
import { Card, CardBody, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'

export const UserCardSkeleton = (): ReactElement => {
  return (
    <Card>
      <CardBody sx={{ padding: 3 }}>
        <Stack direction='row' alignItems='center' gap={5}>
        <Stack flexGrow={1} gap={1}>
          <Skeleton height='22px' />
          <Skeleton height='22px' />
        </Stack>
        <SkeletonCircle size='10' />
        </Stack>
      </CardBody>
    </Card>
  )
}
