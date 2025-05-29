
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Forum = () => {
  const topics = [
    { id: 1, title: 'How to improve audio quality?', author: 'user123', replies: 5, category: 'Audio', status: 'open' },
    { id: 2, title: 'Template sharing guidelines', author: 'admin', replies: 12, category: 'General', status: 'pinned' },
    { id: 3, title: 'Bug report: Video export failing', author: 'user456', replies: 3, category: 'Bug Report', status: 'open' },
    { id: 4, title: 'Feature request: Batch processing', author: 'user789', replies: 8, category: 'Feature Request', status: 'open' },
  ];

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'pinned': return 'default';
      case 'solved': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forum</h1>
            <p className="text-gray-600">Get help and share knowledge with the community</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Topic
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search topics..."
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">All</Button>
              <Button variant="outline" size="sm">Audio</Button>
              <Button variant="outline" size="sm">Video</Button>
              <Button variant="outline" size="sm">Bug Reports</Button>
              <Button variant="outline" size="sm">Feature Requests</Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                      <Badge variant={getBadgeVariant(topic.status)}>
                        {topic.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>by {topic.author}</span>
                      <Badge variant="outline">{topic.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{topic.replies} replies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Community Guidelines</h2>
          <p className="text-yellow-700 text-sm">
            Please be respectful and helpful. Login is required to post topics or replies.
            Search existing topics before creating new ones.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Forum;
