import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import {
  Card,
  CardContent
} from '@/components/ui/card'
import { APP_NAME } from '@/lib/constants'

import SignUpForm from './signup-form'

export const metadata: Metadata = {
  title: `Inscription - ${APP_NAME}`,
}

export default async function SignUp({
  searchParams: { callbackUrl },
}: {
  searchParams: {
    callbackUrl: string
  }
}) {
  const session = await auth()
  if (session) {
    return redirect(callbackUrl || '/')
  }

  return (
    <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <Image
            src="/assets/icons/logo.png"
            width={70}
            height={70}
            alt={`${APP_NAME} logo`}
            className="mx-auto"
          />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Rejoignez notre communauté et profitez de tous nos services
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10 border-gray-200">
          <CardContent className="p-0">
            <SignUpForm />
          </CardContent>
        </Card>
        
        <div className="mt-6 flex justify-center items-center space-x-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
            Accueil
          </Link>
          <span className="h-4 w-px bg-gray-300" aria-hidden="true"></span>
          <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-800">
            Contact
          </Link>
          <span className="h-4 w-px bg-gray-300" aria-hidden="true"></span>
          <Link href="/help" className="text-sm text-gray-600 hover:text-gray-800">
            Aide
          </Link>
        </div>
      </div>
    </div>
  )
}