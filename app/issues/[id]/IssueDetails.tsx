import { IssueStatusBadge } from '@/app/components';
import { Heading,Text, Flex, Card } from '@radix-ui/themes';
import  {Issue}  from '@prisma/client';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue}) => {
  return (
    <> 
     <Heading>{issue.title}</Heading>
       <Flex className="space-x-3" my="2">
         <IssueStatusBadge status ={issue.status}/>
        <Text> {issue.createdAt.toDateString()} </Text>
       </Flex>
       <Card className='mt-4'>
         <ReactMarkdown>{issue.description}</ReactMarkdown>
       </Card>
    </>   
    )
}

export default IssueDetails