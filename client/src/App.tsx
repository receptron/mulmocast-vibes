
import React from 'react';
import { Router, Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { ProjectStatusProvider } from '@/contexts/ProjectStatusContext';

import Dashboard from '@/pages/dashboard';
import Project from '@/pages/project';
import Templates from '@/pages/templates';
import Guides from '@/pages/guides';
import Forum from '@/pages/forum';
import Profile from '@/pages/profile';
import Settings from '@/pages/settings';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProjectStatusProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-gray-50">
            <Router>
              <main>
                <Switch>
                  <Route path="/" component={Dashboard} />
                  <Route path="/project/:id" component={Project} />
                  <Route path="/templates" component={Templates} />
                  <Route path="/guides" component={Guides} />
                  <Route path="/forum" component={Forum} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/settings" component={Settings} />
                  <Route component={NotFound} />
                </Switch>
              </main>
            </Router>
          </div>
          <Toaster />
        </TooltipProvider>
      </ProjectStatusProvider>
    </QueryClientProvider>
  );
}

export default App;
