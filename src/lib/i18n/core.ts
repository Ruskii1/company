
import { atom, useAtom } from 'jotai'

type LanguageType = 'en' | 'ar'

const languageAtom = atom<LanguageType>('en')

export const useLanguageStore = () => {
  const [language, setLanguage] = useAtom(languageAtom)
  return { language, setLanguage }
}
