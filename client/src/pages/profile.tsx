
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { LogIn, LogOut, User, Settings } from 'lucide-react';

const Profile = () => {
  // Developer toggle for testing login states
  const [isDevMode, setIsDevMode] = useState(false);
  const [devLoggedIn, setDevLoggedIn] = useState(false);
  
  // In production, this would come from your auth state
  const isLoggedIn = isDevMode ? devLoggedIn : false;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Developer Toggle - Always at the top */}
        <div className="mb-6 bg-gray-50 dark:bg-gray-900 border rounded-lg p-3">
          <div className="flex items-center justify-between space-x-2 text-sm">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Developer Mode</span>
            </div>
            <Switch
              checked={isDevMode}
              onCheckedChange={setIsDevMode}
            />
          </div>
          {isDevMode && (
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between space-x-2 text-sm">
                <span>Logged Out / Logged In</span>
                <Switch
                  checked={devLoggedIn}
                  onCheckedChange={setDevLoggedIn}
                />
              </div>
            </div>
          )}
        </div>

        {!isLoggedIn ? (
          <div className="max-w-md mx-auto mt-20">
            <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <LogIn className="w-5 h-5" />
                <span>Login Required</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">
                Please login to access your profile and participate in the forum.
              </p>
              <Button className="w-full">
                <LogIn className="w-4 h-4 mr-2" />
                Login with Replit
              </Button>
            </CardContent>
          </Card>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter username" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Forum Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-500">Topics Created</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">45</div>
                <div className="text-sm text-gray-500">Replies Posted</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-500">Helpful Answers</div>
              </div>
            </div>
          </CardContent>
        </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
