
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Lock } from 'lucide-react';

const Templates = () => {
  const systemTemplates = [
    { id: 1, name: 'Podcast Interview', type: 'Audio', readonly: true },
    { id: 2, name: 'Product Demo Video', type: 'Video', readonly: true },
    { id: 3, name: 'Educational Slides', type: 'Slides', readonly: true },
  ];

  const userTemplates = [
    { id: 4, name: 'My Custom Template', type: 'Video', readonly: false },
    { id: 5, name: 'Weekly Report', type: 'Slides', readonly: false },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Templates</h1>
            <p className="text-gray-600">Create and manage your content templates</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">System Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{template.type}</Badge>
                      <Button variant="outline" size="sm">
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Edit className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{template.type}</Badge>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Use
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Templates;
