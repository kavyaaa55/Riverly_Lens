// app/(auth)/signup/page.tsx
import { GalleryVerticalEnd } from 'lucide-react';
import SignupForm from '@/components/signup-form';

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="text-lg font-semibold">RivalryLens</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-md space-y-4 text-center">
            <h2 className="text-3xl font-bold">Welcome to RivalryLens</h2>
            <p className="text-lg text-muted-foreground">
              Get started with competitive intelligence and market insights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

