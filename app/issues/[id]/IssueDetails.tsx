import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@/app/generated/client';
import ReactMarkdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 leading-snug">{issue.title}</h1>
        <div className="flex items-center gap-3 mt-3">
          <IssueStatusBadge status={issue.status} />
          <span className="text-xs text-gray-400">
            #{issue.id}
          </span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">
            Created{' '}
            {issue.createdAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          {issue.updatedAt > issue.createdAt && (
            <>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-400">
                Updated{' '}
                {issue.updatedAt.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-5">
        <div className="prose prose-sm max-w-none text-gray-700
          prose-headings:text-gray-800
          prose-a:text-green-600
          prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
          prose-pre:bg-gray-900 prose-pre:text-gray-100
        ">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
