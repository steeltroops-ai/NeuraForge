import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neural-50 via-white to-neural-100">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                'bg-neural-600 hover:bg-neural-700 text-sm normal-case',
              card: 'shadow-2xl border-0',
              headerTitle: 'text-neural-900 text-2xl font-bold',
              headerSubtitle: 'text-neural-600',
              socialButtonsBlockButton:
                'border-neural-200 hover:bg-neural-50 text-neural-700',
              formFieldInput:
                'border-neural-200 focus:border-neural-500 focus:ring-neural-500',
              footerActionLink: 'text-neural-600 hover:text-neural-700',
            },
          }}
          fallbackRedirectUrl="/research"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  )
}
