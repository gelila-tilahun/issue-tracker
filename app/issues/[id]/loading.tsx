import IssueStatusBadge from '@/app/api/components/IssueStatusBadge'
import { Box, Text, Heading, Flex, Card } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import ReactMarkdown from 'react-markdown'

const loadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
    <Skeleton/>
    <Flex className="space-x-3" my="2">
       <Skeleton width='5rem'/> 
       <Skeleton  width='8rem'/>
    </Flex>
    <Card className="mt-4 p-4">
      <Skeleton count={3} />
    </Card>
  </Box>
  )
}

export default loadingIssueDetailPage