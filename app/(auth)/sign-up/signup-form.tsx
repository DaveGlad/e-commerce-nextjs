'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUp } from '@/lib/actions/user.actions'
import { signUpDefaultValues } from '@/lib/constants'
import { Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function SignUpForm() {
  const [data, action] = useFormState(signUp, {
    success: false,
    message: '',
  })
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const SignUpButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button disabled={pending} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6" variant="default">
        {pending ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Création en cours...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            Créer mon compte
            <ArrowRight className="ml-2 h-5 w-5" />
          </div>
        )}
      </Button>
    )
  }

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-gray-700 font-medium mb-1.5 block">Nom complet</Label>
          <div className="relative">
            <Input
              id="name"
              name="name"
              placeholder="Jean Dupont"
              required
              type="text"
              defaultValue={signUpDefaultValues.name}
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg py-3 px-4 bg-white"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email" className="text-gray-700 font-medium mb-1.5 block">Adresse e-mail</Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              placeholder="jean@exemple.fr"
              required
              type="email"
              defaultValue={signUpDefaultValues.email}
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg py-3 px-4 bg-white"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Nous ne partagerons jamais votre e-mail.</p>
        </div>
        
        <div>
          <Label htmlFor="password" className="text-gray-700 font-medium mb-1.5 block">Mot de passe</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              required
              type={showPassword ? "text" : "password"}
              defaultValue={signUpDefaultValues.password}
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg py-3 px-4 bg-white pr-10"
              placeholder="8 caractères minimum"
            />
            <button 
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">8 caractères minimum, incluant lettres et chiffres.</p>
        </div>
        
        <div>
          <Label htmlFor="confirmPassword" className="text-gray-700 font-medium mb-1.5 block">Confirmer le mot de passe</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              required
              type={showConfirmPassword ? "text" : "password"}
              defaultValue={signUpDefaultValues.confirmPassword}
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg py-3 px-4 bg-white pr-10"
              placeholder="Confirmez votre mot de passe"
            />
            <button 
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        <div className="pt-2">
          <SignUpButton />
        </div>

        {!data.success && data.message && (
          <div className="text-center p-3 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            {data.message}
          </div>
        )}
        
        {data.success && (
          <div className="text-center p-3 bg-green-50 border border-green-100 rounded-lg flex items-center justify-center text-green-600">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Votre compte a été créé avec succès.
          </div>
        )}
        
        <div className="text-sm text-center text-gray-600 pt-4">
          Vous avez déjà un compte ?{' '}
          <Link
            target="_self"
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            href={`/sign-in?callbackUrl=${callbackUrl}`}
          >
            Se connecter
          </Link>
        </div>
        
        <div className="text-xs text-center text-gray-500 pt-2">
          En créant un compte, vous acceptez nos{' '}
          <Link href="/terms" className="underline hover:text-gray-700">
            Conditions d&rsquo;utilisation
          </Link>{' '}
          et notre{' '}
          <Link href="/privacy" className="underline hover:text-gray-700">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </form>
  )
}
