
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your API keys and service configurations</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="claude-key">Claude API Key</Label>
                <Input
                  id="claude-key"
                  type="password"
                  placeholder="Enter your Claude API key"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="google-key">Google API Key</Label>
                <Input
                  id="google-key"
                  type="password"
                  placeholder="Enter your Google API key"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="nijivoice-key">Nijivoice API Key</Label>
                <Input
                  id="nijivoice-key"
                  type="password"
                  placeholder="Enter your Nijivoice API key"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="browserless-key">Browserless API Key</Label>
                <Input
                  id="browserless-key"
                  type="password"
                  placeholder="Enter your Browserless API key"
                  className="mt-1"
                />
              </div>
              <Separator />
              <Button>Save API Keys</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="default-language">Default Language</Label>
                <select
                  id="default-language"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
