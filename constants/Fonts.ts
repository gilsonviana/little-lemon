import { TextStyle } from 'react-native'

type FontVariants =
  | 'display'
  | 'heading'
  | 'subheading'
  | 'lead'
  | 'section'
  | 'card-title'
  | 'card-body'
  | 'card-highlight'
  | 'body'
  | 'button'
  | 'label'
type FontSchema = TextStyle
export type ThemeFonts = Record<FontVariants, FontSchema>

export const Fonts: ThemeFonts = {
  display: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lead: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  'card-title': {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  'card-body': {
    fontSize: 14,
    marginBottom: 16,
  },
  'card-highlight': {
    fontSize: 16,
    fontWeight: 'normal',
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  button: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
  },
}
